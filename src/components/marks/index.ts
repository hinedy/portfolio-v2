import type { ReactElement } from "react";
import { MedXMark } from "./MedXMark";
import { RevixirMark } from "./RevixirMark";
import { SupplyTechMark } from "./SupplyTechMark";
import { MedXMarkV2 } from "./MedXMarkV2";
import { MedXMarkV2Alt } from "./MedXMarkV2Alt";
import { MedXMarkV2AltB } from "./MedXMarkV2AltB";
import { MedXMarkV2AltC } from "./MedXMarkV2AltC";
import { RevixirMarkV2 } from "./RevixirMarkV2";
import { RevixirMarkV2AltB } from "./RevixirMarkV2AltB";
import { RevixirMarkV2AltC } from "./RevixirMarkV2AltC";
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
  | "medx-v2-alt-b"
  | "medx-v2-alt-c"
  | "revixir-v2"
  | "revixir-v2-alt-b"
  | "revixir-v2-alt-c"
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
  "medx-v2-alt-b": MedXMarkV2AltB,
  "medx-v2-alt-c": MedXMarkV2AltC,
  "revixir-v2": RevixirMarkV2,
  "revixir-v2-alt-b": RevixirMarkV2AltB,
  "revixir-v2-alt-c": RevixirMarkV2AltC,
  "supplytech-v2": SupplyTechMarkV2,
  "supplytech-v2-alt": SupplyTechMarkV2Alt,
  "supplytech-v2-alt-b": SupplyTechMarkV2AltB,
  "supplytech-v2-alt-c": SupplyTechMarkV2AltC,
};
