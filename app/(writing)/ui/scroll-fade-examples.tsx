"use client";

import { ScrollArea } from "@base-ui/react/scroll-area";
import { type ReactNode, useState } from "react";
import { scrollFadeExamples } from "../lib/scroll-fade-examples";

const previewItems = [
	"Sidebar grows quietly.",
	"Writing list keeps expanding.",
	"Project links still matter.",
	"Footer controls should stay reachable.",
	"Overflow needs its own boundary.",
	"Fade hints at hidden content.",
	"Top fade should disappear at the start.",
	"Bottom fade should disappear at the end.",
	"Scroll state can be a design input.",
	"Base UI exposes that state.",
	"Small UI details become easier to maintain.",
	"Done carefully, the edge feels less abrupt.",
];

type ContentMode = "preview" | "code" | "both";
type LayoutMode = "row" | "stack";
type CodeStyleMode = "trace" | "file" | "panel";

const contentModes: { label: string; value: ContentMode }[] = [
	{ label: "Preview", value: "preview" },
	{ label: "Code", value: "code" },
	{ label: "Both", value: "both" },
];

const layoutModes: { label: string; value: LayoutMode }[] = [
	{ label: "Row", value: "row" },
	{ label: "Stack", value: "stack" },
];

const codeStyleModes: { label: string; value: CodeStyleMode }[] = [
	{ label: "Trace", value: "trace" },
	{ label: "File", value: "file" },
	{ label: "Panel", value: "panel" },
];

export function ScrollFadeExamples() {
	const [contentMode, setContentMode] = useState<ContentMode>("both");
	const [layoutMode, setLayoutMode] = useState<LayoutMode>("row");
	const [codeStyleMode, setCodeStyleMode] = useState<CodeStyleMode>("trace");
	const gridClassName =
		layoutMode === "row" ? "lg:grid-cols-3" : "lg:grid-cols-1";

	return (
		<div className="my-8 grid gap-5 md:-mx-8 lg:-mx-24 xl:-mx-40">
			<div className="flex flex-wrap items-center justify-between gap-3 border-highlight-med border-b pb-3">
				<SegmentedControl
					label="Display"
					onChange={setContentMode}
					options={contentModes}
					value={contentMode}
				/>
				<SegmentedControl
					label="Layout"
					onChange={setLayoutMode}
					options={layoutModes}
					value={layoutMode}
				/>
				<SegmentedControl
					label="Code"
					onChange={setCodeStyleMode}
					options={codeStyleModes}
					value={codeStyleMode}
				/>
			</div>
			<div className={`grid gap-5 ${gridClassName}`}>
				{scrollFadeExamples.map((example) => (
					<section
						className="grid min-w-0 gap-3 border-highlight-med border-t pt-5"
						key={example.id}
					>
						<h3 className="text-lg">{example.title}</h3>
						{contentMode === "preview" || contentMode === "both" ? (
							<ExamplePreview exampleId={example.id} />
						) : null}
						{contentMode === "code" || contentMode === "both" ? (
							<CodeBlock
								code={example.code}
								styleMode={codeStyleMode}
								title={`${example.id}.tsx`}
							/>
						) : null}
					</section>
				))}
			</div>
		</div>
	);
}

function CodeBlock(props: {
	code: string;
	styleMode: CodeStyleMode;
	title: string;
}) {
	if (props.styleMode === "file") {
		return <FileCodeBlock code={props.code} title={props.title} />;
	}

	if (props.styleMode === "panel") {
		return <PanelCodeBlock code={props.code} title={props.title} />;
	}

	return <TraceCodeBlock code={props.code} title={props.title} />;
}

