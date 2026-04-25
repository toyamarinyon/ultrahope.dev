export const defaultLocale = "en";
export const locales = ["en", "ja"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
	return locales.includes(value as Locale);
}

export function localizedPath(locale: Locale, path: `/${string}` = "/") {
	if (locale === defaultLocale) {
		return path;
	}

	return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

export function getLocaleFromPathname(pathname: string | null): Locale {
	if (!pathname) {
		return defaultLocale;
	}

	const firstSegment = pathname.split("/")[1];
	return firstSegment && isLocale(firstSegment) ? firstSegment : defaultLocale;
}

export function withoutLocalePrefix(pathname: string | null) {
	if (!pathname) {
		return "/";
	}

	const locale = getLocaleFromPathname(pathname);
	if (locale === defaultLocale) {
		return pathname;
	}

	const unprefixed = pathname.slice(`/${locale}`.length);
	return unprefixed || "/";
}
