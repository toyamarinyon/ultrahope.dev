import { __unstable__loadDesignSystem as loadDesignSystem } from "tailwindcss";

let designSystem = null;

try {
	designSystem = await loadDesignSystem(process.cwd());
} catch {
	designSystem = null;
}

export { designSystem };
