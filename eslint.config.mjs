import css from "@eslint/css";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import standardsEslintPlugin from "./standards/eslint/index.mjs";

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	{
		files: ["**/*.{js,jsx,ts,tsx}"],
		plugins: {
			standards: standardsEslintPlugin,
		},
		rules: {
			"standards/no-inline-style-prop": "error",
			"standards/prefer-tailwind-canonical-classes": "warn",
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
			"standards/exhaustive-tailwind-theme-tokens": "error",
			"standards/no-disallowed-global-class-selectors": [
				"error",
				{
					allowedClassSelectors: ["article", "workspace-main"],
				},
			],
		},
	},
	globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
