import React, { FormEventHandler, useEffect, useState } from "react";
import { Formik, Field, Form as form } from "formik";
import axios from "axios";
import { useRouter } from "next/router";
import { Toaster, toast } from "react-hot-toast";

interface FormValues {
	branch: string;
	confession: string;
}

const HomePage = () => {
	const [loading, setLoading] = useState(true);
	const [canPost, setcanPost] = useState(false);
	const [postdata, setPostdata] = useState({
		left: 0,
		postCount: 0,
	});
	const router = useRouter();
	const [Processing, setProcessing] = useState(false);
	const [data, setData] = useState({
		branch: "",
		confession: "",
		caption: "",
	});

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		setData((prev) => {
			const newData = { ...prev };
			newData.caption = `${router.query.caption || ""}`;
			newData.branch = `${router.query.branch || ""}`;
			newData.confession = `${router.query.confession || ""}`;
			return newData;
		});
	}, [router.query]);

	const fetchData = async () => {
		try {
			const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/insta/info`);
			setcanPost(res.data.can_post);
			setPostdata({
				left: res.data?.left === null ? 0 : res.data?.left,
				postCount: res.data?.post_count,
			});
			setLoading(false);
		} catch (err) {
			console.log(err);
		}
	};

	const submitHandler = async (e: React.FormEvent) => {
		e.preventDefault();
		setProcessing(true);
		try {
			toast.loading("Analyzing your post...", {
				duration: 6000,
			});
			const textAnalysis = await axios.post(
				`${process.env.NEXT_PUBLIC_API}/analyze/text`,
				{
					text: `${data.confession}`,
				}
			);

			if (textAnalysis.data.state === true) {
				toast.error(
					"Your post is not suitable for posting on Instagram. It may contain inappropriate content."
				);
				setProcessing(false);
				return;
			} else {
				toast.success("Your Confession has been Analyzed.");

				toast.loading("Generating Post...", {
					duration: 2000,
				});
				const res = await axios.post("/api/insta/generate", {
					branch: data.branch,
					confession: data.confession,
				});
				toast.success("Post generated successfully");

				const image = res.data?.image;
				setTimeout(
					() =>
						router.push({
							pathname: "/post",
							query: {
								image,
								caption: data.caption,
								confession: data.confession,
								branch: data.branch,
							},
						}),
					1000
				);
			}
		} catch (err) {
			console.log(err);
			toast.error("Error generating post");
		} finally {
			setTimeout(() => {
				setProcessing(false);
			}, 1000);
		}
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
			{loading ? (
				<div
					className="contact-form w-100 d-flex flex-column justify-content-center align-items-center"
					style={{
						height: "400px",
					}}
				>
					<div className="spinner-border"></div>
					<div className="text-uppercase h5 font-cursive mt-3">Loading</div>
				</div>
			) : (
				<form className="contact-form" onSubmit={submitHandler}>
					<h5 className="title">JMI Confessions 😉</h5>
					<p className="description">
						Enter your branch name and your confession below Avoid using
						profanity, offensive language, or any.
					</p>
					<label className="small opacity-50 my-2">
						Only Support English Characters
					</label>

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
							style={{
								opacity: canPost ? 1 : 0.5,
							}}
							disabled={!canPost}
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
							style={{
								opacity: canPost ? 1 : 0.5,
							}}
							disabled={!canPost}
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
							style={{
								opacity: canPost ? 1 : 0.5,
							}}
							disabled={!canPost}
						></textarea>
						<label className="form-label px-2 my-1 opacity-50 mb-4 small">
							Character Limit : 200 ({200 - data.caption.length} left)
						</label>
					</div>
					<div className="submit-button-wrapper">
						{canPost ? (
							<input
								type="submit"
								value={!Processing ? "SEND" : "LOADING"}
								style={{
									opacity: Processing ? 0.5 : 1,
									pointerEvents: Processing ? "none" : "auto",
								}}
							/>
						) : (
							<div>
								<p>
									<span className="text-danger">
										{postdata.postCount === 5
											? "5 Posts per day limit reached"
											: "You can post again in " + postdata.left + "minutes"}
									</span>
								</p>
								<input
									type="submit"
									value={`LOCKED`}
									style={{
										pointerEvents: "none",
										opacity: 0.5,
									}}
								/>
							</div>
						)}
					</div>
				</form>
			)}
			<Toaster position="top-center" />
		</div>
	);
};

export default HomePage;
