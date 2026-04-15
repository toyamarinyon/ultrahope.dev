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
			"standards/no-disallowed-global-class-selectors": [
				"error",
				{
					allowedClassSelectors: [
						"app-frame",
						"article",
						"article-figure-placeholder",
						"article-shell",
						"empty-state",
						"eyebrow",
						"hero-note",
						"idea-index-card",
						"idea-index-grid",
						"inline-action",
						"insight-card",
						"insight-grid",
						"is-active",
						"more-post-link",
						"more-posts",
						"more-posts-grid",
						"page-shell",
						"post-hero",
						"post-intro",
						"post-meta",
						"sidebar-brand",
						"sidebar-brand-block",
						"sidebar-brand-logo",
						"sidebar-footer",
						"sidebar-kicker",
						"sidebar-primary-link",
						"sidebar-section",
						"sidebar-section-head",
						"sidebar-section-head-stack",
						"sidebar-thread-list",
						"sidebar-thread-list-compact",
						"thread-link",
						"thread-link-meta",
						"topbar-actions",
						"topbar-chip",
						"topbar-kicker",
						"variant-bullet-list",
						"variant-note-card",
						"variant-section-card",
						"variant-section-list",
						"variant-summary-grid",
						"workspace-main",
						"workspace-shell",
						"workspace-sidebar",
						"workspace-topbar",
						"workspace-topbar-brand",
						"workspace-topbar-brand-text",
						"writing-language-switch",
					],
				},
			],
		},
	},
	globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
