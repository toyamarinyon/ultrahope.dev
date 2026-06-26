import type { MDXComponents } from "mdx/types";
import { ScrollFadeExamples } from "./app/(writing)/ui/scroll-fade-examples";

const components: MDXComponents = {
	ScrollFadeExamples,
};

export function useMDXComponents(): MDXComponents {
	return components;
}
