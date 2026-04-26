import { defineRule } from "../utils/define-rule.mjs";
import { getStaticClassTokens } from "../utils/get-static-class-tokens.mjs";

export default defineRule({
	meta: {
		type: "problem",
		docs: {
			description:
				"Disallow Tailwind arbitrary values and arbitrary variants in className.",
		},
		schema: [],
		messages: {
			noTailwindArbitraryClasses:
				"Do not use Tailwind arbitrary class '{{className}}'. Add a theme token or use a canonical utility instead.",
		},
	},
	create(context) {
		return {
			JSXAttribute(node) {
				if (
					node.name?.type !== "JSXIdentifier" ||
					node.name.name !== "className"
				) {
					return;
				}

				for (const className of getStaticClassTokens(node)) {
					if (!className.includes("[") && !className.includes("]")) {
						continue;
					}

					context.report({
						node,
						messageId: "noTailwindArbitraryClasses",
						data: {
							className,
						},
					});
				}
			},
		};
	},
});
