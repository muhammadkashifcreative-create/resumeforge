import { TemplateFrame, type TemplateVariant } from "@/components/templates/TemplateFrame";
import type { TemplateProps } from "@/types/resume";

export function createTemplateComponent(variant: TemplateVariant) {
  function GeneratedTemplate(props: TemplateProps) {
    return <TemplateFrame {...props} variant={variant} />;
  }

  return GeneratedTemplate;
}
