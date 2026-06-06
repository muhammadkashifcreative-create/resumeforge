import { LoginClient } from "@/app/login/LoginClient";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ returnTo?: string }> }) {
  const params = await searchParams;
  return <LoginClient returnTo={params.returnTo ?? "/builder/new"} />;
}
