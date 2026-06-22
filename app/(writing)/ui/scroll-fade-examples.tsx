"use client";

import { ScrollArea } from "@base-ui/react/scroll-area";
import { type ReactNode, useCallback, useRef } from "react";
import { UltrahopeLogo } from "@/app/ui/ultrahope-logo";
import { scrollFadeExamples } from "../lib/scroll-fade-examples";

const writingItems = [
	"Updates",
	"Start",
	"Install",
	"Config",
	"Nav",
	"Scroll",
	"A11y",
	"Keys",
	"Theme",
	"Release",
	"Migrate",
	"Archive",
];

const projectItems = ["UI", "Demos", "Kits", "Changes", "Roadmap", "Help"];

type ExampleId = (typeof scrollFadeExamples)[number]["id"];
type RegisterScroller = (id: ExampleId, element: HTMLElement | null) => void;
type SyncScroll = (sourceId: ExampleId, source: HTMLElement) => void;

function syncScrollerElements(
	scrollers: Map<ExampleId, HTMLElement>,
	sourceId: ExampleId,
	source: HTMLElement,
) {
	const sourceMaxScrollTop = source.scrollHeight - source.clientHeight;
	const scrollRatio =
		sourceMaxScrollTop > 0 ? source.scrollTop / sourceMaxScrollTop : 0;

	for (const [targetId, target] of scrollers) {
		if (targetId === sourceId) {
			continue;
		}

		const targetMaxScrollTop = target.scrollHeight - target.clientHeight;
		target.scrollTop = scrollRatio * targetMaxScrollTop;
	}
}

export function ScrollFadeExamples() {
	const scrollersRef = useRef(new Map<ExampleId, HTMLElement>());
	const isSyncingRef = useRef(false);
	const registerScroller = useCallback<RegisterScroller>((id, element) => {
		if (element) {
			scrollersRef.current.set(id, element);
			return;
		}

		scrollersRef.current.delete(id);
	}, []);
	const syncScroll: SyncScroll = (sourceId, source) => {
		if (isSyncingRef.current) {
			return;
		}

		if (!window.matchMedia("(min-width: 1024px)").matches) {
			return;
		}

		isSyncingRef.current = true;
		syncScrollerElements(scrollersRef.current, sourceId, source);
		requestAnimationFrame(() => {
			isSyncingRef.current = false;
		});
	};

	return (
		<div className="my-8 grid gap-5 md:-mx-8 lg:-mx-28 xl:-mx-52">
			<div className="grid gap-5 lg:grid-cols-3">
				{scrollFadeExamples.map((example) => (
					<section
						className="grid min-w-0 gap-3 border-highlight-med border-t pt-5 lg:border-t-0 lg:pt-0"
						key={example.id}
					>
						<h3 className="text-center text-muted text-sm">{example.title}</h3>
						<ExamplePreview
							exampleId={example.id}
							onRegisterScroller={registerScroller}
							onSyncScroll={syncScroll}
						/>
						<TraceCodeBlock code={example.code} title={`${example.id}.tsx`} />
					</section>
				))}
			</div>
		</div>
	);
}

function TraceCodeBlock(props: { code: string; title: string }) {
	const lines = props.code.split("\n");

	return (
		<div className="mx-auto h-72 w-full max-w-md min-w-0 overflow-hidden border border-highlight-med bg-overlay lg:max-w-none">
			<div className="flex items-center justify-between border-highlight-med border-b px-3 py-2 text-muted text-xs">
				<span>{props.title}</span>
				<span>tsx</span>
			</div>
			<div className="h-60 overflow-auto">
				<pre className="min-w-max p-0 text-xs leading-relaxed">
					<code className="font-mono">
						{lines.map((line, index) => (
							<span className="flex" key={`${index}-${line}`}>
								<span className="w-10 shrink-0 border-highlight-med border-r pr-3 text-right text-muted">
									{index + 1}
								</span>
								<span className="border-highlight-med border-l px-4">
									{line || " "}
								</span>
							</span>
						))}
					</code>
				</pre>
			</div>
		</div>
	);
}

function ExamplePreview(props: {
	exampleId: ExampleId;
	onRegisterScroller: RegisterScroller;
	onSyncScroll: SyncScroll;
}) {
	const example = scrollFadeExamples.find(
		(item) => item.id === props.exampleId,
	);

	if (props.exampleId === "base-ui") {
		return (
			<BaseUiPreview
				exampleId={props.exampleId}
				onRegisterScroller={props.onRegisterScroller}
				onSyncScroll={props.onSyncScroll}
				path={example?.previewPath ?? "/state-aware-scroll-area"}
			/>
		);
	}

	return (
		<NativePreview
			exampleId={props.exampleId}
			onRegisterScroller={props.onRegisterScroller}
			onSyncScroll={props.onSyncScroll}
			path={example?.previewPath ?? "/plain-overflow"}
		/>
	);
}

