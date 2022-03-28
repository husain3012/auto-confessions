import React, { FormEventHandler, useState } from "react";
import { Formik, Field, Form as form } from "formik";
import axios from "axios";
import { useRouter } from "next/router";

interface FormValues {
	branch: string;
	confession: string;
}

const HomePage = () => {
	const router = useRouter();
	const [data, setData] = useState({
		branch: "",
		confession: "",
		caption: "",
	});
	const submitHandler = async (e: React.FormEvent) => {
		e.preventDefault();

		const res = await axios.post("/api/insta/generate", {
			branch: data.branch,
			confession: data.confession,
		});

		const image = res.data.base64;
		router.push({
			pathname: "/post",
			query: {
				image,
				caption: data.caption,
			},
		});
		return e;
	};

	const onValuesChange = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>,
		type: string
	) => {
		switch (type) {
			case "branch":
				setData({
					...data,
					branch: e.target?.value.slice(0, 30),
				});
				break;

			case "confession":
				setData({
					...data,
					confession: e.target?.value.slice(0, 520),
				});
				break;
			case "caption":
				setData({
					...data,
					caption: e.target?.value.slice(0, 200),
				});
			default:
		}
	};
	return (
		<div className="contact-form-wrapper d-flex justify-content-center">
			<form className="contact-form" onSubmit={submitHandler}>
				<h5 className="title">JMI Confessions 😉</h5>
				<p className="description">
					Enter your branch name and your confession below ~
				</p>
				<div>
					<input
						name="branch"
						type="text"
						className="form-control rounded border-white mb-0 form-input"
						id="branch"
						placeholder="Branch..."
						onChange={(e) => onValuesChange(e, "branch")}
						value={data.branch}
						required
					/>
					<label className="form-label px-2 small my-1 opacity-50">
						Character Limit: 30 ({30 - data.branch.length} left)
					</label>
				</div>
				<div>
					<textarea
						name="confession"
						className="form-control rounded border-white form-text-area mb-0"
						rows={5}
						cols={30}
						placeholder="Confession..."
						value={data.confession}
						onChange={(e) => onValuesChange(e, "confession")}
						required
					></textarea>
					<label className="form-label px-2 my-1 opacity-50 mb-4 small">
						Character Limit : 520 ({520 - data.confession.length} left)
					</label>
				</div>

				<div>
					<textarea
						name="caption"
						className="form-control rounded border-white form-text-area mb-0"
						rows={5}
						cols={30}
						placeholder="Caption..."
						value={data.caption}
						onChange={(e) => onValuesChange(e, "caption")}
					></textarea>
					<label className="form-label px-2 my-1 opacity-50 mb-4 small">
						Character Limit : 200 ({200 - data.caption.length} left)
					</label>
				</div>
				<div className="submit-button-wrapper">
					<input type="submit" value="Send" />
				</div>
			</form>
		</div>
	);
};

export default HomePage;
