"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";

export function Loading() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Progress value={progress} className="w-[60%]" />
    </div>
  );
}
