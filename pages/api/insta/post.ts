import type { NextApiRequest, NextApiResponse } from "next";
// @ts-ignore
import Instagram from "instagram-web-api";
import { v2 as cloudinary } from "cloudinary";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	console.log(
		process.env.NEXT_PUBLIC_USERNAME,
		" ",
		process.env.NEXT_PUBLIC_PASSWORD
	);

	if (req.method === "POST") {
		const client = new Instagram({
			username: process.env.NEXT_PUBLIC_USERNAME,
			password: process.env.NEXT_PUBLIC_PASSWORD,
		});
		await client.login();
		try {
			const { image, caption } = req.body;

			const result = await cloudinary.uploader.upload(image);
			console.log(result, caption);

			await client.uploadPhoto({
				photo: result.url,
				caption: caption,
				post: "feed",
			});

			res.status(200).json({
				status: "success",
				image: result.url,
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({ status: "error" });
		}
	}
}
