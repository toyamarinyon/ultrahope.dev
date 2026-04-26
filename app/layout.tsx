import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GeistMono } from "geist/font/mono";
import { HomeLink } from "./ui/sidebar/home-link";
import { LanguageSwitcher } from "./ui/sidebar/language-switcher";
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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html className="text-text bg-base subpixel-antialiased">
			<body className={`${satoshi.variable} ${GeistMono.variable} font-sans `}>
				<div className="min-h-screen">
					<div className="relative mx-auto min-h-screen w-full overflow-hidden">
						<aside className="fixed top-0 bottom-0 flex w-60 flex-col border-r border-highlight-med p-2">
							<div className="min-h-0 flex-1">
								<section className="mb-8 flex h-14.5 items-center pl-2">
									<HomeLink />
								</section>

								<div className="grid gap-6">
									<WritingList />
								</div>
							</div>

							<div className="pb-2">
								<LanguageSwitcher />
							</div>
						</aside>

						<main className="ml-60 flex min-w-0 flex-col">{children}</main>
					</div>
				</div>
			</body>
		</html>
	);
}
