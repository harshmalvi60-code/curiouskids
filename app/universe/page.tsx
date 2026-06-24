"use client";

import Hud from "@/components/Hud";
import Onboard from "@/components/Onboard";
import GalaxyMap from "@/components/GalaxyMap";
import Hydrated from "@/components/Hydrated";
import { useStore } from "@/lib/store";

export default function UniversePage() {
  const name = useStore((s) => s.explorerName);
  return (
    <Hydrated>
      {name ? (
        <>
          <Hud />
          <GalaxyMap />
        </>
      ) : (
        <Onboard />
      )}
    </Hydrated>
  );
}
