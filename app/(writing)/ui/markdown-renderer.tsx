"use client";

import { Streamdown } from "streamdown";

export function MarkdownRenderer(props: {
	markdown: string;
	className?: string;
}) {
	return (
		<Streamdown
			className={props.className}
			components={{
				inlineCode: (inlineCodeProps) => {
					// `node` is Streamdown AST metadata for custom renderers. Keep it out
					// of the DOM or React will serialize it as `node="[object Object]"`.
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					const { children, className, node, ...codeProps } = inlineCodeProps;

					return (
						<code
							{...codeProps}
							className={`rounded-md bg-highlight-low px-1.5 py-0.5 font-medium text-sm leading-6 text-text ${className ?? ""}`}
						>
							{children}
						</code>
					);
				},
			}}
			controls={{ code: { copy: true, download: false } }}
			lineNumbers={false}
		>
			{props.markdown}
		</Streamdown>
	);
}
