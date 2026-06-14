import {
	getProjectMetadata,
	ProjectPage,
} from "../../../projects/ui/project-page";

export const metadata = getProjectMetadata({
	locale: "ja",
	slug: "enka",
});

export default function Page() {
	return <ProjectPage locale="ja" slug="enka" />;
}
