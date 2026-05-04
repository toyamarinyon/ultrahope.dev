import { defineRule } from "../utils/define-rule";

export default defineRule({
	meta: {
		type: "problem",
		docs: {
			description:
				"Disallow styling document elements such as html and body directly in CSS.",
		},
		schema: [],
		messages: {
			noDocumentElementStylesInCss:
				"Avoid styling '{{selectorName}}' in CSS. Prefer moving these styles to the element's className or a more specific owner.",
		},
	},
	create(context) {
		return {
			TypeSelector(node) {
				if (node.name !== "html" && node.name !== "body") {
					return;
				}

				context.report({
					node,
					messageId: "noDocumentElementStylesInCss",
					data: {
						selectorName: node.name,
					},
				});
			},
		};
	},
});
