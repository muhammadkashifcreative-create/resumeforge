import type { ResumeData, ResumeTheme, TemplateProps } from "@/types/resume";

export type TemplateLayout = "sidebar-left" | "sidebar-right" | "single" | "timeline" | "cards" | "split" | "magazine";
export type HeaderVariant = "serif" | "centered" | "bordered" | "band" | "academic" | "gradient" | "display" | "dark" | "diagonal" | "minimal";

export interface TemplateVariant {
  layout: TemplateLayout;
  header: HeaderVariant;
  font: string;
  accent: "left-bar" | "top-line" | "chips" | "progress" | "dots" | "none";
  sectionOrder?: ResumeData["sectionOrder"];
  density?: "compact" | "normal" | "spacious";
}

const levelWidth = {
  Beginner: "35%",
  Intermediate: "58%",
  Advanced: "78%",
  Expert: "96%",
};

const sectionTitle = (title: string, variant: TemplateVariant, theme: ResumeTheme) => (
  <h2
    className="mb-3 text-[11px] font-black uppercase tracking-[0.18em]"
    style={{
      color: variant.header === "minimal" ? "#9ca3af" : theme.primary,
      borderBottom: variant.header === "bordered" ? `2px solid ${theme.primary}` : undefined,
      paddingBottom: variant.header === "bordered" ? 5 : undefined,
    }}
  >
    {title}
  </h2>
);

