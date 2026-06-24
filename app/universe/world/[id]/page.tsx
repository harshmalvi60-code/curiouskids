import { notFound } from "next/navigation";
import { WORLDS, worldById } from "@/lib/content";
import Hud from "@/components/Hud";
import WorldView from "@/components/WorldView";
import Hydrated from "@/components/Hydrated";

export function generateStaticParams() {
  return WORLDS.map((w) => ({ id: w.id }));
}
export const dynamicParams = false;

export default function WorldPage({ params }: { params: { id: string } }) {
  const world = worldById(params.id);
  if (!world) notFound();
  return (
    <Hydrated>
      <Hud />
      <WorldView world={world} />
    </Hydrated>
  );
}
