import { ScrollArea } from "@base-ui/react/scroll-area";
import { BaselineLink } from "./baseline-link";
import { FooterControls } from "./footer-controls";
import { HomeLink } from "./home-link";
import { MobileSidebarShell } from "./mobile-sidebar-shell";
import { ProjectList } from "./project-list";
import { WritingList } from "./writing-list";

function SidebarContent(props: { showHomeLink: boolean }) {
	return (
		<>
			<div className="shrink-0">
				{props.showHomeLink ? (
					<section className="mb-8 flex h-14.5 items-center pl-2">
						<HomeLink />
					</section>
				) : null}

				<BaselineLink />
			</div>

			<ScrollArea.Root className="relative min-h-0 flex-1 overflow-hidden">
				<ScrollArea.Viewport className="h-full outline-none mask-linear-[to_bottom,transparent_0,black_min(1.5rem,var(--scroll-area-overflow-y-start)),black_calc(100%-min(1.5rem,var(--scroll-area-overflow-y-end,1.5rem))),transparent_100%] mask-no-repeat">
					<ScrollArea.Content className="grid gap-6 py-4 pr-3">
						<WritingList />
						<ProjectList />
					</ScrollArea.Content>
				</ScrollArea.Viewport>
				<ScrollArea.Scrollbar className="flex w-2 justify-center py-4 opacity-0 transition-opacity duration-150 data-hovering:opacity-100 data-scrolling:opacity-100">
					<ScrollArea.Thumb className="w-1 rounded-full bg-highlight-high" />
				</ScrollArea.Scrollbar>
			</ScrollArea.Root>

			<div className="shrink-0">
				<FooterControls />
			</div>
		</>
	);
}

export function ResponsiveSidebar() {
	return (
		<>
			<MobileSidebarShell content={<SidebarContent showHomeLink={false} />} />

			<aside className="fixed top-0 bottom-0 hidden w-72 flex-col border-highlight-med border-r bg-surface p-2 md:flex">
				<SidebarContent showHomeLink />
			</aside>
		</>
	);
}
