import { describe, it, expect } from "vitest";
import { generateStartGCode } from "../start-gcode/bambu-a1";
import { generateEndGCode } from "../end-gcode/bambu-a1";

describe("Bambu Lab A1 テンプレート", () => {
  describe("generateStartGCode - スタート G-code 生成", () => {
    it("M140 でベッド温度を設定するコマンドを含む", () => {
      const result = generateStartGCode(200, 60);

      expect(result).toContain("M140 S60");
    });

    it("M104 でノズル温度を設定するコマンドを含む", () => {
      const result = generateStartGCode(215, 70);

      expect(result).toContain("M104 S215");
    });

    it("G28 ホームコマンドを含む", () => {
      const result = generateStartGCode(200, 60);

      expect(result).toContain("G28");
    });

    it("異なる温度パラメータで正しく生成される", () => {
      const result = generateStartGCode(250, 95);

      expect(result).toContain("M140 S95");
      expect(result).toContain("M190 S95");
      expect(result).toContain("M104 S250");
      expect(result).toContain("M109 S250");
    });
  });

  describe("generateEndGCode - エンド G-code 生成", () => {
    it("M104 S0 (ノズルヒーター OFF) を含む", () => {
      const result = generateEndGCode();

      expect(result).toContain("M104 S0");
    });

    it("M140 S0 (ベッドヒーター OFF) を含む", () => {
      const result = generateEndGCode();

      expect(result).toContain("M140 S0");
    });

    it("M84 (モーター OFF) を含む", () => {
      const result = generateEndGCode();

      expect(result).toContain("M84");
    });

    it("エンド G-code にファン停止コマンドを含む", () => {
      const result = generateEndGCode();

      expect(result).toContain("M106 S0");
      expect(result).toContain("M107");
    });

    it("フィラメント引き戻しコマンドを含む", () => {
      const result = generateEndGCode();

      // G1 E-2 retracts filament
      expect(result).toContain("G1 E-2");
    });
  });
});
