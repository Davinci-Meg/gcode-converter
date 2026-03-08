import { describe, it, expect } from "vitest";
import { convertGCode } from "../converter";
import type { ConversionOptions } from "../types";

function createDefaultOptions(overrides: Partial<ConversionOptions> = {}): ConversionOptions {
  return {
    printerId: "bambu-a1",
    nozzleTemp: 200,
    bedTemp: 60,
    maxSpeed: 300,
    speedFactor: 1.0,
    offsetX: 0,
    offsetY: 0,
    nozzleDiameter: 0.4,
    customStartGCode: null,
    customEndGCode: null,
    ...overrides,
  };
}

describe("convertGCode - G-code 変換", () => {
  describe("スタート G-code ヘッダー", () => {
    it("正しい温度設定を含むスタート G-code ヘッダーを追加する", () => {
      const options = createDefaultOptions({ nozzleTemp: 210, bedTemp: 65 });
      const result = convertGCode("G1 X10 Y10 F1000", options);

      expect(result).toContain("M140 S65");
      expect(result).toContain("M104 S210");
      expect(result).toContain("G28");
    });
  });

  describe("エンド G-code フッター", () => {
    it("エンド G-code フッターを追加する", () => {
      const options = createDefaultOptions();
      const result = convertGCode("G1 X10 Y10 F1000", options);

      expect(result).toContain("M104 S0");
      expect(result).toContain("M140 S0");
      expect(result).toContain("M84");
    });
  });

  describe("X/Y オフセット適用", () => {
    it("G1 コマンドに X/Y オフセットを正しく適用する", () => {
      const options = createDefaultOptions({ offsetX: 10, offsetY: 20 });
      const result = convertGCode("G1 X50 Y100 F1000", options);

      // X50 + 10 = 60, Y100 + 20 = 120
      expect(result).toContain("X60.000");
      expect(result).toContain("Y120.000");
    });

    it("G0 コマンドに X/Y オフセットを正しく適用する", () => {
      const options = createDefaultOptions({ offsetX: -5, offsetY: 15 });
      const result = convertGCode("G0 X30 Y40 F6000", options);

      // X30 + (-5) = 25, Y40 + 15 = 55
      expect(result).toContain("X25.000");
      expect(result).toContain("Y55.000");
    });
  });

  describe("送り速度クランプ", () => {
    it("maxSpeed 設定を超える送り速度をクランプする", () => {
      // maxSpeed is in mm/s, F parameter is in mm/min
      // maxSpeed=100 mm/s => max F = 6000 mm/min
      const options = createDefaultOptions({ maxSpeed: 100 });
      const result = convertGCode("G1 X10 Y10 F12000", options);

      // F12000 exceeds max of 6000, should be clamped to 6000
      expect(result).toContain("F6000.000");
      expect(result).not.toContain("F12000");
    });
  });

  describe("カスタム G-code", () => {
    it("カスタムスタート G-code が提供された場合にそれを使用する", () => {
      const customStart = "; My custom start\nG28\nM104 S999";
      const options = createDefaultOptions({ customStartGCode: customStart });
      const result = convertGCode("G1 X10 Y10 F1000", options);

      expect(result).toContain("; My custom start");
      expect(result).toContain("M104 S999");
    });

    it("カスタムエンド G-code が提供された場合にそれを使用する", () => {
      const customEnd = "; My custom end\nM84\n; Done";
      const options = createDefaultOptions({ customEndGCode: customEnd });
      const result = convertGCode("G1 X10 Y10 F1000", options);

      expect(result).toContain("; My custom end");
      expect(result).toContain("; Done");
    });
  });

  describe("コメントと非移動コマンドの保持", () => {
    it("コメント行をそのまま保持する", () => {
      const options = createDefaultOptions();
      const result = convertGCode("; This is a comment", options);

      expect(result).toContain("; This is a comment");
    });

    it("移動コマンド以降の非移動コマンドをそのまま保持する", () => {
      const options = createDefaultOptions();
      // Put G28 and G92 after a move command so they're not stripped as init commands
      const gcode = [
        "G1 X10 Y10 F1000",
        "G28",
        "G92 E0",
        "M83",
      ].join("\n");

      const result = convertGCode(gcode, options);

      // Non-G0/G1 commands after first move should be untouched
      expect(result).toContain("G28");
      expect(result).toContain("G92 E0");
      expect(result).toContain("M83");
    });

    it("最初の移動コマンドより前の温度コマンドをストリップする", () => {
      const options = createDefaultOptions();
      const gcode = [
        "M140 S50",
        "M104 S200",
        "G1 X10 Y10 F1000",
      ].join("\n");

      const result = convertGCode(gcode, options);

      // Init temp commands before first move should be stripped (commented out)
      expect(result).toContain("; [stripped]");
    });
  });
});
