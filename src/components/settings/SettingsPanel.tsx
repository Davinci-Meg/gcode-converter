"use client";

import { Thermometer, Settings2, Code } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/lib/i18n";
import { FilamentTab } from "./FilamentTab";
import { PrintTab } from "./PrintTab";
import { AdvancedTab } from "./AdvancedTab";

export function SettingsPanel() {
  const t = useTranslation();

  return (
    <Card className="w-full">
      <CardContent>
        <Tabs defaultValue="filament" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="filament" className="flex-1">
              <Thermometer className="size-4" />
              <span>{t.settings.filamentTab}</span>
            </TabsTrigger>
            <TabsTrigger value="print" className="flex-1">
              <Settings2 className="size-4" />
              <span>{t.settings.printTab}</span>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex-1">
              <Code className="size-4" />
              <span>{t.settings.advancedTab}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="filament" className="mt-4">
            <FilamentTab />
          </TabsContent>

          <TabsContent value="print" className="mt-4">
            <PrintTab />
          </TabsContent>

          <TabsContent value="advanced" className="mt-4">
            <AdvancedTab />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
