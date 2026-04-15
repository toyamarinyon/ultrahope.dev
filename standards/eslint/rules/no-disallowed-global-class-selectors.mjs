import { defineRule } from "../utils/define-rule.mjs";

export default defineRule({
	meta: {
		type: "problem",
		docs: {
			description:
				"Disallow adding new class selectors to app/globals.css without updating standards.",
		},
		schema: [
			{
				type: "object",
				properties: {
					allowedClassSelectors: {
						type: "array",
						items: {
							type: "string",
						},
						uniqueItems: true,
					},
				},
				additionalProperties: false,
			},
		],
		messages: {
			disallowedGlobalClassSelector:
				"Class selector '.{{className}}' is not in the globals.css allowlist. Prefer Tailwind utilities or explicitly update this standards rule.",
		},
	},
	create(context) {
		const allowedClassSelectors = new Set(
			context.options[0]?.allowedClassSelectors ?? [],
		);

		return {
			ClassSelector(node) {
				if (allowedClassSelectors.has(node.name)) {
					return;
				}

				context.report({
					node,
					messageId: "disallowedGlobalClassSelector",
					data: {
						className: node.name,
					},
				});
			},
		};
	},
});
