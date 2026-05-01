import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GeistMono } from "geist/font/mono";
import { ResponsiveSidebar } from "./ui/sidebar/responsive-sidebar";

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
						<ResponsiveSidebar />

						<main className="flex min-w-0 flex-col md:ml-60">{children}</main>
					</div>
				</div>
			</body>
		</html>
	);
}
