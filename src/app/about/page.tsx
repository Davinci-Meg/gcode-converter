"use client";

import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Code2,
  ExternalLink,
  Shield,
  Users,
  Layers,
  Cpu,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export default function AboutPage() {
  const t = useTranslation();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {t.about.title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {t.about.subtitle}
        </p>
      </div>

      {/* Project description */}
      <section className="mb-10">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="size-5 text-green-500" />
              {t.about.projectOverview}
            </CardTitle>
            <CardDescription>
              {t.about.projectDesc}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p dangerouslySetInnerHTML={{ __html: t.about.projectP1 }} />
            <p dangerouslySetInnerHTML={{ __html: t.about.projectP2 }} />
            <p dangerouslySetInnerHTML={{ __html: t.about.projectP3 }} />
          </CardContent>
        </Card>
      </section>

      {/* Technology stack */}
      <section className="mb-10">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="size-5 text-green-500" />
              {t.about.techStack}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">
                  {t.about.frontend}
                </h4>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-green-500" />
                    Next.js 16 (App Router)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-green-500" />
                    React 19
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-green-500" />
                    TypeScript 5
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-green-500" />
                    Tailwind CSS 4
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">
                  {t.about.libraries}
                </h4>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-blue-400" />
                    {t.about.libThreejs}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-blue-400" />
                    {t.about.libZustand}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-blue-400" />
                    {t.about.libShadcn}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-blue-400" />
                    {t.about.libSonner}
                  </li>
                </ul>
              </div>
            </div>
            <Separator className="my-4" />
            <p className="text-xs text-muted-foreground">
              {t.about.browserNote}
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Links */}
      <section className="mb-10">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="size-5 text-green-500" />
              {t.about.relatedLinks}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <a
                href="https://github.com/search?q=gcoordinator"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-md border border-border/60 px-4 py-3 transition-colors hover:bg-accent"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    gcoordinator GitHub
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t.about.gcoordinatorDesc}
                  </p>
                </div>
                <ExternalLink className="size-4 text-muted-foreground" />
              </a>
              <a
                href="https://wiki.bambulab.com/en/a1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-md border border-border/60 px-4 py-3 transition-colors hover:bg-accent"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Bambu Lab A1 Wiki
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t.about.bambuWikiDesc}
                  </p>
                </div>
                <ExternalLink className="size-4 text-muted-foreground" />
              </a>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Disclaimer */}
      <section className="mb-10">
        <Card className="border-yellow-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="size-5 text-yellow-500" />
              {t.about.disclaimer}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p dangerouslySetInnerHTML={{ __html: t.about.disclaimerP1 }} />
            <p dangerouslySetInnerHTML={{ __html: t.about.disclaimerP2 }} />
            <p dangerouslySetInnerHTML={{ __html: t.about.disclaimerP3 }} />
          </CardContent>
        </Card>
      </section>

      {/* Credits */}
      <section className="mb-10">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="size-5 text-green-500" />
              {t.about.credits}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              {t.about.creditsIntro}
            </p>
            <ul className="space-y-1.5 text-xs">
              <li>
                <strong className="text-foreground">gcoordinator</strong> -{" "}
                {t.about.creditGcoordinator}
              </li>
              <li>
                <strong className="text-foreground">Next.js</strong> -{" "}
                {t.about.creditNextjs}
              </li>
              <li>
                <strong className="text-foreground">shadcn/ui</strong> -{" "}
                {t.about.creditShadcn}
              </li>
              <li>
                <strong className="text-foreground">Three.js</strong> -{" "}
                {t.about.creditThreejs}
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Back to converter */}
      <div className="text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-green-500"
        >
          {t.about.backToConverter}
        </Link>
      </div>
      <Footer />
    </div>
  );
}
