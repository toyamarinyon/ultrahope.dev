import type { Metadata } from "next";
import localFont from "next/font/local";
import { cookies } from "next/headers";
import "./globals.css";
import { GeistMono } from "geist/font/mono";
import { FooterControls } from "./ui/sidebar/footer-controls";
import { HomeLink } from "./ui/sidebar/home-link";
import { WritingList } from "./ui/sidebar/writing-list";

const satoshi = localFont({
	src: "./fonts/Satoshi-Variable.woff2",
	variable: "--font-satoshi",
	display: "swap",
	weight: "300 900",
});

export const metadata: Metadata = {
	title: {
		default: "Journal | Ultrahope",
		template: "%s | Ultrahope Journal",
	},
	description: "静かな余白と、読み心地の良い文章でつくるプロダクトノート。",
};

type ThemePreference = "system" | "light" | "dark";

function isThemePreference(
	value: string | undefined,
): value is ThemePreference {
	return value === "system" || value === "light" || value === "dark";
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// eslint-disable-next-line standards/no-await-in-layout -- intentional: first-party theme cookie read keeps initial HTML theme aligned and avoids theme flash.
	const themeCookie = (await cookies()).get("journal_theme")?.value;
	const initialThemePreference = isThemePreference(themeCookie)
		? themeCookie
		: "system";

	return (
		<html
			className="text-text bg-base subpixel-antialiased"
			data-theme={initialThemePreference}
		>
			<body className={`${satoshi.variable} ${GeistMono.variable} font-sans `}>
				<div className="min-h-screen">
					<div className="relative mx-auto min-h-screen w-full overflow-hidden">
						<aside className="fixed top-0 bottom-0 flex w-60 flex-col border-r border-highlight-med p-2 bg-surface">
							<div className="min-h-0 flex-1">
								<section className="mb-8 flex h-14.5 items-center pl-2">
									<HomeLink />
								</section>

								<div className="grid gap-6">
									<WritingList />
								</div>
							</div>

							<FooterControls initialThemePreference={initialThemePreference} />
						</aside>

						<main className="ml-60 flex min-w-0 flex-col">{children}</main>
					</div>
				</div>
			</body>
		</html>
	);
}
