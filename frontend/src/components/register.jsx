import React, { useEffect, useState } from "react";

function RegistrationPage() {
	const [html, setHTML] = useState({ __html: "" });

	useEffect(() => {
		async function createMarkup() {
			let response = await fetch(`http://127.0.0.1:5000/register`);
            
			const backendHtml = await response.text();

			return { __html: backendHtml };
		}

		createMarkup().then((result) => setHTML(result));
	}, []);

	return (
        <div dangerouslySetInnerHTML={html} />
    )
}

export default RegistrationPage;
