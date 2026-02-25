import type { PrinterProfile } from "./types";
import { bambuA1Profile } from "./bambu-a1";
import { bambuA1MiniProfile } from "./bambu-a1-mini";
import { bambuP1PProfile } from "./bambu-p1p";
import { bambuP1SProfile } from "./bambu-p1s";
import { bambuX1CProfile } from "./bambu-x1c";
import { bambuX1EProfile } from "./bambu-x1e";

export type PrinterId =
  | "bambu-a1"
  | "bambu-a1-mini"
  | "bambu-p1p"
  | "bambu-p1s"
  | "bambu-x1c"
  | "bambu-x1e";

export const printerProfiles: Record<PrinterId, PrinterProfile> = {
  "bambu-a1": bambuA1Profile,
  "bambu-a1-mini": bambuA1MiniProfile,
  "bambu-p1p": bambuP1PProfile,
  "bambu-p1s": bambuP1SProfile,
  "bambu-x1c": bambuX1CProfile,
  "bambu-x1e": bambuX1EProfile,
};

/** Ordered list for UI display (grouped by series) */
export const printerList: { id: PrinterId; name: string; series: string }[] = [
  { id: "bambu-a1", name: "A1", series: "A" },
  { id: "bambu-a1-mini", name: "A1 Mini", series: "A" },
  { id: "bambu-p1p", name: "P1P", series: "P" },
  { id: "bambu-p1s", name: "P1S", series: "P" },
  { id: "bambu-x1c", name: "X1 Carbon", series: "X" },
  { id: "bambu-x1e", name: "X1E", series: "X" },
];

export function getPrinterProfile(id: string): PrinterProfile {
  const profile = printerProfiles[id as PrinterId];
  if (!profile) {
    return bambuA1Profile;
  }
  return profile;
}

export { type PrinterProfile } from "./types";
