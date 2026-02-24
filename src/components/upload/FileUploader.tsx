"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileCheck, X, FileWarning } from "lucide-react";
import { useGCodeStore } from "@/stores/useGCodeStore";
import { useGCodeParser } from "@/hooks/useGCodeParser";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB
// Use permissive validator - .gcode MIME type varies across browsers/OS
const GCODE_EXTENSIONS = [".gcode", ".gc", ".g"];

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUploader() {
  const t = useTranslation();
  const [error, setError] = useState<string | null>(null);

  const fileName = useGCodeStore((s) => s.fileName);
  const isParsing = useGCodeStore((s) => s.isParsing);
  const isParsingComplete = useGCodeStore((s) => s.isParsingComplete);
  const parseError = useGCodeStore((s) => s.parseError);
  const setFile = useGCodeStore((s) => s.setFile);
  const reset = useGCodeStore((s) => s.reset);

  const { parse } = useGCodeParser();

  const [fileSize, setFileSize] = useState<number | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null);

      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0]!;

      // Validate extension manually (MIME types are unreliable for .gcode)
      const ext = file.name.toLowerCase().slice(file.name.lastIndexOf("."));
      if (!GCODE_EXTENSIONS.includes(ext)) {
        setError(t.upload.unsupportedExtension.replace("{ext}", ext));
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setError(t.upload.fileTooLarge.replace("{size}", formatFileSize(file.size)));
        return;
      }

      setFileSize(file.size);

      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        setFile(file.name, content);
        parse(content);
      };
      reader.onerror = () => {
        setError(t.upload.readError);
      };
      reader.readAsText(file);
    },
    [setFile, parse, t]
  );

  const onDropRejected = useCallback(() => {
    setError(t.upload.invalidType);
  }, [t]);

  const handleRemoveFile = useCallback(() => {
    reset();
    setFileSize(null);
    setError(null);
  }, [reset]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      onDropRejected,
      // No accept filter: .gcode MIME type varies by OS/browser.
      // We validate the extension manually in onDrop instead.
      maxFiles: 1,
      multiple: false,
      disabled: isParsing,
    });

  // File is loaded: show loaded state
  if (fileName && !error) {
    return (
      <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-green-500/10">
              <FileCheck className="size-5 text-green-500" />
            </div>
            <div className="min-w-0">
              <p className="truncate font-mono text-sm font-medium text-foreground">
                {fileName}
              </p>
              <p className="text-xs text-muted-foreground">
                {fileSize !== null ? formatFileSize(fileSize) : ""}
                {isParsing && (
                  <span className="ml-2 text-blue-400">{t.upload.parsing}</span>
                )}
                {isParsingComplete && (
                  <span className="ml-2 text-green-500">{t.upload.ready}</span>
                )}
                {parseError && (
                  <span className="ml-2 text-red-500">{t.upload.parseFailed}</span>
                )}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 shrink-0 cursor-pointer text-muted-foreground hover:text-destructive"
            onClick={handleRemoveFile}
            aria-label={t.upload.removeFile}
          >
            <X className="size-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div
        {...getRootProps()}
        className={cn(
          "relative cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-all duration-200",
          "hover:border-green-500/50 hover:bg-green-500/5",
          isDragActive && !isDragReject &&
            "border-green-500 bg-green-500/10 scale-[1.01]",
          isDragReject && "border-red-500 bg-red-500/10",
          !isDragActive && !error && "border-border/60 bg-muted/30",
          error && "border-red-500/50 bg-red-500/5",
          isParsing && "pointer-events-none opacity-60"
        )}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center gap-3">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-200",
              isDragActive && !isDragReject
                ? "bg-green-500/20 text-green-500"
                : isDragReject
                  ? "bg-red-500/20 text-red-500"
                  : "bg-muted text-muted-foreground"
            )}
          >
            {isDragReject ? (
              <FileWarning className="size-6" />
            ) : (
              <Upload className="size-6" />
            )}
          </div>

          {isDragActive && !isDragReject ? (
            <p className="text-sm font-medium text-green-500">
              {t.upload.dropHere}
            </p>
          ) : isDragReject ? (
            <p className="text-sm font-medium text-red-500">
              {t.upload.unsupportedType}
            </p>
          ) : (
            <>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {t.upload.dropOrBrowse}{" "}
                  <span className="text-green-500 underline underline-offset-2">
                    {t.upload.browse}
                  </span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t.upload.supportedFormats}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-2 rounded-md bg-red-500/10 px-3 py-2">
          <FileWarning className="size-4 shrink-0 text-red-500" />
          <p className="text-xs text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
}
