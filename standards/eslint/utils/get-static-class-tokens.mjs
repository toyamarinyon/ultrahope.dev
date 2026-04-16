function addTokensFromString(value, tokens) {
	for (const token of value.split(/\s+/)) {
		if (token) {
			tokens.add(token);
		}
	}
}

function getStaticClassTokens(node) {
	const tokens = new Set();

	if (!node.value) {
		return tokens;
	}

	if (node.value.type === "Literal" && typeof node.value.value === "string") {
		addTokensFromString(node.value.value, tokens);
		return tokens;
	}

	if (
		node.value.type !== "JSXExpressionContainer" ||
		!node.value.expression
	) {
		return tokens;
	}

	const expression = node.value.expression;

	if (expression.type === "Literal" && typeof expression.value === "string") {
		addTokensFromString(expression.value, tokens);
		return tokens;
	}

	if (expression.type !== "TemplateLiteral") {
		return tokens;
	}

	for (const quasi of expression.quasis) {
		addTokensFromString(quasi.value.cooked ?? quasi.value.raw, tokens);
	}

	return tokens;
}

export { getStaticClassTokens };
