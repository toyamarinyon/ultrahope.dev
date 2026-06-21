"use client";

import { ScrollArea } from "@base-ui/react/scroll-area";
import { useState } from "react";
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

const contentModes: { label: string; value: ContentMode }[] = [
	{ label: "Preview", value: "preview" },
	{ label: "Code", value: "code" },
	{ label: "Both", value: "both" },
];

const layoutModes: { label: string; value: LayoutMode }[] = [
	{ label: "Row", value: "row" },
	{ label: "Stack", value: "stack" },
];

export function ScrollFadeExamples() {
	const [contentMode, setContentMode] = useState<ContentMode>("both");
	const [layoutMode, setLayoutMode] = useState<LayoutMode>("row");
	const gridClassName =
		layoutMode === "row" ? "lg:grid-cols-3" : "lg:grid-cols-1";

	return (
		<div className="my-8 grid gap-5 md:-mx-8 lg:-mx-16 xl:-mx-28">
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
							<pre className="h-72 min-w-0 max-w-full overflow-auto border border-highlight-med bg-overlay p-4 text-sm leading-relaxed">
								<code>{example.code}</code>
							</pre>
						) : null}
					</section>
				))}
			</div>
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
	if (props.exampleId === "base-ui") {
		return <BaseUiPreview />;
	}

	const fadeClassName =
		props.exampleId === "react-mask"
			? "mask-linear-[to_bottom,transparent_0,black_1.5rem,black_calc(100%-1.5rem),transparent_100%] mask-no-repeat"
			: "";

	return (
		<div
			className={`h-52 overflow-y-auto border border-highlight-med bg-surface p-4 ${fadeClassName}`}
		>
			<PreviewItems />
		</div>
	);
}

function BaseUiPreview() {
	return (
		<ScrollArea.Root className="relative h-52 overflow-hidden border border-highlight-med bg-surface">
			<ScrollArea.Viewport className="h-full outline-none mask-linear-[to_bottom,transparent_0,black_min(1.5rem,var(--scroll-area-overflow-y-start)),black_calc(100%-min(1.5rem,var(--scroll-area-overflow-y-end,1.5rem))),transparent_100%] mask-no-repeat">
				<ScrollArea.Content className="p-4">
					<PreviewItems />
				</ScrollArea.Content>
			</ScrollArea.Viewport>
			<ScrollArea.Scrollbar className="flex w-2 justify-center py-2 opacity-0 transition-opacity data-hovering:opacity-100 data-scrolling:opacity-100">
				<ScrollArea.Thumb className="w-1 rounded-full bg-highlight-high" />
			</ScrollArea.Scrollbar>
		</ScrollArea.Root>
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