function NativePreview(props: {
	exampleId: Exclude<ExampleId, "base-ui">;
	onRegisterScroller: RegisterScroller;
	onSyncScroll: SyncScroll;
	path: string;
}) {
	const { exampleId, onRegisterScroller, onSyncScroll, path } = props;
	const registerScroller = useCallback(
		(element: HTMLDivElement | null) => {
			onRegisterScroller(exampleId, element);
		},
		[exampleId, onRegisterScroller],
	);
	const fadeClassName =
		exampleId === "react-mask"
			? "mask-linear-[to_bottom,transparent_0,black_2.75rem,black_calc(100%-2.75rem),transparent_100%] mask-no-repeat"
			: "";

	return (
		<BrowserPreviewFrame path={path}>
			<PreviewSidebarShell>
				<div
					className={`min-h-0 flex-1 overflow-y-auto px-3 py-3 ${fadeClassName}`}
					onScroll={(event) => {
						onSyncScroll(exampleId, event.currentTarget);
					}}
					ref={registerScroller}
				>
					<PreviewSidebarLinks />
				</div>
			</PreviewSidebarShell>
		</BrowserPreviewFrame>
	);
}

function BaseUiPreview(props: {
	exampleId: Extract<ExampleId, "base-ui">;
	onRegisterScroller: RegisterScroller;
	onSyncScroll: SyncScroll;
	path: string;
}) {
	const { exampleId, onRegisterScroller, onSyncScroll, path } = props;
	const registerScroller = useCallback(
		(element: HTMLDivElement | null) => {
			onRegisterScroller(exampleId, element);
		},
		[exampleId, onRegisterScroller],
	);

	return (
		<BrowserPreviewFrame path={path}>
			<PreviewSidebarShell>
				<ScrollArea.Root className="relative min-h-0 flex-1 overflow-hidden">
					<ScrollArea.Viewport
						className="h-full outline-none mask-linear-[to_bottom,transparent_0,black_min(2.75rem,var(--scroll-area-overflow-y-start)),black_calc(100%-min(2.75rem,var(--scroll-area-overflow-y-end,2.75rem))),transparent_100%] mask-no-repeat"
						onScroll={(event) => {
							onSyncScroll(exampleId, event.currentTarget);
						}}
						ref={registerScroller}
					>
						<ScrollArea.Content className="px-3 py-3">
							<PreviewSidebarLinks />
						</ScrollArea.Content>
					</ScrollArea.Viewport>
					<ScrollArea.Scrollbar className="flex w-2 justify-center py-2 opacity-0 transition-opacity data-hovering:opacity-100 data-scrolling:opacity-100">
						<ScrollArea.Thumb className="w-1 rounded-full bg-highlight-high" />
					</ScrollArea.Scrollbar>
				</ScrollArea.Root>
			</PreviewSidebarShell>
		</BrowserPreviewFrame>
	);
}

function BrowserPreviewFrame(props: { children: ReactNode; path: string }) {
	return (
		<div className="mx-auto h-64 w-full max-w-md min-w-0 overflow-hidden rounded-md border border-highlight-med bg-overlay lg:h-72 lg:max-w-none">
			<div className="flex h-8 items-center gap-1.5 border-highlight-med border-b px-3">
				<span className="size-2 rounded-full bg-muted" />
				<span className="size-2 rounded-full bg-muted" />
				<span className="size-2 rounded-full bg-muted" />
				<div
					aria-label="Preview path"
					className="ml-1.5 min-w-0 flex-1 rounded-sm border border-highlight-med bg-base px-2 py-0.5 text-muted text-xs"
				>
					{props.path}
				</div>
			</div>
			{props.children}
		</div>
	);
}

function PreviewSidebarShell(props: { children: ReactNode }) {
	return (
		<div className="flex h-56 bg-surface lg:h-64">
			<div className="flex w-24 shrink-0 flex-col border-highlight-med border-r lg:w-28">
				<div className="shrink-0 px-2.5 py-2 lg:px-3">
					<UltrahopeLogo className="size-4 text-rose" />
				</div>
				{props.children}
				<div className="shrink-0 px-2.5 py-2 text-muted text-xs lg:px-3 lg:text-sm">
					Account
				</div>
			</div>
			<div className="min-w-0 flex-1 bg-highlight-low p-2.5 lg:p-3">
				<div className="grid gap-2 lg:gap-3">
					<div className="h-3 w-20 rounded-sm bg-highlight-med lg:h-4 lg:w-28" />
					<div className="grid gap-1.5 lg:gap-2">
						<div className="h-2 rounded-sm bg-highlight-low" />
						<div className="h-2 w-5/6 rounded-sm bg-highlight-low" />
						<div className="h-2 w-2/3 rounded-sm bg-highlight-low" />
					</div>
					<div className="mt-1 grid grid-cols-2 gap-2 lg:mt-2">
						<div className="h-9 rounded-sm border border-highlight-med bg-surface lg:h-14" />
						<div className="h-9 rounded-sm border border-highlight-med bg-surface lg:h-14" />
					</div>
					<div className="mt-1 h-10 rounded-sm border border-highlight-med bg-surface lg:h-16" />
				</div>
			</div>
		</div>
	);
}

function PreviewSidebarLinks() {
	return (
		<div className="grid gap-3 text-xs lg:gap-4 lg:text-sm">
			<div className="grid gap-1 lg:gap-1.5">
				<p className="m-0 text-muted text-xs">Menu</p>
				{writingItems.map((item) => (
					<p className="m-0 truncate" key={item}>
						{item}
					</p>
				))}
			</div>
			<div className="grid gap-1 lg:gap-1.5">
				<p className="m-0 text-muted text-xs">More</p>
				{projectItems.map((item) => (
					<p className="m-0 truncate" key={item}>
						{item}
					</p>
				))}
			</div>
		</div>
	);
}
