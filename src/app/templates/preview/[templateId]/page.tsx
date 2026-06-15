import { notFound } from "next/navigation";
import { getTemplateConfig } from "@/templates/registry";
import PreviewClient from "./PreviewClient";

export default async function TemplatePreviewPage({
  params,
}: {
  params: Promise<{ templateId: string }>;
}) {
  const { templateId } = await params;
  const template = getTemplateConfig(templateId);
  if (!template) notFound();

  return <PreviewClient template={template} />;
}
