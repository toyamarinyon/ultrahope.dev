import { defineRule } from "../utils/define-rule.mjs";

export default defineRule({
	meta: {
		type: "problem",
		docs: {
			description:
				"Disallow awaiting in layout files to avoid blocking the app shell.",
		},
		schema: [],
		messages: {
			noAwaitInLayout:
				"Avoid awaiting in layout files unless intentionally disabled with a justification. Async work in layouts can block rendering of the full app shell.",
		},
	},
	create(context) {
		return {
			AwaitExpression(node) {
				context.report({
					node,
					messageId: "noAwaitInLayout",
				});
			},
		};
	},
});
