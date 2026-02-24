"use client";

import { Loader2, Zap } from "lucide-react";
import { useGCodeStore } from "@/stores/useGCodeStore";
import { useGCodeConverter } from "@/hooks/useGCodeConverter";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";

export function ConvertButton() {
  const t = useTranslation();
  const isParsingComplete = useGCodeStore((s) => s.isParsingComplete);
  const isConverted = useGCodeStore((s) => s.isConverted);

  const { convert, isConverting } = useGCodeConverter();

  const isDisabled = !isParsingComplete || isConverting;

  return (
    <Button
      size="lg"
      className="w-full cursor-pointer bg-green-600 text-white shadow-md shadow-green-500/20 transition-all duration-200 hover:bg-green-500 hover:shadow-lg hover:shadow-green-500/30 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none"
      onClick={convert}
      disabled={isDisabled}
    >
      {isConverting ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          <span>{t.convert.converting}</span>
        </>
      ) : isConverted ? (
        <>
          <Zap className="size-4" />
          <span>{t.convert.reconvert}</span>
        </>
      ) : (
        <>
          <Zap className="size-4" />
          <span>{t.convert.convertForBambu}</span>
        </>
      )}
    </Button>
  );
}
