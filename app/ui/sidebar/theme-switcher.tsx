"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
	type SidebarDropdownOption,
	SidebarDropdownSwitcher,
} from "./dropdown-switcher";

export type ThemePreference = "system" | "light" | "dark";

const themeCookieName = "journal_theme";

const themeOptions: Array<SidebarDropdownOption<ThemePreference>> = [
	{ value: "system", label: "System", Icon: MonitorIcon },
	{ value: "light", label: "Light", Icon: SunIcon },
	{ value: "dark", label: "Dark", Icon: MoonIcon },
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
	const currentOption =
		themeOptions.find((option) => option.value === preference) ??
		themeOptions[0];
	const TriggerIcon = currentOption.Icon ?? MonitorIcon;

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
		<SidebarDropdownSwitcher
			ariaLabel="Theme"
			currentValue={preference}
			currentLabel={currentOption.label}
			options={themeOptions}
			TriggerIcon={TriggerIcon}
			onSelect={selectPreference}
		/>
	);
}
