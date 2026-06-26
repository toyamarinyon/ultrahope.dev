import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	allowedDevOrigins: ["*.ultrahope-dev.localhost", "*.web.localhost"],
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
	async rewrites() {
		return {
			beforeFiles: [
				{
					source: "/writing/:slug",
					has: [
						{
							type: "header",
							key: "accept",
							value: ".*text/markdown.*",
						},
					],
					destination: "/writing/md/:slug",
				},
				{
					source: "/ja/writing/:slug",
					has: [
						{
							type: "header",
							key: "accept",
							value: ".*text/markdown.*",
						},
					],
					destination: "/ja/writing/md/:slug",
				},
			],
		};
	},
};

const withMDX = createMDX({
	options: {
		remarkPlugins: ["remark-frontmatter"],
	},
});

export default withMDX(nextConfig);
