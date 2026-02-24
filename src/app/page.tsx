"use client";

import { FileUploader } from "@/components/upload/FileUploader";
import { SettingsPanel } from "@/components/settings/SettingsPanel";
import { SafetyWarnings } from "@/components/warnings/SafetyWarnings";
import { ConvertButton } from "@/components/convert/ConvertButton";
import { DownloadButton } from "@/components/convert/DownloadButton";
import { GCodeViewer } from "@/components/preview/GCodeViewer";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl h-full px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-6 h-full">
        {/* Left panel: controls — scrollable independently */}
        <div className="w-full shrink-0 lg:w-[360px] lg:overflow-y-auto lg:pr-2">
          <div className="space-y-4 pb-10">
            <FileUploader />
            <SettingsPanel />
            <SafetyWarnings />
            <div className="space-y-3">
              <ConvertButton />
              <DownloadButton />
            </div>
          </div>
        </div>

        {/* Right panel: 3D preview — fills remaining space */}
        <div className="min-h-[400px] flex-1 lg:min-h-0">
          <div className="h-full min-h-[400px] lg:min-h-0">
            <GCodeViewer />
          </div>
        </div>
      </div>
    </div>
  );
}
