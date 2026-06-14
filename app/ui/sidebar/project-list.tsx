import { getProjects } from "@/app/projects/lib/projects";
import { ProjectListClient } from "./project-list-client";

export function ProjectList() {
	return <ProjectListClient projects={getProjects()} />;
}
