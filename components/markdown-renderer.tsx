"use client";

import { Streamdown } from "streamdown";

export function MarkdownRenderer(props: {
	markdown: string;
	className?: string;
}) {
	return <Streamdown className={props.className}>{props.markdown}</Streamdown>;
}
