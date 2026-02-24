import { describe, it, expect } from "vitest";
import { validateGCode } from "../validator";
import { bambuA1Profile } from "../../printer-profiles/bambu-a1";

describe("validateGCode - G-code バリデーション", () => {
  describe("正常系", () => {
    it("範囲内の有効な G-code に対して空の配列を返す", () => {
      const gcode = [
        "G1 X100 Y100 Z50 F3000",
        "G1 X200 Y200 Z100 E5 F1500",
      ].join("\n");

      const warnings = validateGCode(gcode, bambuA1Profile);
      expect(warnings).toEqual([]);
    });
  });

  describe("座標範囲チェック (集約)", () => {
    it("X 座標が範囲外 (> 256) の場合を検出する", () => {
      const gcode = "G1 X300 Y100 F1000";
      const warnings = validateGCode(gcode, bambuA1Profile);

      expect(warnings.length).toBeGreaterThan(0);
      expect(warnings.some((w) => w.type === "out_of_bounds" && w.message.includes("X"))).toBe(
        true
      );
    });

    it("Y 座標が範囲外 (> 256) の場合を検出する", () => {
      const gcode = "G1 X100 Y300 F1000";
      const warnings = validateGCode(gcode, bambuA1Profile);

      expect(warnings.length).toBeGreaterThan(0);
      expect(warnings.some((w) => w.type === "out_of_bounds" && w.message.includes("Y"))).toBe(
        true
      );
    });

    it("Z 座標が範囲外 (> 256) の場合を検出する", () => {
      const gcode = "G1 X100 Y100 Z300 F1000";
      const warnings = validateGCode(gcode, bambuA1Profile);

      expect(warnings.length).toBeGreaterThan(0);
      expect(warnings.some((w) => w.type === "out_of_bounds" && w.message.includes("Z"))).toBe(
        true
      );
    });

    it("負の座標を検出する", () => {
      const gcode = "G1 X-10 Y-5 F1000";
      const warnings = validateGCode(gcode, bambuA1Profile);

      expect(warnings.length).toBeGreaterThan(0);
      expect(warnings.some((w) => w.type === "out_of_bounds")).toBe(true);
    });

    it("複数行の範囲外座標を1つの警告に集約する", () => {
      const gcode = [
        "G1 X300 Y100 F1000",
        "G1 X310 Y100 F1000",
        "G1 X320 Y100 F1000",
      ].join("\n");

      const warnings = validateGCode(gcode, bambuA1Profile);
      // Should produce 1 aggregated warning for X, not 3 individual ones
      const xWarnings = warnings.filter(
        (w) => w.type === "out_of_bounds" && w.message.includes("X")
      );
      expect(xWarnings.length).toBe(1);
      expect(xWarnings[0]!.message).toContain("3 moves affected");
    });

    it("X と Y が同時に範囲外の場合、軸ごとに1つの警告を生成する", () => {
      const gcode = "G1 X300 Y300 F1000";
      const warnings = validateGCode(gcode, bambuA1Profile);

      const xWarnings = warnings.filter((w) => w.message.includes("X"));
      const yWarnings = warnings.filter((w) => w.message.includes("Y"));
      expect(xWarnings.length).toBe(1);
      expect(yWarnings.length).toBe(1);
    });
  });

  describe("温度チェック", () => {
    it("ノズル温度が 300 度を超える場合に警告する", () => {
      const gcode = "M104 S350";
      const warnings = validateGCode(gcode, bambuA1Profile);

      expect(warnings.length).toBeGreaterThan(0);
      expect(warnings.some((w) => w.type === "high_temp")).toBe(true);
    });

    it("ベッド温度が 100 度を超える場合に警告する", () => {
      const gcode = "M140 S120";
      const warnings = validateGCode(gcode, bambuA1Profile);

      expect(warnings.length).toBeGreaterThan(0);
      expect(warnings.some((w) => w.type === "high_bed_temp")).toBe(true);
    });
  });

  describe("送り速度チェック", () => {
    it("極端な送り速度 (> 30000 mm/min) に対して警告する", () => {
      const gcode = "G1 X100 Y100 F50000";
      const warnings = validateGCode(gcode, bambuA1Profile);

      expect(warnings.length).toBeGreaterThan(0);
      expect(warnings.some((w) => w.type === "extreme_speed")).toBe(true);
    });
  });

  describe("押出量チェック", () => {
    it("大きな押出移動 (E > 50) に対して警告する", () => {
      const gcode = "G1 X100 Y100 E60 F1000";
      const warnings = validateGCode(gcode, bambuA1Profile);

      expect(warnings.length).toBeGreaterThan(0);
      expect(warnings.some((w) => w.type === "excessive_extrusion")).toBe(true);
    });
  });
});
