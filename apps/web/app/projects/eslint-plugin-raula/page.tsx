import { getProjectMetadata, ProjectPage } from "../ui/project-page";

export const metadata = getProjectMetadata({
	locale: "en",
	slug: "eslint-plugin-raula",
});

export default function Page() {
	return <ProjectPage locale="en" slug="eslint-plugin-raula" />;
}
