import fs from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { __unstable__loadDesignSystem as loadDesignSystem } from "tailwindcss";

const require = createRequire(import.meta.url);
const globalsCssPath = path.resolve(process.cwd(), "app/globals.css");

async function loadStylesheet(id, base) {
	const resolvedPath =
		id === "tailwindcss"
			? require.resolve("tailwindcss/index.css")
			: path.resolve(base, id);

	return {
		base: path.dirname(resolvedPath),
		content: await fs.readFile(resolvedPath, "utf8"),
	};
}

let designSystem = null;

try {
	const globalsCss = await fs.readFile(globalsCssPath, "utf8");

	designSystem = await loadDesignSystem(globalsCss, {
		from: globalsCssPath,
		loadStylesheet,
	});
} catch {
	designSystem = null;
}

export { designSystem };
