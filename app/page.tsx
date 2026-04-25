import Link from "next/link";

const profileLinks = {
	github: "https://github.com/toyamarinyon",
	x: "https://x.com/toyamarinyon",
};

function InlineLink(props: { href: string; children: React.ReactNode }) {
	return (
		<a
			href={props.href}
			target="_blank"
			rel="noreferrer"
			className="text-gold underline decoration-highlight-high underline-offset-6 transition-colors duration-200 hover:text-rose focus-visible:text-rose"
		>
			{props.children}
		</a>
	);
}

export default function HomePage() {
	return (
		<section className="max-w-220 mx-auto mt-20 px-20">
			<h1 className="font-bold mb-14">Hello, I&apos;m Satoshi.</h1>

			<div className="grid gap-2">
				<p>I&apos;m a developer based in Kyoto. </p>
				<p>
					On this website, I write about building software with AI, designing
					calm and pleasant user interfaces, and the small details that make
					digital products feel comfortable.
				</p>
			</div>
		</section>
	);
}
