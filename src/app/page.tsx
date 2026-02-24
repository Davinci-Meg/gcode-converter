"use client";

import { FileUploader } from "@/components/upload/FileUploader";
import { SettingsPanel } from "@/components/settings/SettingsPanel";
import { SafetyWarnings } from "@/components/warnings/SafetyWarnings";
import { ConvertButton } from "@/components/convert/ConvertButton";
import { DownloadButton } from "@/components/convert/DownloadButton";
import { GCodeViewer } from "@/components/preview/GCodeViewer";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 pb-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        {/* Left panel: controls */}
        <div className="w-full shrink-0 space-y-5 lg:w-[380px]">
          <FileUploader />
          <SettingsPanel />
          <SafetyWarnings />
          <div className="space-y-3">
            <ConvertButton />
            <DownloadButton />
          </div>
        </div>

        {/* Right panel: 3D preview */}
        <div className="min-h-[400px] flex-1 lg:min-h-0 lg:h-[calc(100vh-theme(spacing.14)-theme(spacing.14)-theme(spacing.12)-theme(spacing.8))]">
          <div className="h-full min-h-[400px]">
            <GCodeViewer />
          </div>
        </div>
      </div>
    </div>
  );
}
