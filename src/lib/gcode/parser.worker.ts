/**
 * Web Worker for parsing G-code off the main thread.
 *
 * Usage from the main thread:
 *
 * ```ts
 * const worker = new Worker(new URL('./parser.worker.ts', import.meta.url));
 *
 * worker.postMessage(rawGCodeString);
 *
 * worker.onmessage = (event: MessageEvent<ParsedGCode>) => {
 *   const parsed = event.data;
 *   // Use parsed G-code...
 * };
 *
 * worker.onerror = (error) => {
 *   console.error('Parser worker error:', error);
 * };
 * ```
 */

import { parseGCode } from "./parser";
import type { ParsedGCode } from "./types";

export interface ParserWorkerRequest {
  rawGCode: string;
}

export interface ParserWorkerResponse {
  success: true;
  data: ParsedGCode;
}

export interface ParserWorkerError {
  success: false;
  error: string;
}

export type ParserWorkerResult = ParserWorkerResponse | ParserWorkerError;

// Worker global scope type definition for environments without the webworker lib
interface WorkerGlobalScopeCompat {
  addEventListener(
    type: "message",
    listener: (event: MessageEvent) => void
  ): void;
  postMessage(message: unknown): void;
}

// The worker context (self) for a dedicated worker
const ctx = self as unknown as WorkerGlobalScopeCompat;

ctx.addEventListener("message", (event: MessageEvent) => {
  try {
    const data = event.data as string | ParserWorkerRequest;

    // Accept either a raw string or a structured request object
    const rawGCode =
      typeof data === "string" ? data : data.rawGCode;

    const parsed = parseGCode(rawGCode);

    const response: ParserWorkerResponse = {
      success: true,
      data: parsed,
    };

    ctx.postMessage(response);
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Unknown error during G-code parsing";

    const response: ParserWorkerError = {
      success: false,
      error: errorMessage,
    };

    ctx.postMessage(response);
  }
});
