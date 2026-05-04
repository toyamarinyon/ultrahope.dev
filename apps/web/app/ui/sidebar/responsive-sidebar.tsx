import { FooterControls } from "./footer-controls";
import { HomeLink } from "./home-link";
import { MobileSidebarShell } from "./mobile-sidebar-shell";
import { ProjectList } from "./project-list";
import { WritingList } from "./writing-list";

function SidebarContent(props: { showHomeLink: boolean }) {
	return (
		<>
			<div className="min-h-0 flex-1">
				{props.showHomeLink ? (
					<section className="mb-8 flex h-14.5 items-center pl-2">
						<HomeLink />
					</section>
				) : null}

				<div className="grid gap-6">
					<WritingList />
					<ProjectList />
				</div>
			</div>

			<FooterControls />
		</>
	);
}

export function ResponsiveSidebar() {
	return (
		<>
			<MobileSidebarShell content={<SidebarContent showHomeLink={false} />} />

			<aside className="fixed top-0 bottom-0 hidden w-60 flex-col border-highlight-med border-r bg-surface p-2 md:flex">
				<SidebarContent showHomeLink />
			</aside>
		</>
	);
}
