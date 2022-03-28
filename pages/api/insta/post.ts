import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
// @ts-ignore

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		try {
			const { image, caption } = req.body;

			console.log(`${process.env.NEXT_PUBLIC_API}/insta/post`);
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API}/insta/post`,
				{
					image,
					caption,
				}
			);

			console.log(response);

			res.status(200).json({
				status: "success",
				image: image,
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({ status: "error" });
		}
	}
}
