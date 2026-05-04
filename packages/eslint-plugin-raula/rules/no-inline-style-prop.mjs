import { defineRule } from "../utils/define-rule.mjs";

export default defineRule({
	meta: {
		type: "problem",
		docs: {
			description: "Disallow inline style props in JSX.",
		},
		schema: [],
		messages: {
			noInlineStyleProp:
				"Avoid inline style props. Use Tailwind utilities or shared CSS instead.",
		},
	},
	create(context) {
		return {
			JSXAttribute(node) {
				if (node.name?.type !== "JSXIdentifier" || node.name.name !== "style") {
					return;
				}

				context.report({
					node,
					messageId: "noInlineStyleProp",
				});
			},
		};
	},
});
