import exhaustiveTailwindClasses from "./rules/exhaustive-tailwind-classes.mjs";
import exhaustiveTailwindThemeTokens from "./rules/exhaustive-tailwind-theme-tokens.mjs";
import noAwaitInLayout from "./rules/no-await-in-layout.mjs";
import noDisallowedGlobalClassSelectors from "./rules/no-disallowed-global-class-selectors.mjs";
import noDocumentElementStylesInCss from "./rules/no-document-element-styles-in-css.mjs";
import noInlineStyleProp from "./rules/no-inline-style-prop.mjs";

const raulaEslintPlugin = {
	meta: {
		name: "eslint-plugin-raula",
	},
	rules: {
		"exhaustive-tailwind-classes": exhaustiveTailwindClasses,
		"exhaustive-tailwind-theme-tokens": exhaustiveTailwindThemeTokens,
		"no-disallowed-global-class-selectors": noDisallowedGlobalClassSelectors,
		"no-document-element-styles-in-css": noDocumentElementStylesInCss,
		"no-await-in-layout": noAwaitInLayout,
		"no-inline-style-prop": noInlineStyleProp,
	},
};

export default raulaEslintPlugin;
export const { rules } = raulaEslintPlugin;
