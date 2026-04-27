"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export type ThemePreference = "system" | "light" | "dark";

const themeCookieName = "journal_theme";

const themeOptions: Array<{
	value: ThemePreference;
	label: string;
	Icon: typeof MonitorIcon;
}> = [
	{ value: "system", label: "Use system theme", Icon: MonitorIcon },
	{ value: "light", label: "Use light theme", Icon: SunIcon },
	{ value: "dark", label: "Use dark theme", Icon: MoonIcon },
];

function setThemeCookie(preference: ThemePreference) {
	const maxAge = 60 * 60 * 24 * 365;
	document.cookie = `${themeCookieName}=${preference}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

function applyTheme(preference: ThemePreference) {
	document.documentElement.dataset.theme = preference;
}

type ThemeSwitcherProps = {
	initialPreference: ThemePreference;
};

export function ThemeSwitcher({ initialPreference }: ThemeSwitcherProps) {
	const [preference, setPreference] = useState(initialPreference);
	const router = useRouter();

	useEffect(() => {
		setPreference(initialPreference);
	}, [initialPreference]);

	useEffect(() => {
		applyTheme(preference);
	}, [preference]);

	function selectPreference(nextPreference: ThemePreference) {
		if (nextPreference === preference) {
			return;
		}

		setPreference(nextPreference);
		setThemeCookie(nextPreference);
		router.refresh();
	}

	return (
		<div
			className="inline-flex items-center rounded-full border border-highlight-high bg-highlight-low p-0.5"
			role="radiogroup"
			aria-label="Theme"
		>
			{themeOptions.map(({ value, label, Icon }) => (
				<button
					key={value}
					type="button"
					role="radio"
					aria-checked={preference === value}
					aria-label={label}
					title={label}
					onClick={() => selectPreference(value)}
					className={`flex size-6.5 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
						preference === value
							? "bg-highlight-med text-text"
							: "text-subtle hover:bg-highlight-med hover:text-text"
					}`}
				>
					<Icon className="size-3.5" />
				</button>
			))}
		</div>
	);
}
