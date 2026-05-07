"use client";

import { code } from "@streamdown/code";
import { Streamdown } from "streamdown";

export function MarkdownRenderer(props: {
	markdown: string;
	className?: string;
}) {
	return (
		<Streamdown
			className={props.className}
			controls={{ code: { copy: true, download: false } }}
			lineNumbers={false}
			plugins={{ code }}
		>
			{props.markdown}
		</Streamdown>
	);
}
