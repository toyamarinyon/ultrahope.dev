import { getProjectMetadata, ProjectPage } from "../ui/project-page";

export const metadata = getProjectMetadata({
	locale: "en",
	slug: "enka",
});

export default function Page() {
	return <ProjectPage locale="en" slug="enka" />;
}
