import css from "@eslint/css";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import raulaCss from "eslint-plugin-raula/css";
import raulaNextLayout from "eslint-plugin-raula/next-layout";
import raulaTailwind from "eslint-plugin-raula/tailwind";

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	...raulaTailwind,
	...raulaNextLayout,
	...raulaCss,
	{
		files: ["app/globals.css"],
		plugins: {
			css,
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
		},
	},
	globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
