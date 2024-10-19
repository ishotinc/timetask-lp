import { Project } from "@/app/_components/templates/project";

export default function Page({ params }: { params: { projectid: string } }) {
  return <Project projectId={params.projectid} />;
}
