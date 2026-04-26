"use client";

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

const futureLanguageItems = [
	"简体中文",
	"繁體中文",
	"Español",
	"Français",
	"Português",
	"한국어",
	"Deutsch",
];

function GlobeIcon() {
	return (
		<svg
			aria-hidden="true"
			className="size-4.5 shrink-0"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<circle cx="12" cy="12" r="10" />
			<path d="M2 12h20" />
			<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
		</svg>
	);
}

function ChevronIcon(props: { open: boolean }) {
	return (
		<svg
			aria-hidden="true"
			className="size-4 shrink-0"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			{props.open ? <path d="m18 15-6-6-6 6" /> : <path d="m6 9 6 6 6-6" />}
		</svg>
	);
}

function CheckIcon() {
	return (
		<svg
			aria-hidden="true"
			className="size-5 shrink-0"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M20 6 9 17l-5-5" />
		</svg>
	);
}

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
							className="flex h-11 w-full items-center justify-between rounded-md px-4 text-left text-lg text-text transition-colors hover:bg-highlight-med focus-visible:bg-highlight-med focus-visible:outline-none"
							role="menuitemradio"
							aria-checked={item.locale === currentLocale}
							onClick={() => selectLocale(item.locale)}
						>
							<span>{item.label}</span>
							{item.locale === currentLocale ? <CheckIcon /> : null}
						</button>
					))}

					{futureLanguageItems.map((label) => (
						<div
							key={label}
							className="flex h-11 w-full items-center rounded-md px-4 text-lg text-subtle opacity-70"
							role="menuitem"
							aria-disabled="true"
						>
							{label}
						</div>
					))}
				</div>
			) : null}

			<button
				type="button"
				className="flex h-10 min-w-40 items-center justify-center gap-2 rounded-full border border-highlight-med bg-surface px-5 text-lg font-medium text-text transition-colors hover:border-highlight-high hover:bg-highlight-med focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
				aria-haspopup="menu"
				aria-expanded={open}
				aria-controls={menuId}
				onClick={() => setOpen((value) => !value)}
			>
				<GlobeIcon />
				<span>{currentLabel}</span>
				<ChevronIcon open={open} />
			</button>
		</div>
	);
}
