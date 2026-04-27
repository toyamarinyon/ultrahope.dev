import { defineRule } from "../utils/define-rule.mjs";
import { getStaticClassTokens } from "../utils/get-static-class-tokens.mjs";
import { designSystem } from "../utils/tailwind-design-system.mjs";

export default defineRule({
	meta: {
		type: "problem",
		docs: {
			description:
				"Require Tailwind className usage to stay within canonical utilities and configured theme tokens.",
		},
		schema: [
			{
				type: "object",
				properties: {
					rootFontSize: {
						type: "number",
					},
				},
				additionalProperties: false,
			},
		],
		messages: {
			useCanonicalClass:
				"The class '{{className}}' can be written as '{{canonicalClassName}}'. Use the canonical Tailwind class.",
			noArbitraryClass:
				"The class '{{className}}' is outside the Tailwind class policy. Add a theme token or use a canonical utility.",
		},
	},
	create(context) {
		const rootFontSize = context.options[0]?.rootFontSize ?? 16;

		return {
			JSXAttribute(node) {
				if (
					node.name?.type !== "JSXIdentifier" ||
					node.name.name !== "className"
				) {
					return;
				}

				for (const className of getStaticClassTokens(node)) {
					const canonicalClassName = designSystem?.canonicalizeCandidates?.(
						[className],
						{
							rem: rootFontSize,
						},
					)[0];

					if (canonicalClassName && canonicalClassName !== className) {
						context.report({
							node,
							messageId: "useCanonicalClass",
							data: {
								className,
								canonicalClassName,
							},
						});
						continue;
					}

					if (!className.includes("[") && !className.includes("]")) {
						continue;
					}

					context.report({
						node,
						messageId: "noArbitraryClass",
						data: {
							className,
						},
					});
				}
			},
		};
	},
});
