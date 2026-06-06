import { BuilderClient } from "@/components/builder/BuilderClient";

export default async function BuilderPage({ params }: { params: Promise<{ resumeId: string }> }) {
  const { resumeId } = await params;
  return <BuilderClient resumeId={resumeId} />;
}
