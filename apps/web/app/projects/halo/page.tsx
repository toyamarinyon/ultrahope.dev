import { getProjectMetadata, ProjectPage } from "../ui/project-page";

export const metadata = getProjectMetadata({
	locale: "en",
	slug: "halo",
});

export default function Page() {
	return (
		<ProjectPage
			locale="en"
			slug="halo"
			heroMedia={{
				src: "/projects/halo/demo.gif",
				alt: "Halo demo animation",
				width: 589,
				height: 683,
				type: "gif",
			}}
		/>
	);
}
