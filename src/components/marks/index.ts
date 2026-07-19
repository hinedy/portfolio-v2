import { MedXMark } from "./MedXMark";
import { RevixirMark } from "./RevixirMark";
import { SupplyTechMark } from "./SupplyTechMark";

export type MarkKey = "medx" | "revixir" | "supplytech";

export const MARKS: Record<MarkKey, (props: { className?: string }) => JSX.Element> = {
  medx: MedXMark,
  revixir: RevixirMark,
  supplytech: SupplyTechMark,
};
