import type { AppProps } from "next/app";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
export default function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}
