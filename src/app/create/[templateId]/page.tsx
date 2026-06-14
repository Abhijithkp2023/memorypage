import { notFound } from "next/navigation";
import { getTemplateConfig } from "@/templates/registry";
import CreateFlow from "./CreateFlow";
import Navbar from "@/components/Navbar";

interface Props {
  params: Promise<{ templateId: string }>;
}

export default async function CreatePage({ params }: Props) {
  const { templateId } = await params;
  const template = getTemplateConfig(templateId);
  if (!template) notFound();

  const devMode = !process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID.startsWith("rzp_test_your");

  return (
    <>
      <Navbar />
      <CreateFlow template={template} devMode={devMode} />
    </>
  );
}
