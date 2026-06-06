import { Document, Page, StyleSheet, Text, View, pdf } from "@react-pdf/renderer";
import { NextResponse } from "next/server";
import { sampleResume, defaultTheme } from "@/lib/sample-resume";
import { createClient } from "@/lib/supabase/server";
import type { ResumeData, ResumeTheme } from "@/types/resume";

const styles = StyleSheet.create({
  page: { padding: 42, fontSize: 10, color: "#111827", fontFamily: "Helvetica" },
  header: { marginBottom: 18, borderBottomWidth: 2, borderBottomColor: "#2563eb", paddingBottom: 12 },
  name: { fontSize: 28, fontWeight: 700 },
  title: { marginTop: 4, fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5 },
  contact: { marginTop: 8, color: "#475569" },
  section: { marginBottom: 14 },
  sectionTitle: { marginBottom: 7, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2 },
  item: { marginBottom: 8 },
  itemHeader: { flexDirection: "row", justifyContent: "space-between", gap: 12 },
  itemTitle: { fontSize: 11, fontWeight: 700 },
  muted: { color: "#64748b" },
  bullet: { marginBottom: 3, lineHeight: 1.35 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  chip: { borderWidth: 1, borderColor: "#cbd5e1", borderRadius: 3, paddingHorizontal: 6, paddingVertical: 3 },
});

function ResumePdf({ data, theme }: { data: ResumeData; theme: ResumeTheme }) {
  const contact = [data.personal.email, data.personal.phone, data.personal.location, data.personal.website, data.personal.linkedin].filter(Boolean).join(" · ");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.header, { borderBottomColor: theme.primary }]}>
          <Text style={styles.name}>{data.personal.fullName}</Text>
          <Text style={[styles.title, { color: theme.primary }]}>{data.personal.jobTitle}</Text>
          <Text style={styles.contact}>{contact}</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.primary }]}>Summary</Text>
          <Text>{data.personal.summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.primary }]}>Experience</Text>
          {data.experience.map((job) => (
            <View style={styles.item} key={job.id}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{job.position} · {job.company}</Text>
                <Text style={styles.muted}>{job.startDate} - {job.current ? "Present" : job.endDate}</Text>
              </View>
              {job.bullets.map((bullet) => <Text style={styles.bullet} key={bullet}>• {bullet}</Text>)}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.primary }]}>Education</Text>
          {data.education.map((school) => (
            <View style={styles.item} key={school.id}>
              <Text style={styles.itemTitle}>{school.institution}</Text>
              <Text>{school.degree} {school.field ? `in ${school.field}` : ""}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.primary }]}>Skills</Text>
          <View style={styles.chips}>
            {data.skills.map((skill) => <Text style={styles.chip} key={skill.id}>{skill.name}</Text>)}
          </View>
        </View>
      </Page>
    </Document>
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const resumeId = searchParams.get("resumeId");
  let data = sampleResume;
  let theme = defaultTheme;

  if (resumeId && resumeId !== "new") {
    const supabase = await createClient();
    const { data: resume } = await supabase.from("resumes").select("theme").eq("id", resumeId).maybeSingle<{ theme: ResumeTheme }>();
    const { data: section } = await supabase.from("resume_sections").select("content").eq("resume_id", resumeId).eq("type", "resumeData").maybeSingle<{ content: ResumeData }>();
    data = section?.content ?? sampleResume;
    theme = resume?.theme ?? defaultTheme;
  }

  const file = await pdf(<ResumePdf data={data} theme={theme} />).toBlob();

  return new NextResponse(file, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${data.personal.fullName || "resume"}.pdf"`,
    },
  });
}
