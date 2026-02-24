import { describe, it, expect } from "vitest";
import { parseGCode } from "../parser";

describe("parseGCode - G-code パーサー", () => {
  describe("基本的な移動コマンド (G1)", () => {
    it("G1 移動コマンドからセグメントを正しく生成する", () => {
      const result = parseGCode("G1 X10 Y20 Z0.3 E1.5 F1500");

      // G1 should create a segment in a layer
      expect(result.layers.length).toBe(1);
      const seg = result.layers[0]!.segments[0];
      expect(seg).toBeDefined();
      expect(seg!.end.x).toBe(10);
      expect(seg!.end.y).toBe(20);
      expect(seg!.end.z).toBe(0.3);
      expect(seg!.extruding).toBe(true);
    });
  });

  describe("高速移動コマンド (G0)", () => {
    it("G0 ラピッドムーブコマンドをパースする", () => {
      const result = parseGCode("G0 X50 Y50 F6000");

      expect(result.layers.length).toBe(1);
      const seg = result.layers[0]!.segments[0];
      expect(seg).toBeDefined();
      expect(seg!.end.x).toBe(50);
      expect(seg!.end.y).toBe(50);
      // G0 without E is a travel (non-extruding) move
      expect(seg!.extruding).toBe(false);
    });
  });

  describe("ホームコマンド (G28)", () => {
    it("G28 コマンドで位置を 0,0,0 にリセットする", () => {
      const gcode = [
        "G1 X100 Y100 Z10 F1000",
        "G28",
        "G1 X5 Y5 F1000",
      ].join("\n");

      const result = parseGCode(gcode);

      // The G1 X5 Y5 after G28 should move from 0,0,0
      const allSegments = result.layers.flatMap((l) => l.segments);
      const lastSegment = allSegments[allSegments.length - 1];

      expect(lastSegment).toBeDefined();
      expect(lastSegment!.start.x).toBe(0);
      expect(lastSegment!.start.y).toBe(0);
      expect(lastSegment!.start.z).toBe(0);
      expect(lastSegment!.end.x).toBe(5);
      expect(lastSegment!.end.y).toBe(5);
    });
  });

  describe("位置リセット (G92)", () => {
    it("G92 E0 でエクストルーダ位置をリセットする", () => {
      const gcode = [
        "G1 X10 Y10 E5 F1000",
        "G92 E0",
        "G1 X20 Y20 E2 F1000",
      ].join("\n");

      const result = parseGCode(gcode);

      // After G92 E0, the next E2 means 2mm of extrusion from the reset point
      // Total filament = 5 (first move) + 2 (second move after reset)
      expect(result.stats.filamentLength).toBe(7);
    });
  });

  describe("絶対/相対モード切替 (G90/G91)", () => {
    it("G90 で絶対座標モードに設定する", () => {
      const gcode = [
        "G91",
        "G90",
        "G1 X10 Y10 F1000",
      ].join("\n");

      const result = parseGCode(gcode);
      const allSegments = result.layers.flatMap((l) => l.segments);

      // In absolute mode, G1 X10 Y10 should move to position (10, 10)
      expect(allSegments[0]!.end.x).toBe(10);
      expect(allSegments[0]!.end.y).toBe(10);
    });

    it("G91 で相対座標モードに設定する", () => {
      const gcode = [
        "G1 X10 Y10 F1000",
        "G91",
        "G1 X5 Y5 F1000",
      ].join("\n");

      const result = parseGCode(gcode);
      const allSegments = result.layers.flatMap((l) => l.segments);

      // After moving to (10,10) then switching to relative, G1 X5 Y5 => (15, 15)
      expect(allSegments[1]!.end.x).toBe(15);
      expect(allSegments[1]!.end.y).toBe(15);
    });
  });

  describe("M83 相対押し出しモード", () => {
    it("M83 でE値を相対値として処理する", () => {
      const gcode = [
        "M83",
        "G1 X10 Y10 E0.5 F1000",
        "G1 X20 Y20 E0.5 F1000",
      ].join("\n");

      const result = parseGCode(gcode);
      // Each E0.5 is a relative delta, total = 0.5 + 0.5 = 1.0
      expect(result.stats.filamentLength).toBeCloseTo(1.0, 5);
    });
  });

  describe("レイヤー検出", () => {
    it("Z高さの変化に基づいてレイヤー変更を検出する", () => {
      const gcode = [
        "G1 X10 Y10 Z0.3 F1000",
        "G1 X20 Y20 Z0.3 F1000",
        "G1 X10 Y10 Z0.6 F1000",
        "G1 X20 Y20 Z0.6 F1000",
        "G1 X10 Y10 Z0.9 F1000",
      ].join("\n");

      const result = parseGCode(gcode);

      // Z goes 0.3 -> 0.6 -> 0.9 = 3 layers
      expect(result.layers.length).toBe(3);
      expect(result.layers[0]!.z).toBe(0.3);
      expect(result.layers[1]!.z).toBe(0.6);
      expect(result.layers[2]!.z).toBe(0.9);
    });

    it("正しいレイヤー数を計算する", () => {
      const gcode = [
        "G1 Z0.2 F1000",
        "G1 X10 Y10 E1 F1000",
        "G1 Z0.4 F1000",
        "G1 X20 Y20 E2 F1000",
      ].join("\n");

      const result = parseGCode(gcode);
      expect(result.stats.layerCount).toBe(2);
    });
  });

  describe("コメント処理", () => {
    it("; で始まるコメント行を無視する", () => {
      const gcode = [
        "; This is a comment",
        "; Another comment",
        "G28",
      ].join("\n");

      const result = parseGCode(gcode);
      // Only G28 (non-move) should appear in commands
      expect(result.commands.length).toBe(1);
      expect(result.commands[0]!.type).toBe("G28");
    });

    it("インラインコメントを処理する (セミコロン以降を無視)", () => {
      const gcode = "G1 X10 Y20 F1000 ; move to position";
      const result = parseGCode(gcode);

      // G1 move commands are not stored in commands array (for memory efficiency)
      // but segments should be created
      const allSegments = result.layers.flatMap((l) => l.segments);
      expect(allSegments.length).toBe(1);
      expect(allSegments[0]!.end.x).toBe(10);
      expect(allSegments[0]!.end.y).toBe(20);
    });
  });

  describe("バウンディングボックス", () => {
    it("移動座標からバウンディングボックスを計算する", () => {
      const gcode = [
        "G1 X0 Y0 Z0.3 F1000",
        "G1 X100 Y150 Z0.3 F1000",
        "G1 X50 Y80 Z5 F1000",
      ].join("\n");

      const result = parseGCode(gcode);
      const bb = result.stats.boundingBox;

      expect(bb.min.x).toBe(0);
      expect(bb.min.y).toBe(0);
      expect(bb.min.z).toBe(0.3);
      expect(bb.max.x).toBe(100);
      expect(bb.max.y).toBe(150);
      expect(bb.max.z).toBe(5);
    });
  });

  describe("エッジケース", () => {
    it("空の入力を処理する", () => {
      const result = parseGCode("");
      expect(result.commands.length).toBe(0);
      expect(result.layers.length).toBe(0);
      expect(result.stats.layerCount).toBe(0);
      expect(result.stats.boundingBox.min).toEqual({ x: 0, y: 0, z: 0 });
      expect(result.stats.boundingBox.max).toEqual({ x: 0, y: 0, z: 0 });
    });

    it("コメントのみの入力を処理する", () => {
      const gcode = [
        "; Header comment",
        "; Generated by slicer",
        "; Version 1.0",
      ].join("\n");

      const result = parseGCode(gcode);
      expect(result.commands.length).toBe(0);
      expect(result.layers.length).toBe(0);
      expect(result.stats.layerCount).toBe(0);
    });
  });
});
