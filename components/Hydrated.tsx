"use client";

import { useStore } from "@/lib/store";

export default function Hydrated({ children }: { children: React.ReactNode }) {
  const hydrated = useStore((s) => s.hydrated);
  if (!hydrated) return <div className="loading">Loading your universe…</div>;
  return <>{children}</>;
}
