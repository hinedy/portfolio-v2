import type { ReactElement } from "react";
import { MedXMark } from "./MedXMark";
import { RevixirMark } from "./RevixirMark";
import { SupplyTechMark } from "./SupplyTechMark";
import { MedXMarkV2 } from "./MedXMarkV2";
import { MedXMarkV2Alt } from "./MedXMarkV2Alt";
import { RevixirMarkV2 } from "./RevixirMarkV2";
import { SupplyTechMarkV2 } from "./SupplyTechMarkV2";
import { SupplyTechMarkV2Alt } from "./SupplyTechMarkV2Alt";
import { SupplyTechMarkV2AltB } from "./SupplyTechMarkV2AltB";
import { SupplyTechMarkV2AltC } from "./SupplyTechMarkV2AltC";

export type MarkKey =
  | "medx"
  | "revixir"
  | "supplytech"
  | "medx-v2"
  | "medx-v2-alt"
  | "revixir-v2"
  | "supplytech-v2"
  | "supplytech-v2-alt"
  | "supplytech-v2-alt-b"
  | "supplytech-v2-alt-c";

export const MARKS: Record<MarkKey, (props: { className?: string }) => ReactElement> = {
  medx: MedXMark,
  revixir: RevixirMark,
  supplytech: SupplyTechMark,
  "medx-v2": MedXMarkV2,
  "medx-v2-alt": MedXMarkV2Alt,
  "revixir-v2": RevixirMarkV2,
  "supplytech-v2": SupplyTechMarkV2,
  "supplytech-v2-alt": SupplyTechMarkV2Alt,
  "supplytech-v2-alt-b": SupplyTechMarkV2AltB,
  "supplytech-v2-alt-c": SupplyTechMarkV2AltC,
};
