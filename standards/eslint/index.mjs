import css from "@eslint/css";
import exhaustiveTailwindClasses from "./rules/exhaustive-tailwind-classes.mjs";
import exhaustiveTailwindThemeTokens from "./rules/exhaustive-tailwind-theme-tokens.mjs";
import noAwaitInLayout from "./rules/no-await-in-layout.mjs";
import noDisallowedGlobalClassSelectors from "./rules/no-disallowed-global-class-selectors.mjs";
import noDocumentElementStylesInCss from "./rules/no-document-element-styles-in-css.mjs";
import noInlineStyleProp from "./rules/no-inline-style-prop.mjs";

const standardsEslintPlugin = {
	meta: {
		name: "ultrahope-standards",
	},
	rules: {
		"exhaustive-tailwind-classes": exhaustiveTailwindClasses,
		"exhaustive-tailwind-theme-tokens": exhaustiveTailwindThemeTokens,
		"no-disallowed-global-class-selectors": noDisallowedGlobalClassSelectors,
		"no-document-element-styles-in-css": noDocumentElementStylesInCss,
		"no-await-in-layout": noAwaitInLayout,
		"no-inline-style-prop": noInlineStyleProp,
	},
	configs: {},
	processors: {},
};

export const standards = [
	{
		files: ["**/*.{js,jsx,ts,tsx}"],
		plugins: {
			standards: standardsEslintPlugin,
		},
		rules: {
			"standards/exhaustive-tailwind-classes": "error",
			"standards/no-inline-style-prop": "error",
		},
	},
	{
		files: ["app/**/layout.{js,jsx,ts,tsx}"],
		plugins: {
			standards: standardsEslintPlugin,
		},
		rules: {
			"standards/no-await-in-layout": "error",
		},
	},
	{
		files: ["app/globals.css"],
		plugins: {
			css,
			standards: standardsEslintPlugin,
		},
		language: "css/css",
		rules: {
			"standards/exhaustive-tailwind-theme-tokens": [
				"error",
				{
					allowCustomProperties: [
						"--background",
						"--foreground",
						"--card",
						"--card-foreground",
						"--popover",
						"--popover-foreground",
						"--primary",
						"--primary-foreground",
						"--secondary",
						"--secondary-foreground",
						"--muted",
						"--muted-foreground",
						"--accent-foreground",
						"--destructive",
						"--destructive-foreground",
						"--border",
						"--input",
						"--ring",
						"--radius",
					],
				},
			],
			"standards/no-disallowed-global-class-selectors": "error",
			"standards/no-document-element-styles-in-css": "error",
		},
	},
];

export default standardsEslintPlugin;
export const { rules, configs } = standardsEslintPlugin;
