import type { ReactElement } from "react";
import { MedXMark } from "./MedXMark";
import { RevixirMark } from "./RevixirMark";
import { SupplyTechMark } from "./SupplyTechMark";

export type MarkKey = "medx" | "revixir" | "supplytech";

export const MARKS: Record<MarkKey, (props: { className?: string }) => ReactElement> = {
  medx: MedXMark,
  revixir: RevixirMark,
  supplytech: SupplyTechMark,
};

