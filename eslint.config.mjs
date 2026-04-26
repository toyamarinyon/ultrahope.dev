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
			"standards/no-tailwind-arbitrary-classes": "error",
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
					allowedThemePrefixes: [
						"--color-",
						"--font-",
						"--radius-",
						"--shadow-",
						"--tracking-",
					],
				},
			],
			"standards/no-disallowed-global-class-selectors": "error",
			"standards/no-document-element-styles-in-css": "error",
		},
	},
	globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
