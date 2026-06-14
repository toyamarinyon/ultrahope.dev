import { type NextRequest, NextResponse } from "next/server";

const localeCookieName = "journal_locale";

export function proxy(request: NextRequest) {
	if (request.cookies.get(localeCookieName)?.value === "ja") {
		return NextResponse.redirect(new URL("/ja", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: "/",
};
