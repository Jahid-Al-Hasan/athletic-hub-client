import React from "react";
import { Progress } from "@/components/ui/progress";

export function Loading() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
      <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      <div className="text-center space-y-2">
        <p className="text-lg font-medium text-foreground">Loading...</p>
        <Progress value={progress} className="w-64" />
        <p className="text-sm text-muted-foreground">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}
