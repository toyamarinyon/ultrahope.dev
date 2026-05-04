import type { ESLint, Rule } from "eslint";

import exhaustiveTailwindClasses from "./rules/exhaustive-tailwind-classes";
import exhaustiveTailwindThemeTokens from "./rules/exhaustive-tailwind-theme-tokens";
import noAwaitInLayout from "./rules/no-await-in-layout";
import noDisallowedGlobalClassSelectors from "./rules/no-disallowed-global-class-selectors";
import noDocumentElementStylesInCss from "./rules/no-document-element-styles-in-css";
import noInlineStyleProp from "./rules/no-inline-style-prop";

const rules: Record<string, Rule.RuleModule> = {
	"exhaustive-tailwind-classes": exhaustiveTailwindClasses,
	"exhaustive-tailwind-theme-tokens": exhaustiveTailwindThemeTokens,
	"no-disallowed-global-class-selectors": noDisallowedGlobalClassSelectors,
	"no-document-element-styles-in-css": noDocumentElementStylesInCss,
	"no-await-in-layout": noAwaitInLayout,
	"no-inline-style-prop": noInlineStyleProp,
};

const plugin: ESLint.Plugin = {
	meta: {
		name: "eslint-plugin-raula",
	},
	rules,
};

export { plugin, rules };
