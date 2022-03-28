import React from "react";

function Error() {
	return (
		<div
			className="d-flex justify-content-center align-items-center font-cursive"
			style={{
				height: "100vh",
				width: "100vw",
			}}
		>
			<div className="bg-white p-2 rounded-3 flex flex-column justify-content-center align-items-center text-center px-5 py-5 shadow-lg">
				<h1 className="opacity-75 my-0 text-danger">
					Error Occured
					<svg
						width="30"
						height="30"
						className="mx-2"
						viewBox="0 0 15 15"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
							fill="currentColor"
							// eslint-disable-next-line react/no-unknown-property
							fill-rule="evenodd"
							clipRule="evenodd"
						></path>
					</svg>
				</h1>
				<p className="mt-3">
					Error Occured while Uploading your Post please try again.
				</p>
			</div>
		</div>
	);
}

export default Error;
