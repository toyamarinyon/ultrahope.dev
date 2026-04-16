import { defineRule } from "../utils/define-rule.mjs";
import { getStaticClassTokens } from "../utils/get-static-class-tokens.mjs";
import { designSystem } from "../utils/tailwind-design-system.mjs";

export default defineRule({
	meta: {
		type: "suggestion",
		docs: {
			description:
				"Prefer Tailwind's canonical class names when an equivalent shorthand exists.",
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
			preferTailwindCanonicalClasses:
				"The class '{{className}}' can be written as '{{canonicalClassName}}'.",
		},
	},
	create(context) {
		if (!designSystem?.canonicalizeCandidates) {
			return {};
		}

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
					const canonicalClassName = designSystem.canonicalizeCandidates(
						[className],
						{ rem: rootFontSize },
					)[0];

					if (!canonicalClassName || canonicalClassName === className) {
						continue;
					}

					context.report({
						node,
						messageId: "preferTailwindCanonicalClasses",
						data: {
							className,
							canonicalClassName,
						},
					});
				}
			},
		};
	},
});
