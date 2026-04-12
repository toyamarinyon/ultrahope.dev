"use client";

import { Streamdown } from "streamdown";

export function MarkdownRenderer(props: { markdown: string }) {
	return <Streamdown>{props.markdown}</Streamdown>;
}