function Contact({ data }: { data: ResumeData }) {
  const items = [
    data.personal.email,
    data.personal.phone,
    data.personal.location,
    data.personal.website,
    data.personal.linkedin,
    data.personal.github,
  ].filter(Boolean);

  return (
    <div className="space-y-1 text-[11px] leading-5">
      {items.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </div>
  );
}

function Skills({ data, theme, variant }: TemplateProps & { variant: TemplateVariant }) {
  return (
    <section>
      {sectionTitle("Skills", variant, theme)}
      <div className={variant.accent === "chips" ? "flex flex-wrap gap-1.5" : "space-y-2"}>
        {data.skills.map((skill) => (
          <div key={skill.id}>
            <div
              className={variant.accent === "chips" ? "rounded-full px-2 py-1 text-[10px] font-semibold" : "text-[11px] font-semibold"}
              style={variant.accent === "chips" ? { backgroundColor: `${theme.primary}18`, color: theme.secondary } : undefined}
            >
              {skill.name}
            </div>
            {variant.accent === "progress" ? (
              <div className="mt-1 h-1.5 rounded bg-gray-200">
                <div className="h-1.5 rounded" style={{ width: levelWidth[skill.level], backgroundColor: theme.primary }} />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function Experience({ data, theme, variant }: TemplateProps & { variant: TemplateVariant }) {
  return (
    <section>
      {sectionTitle("Experience", variant, theme)}
      <div className="space-y-4">
        {data.experience.map((job) => (
          <article
            key={job.id}
            className={variant.layout === "timeline" ? "relative border-l pl-5" : variant.layout === "cards" ? "rounded-md border p-3" : ""}
            style={variant.layout === "timeline" ? { borderColor: `${theme.primary}55` } : undefined}
          >
            {variant.layout === "timeline" ? (
              <span className="absolute -left-[5px] top-1 size-2.5 rounded-full" style={{ backgroundColor: theme.primary }} />
            ) : null}
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-sm font-black">{job.position}</h3>
              <span className="text-[10px] uppercase text-gray-500">
                {job.startDate} - {job.current ? "Present" : job.endDate}
              </span>
            </div>
            <p className="text-[12px] font-semibold" style={{ color: theme.primary }}>
              {job.company} · {job.location}
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-[11px] leading-5 text-gray-700">
              {job.bullets.filter(Boolean).map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Education({ data, theme, variant }: TemplateProps & { variant: TemplateVariant }) {
  return (
    <section>
      {sectionTitle("Education", variant, theme)}
      <div className="space-y-3">
        {data.education.map((school) => (
          <article key={school.id}>
            <div className="flex justify-between gap-2">
              <h3 className="text-sm font-bold">{school.institution}</h3>
              <span className="text-[10px] text-gray-500">
                {school.startDate} - {school.endDate}
              </span>
            </div>
            <p className="text-[11px] text-gray-700">
              {school.degree} {school.field ? `in ${school.field}` : ""} {school.gpa ? `· GPA ${school.gpa}` : ""}
            </p>
            {school.achievements.length ? <p className="text-[10px] text-gray-500">{school.achievements.join(" · ")}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function Projects({ data, theme, variant }: TemplateProps & { variant: TemplateVariant }) {
  return (
    <section>
      {sectionTitle("Projects", variant, theme)}
      <div className="space-y-3">
        {data.projects.map((project) => (
          <article key={project.id}>
            <h3 className="text-sm font-bold">{project.name}</h3>
            <p className="text-[11px] leading-5 text-gray-700">{project.description}</p>
            <p className="mt-1 text-[10px] font-semibold" style={{ color: theme.primary }}>
              {project.technologies.join(" · ")}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function CompactLists({ data, theme, variant }: TemplateProps & { variant: TemplateVariant }) {
  return (
    <div className="grid grid-cols-2 gap-5">
      <section>
        {sectionTitle("Certifications", variant, theme)}
        {data.certifications.map((cert) => (
          <p className="mb-2 text-[11px]" key={cert.id}>
            <strong>{cert.name}</strong>
            <br />
            <span className="text-gray-500">{cert.issuer} · {cert.date}</span>
          </p>
        ))}
      </section>
      <section>
        {sectionTitle("Languages", variant, theme)}
        {data.languages.map((language) => (
          <p className="mb-1 text-[11px]" key={language.id}>
            {language.language} · <span className="text-gray-500">{language.proficiency}</span>
          </p>
        ))}
      </section>
    </div>
  );
}

function Header({ data, theme, variant }: TemplateProps & { variant: TemplateVariant }) {
  const base = "relative overflow-hidden";
  const contactLine = [data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).join("  ·  ");
  if (variant.header === "band" || variant.header === "gradient" || variant.header === "dark" || variant.header === "diagonal") {
    return (
      <header
        className={`${base} p-8 text-white`}
        style={{
          background:
            variant.header === "gradient"
              ? `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`
              : variant.header === "dark"
                ? "#1a1a2e"
                : theme.primary,
        }}
      >
        {variant.header === "diagonal" ? <div className="absolute -right-16 -top-16 size-44 rotate-45 bg-white/15" /> : null}
        <h1 className="text-4xl font-black leading-none">{data.personal.fullName}</h1>
        <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">{data.personal.jobTitle}</p>
        <p className="mt-4 max-w-xl text-[11px] font-medium leading-5 text-white/75">{contactLine}</p>
      </header>
    );
  }

  return (
    <header className={variant.header === "centered" ? "p-8 text-center" : "p-8"}>
      <h1
        className={variant.header === "display" ? "text-5xl font-black leading-none" : "text-4xl font-black leading-tight"}
        style={{ fontFamily: variant.header === "serif" || variant.header === "academic" ? "Georgia, serif" : undefined }}
      >
        {data.personal.fullName}
      </h1>
      <p className="mt-1 text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: theme.primary }}>
        {data.personal.jobTitle}
      </p>
      <p className={`mt-3 text-[11px] leading-5 text-gray-500 ${variant.header === "centered" ? "mx-auto max-w-2xl" : ""}`}>{contactLine}</p>
      {variant.header === "minimal" ? <div className="mt-5 h-px" style={{ backgroundColor: theme.primary }} /> : null}
    </header>
  );
}

function MainSections(props: TemplateProps & { variant: TemplateVariant }) {
  const { data, theme, variant } = props;
  const order = variant.sectionOrder ?? data.sectionOrder;

  return (
    <div className="space-y-5">
      {order.map((section) => {
        if (!data.visibleSections[section]) {
          return null;
        }
        if (section === "experience") return <Experience key={section} data={data} theme={theme} variant={variant} />;
        if (section === "education") return <Education key={section} data={data} theme={theme} variant={variant} />;
        if (section === "skills") return <Skills key={section} data={data} theme={theme} variant={variant} />;
        if (section === "projects") return <Projects key={section} data={data} theme={theme} variant={variant} />;
        if (section === "certifications" || section === "languages") return null;
        if (section === "custom") {
          return data.customSections.map((custom) => (
            <section key={custom.id}>
              {sectionTitle(custom.title, variant, theme)}
              <p className="text-[11px] leading-5 text-gray-700">{custom.content}</p>
            </section>
          ));
        }
        return null;
      })}
      <CompactLists data={data} theme={theme} variant={variant} />
    </div>
  );
}

export function TemplateFrame({ data, theme, variant }: TemplateProps & { variant: TemplateVariant }) {
  const fontSize = theme.fontSize === "Compact" ? "text-[12px]" : theme.fontSize === "Large" ? "text-[14px]" : "text-[13px]";
  const padding = variant.density === "compact" || theme.spacing === "Tight" ? "p-5" : variant.density === "spacious" || theme.spacing === "Airy" ? "p-9" : "p-7";
  const style = { fontFamily: theme.font || variant.font };

  if (variant.layout === "sidebar-left" || variant.layout === "sidebar-right") {
    const sidebar = (
      <aside className={`${padding} text-white`} style={{ background: `linear-gradient(160deg, ${theme.primary}, ${theme.secondary})` }}>
        <div className="mb-5 grid size-20 place-items-center rounded-full bg-white/20 text-2xl font-black">
          {data.personal.fullName.split(" ").map((part) => part[0]).join("").slice(0, 2)}
        </div>
        <Contact data={data} />
        <div className="mt-6">
          <Skills data={data} theme={{ ...theme, primary: "#ffffff" }} variant={{ ...variant, accent: "progress" }} />
        </div>
      </aside>
    );
    const main = (
      <main className={`${padding} bg-white`}>
        <Header data={data} theme={theme} variant={{ ...variant, header: "minimal" }} />
        <p className="mb-6 text-[11px] leading-5 text-gray-700">{data.personal.summary}</p>
        <MainSections data={data} theme={theme} variant={variant} />
      </main>
    );
    return (
      <article className={`${fontSize} grid min-h-[1056px] grid-cols-[240px_1fr] overflow-hidden bg-white text-gray-950 shadow-2xl`} style={style}>
        {variant.layout === "sidebar-left" ? sidebar : main}
        {variant.layout === "sidebar-left" ? main : sidebar}
      </article>
    );
  }

  return (
    <article className={`${fontSize} min-h-[1056px] overflow-hidden bg-white text-gray-950 shadow-2xl`} style={style}>
      <Header data={data} theme={theme} variant={variant} />
      <main className={padding}>
        <div className={variant.layout === "split" || variant.layout === "magazine" ? "grid grid-cols-[1.45fr_0.75fr] gap-8" : ""}>
          <div>
            <p className="mb-6 text-[12px] leading-6 text-gray-700">{data.personal.summary}</p>
            <MainSections data={data} theme={theme} variant={variant} />
          </div>
          {variant.layout === "split" || variant.layout === "magazine" ? (
            <aside className="space-y-5">
              <Contact data={data} />
              <Skills data={data} theme={theme} variant={{ ...variant, accent: "chips" }} />
            </aside>
          ) : null}
        </div>
      </main>
    </article>
  );
}
