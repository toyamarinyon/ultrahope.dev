import type { ComponentType } from "react";
import type { Locale } from "@/lib/i18n";
import BaseUiScrollFadeEn from "@/writing/base-ui-scroll-fade/en.mdx";
import BaseUiScrollFadeJa from "@/writing/base-ui-scroll-fade/ja.mdx";

const writingMdxComponents: Partial<
	Record<Locale, Record<string, ComponentType>>
> = {
	en: {
		"base-ui-scroll-fade": BaseUiScrollFadeEn,
	},
	ja: {
		"base-ui-scroll-fade": BaseUiScrollFadeJa,
	},
};

export function getWritingMdxComponent(slug: string, locale: Locale) {
	return writingMdxComponents[locale]?.[slug];
}
