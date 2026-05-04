import css from "@eslint/css";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import raulaPlugin from "eslint-plugin-raula";

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	{
		files: ["**/*.{js,jsx,ts,tsx}"],
		plugins: {
			raula: raulaPlugin,
		},
		rules: {
			"raula/exhaustive-tailwind-classes": "error",
			"raula/no-inline-style-prop": "error",
		},
	},
	{
		files: ["app/**/layout.{js,jsx,ts,tsx}"],
		plugins: {
			raula: raulaPlugin,
		},
		rules: {
			"raula/no-await-in-layout": "error",
		},
	},
	{
		files: ["app/globals.css"],
		plugins: {
			css,
			raula: raulaPlugin,
		},
		language: "css/css",
		rules: {
			"raula/exhaustive-tailwind-theme-tokens": [
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
			"raula/no-disallowed-global-class-selectors": "error",
			"raula/no-document-element-styles-in-css": "error",
		},
	},
	globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
