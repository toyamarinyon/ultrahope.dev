import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	allowedDevOrigins: ["*.ultrahope-dev.localhost"],
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

export default nextConfig;
