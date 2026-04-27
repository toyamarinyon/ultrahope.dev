"use client";

import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { type ComponentType, useEffect, useId, useRef, useState } from "react";

type DropdownIcon = ComponentType<{ className?: string }>;

export type SidebarDropdownOption<TValue extends string> = {
	value: TValue;
	label: string;
	Icon?: DropdownIcon;
};

type SidebarDropdownSwitcherProps<TValue extends string> = {
	ariaLabel: string;
	currentValue: TValue;
	currentLabel: string;
	options: Array<SidebarDropdownOption<TValue>>;
	TriggerIcon: DropdownIcon;
	onSelect: (value: TValue) => void;
};

export function SidebarDropdownSwitcher<TValue extends string>({
	ariaLabel,
	currentValue,
	currentLabel,
	options,
	TriggerIcon,
	onSelect,
}: SidebarDropdownSwitcherProps<TValue>) {
	const menuId = useId();
	const containerRef = useRef<HTMLDivElement>(null);
	const [open, setOpen] = useState(false);

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

	function selectOption(value: TValue) {
		setOpen(false);
		onSelect(value);
	}

	return (
		<div ref={containerRef} className="relative min-w-0">
			{open ? (
				<div
					id={menuId}
					className="absolute bottom-full left-0 z-10 mb-3 min-w-32 rounded-md border border-highlight-high bg-overlay p-1"
					role="menu"
					aria-label={ariaLabel}
				>
					{options.map((option) => (
						<button
							key={option.value}
							type="button"
							className="flex w-full items-center justify-between rounded-md px-3 py-1 text-text transition-colors hover:bg-highlight-med focus-visible:bg-highlight-med focus-visible:outline-none"
							role="menuitemradio"
							aria-checked={option.value === currentValue}
							onClick={() => selectOption(option.value)}
						>
							<span className="flex min-w-0 flex-1 items-center gap-2">
								{option.Icon ? <option.Icon className="size-4" /> : null}
								<span className="truncate">{option.label}</span>
							</span>
							{option.value === currentValue ? (
								<CheckIcon className="ml-3 size-4 shrink-0" />
							) : null}
						</button>
					))}
				</div>
			) : null}

			<button
				type="button"
				className="flex min-w-0 items-center justify-center gap-1 rounded-full px-2 py-1 text-sm font-medium text-text transition-colors hover:border-highlight-high hover:bg-highlight-med focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
				aria-haspopup="menu"
				aria-expanded={open}
				aria-controls={menuId}
				onClick={() => setOpen((value) => !value)}
			>
				<TriggerIcon className="size-4" />
				<span className="max-w-14 truncate">{currentLabel}</span>
				<ChevronDownIcon
					className={`size-4 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
				/>
			</button>
		</div>
	);
}
