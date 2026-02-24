"use client";

import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Upload,
  Settings2,
  Eye,
  Zap,
  Printer,
  AlertTriangle,
  HardDrive,
  Info,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export default function GuidePage() {
  const t = useTranslation();

  const steps = [
    {
      number: 1,
      icon: <Upload className="size-5 text-green-500" />,
      title: t.guide.step1Title,
      description: t.guide.step1Desc,
    },
    {
      number: 2,
      icon: <HardDrive className="size-5 text-green-500" />,
      title: t.guide.step2Title,
      description: t.guide.step2Desc,
    },
    {
      number: 3,
      icon: <Settings2 className="size-5 text-green-500" />,
      title: t.guide.step3Title,
      description: t.guide.step3Desc,
    },
    {
      number: 4,
      icon: <Eye className="size-5 text-green-500" />,
      title: t.guide.step4Title,
      description: t.guide.step4Desc,
    },
    {
      number: 5,
      icon: <Zap className="size-5 text-green-500" />,
      title: t.guide.step5Title,
      description: t.guide.step5Desc,
    },
    {
      number: 6,
      icon: <Printer className="size-5 text-green-500" />,
      title: t.guide.step6Title,
      description: t.guide.step6Desc,
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {t.guide.title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {t.guide.subtitle}
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step) => (
          <Card key={step.number}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/10 border border-green-500/20 font-mono text-sm font-bold text-green-500">
                  {step.number}
                </div>
                <div className="min-w-0">
                  <CardTitle className="flex items-center gap-2 text-base">
                    {step.icon}
                    {step.title}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* SD Card Tips */}
      <div className="mt-12">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
          <Info className="size-5 text-blue-400" />
          {t.guide.sdCardTitle}
        </h2>
        <Card>
          <CardContent>
            <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li className="flex gap-3">
                <span className="mt-0.5 shrink-0 font-mono text-xs text-green-500">
                  01
                </span>
                <span dangerouslySetInnerHTML={{ __html: t.guide.sdTip1 }} />
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 shrink-0 font-mono text-xs text-green-500">
                  02
                </span>
                <span dangerouslySetInnerHTML={{ __html: t.guide.sdTip2 }} />
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 shrink-0 font-mono text-xs text-green-500">
                  03
                </span>
                <span dangerouslySetInnerHTML={{ __html: t.guide.sdTip3 }} />
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 shrink-0 font-mono text-xs text-green-500">
                  04
                </span>
                <span dangerouslySetInnerHTML={{ __html: t.guide.sdTip4 }} />
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Safety warnings */}
      <div className="mt-12">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
          <AlertTriangle className="size-5 text-yellow-500" />
          {t.guide.safetyTitle}
        </h2>
        <Card className="border-yellow-500/20">
          <CardContent>
            <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li className="flex gap-3">
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-yellow-500" />
                <span dangerouslySetInnerHTML={{ __html: t.guide.safety1 }} />
              </li>
              <li className="flex gap-3">
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-yellow-500" />
                <span dangerouslySetInnerHTML={{ __html: t.guide.safety2 }} />
              </li>
              <li className="flex gap-3">
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-yellow-500" />
                <span dangerouslySetInnerHTML={{ __html: t.guide.safety3 }} />
              </li>
              <li className="flex gap-3">
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-yellow-500" />
                <span dangerouslySetInnerHTML={{ __html: t.guide.safety4 }} />
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-green-500"
        >
          <Zap className="size-4" />
          {t.guide.startConverting}
        </Link>
      </div>
      <Footer />
    </div>
  );
}
