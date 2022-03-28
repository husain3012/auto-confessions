import type { NextApiRequest, NextApiResponse } from "next";
import templateIMG from "./template.png";
// import templateFont from "./font.ttf";
import Jimp from "jimp";

interface PostInfo {
	branch: string;
	confession: string;
	pw: number;
	ph: number;
}

function fullJustify(words: string[], maxWidth: number): string[] {
	type Payload = {
		words: string[];
		length: number;
	};

	// Single responsibility to justtify a payload
	// Padding length into the payload because we already have it to avoid recalculating
	const justifyFromPayload = (payload: Payload): string => {
		let spacesToJustify = maxWidth - payload.length;
		let spaceCount = payload.words.length - 1;
		let justifiedText = "";

		// Loop through each word except the last one as we only add spaces after words
		//until the second last word
		for (let i = 0; i < payload.words.length - 1; i++) {
			// Calculate the space needed for the current iteration
			// This is the trickiest part of the problem for me
			// If we have 5 spaces and we want to divide between 4 words
			// it will be [word1]--[word2]--[word3]-[word4]
			// and NOT [word1]---[word2]-[word3]-[word4]
			const spacePad = Math.ceil(spacesToJustify / spaceCount);
			spacesToJustify -= spacePad;
			spaceCount--;

			// Add the word and spaces needed after it
			justifiedText += payload.words[i] + " ".repeat(Math.max(spacePad, 0));
		}

		justifiedText += payload.words[payload.words.length - 1];

		return justifiedText.padEnd(maxWidth, " ");
	};

	// Justify last line
	const justifyLastLine = (words: string[]): string => {
		return words.join(" ").padEnd(maxWidth, " ");
	};

	let answer: string[] = [];
	// Iteration variables to keep track of the lengths and pass to the helper functions
	let currentWords: string[] = [];
	let currentLength: number = 0;

	// Loop through each word
	words.forEach((word) => {
		// If by adding current word to the list of currentWords the length exceeds maxWidth
		// Then pass the currentWords for justification
		// Notice we also add spaces here
		if (
			currentLength + // length of words so far
				word.length + // The new word potentially getting added
				currentWords.length > // spaces needed between word(as we need atleast 1 space between words)
			maxWidth
		) {
			const newPayload: Payload = {
				words: currentWords,
				length: currentLength,
			};
			answer.push(justifyFromPayload(newPayload));
			// Reset the iteration variables as new justification payload
			currentWords = [word];
			currentLength = word.length;
		} else {
			currentWords.push(word);
			currentLength += word.length;
		}
	});

	// If we have any words left, thats the last line
	if (currentWords.length > 0) {
		answer.push(justifyLastLine(currentWords));
	}

	return answer;
}

function divideChunks(confession: string) {
	const words = confession?.split(" ");
	const finalChunks: Array<string> = fullJustify(words, 51);
	return finalChunks;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		try {
			const Post = await Jimp.read("public/assets/template.png");
			const fontBranch = await Jimp.loadFont("public/assets/font_branch.fnt");
			const ConfessionRoot: PostInfo = {
				pw: Post.bitmap.width,
				ph: Post.bitmap.height,
				branch: req.body.branch,
				confession: req.body.confession,
			};

			console.log(ConfessionRoot);

			Post.print(
				fontBranch,
				ConfessionRoot.branch.length * 3,
				270,
				{
					text: ConfessionRoot.branch,
					alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
				},
				ConfessionRoot.pw,
				ConfessionRoot.ph
			);

			const fontConfession = await Jimp.loadFont(
				"public/assets/font_confess.fnt"
			);

			// 52 characters ek line mai
			const chunks = divideChunks(ConfessionRoot.confession);
			console.log(chunks);

			chunks.forEach((chunk, index) => {
				Post.print(
					fontConfession,
					150,
					index * 45 + 350,
					{
						text: chunk,
					},
					ConfessionRoot.pw,
					ConfessionRoot.ph
				);
			});

			const base64 = await Post.getBase64Async(Jimp.MIME_PNG);
			res.status(200).send({
				base64,
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({ message: "error" });
		}
	} else {
	}
}
