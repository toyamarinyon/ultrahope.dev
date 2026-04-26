"use client";

import { CheckIcon, ChevronDownIcon, GlobeIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import {
	getLocaleFromPathname,
	type Locale,
	localizedPath,
	withoutLocalePrefix,
} from "@/lib/i18n";

const localeCookieName = "journal_locale";
const supportedLanguageItems: Array<{ locale: Locale; label: string }> = [
	{ locale: "en", label: "English" },
	{ locale: "ja", label: "日本語" },
];

function setLocaleCookie(locale: Locale) {
	const maxAge = 60 * 60 * 24 * 365;
	document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

export function LanguageSwitcher() {
	const pathname = usePathname();
	const router = useRouter();
	const menuId = useId();
	const containerRef = useRef<HTMLDivElement>(null);
	const [open, setOpen] = useState(false);
	const currentLocale = getLocaleFromPathname(pathname);
	const currentLabel =
		supportedLanguageItems.find((item) => item.locale === currentLocale)
			?.label ?? "English";

	useEffect(() => {
		if (!open) {
			return;
		}

		function handlePointerDown(event: PointerEvent) {
			if (!containerRef.current?.contains(event.target as Node)) {
				setOpen(false);
			}
		}

		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				setOpen(false);
			}
		}

		document.addEventListener("pointerdown", handlePointerDown);
		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("pointerdown", handlePointerDown);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [open]);

	function selectLocale(locale: Locale) {
		const path = withoutLocalePrefix(pathname) as `/${string}`;
		setLocaleCookie(locale);
		setOpen(false);
		router.push(localizedPath(locale, path));
		router.refresh();
	}

	return (
		<div ref={containerRef} className="relative">
			{open ? (
				<div
					id={menuId}
					className="absolute bottom-full left-0 z-10 mb-3 w-54 rounded-md border border-highlight-high bg-overlay p-2 shadow-editorial"
					role="menu"
					aria-label="Language"
				>
					{supportedLanguageItems.map((item) => (
						<button
							key={item.locale}
							type="button"
							className="flex h-11 w-full items-center justify-between rounded-md px-4 text-text transition-colors hover:bg-highlight-med focus-visible:bg-highlight-med focus-visible:outline-none"
							role="menuitemradio"
							aria-checked={item.locale === currentLocale}
							onClick={() => selectLocale(item.locale)}
						>
							<span>{item.label}</span>
							{item.locale === currentLocale ? <CheckIcon /> : null}
						</button>
					))}
				</div>
			) : null}

			<button
				type="button"
				className="flex py-1 text-sm items-center justify-center gap-1 rounded-full border border-highlight-med bg-surface px-2 font-medium text-text transition-colors hover:border-highlight-high hover:bg-highlight-med focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
				aria-haspopup="menu"
				aria-expanded={open}
				aria-controls={menuId}
				onClick={() => setOpen((value) => !value)}
			>
				<GlobeIcon className="size-4" />
				<span>{currentLabel}</span>
				<ChevronDownIcon
					className={`size-4 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
				/>
			</button>
		</div>
	);
}
