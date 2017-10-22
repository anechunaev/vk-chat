import * as React from 'react';
import { HelmetData } from 'react-helmet';

export interface HtmlProps {
	head: HelmetData;
	html: string;
	scripts: string[];
	window: any;
	css: string;
	vendorCss: string;
}

const Html = ({ head, html, scripts, window, css, vendorCss }: HtmlProps) => (
	<html lang="en"> 	
		<head>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="csrf-token" content="t0k3n" />
			{head.meta.toComponent()}
			<link rel="stylesheet" href={vendorCss} />
			<link rel="stylesheet" href={css} />
			{head.title.toComponent()}
			<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
			<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
		</head>
		<body>
			<div
				id="main"
				dangerouslySetInnerHTML={{ __html: html }}
			/>
			<script
				dangerouslySetInnerHTML={{
					__html: Object.keys(window).reduce(
						(out, key) => out += `window.${key}=${JSON.stringify(window[key])};`,
					''),
				}}
			/>
			{scripts.map(src => <script key={src} defer src={src} />)}
			<script defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4qVaUn5ExjtT_u7hwDVDBHs3rOoQiD3w&libraries=places" />
		</body>
	</html>
);

export default Html;