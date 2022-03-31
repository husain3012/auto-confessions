import React from "react";
import { withRouter } from "next/router";
import Image from "next/image";

function Success(props: any) {
	return (
		<div
			className="d-flex justify-content-center align-items-center font-cursive"
			style={{
				height: "100vh",
				width: "100vw",
			}}
		>
			<div className="bg-white p-2 rounded-3 flex flex-column justify-content-center align-items-center text-center px-5 py-5 shadow-lg">
				<a
					href={props.router.query.link}
					className="flex flex-column justify-content-center mt-3"
				>
					{props.router.query.image ? (
						<div>
							<Image
								src={props.router.query.image}
								alt="post"
								width={300}
								className="w-25"
								height={300}
							/>
						</div>
					) : null}
					<span className="mt-4">{props.router.query.link}</span>
				</a>
				<h1 className="opacity-75 my-0 text-success">
					Success
					<svg
						width="30"
						height="30"
						className="mx-1"
						viewBox="0 0 15 15"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
							fill="currentColor"
							fillRule="evenodd"
							clipRule="evenodd"
						></path>
					</svg>
				</h1>
				<p className="mt-3">Your Post has been successfully uploaded.</p>
			</div>
		</div>
	);
}

export default withRouter(Success);
