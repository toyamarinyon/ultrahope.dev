import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GeistMono } from "geist/font/mono";
import { FooterControls } from "./ui/sidebar/footer-controls";
import { HomeLink } from "./ui/sidebar/home-link";
import { MobileNavigation } from "./ui/sidebar/mobile-navigation";
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

const themeInitScript = `
(() => {
  try {
    const key = "journal_theme";
    const value = localStorage.getItem(key);
    if (value === "system" || value === "light" || value === "dark") {
      document.documentElement.dataset.theme = value;
    } else {
      document.documentElement.dataset.theme = "system";
    }
  } catch {
    document.documentElement.dataset.theme = "system";
  }
})();
`;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			className="text-text bg-base subpixel-antialiased"
			data-scroll-behavior="smooth"
			data-theme="system"
		>
			<head>
				{/* Apply the persisted theme before hydration so static pages keep their first paint aligned with the user's preference. */}
				<script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
			</head>
			<body className={`${satoshi.variable} ${GeistMono.variable} font-sans `}>
				<div className="min-h-screen">
					<div className="relative mx-auto min-h-screen w-full overflow-hidden">
						<div className="md:hidden">
							<MobileNavigation writingList={<WritingList />} />
						</div>

						<aside className="fixed top-0 bottom-0 hidden w-60 flex-col border-highlight-med border-r bg-surface p-2 md:flex">
							<div className="min-h-0 flex-1">
								<section className="mb-8 flex h-14.5 items-center pl-2">
									<HomeLink />
								</section>

								<div className="grid gap-6">
									<WritingList />
								</div>
							</div>

							<FooterControls />
						</aside>

						<main className="flex min-w-0 flex-col md:ml-60">{children}</main>
					</div>
				</div>
			</body>
		</html>
	);
}
