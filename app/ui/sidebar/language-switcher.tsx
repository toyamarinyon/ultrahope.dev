"use client";

import { GlobeIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
	getLocaleFromPathname,
	type Locale,
	localizedPath,
	withoutLocalePrefix,
} from "@/lib/i18n";
import {
	type SidebarDropdownOption,
	SidebarDropdownSwitcher,
} from "./dropdown-switcher";

const localeCookieName = "journal_locale";
const supportedLanguageOptions: Array<SidebarDropdownOption<Locale>> = [
	{ value: "en", label: "English" },
	{ value: "ja", label: "日本語" },
];

function setLocaleCookie(locale: Locale) {
	const maxAge = 60 * 60 * 24 * 365;
	document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

export function LanguageSwitcher() {
	const pathname = usePathname();
	const router = useRouter();
	const currentLocale = getLocaleFromPathname(pathname);
	const currentLabel =
		supportedLanguageOptions.find((option) => option.value === currentLocale)
			?.label ?? "English";

	function selectLocale(locale: Locale) {
		const path = withoutLocalePrefix(pathname) as `/${string}`;
		setLocaleCookie(locale);
		router.push(localizedPath(locale, path));
		router.refresh();
	}

	return (
		<SidebarDropdownSwitcher
			ariaLabel="Language"
			currentValue={currentLocale}
			currentLabel={currentLabel}
			options={supportedLanguageOptions}
			TriggerIcon={GlobeIcon}
			onSelect={selectLocale}
		/>
	);
}
