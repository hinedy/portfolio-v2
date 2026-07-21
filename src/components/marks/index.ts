import type { ReactElement } from "react";
import { MedXMarkAlt } from "./MedXMarkAlt";
import { RevixirMarkAlt } from "./RevixirMarkAlt";
import { SupplyTechMarkAlt } from "./SupplyTechMarkAlt";

export type MarkKey = "medx-alt" | "revixir-alt" | "supplytech-alt";

export const MARKS: Record<MarkKey, (props: { className?: string }) => ReactElement> = {
  "medx-alt": MedXMarkAlt,
  "revixir-alt": RevixirMarkAlt,
  "supplytech-alt": SupplyTechMarkAlt,
};
