import type { TemplateConfig } from "@/types";
import { config as weddingClassicConfig } from "./wedding-classic/config";

export const TEMPLATES: TemplateConfig[] = [
  weddingClassicConfig,
];

export function getTemplateConfig(slug: string): TemplateConfig | undefined {
  return TEMPLATES.find((t) => t.id === slug);
}
