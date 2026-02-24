"use client";

import { Component, type ReactNode } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary specifically for the React Three Fiber Canvas.
 * Catches rendering errors in the 3D scene and shows a fallback UI
 * instead of crashing the entire page.
 */
export class CanvasErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("3D Preview error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full flex-col items-center justify-center gap-4 bg-muted/20 p-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
            <AlertCircle className="size-6 text-red-500" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">
              3D Preview Error
            </p>
            <p className="max-w-sm text-xs text-muted-foreground">
              {this.state.error?.message || "Failed to render the 3D preview."}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer gap-2"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            <RotateCcw className="size-3.5" />
            Retry
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
