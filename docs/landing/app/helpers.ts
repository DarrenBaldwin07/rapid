import { json, redirect } from '@remix-run/node';

export const toUpperCased = (str: string) => {
	return str[0].toUpperCase() + str.slice(1);
};

export const docsSetup = (routeName: string, request: Request) => {
	const url = new URL(request.url);

	if (url.pathname === `/docs/${routeName}`) {
		return redirect(`/docs/${routeName}/doc`);
	}

	if (url.pathname == `/docs/${routeName}/doc`) {
		url.pathname = `/docs/${routeName}`;
	}

	const routes = url.pathname.split('/').filter(Boolean)

	return json({
		routes,
	});
};
