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
		},
	},
	globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
