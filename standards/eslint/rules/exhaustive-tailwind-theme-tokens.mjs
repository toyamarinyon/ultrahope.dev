import { defineRule } from "../utils/define-rule.mjs";

function getThemeBlockRanges(sourceText) {
	const ranges = [];
	let searchIndex = 0;

	while (true) {
		const themeIndex = sourceText.indexOf("@theme", searchIndex);

		if (themeIndex === -1) {
			return ranges;
		}

		const blockStart = sourceText.indexOf("{", themeIndex);

		if (blockStart === -1) {
			return ranges;
		}

		let depth = 1;
		let cursor = blockStart + 1;

		while (cursor < sourceText.length && depth > 0) {
			const char = sourceText[cursor];

			if (char === "{") {
				depth += 1;
			} else if (char === "}") {
				depth -= 1;
			}

			cursor += 1;
		}

		ranges.push([themeIndex, cursor]);
		searchIndex = cursor;
	}
}

function isInsideRanges(index, ranges) {
	return ranges.some(([start, end]) => index >= start && index < end);
}

function matchesAllowedPrefixes(propertyName, prefixes) {
	return prefixes.some((prefix) => propertyName.startsWith(prefix));
}

export default defineRule({
	meta: {
		type: "problem",
		docs: {
			description:
				"Require design tokens to be declared inside @theme blocks so Tailwind remains the source of truth.",
		},
		schema: [
			{
				type: "object",
				properties: {
					allowCustomProperties: {
						type: "array",
						items: {
							type: "string",
						},
						uniqueItems: true,
					},
					allowedThemePrefixes: {
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
			exhaustiveTailwindThemeTokens:
				"The token '{{propertyName}}' must be declared inside an @theme block. Do not define design tokens outside Tailwind's theme source of truth.",
			nonTailwindThemeNamespace:
				"The token '{{propertyName}}' must use a supported Tailwind theme namespace inside @theme.",
		},
	},
	create(context) {
		const sourceCode = context.sourceCode;
		const sourceText = sourceCode.getText();
		const allowCustomProperties = new Set(
			context.options[0]?.allowCustomProperties ?? [],
		);
		const allowedThemePrefixes = context.options[0]?.allowedThemePrefixes ?? [
			"--color-",
			"--font-",
			"--radius-",
			"--shadow-",
		];

		return {
			StyleSheet() {
				const themeBlockRanges = getThemeBlockRanges(sourceText);
				const propertyPattern = /--[a-z0-9-_]+\s*:/g;

				for (const match of sourceText.matchAll(propertyPattern)) {
					if (match.index == null) {
						continue;
					}

					const propertyName = match[0].slice(0, -1).trim();
					const isInsideTheme = isInsideRanges(match.index, themeBlockRanges);

					if (isInsideTheme) {
						if (matchesAllowedPrefixes(propertyName, allowedThemePrefixes)) {
							continue;
						}

						const start = sourceCode.getLocFromIndex(match.index);
						const end = sourceCode.getLocFromIndex(
							match.index + propertyName.length,
						);

						context.report({
							loc: { start, end },
							messageId: "nonTailwindThemeNamespace",
							data: {
								propertyName,
							},
						});
						continue;
					}

					if (allowCustomProperties.has(propertyName)) {
						continue;
					}

					const start = sourceCode.getLocFromIndex(match.index);
					const end = sourceCode.getLocFromIndex(
						match.index + propertyName.length,
					);

					context.report({
						loc: { start, end },
						messageId: "exhaustiveTailwindThemeTokens",
						data: {
							propertyName,
						},
					});
				}
			},
		};
	},
});
