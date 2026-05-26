"use client";

import { code } from "@streamdown/code";
import {
	Children,
	isValidElement,
	type ComponentProps,
	type ReactNode,
} from "react";
import { Streamdown } from "streamdown";

type MarkdownAnchorProps = ComponentProps<"a"> & {
	node?: { tagName?: string };
};

type MarkdownParagraphProps = ComponentProps<"p"> & {
	node?: { tagName?: string };
};

export function MarkdownRenderer(props: {
	markdown: string;
	className?: string;
}) {
	return (
		<Streamdown
			className={props.className}
			components={{ a: MarkdownLink, p: MarkdownParagraph }}
			controls={{ code: { copy: true, download: false } }}
			lineNumbers={false}
			plugins={{ code }}
		>
			{props.markdown}
		</Streamdown>
	);
}

function MarkdownParagraph({ children, node, ...props }: MarkdownParagraphProps) {
	void node;
	const singleChild = getOnlyChild(children);
	const linkProps = getAnchorProps(singleChild);
	const href = linkProps?.href;
	const title = getTextContent(linkProps?.children);
	const youtubeId = getYouTubeVideoId(href);

	if (youtubeId && title === href) {
		return <YouTubeEmbed videoId={youtubeId} title={title} />;
	}

	return <p {...props}>{children}</p>;
}

function MarkdownLink({ node, ...props }: MarkdownAnchorProps) {
	void node;
	return <a {...props} />;
}

function YouTubeEmbed(props: { videoId: string; title?: string }) {
	return (
		<figure className="my-8">
			<div className="aspect-video overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
				<iframe
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowFullScreen
					className="h-full w-full"
					loading="lazy"
					referrerPolicy="strict-origin-when-cross-origin"
					src={`https://www.youtube-nocookie.com/embed/${props.videoId}`}
					title={props.title || "YouTube video"}
				/>
			</div>
		</figure>
	);
}

function getYouTubeVideoId(href: ComponentProps<"a">["href"]) {
	if (!href) {
		return null;
	}

	try {
		const url = new URL(href);
		const hostname = url.hostname.replace(/^www\./, "");

		if (hostname === "youtube.com" || hostname === "m.youtube.com") {
			const videoId = url.searchParams.get("v");
			return isValidYouTubeVideoId(videoId) ? videoId : null;
		}

		if (hostname === "youtu.be") {
			const videoId = url.pathname.split("/").filter(Boolean)[0];
			return isValidYouTubeVideoId(videoId) ? videoId : null;
		}
	} catch {
		return null;
	}

	return null;
}

function isValidYouTubeVideoId(videoId: string | null | undefined) {
	return Boolean(videoId && /^[\w-]{11}$/.test(videoId));
}

function getTextContent(children: ComponentProps<"a">["children"]) {
	if (typeof children === "string") {
		return children;
	}

	return undefined;
}

function getOnlyChild(children: ReactNode) {
	const childNodes = Children.toArray(children);
	return childNodes.length === 1 ? childNodes[0] : undefined;
}

function getAnchorProps(node: ReactNode) {
	if (!isValidElement<{
		children?: ReactNode;
		href?: string;
		node?: { tagName?: string };
	}>(node)) {
		return undefined;
	}

	if (node.props.node?.tagName !== "a" || !node.props.href) {
		return undefined;
	}

	return node.props;
}
