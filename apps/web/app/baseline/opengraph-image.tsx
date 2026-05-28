/* eslint-disable raula/no-inline-style-prop */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Baseline preview";
export const size = {
	width: 1200,
	height: 630,
};
export const contentType = "image/png";

let logotypeDataUrl: Promise<string> | undefined;

function getLogotypeDataUrl() {
	logotypeDataUrl ??= readFile(join(process.cwd(), "app/logotype.png")).then(
		(buffer) => `data:image/png;base64,${buffer.toString("base64")}`,
	);

	return logotypeDataUrl;
}

export default async function Image() {
	const logotypeSrc = await getLogotypeDataUrl();

	return new ImageResponse(
		<div
			style={{
				height: "100%",
				width: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				padding: "56px",
				background:
					"linear-gradient(180deg, #0f1115 0%, #090b0f 60%, #06070a 100%)",
				color: "#f7f7f5",
				fontFamily: "sans-serif",
			}}
		>
			<div style={{ display: "flex", flexDirection: "column", gap: "54px" }}>
				<img
					alt="Ultrahope"
					src={logotypeSrc}
					width={170}
					height={60}
					style={{
						display: "flex",
						width: 170,
						height: 60,
						objectFit: "contain",
					}}
				/>
				<div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
					<div
						style={{
							display: "flex",
							fontSize: 86,
							lineHeight: 1,
							fontWeight: 500,
							letterSpacing: 0,
						}}
					>
						Baseline
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "12px",
							color: "#aeb0b8",
							fontSize: 34,
							lineHeight: 1.35,
							fontWeight: 400,
							letterSpacing: 0,
						}}
					>
						<div>The habits beneath how I think and move.</div>
						<div>
							Small traces left by choosing, hesitating, and sharing a room.
						</div>
					</div>
				</div>
			</div>

			<div />
		</div>,
		size,
	);
}
