import exhaustiveTailwindThemeTokens from "./rules/exhaustive-tailwind-theme-tokens.mjs";
import noDisallowedGlobalClassSelectors from "./rules/no-disallowed-global-class-selectors.mjs";
import noDocumentElementStylesInCss from "./rules/no-document-element-styles-in-css.mjs";
import noInlineStyleProp from "./rules/no-inline-style-prop.mjs";
import preferTailwindCanonicalClasses from "./rules/prefer-tailwind-canonical-classes.mjs";

const standardsEslintPlugin = {
	meta: {
		name: "ultrahope-standards",
	},
	rules: {
		"exhaustive-tailwind-theme-tokens": exhaustiveTailwindThemeTokens,
		"no-disallowed-global-class-selectors": noDisallowedGlobalClassSelectors,
		"no-document-element-styles-in-css": noDocumentElementStylesInCss,
		"no-inline-style-prop": noInlineStyleProp,
		"prefer-tailwind-canonical-classes": preferTailwindCanonicalClasses,
	},
	configs: {},
	processors: {},
};

export default standardsEslintPlugin;
export const { rules, configs } = standardsEslintPlugin;
