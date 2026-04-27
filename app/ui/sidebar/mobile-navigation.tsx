"use client";

import { MenuIcon, XIcon } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { FooterControls, type ThemePreference } from "./footer-controls";
import { HomeLink } from "./home-link";
import { WritingList } from "./writing-list";

type MobileNavigationProps = {
	initialThemePreference: ThemePreference;
};

export function MobileNavigation({
	initialThemePreference,
}: MobileNavigationProps) {
	const menuId = useId();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (!open) {
			return;
		}

		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				setOpen(false);
			}
		}

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [open]);

	return (
		<header className="border-highlight-med border-b bg-base">
			<div className="flex h-16 items-center justify-between gap-4 px-4">
				<HomeLink />

				<button
					type="button"
					className="inline-flex size-10 items-center justify-center rounded-full text-text transition-colors hover:bg-highlight-med focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
					aria-label="Open menu"
					aria-controls={menuId}
					aria-expanded={open}
					onClick={() => setOpen(true)}
				>
					<MenuIcon className="size-6" />
				</button>
			</div>

			<div
				className={`fixed inset-0 z-50 md:hidden ${
					open ? "pointer-events-auto" : "pointer-events-none"
				}`}
			>
				<button
					type="button"
					className={`absolute inset-0 bg-base transition-opacity duration-200 ease-out motion-reduce:transition-none ${
						open ? "opacity-100" : "opacity-0"
					}`}
					aria-label="Close menu"
					tabIndex={open ? 0 : -1}
					onClick={() => setOpen(false)}
				/>

				<aside
					id={menuId}
					className={`relative flex h-full w-72 flex-col border-highlight-med border-r bg-surface p-4 transition-transform duration-200 ease-out motion-reduce:transition-none sm:w-80 ${
						open ? "translate-x-0" : "-translate-x-full"
					}`}
					aria-label="Menu"
					aria-hidden={!open}
				>
					<div className="mb-8 flex h-12 items-center justify-end">
						<button
							type="button"
							className="inline-flex size-10 items-center justify-center rounded-full text-text transition-colors hover:bg-highlight-med focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
							aria-label="Close menu"
							tabIndex={open ? 0 : -1}
							onClick={() => setOpen(false)}
						>
							<XIcon className="size-5" />
						</button>
					</div>

					<div
						className="min-h-0 flex-1"
						onClickCapture={(event) => {
							if (event.target instanceof Element) {
								const link = event.target.closest("a");
								if (link) {
									setOpen(false);
								}
							}
						}}
					>
						<WritingList />
					</div>

					<FooterControls initialThemePreference={initialThemePreference} />
				</aside>
			</div>
		</header>
	);
}
