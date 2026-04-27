"use client";

import {
	CheckIcon,
	ChevronDownIcon,
	MonitorIcon,
	MoonIcon,
	Settings2Icon,
	SunIcon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { type ComponentType, useEffect, useId, useRef, useState } from "react";
import {
	getLocaleFromPathname,
	type Locale,
	localizedPath,
	withoutLocalePrefix,
} from "@/lib/i18n";

export type ThemePreference = "system" | "light" | "dark";

type ControlIcon = ComponentType<{ className?: string }>;

type ControlOption<TValue extends string> = {
	value: TValue;
	label: string;
	Icon?: ControlIcon;
};

type FooterControlsProps = {
	initialThemePreference: ThemePreference;
};

type PreferenceMenuItemProps<TValue extends string> = {
	currentValue: TValue;
	onSelect: (value: TValue) => void;
	option: ControlOption<TValue>;
};

const localeCookieName = "journal_locale";
const themeCookieName = "journal_theme";

const languageOptions: Array<ControlOption<Locale>> = [
	{ value: "en", label: "English" },
	{ value: "ja", label: "日本語" },
];

const appearanceOptions: Array<ControlOption<ThemePreference>> = [
	{ value: "system", label: "System", Icon: MonitorIcon },
	{ value: "light", label: "Light", Icon: SunIcon },
	{ value: "dark", label: "Dark", Icon: MoonIcon },
];

function setLocaleCookie(locale: Locale) {
	const maxAge = 60 * 60 * 24 * 365;
	document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

function setThemeCookie(preference: ThemePreference) {
	const maxAge = 60 * 60 * 24 * 365;
	document.cookie = `${themeCookieName}=${preference}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

function applyTheme(preference: ThemePreference) {
	document.documentElement.dataset.theme = preference;
}

function PreferenceMenuItem<TValue extends string>({
	currentValue,
	onSelect,
	option,
}: PreferenceMenuItemProps<TValue>) {
	return (
		<button
			type="button"
			className="flex w-full items-center justify-between rounded-md px-3 py-1 text-subtle transition-colors hover:text-text hover:bg-highlight-med focus-visible:bg-highlight-med focus-visible:outline-none"
			role="menuitemradio"
			aria-checked={option.value === currentValue}
			onClick={() => onSelect(option.value)}
		>
			<span className="flex min-w-0 flex-1 items-center gap-2">
				{option.Icon ? <option.Icon className="size-4" /> : null}
				<span className="truncate">{option.label}</span>
			</span>
			{option.value === currentValue ? (
				<CheckIcon className="ml-3 size-4 shrink-0" />
			) : null}
		</button>
	);
}

export function FooterControls({
	initialThemePreference,
}: FooterControlsProps) {
	const pathname = usePathname();
	const router = useRouter();
	const menuId = useId();
	const containerRef = useRef<HTMLDivElement>(null);
	const [open, setOpen] = useState(false);
	const [themePreference, setThemePreference] = useState(
		initialThemePreference,
	);
	const currentLocale = getLocaleFromPathname(pathname);

	useEffect(() => {
		setThemePreference(initialThemePreference);
	}, [initialThemePreference]);

	useEffect(() => {
		applyTheme(themePreference);
	}, [themePreference]);

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

		document.addEventListener("pointerdown", handlePointerDown, true);
		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("pointerdown", handlePointerDown, true);
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

	function selectThemePreference(nextPreference: ThemePreference) {
		setOpen(false);

		if (nextPreference === themePreference) {
			return;
		}

		setThemePreference(nextPreference);
		setThemeCookie(nextPreference);
		router.refresh();
	}

	return (
		<div ref={containerRef} className="relative min-w-0 pt-2 md:pt-0 md:pb-2">
			{open ? (
				<div
					id={menuId}
					className="absolute top-full right-0 z-10 mt-3 min-w-36 rounded-md border border-highlight-high bg-overlay p-1 md:top-auto md:bottom-full md:left-0 md:right-auto md:mt-0 md:mb-3"
					role="menu"
					aria-label="Preferences"
				>
					<div className="px-3 pt-1 pb-0.5 text-xs font-medium text-subtle">
						Language
					</div>
					{languageOptions.map((option) => (
						<PreferenceMenuItem
							key={option.value}
							currentValue={currentLocale}
							option={option}
							onSelect={selectLocale}
						/>
					))}

					<div className="my-1 border-highlight-med border-t" />

					<div className="px-3 pt-1 pb-0.5 text-xs font-medium text-subtle">
						Appearance
					</div>
					{appearanceOptions.map((option) => (
						<PreferenceMenuItem
							key={option.value}
							currentValue={themePreference}
							option={option}
							onSelect={selectThemePreference}
						/>
					))}
				</div>
			) : null}

			<button
				type="button"
				className="flex min-w-0 items-center justify-center gap-1 rounded-full px-2 py-1 text-sm text-subtle transition-colors hover:border-highlight-high hover:bg-highlight-med focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold max-md:justify-start"
				aria-haspopup="menu"
				aria-expanded={open}
				aria-controls={menuId}
				onClick={() => setOpen((value) => !value)}
			>
				<Settings2Icon className="size-4" />
				<span>Preferences</span>
				<ChevronDownIcon
					className={`size-4 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
				/>
			</button>
		</div>
	);
}
