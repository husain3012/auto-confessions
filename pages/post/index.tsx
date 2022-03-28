import React, { useEffect, useState } from "react";
import Image from "next/image";
import { withRouter, useRouter } from "next/router";
import axios from "axios";

function Post(props: any) {
	const [data, setData] = useState("");
	const [caption] = useState(props.router?.query?.caption);
	const router = useRouter();
	const [LoadingPost, setLoadingPost] = useState(false);

	useEffect(() => {
		setData(props?.router?.query?.image);
		console.log(props);
	}, [props, props?.router?.query?.image]);

	const submitHandler = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoadingPost(true);

		const res = await axios.post("/api/insta/post", {
			image: data,
			caption: caption,
		});

		if (res.data.status === "success") {
			router.push({
				pathname: "/status/success",
				query: {
					image: res.data?.image,
				},
			});
		} else {
			router.push("/status/error");
		}
		return e;
	};

	return (
		<div className="contact-form-wrapper d-flex justify-content-center">
			<div className="p-2 bg-white rounded-2 shadow-lg">
				{data && (
					<Image
						src={data}
						alt="Confession"
						width={400}
						height={400}
						className="rounded-2 shadow-lg"
					/>
				)}
				<div className="post-caption p-2">
					<label className="text-dark opacity-50 small">Caption</label>
					<p className="h6 ">{caption}</p>
				</div>
				<div className="d-flex justify-content-between flex-column flex-lg-row">
					<button
						className="bg-danger my-2 btn text-white px-4"
						onClick={() => {
							router.push("/");
						}}
					>
						Go Back
					</button>
					<button
						className="bg-p-primary my-2 btn  px-4 text-white"
						onClick={(e) => {
							submitHandler(e);
						}}
						style={{
							opacity: LoadingPost ? 0.5 : 1,
							pointerEvents: LoadingPost ? "none" : "all",
						}}
						disabled={LoadingPost}
					>
						Post
					</button>
				</div>
			</div>
		</div>
	);
}

export default withRouter(Post);