function TraceCodeBlock(props: { code: string; title: string }) {
	const lines = props.code.split("\n");

	return (
		<div className="h-72 min-w-0 overflow-hidden border border-highlight-med bg-overlay">
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

function FileCodeBlock(props: { code: string; title: string }) {
	return (
		<div className="h-72 min-w-0 overflow-hidden border border-highlight-med bg-surface">
			<div className="flex items-center gap-2 border-highlight-med border-b px-3 py-2 text-subtle text-xs">
				<span className="size-2 bg-love" />
				<span className="size-2 bg-gold" />
				<span className="size-2 bg-rose" />
				<span className="ml-2 truncate">{props.title}</span>
			</div>
			<pre className="h-60 min-w-0 overflow-auto p-4 text-xs leading-relaxed">
				<code className="font-mono">{props.code}</code>
			</pre>
		</div>
	);
}

function PanelCodeBlock(props: { code: string; title: string }) {
	return (
		<div className="h-72 min-w-0 border border-highlight-med bg-overlay p-3">
			<div className="mb-3 flex items-center justify-between text-muted text-xs">
				<span>{props.title}</span>
				<span>example</span>
			</div>
			<pre className="h-58 min-w-0 overflow-auto bg-highlight-low p-3 text-xs leading-relaxed">
				<code className="font-mono">{props.code}</code>
			</pre>
		</div>
	);
}

function SegmentedControl<T extends string>(props: {
	label: string;
	onChange: (value: T) => void;
	options: { label: string; value: T }[];
	value: T;
}) {
	return (
		<div className="flex items-center gap-2 text-sm">
			<span className="text-muted">{props.label}</span>
			<div className="flex overflow-hidden border border-highlight-med">
				{props.options.map((option) => {
					const isSelected = option.value === props.value;
					return (
						<button
							aria-pressed={isSelected}
							className={`px-3 py-1.5 transition-colors ${
								isSelected
									? "bg-highlight-med text-text"
									: "text-subtle hover:bg-highlight-low hover:text-text"
							}`}
							key={option.value}
							onClick={() => props.onChange(option.value)}
							type="button"
						>
							{option.label}
						</button>
					);
				})}
			</div>
		</div>
	);
}

function ExamplePreview(props: {
	exampleId: (typeof scrollFadeExamples)[number]["id"];
}) {
	const example = scrollFadeExamples.find(
		(item) => item.id === props.exampleId,
	);

	if (props.exampleId === "base-ui") {
		return (
			<BaseUiPreview path={example?.previewPath ?? "/base-ui-scroll-area"} />
		);
	}

	const fadeClassName =
		props.exampleId === "react-mask"
			? "mask-linear-[to_bottom,transparent_0,black_1.5rem,black_calc(100%-1.5rem),transparent_100%] mask-no-repeat"
			: "";

	return (
		<BrowserPreviewFrame path={example?.previewPath ?? "/plain-overflow"}>
			<div className={`h-44 overflow-y-auto bg-surface p-4 ${fadeClassName}`}>
				<PreviewItems />
			</div>
		</BrowserPreviewFrame>
	);
}

function BaseUiPreview(props: { path: string }) {
	return (
		<BrowserPreviewFrame path={props.path}>
			<ScrollArea.Root className="relative h-44 overflow-hidden bg-surface">
				<ScrollArea.Viewport className="h-full outline-none mask-linear-[to_bottom,transparent_0,black_min(1.5rem,var(--scroll-area-overflow-y-start)),black_calc(100%-min(1.5rem,var(--scroll-area-overflow-y-end,1.5rem))),transparent_100%] mask-no-repeat">
					<ScrollArea.Content className="p-4">
						<PreviewItems />
					</ScrollArea.Content>
				</ScrollArea.Viewport>
				<ScrollArea.Scrollbar className="flex w-2 justify-center py-2 opacity-0 transition-opacity data-hovering:opacity-100 data-scrolling:opacity-100">
					<ScrollArea.Thumb className="w-1 rounded-full bg-highlight-high" />
				</ScrollArea.Scrollbar>
			</ScrollArea.Root>
		</BrowserPreviewFrame>
	);
}

function BrowserPreviewFrame(props: { children: ReactNode; path: string }) {
	return (
		<div className="h-52 min-w-0 overflow-hidden rounded-md border border-highlight-med bg-overlay">
			<div className="flex h-8 items-center gap-2 border-highlight-med border-b px-3">
				<span className="size-2 rounded-full bg-love" />
				<span className="size-2 rounded-full bg-gold" />
				<span className="size-2 rounded-full bg-green-500" />
				<div
					aria-label="Preview path"
					className="ml-1 min-w-0 flex-1 rounded-sm border border-highlight-med bg-base px-2 py-0.5 text-muted text-xs"
				>
					{props.path}
				</div>
			</div>
			{props.children}
		</div>
	);
}

function PreviewItems() {
	return (
		<div className="grid gap-3 text-sm">
			{previewItems.map((item) => (
				<p className="m-0" key={item}>
					{item}
				</p>
			))}
		</div>
	);
}
