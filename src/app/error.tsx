"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslation();

  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
        <AlertCircle className="size-8 text-red-500" />
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-foreground">
          {t.errorPage.title}
        </h2>
        <p className="text-sm text-muted-foreground">
          {error.message || "An unexpected error occurred."}
        </p>
        {error.digest && (
          <p className="font-mono text-xs text-muted-foreground/60">
            Digest: {error.digest}
          </p>
        )}
      </div>

      <Button
        onClick={reset}
        variant="outline"
        className="cursor-pointer gap-2"
      >
        <RotateCcw className="size-4" />
        {t.errorPage.tryAgain}
      </Button>
    </div>
  );
}
