import { type NextRequest, NextResponse } from "next/server";

function prefersJapanese(acceptLanguage: string | null) {
	if (!acceptLanguage) {
		return false;
	}

	return acceptLanguage
		.split(",")
		.map((language) => language.trim().toLowerCase())
		.some((language) => language === "ja" || language.startsWith("ja-"));
}

export function proxy(request: NextRequest) {
	if (prefersJapanese(request.headers.get("accept-language"))) {
		return NextResponse.redirect(new URL("/ja", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: "/",
};
