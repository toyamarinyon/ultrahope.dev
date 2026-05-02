import {
	getProjectMetadata,
	ProjectPage,
} from "../../../projects/ui/project-page";

export const metadata = getProjectMetadata({
	locale: "ja",
	slug: "halo",
});

export default function Page() {
	return (
		<ProjectPage
			locale="ja"
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
