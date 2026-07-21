import type { ReactElement } from "react";
import { MedXMark } from "./MedXMark";
import { RevixirMark } from "./RevixirMark";
import { SupplyTechMark } from "./SupplyTechMark";
import { MedXMarkV2 } from "./MedXMarkV2";
import { MedXMarkV2Alt } from "./MedXMarkV2Alt";
import { RevixirMarkV2 } from "./RevixirMarkV2";
import { SupplyTechMarkV2 } from "./SupplyTechMarkV2";

export type MarkKey =
  | "medx"
  | "revixir"
  | "supplytech"
  | "medx-v2"
  | "medx-v2-alt"
  | "revixir-v2"
  | "supplytech-v2";

export const MARKS: Record<MarkKey, (props: { className?: string }) => ReactElement> = {
  // v1 — kept for revert
  medx: MedXMark,
  revixir: RevixirMark,
  supplytech: SupplyTechMark,
  // v2 — engineering abstractions (field / one invariant / one orange signal)
  "medx-v2": MedXMarkV2,
  "medx-v2-alt": MedXMarkV2Alt,
  "revixir-v2": RevixirMarkV2,
  "supplytech-v2": SupplyTechMarkV2,
};
