import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

function TemporaryCalls() {
	const [data, setData] = useState("");

	const getData = () => {
		axios
			.post("/api/insta/generate", {
				branch: "Breakup Department",
				confession:
					"nibh ipsum consequat nisl vel pretium lectus quam id leo in vitae turpis massa sed elementum tempus egestas sed sed risus pretium quam vulputate dignissim suspendisse in est ante in nibh mauris cursus mattis molestie a iaculis at erat pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet non curabitur gravida arcu ac tortor dignissim convallis aenean et tortor at risus viverra adipiscing at in tellus integer feugiat scelerisque",
			})
			.then((res) => {
				console.log(res.data?.base64);
				setData(res.data?.base64);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div>
			{data && <Image src={data} alt="Confession" width={400} height={400} />}
		</div>
	);
}

export default TemporaryCalls;
