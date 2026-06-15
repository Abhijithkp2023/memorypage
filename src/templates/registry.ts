import type { TemplateConfig } from "@/types";
import { config as weddingClassicConfig } from "./wedding-classic/config";
import { config as birthdayModernConfig } from "./birthday-modern/config";
import { config as engagementBloomConfig } from "./engagement-bloom/config";

export const TEMPLATES: TemplateConfig[] = [
  weddingClassicConfig,
  birthdayModernConfig,
  engagementBloomConfig,
];

export function getTemplateConfig(slug: string): TemplateConfig | undefined {
  return TEMPLATES.find((t) => t.id === slug);
}
