import { describe, it, expect } from "vitest";
import { getFilamentPreset, getAllFilamentPresets, filamentPresets } from "../presets";
import type { FilamentType } from "../types";

describe("フィラメントプリセット", () => {
  describe("getFilamentPreset", () => {
    const filamentTypes: FilamentType[] = ["PLA", "PETG", "TPU", "ABS", "ASA"];

    it.each(filamentTypes)(
      "タイプ '%s' に対して正しいプリセットを返す",
      (type) => {
        const preset = getFilamentPreset(type);

        expect(preset).toBeDefined();
        expect(preset.type).toBe(type);
        expect(preset.name).toBe(type);
      }
    );
  });

  describe("温度範囲の妥当性", () => {
    it("全てのプリセットが有効な温度範囲を持つ", () => {
      const allPresets = getAllFilamentPresets();

      for (const preset of allPresets) {
        // Nozzle temp should be in a reasonable range (150-300)
        expect(preset.nozzleTemp).toBeGreaterThanOrEqual(150);
        expect(preset.nozzleTemp).toBeLessThanOrEqual(300);

        // Bed temp should be in a reasonable range (0-120)
        expect(preset.bedTemp).toBeGreaterThanOrEqual(0);
        expect(preset.bedTemp).toBeLessThanOrEqual(120);

        // Max speed should be positive
        expect(preset.maxSpeed).toBeGreaterThan(0);

        // Fan speed should be 0-100
        expect(preset.fanSpeed).toBeGreaterThanOrEqual(0);
        expect(preset.fanSpeed).toBeLessThanOrEqual(100);
      }
    });
  });

  describe("PLA プリセット", () => {
    it("PLA プリセットが期待されるデフォルト値を持つ", () => {
      const pla = getFilamentPreset("PLA");

      expect(pla.type).toBe("PLA");
      expect(pla.name).toBe("PLA");
      expect(pla.nozzleTemp).toBe(200);
      expect(pla.bedTemp).toBe(60);
      expect(pla.maxSpeed).toBe(300);
      expect(pla.fanSpeed).toBe(100);
    });
  });

  describe("getAllFilamentPresets", () => {
    it("全5種類のプリセットを返す", () => {
      const presets = getAllFilamentPresets();

      expect(presets).toHaveLength(5);

      const types = presets.map((p) => p.type);
      expect(types).toContain("PLA");
      expect(types).toContain("PETG");
      expect(types).toContain("TPU");
      expect(types).toContain("ABS");
      expect(types).toContain("ASA");
    });
  });
});
