import { Outlet, Route } from "react-router-dom";

import DefaultLayout from "../layouts/DefaultLayout";

export const renderRoutes = (routes) => {
	let reactElements = null;
	if (Array.isArray(routes)) {
		reactElements = routes.map((route, index) => {
			const Layout = route.layout ?? DefaultLayout; // null or undefined
			const Page = route?.page;
			if (!Layout) {
				throw new Error("Layout is undefined!");
			}
			if (!Page) {
				throw new Error("Page is undefined!");
			}
			const children = route.children;
			if (children?.length) {
				return (
					<Route key={index} path={route.path} element={<Outlet />}>
						<Route index element={<Layout></Layout>} />
						{children.map((childRoute) => {
							const ChildPage = childRoute.component;
							return (
								<Route
									key={childRoute.key}
									path={childRoute.path}
									element={
										<Layout>
											<ChildPage />
										</Layout>
									}
								/>
							);
						})}
					</Route>
				);
			} else {
				return (
					<Route
						key={index}
						path={route.path}
						element={
							<Layout>
								<Page />
							</Layout>
						}
					/>
				);
			}
		});
		return reactElements;
	} else {
		throw new Error("Routes must be an array!");
	}
};
export const dateToString = (stringDate) => {
	const date = new Date(stringDate);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	return `${day}/${month}/${year}`;
};
export const formatDate = (date, pattern = "yyyy-mm-dd", seperater = "-") => {
	if (date instanceof Date) {
		let rs = null;
		switch (pattern.toLowerCase()) {
			case "yyyy-mm-dd":
				rs = `${date.getFullYear()}${seperater}${
					date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
				}${seperater}${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
				break;
			case "dd-mm-yyyy":
				rs = `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}${seperater}${
					date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
				}${seperater}${date.getFullYear()}`;
				break;
			default:
				throw new Error("date pattern is not founded!");
		}
		return rs;
	} else {
		throw new Error("Is Not A Date!");
	}
};
export const validateEmail = (errors, email) => {
	if (email === "") {
		errors.email = "email is required!";
	}
};
export const validateUsername = (errors, username) => {
	if (username === "") {
		errors.username = "username is required!";
	}
};
export const validatePassword = (errors, password, key = "password") => {
	const decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,}$/;
	if (password === "") {
		errors[key] = "password is required!";
	} else if (!decimal.test(password)) {
		errors[key] =
			"The minimum password of 6 characters. Contains at least 1 upper, 1 number and 1 special character";
	}
};
export const validatePhone = (errors, phone) => {
	const phoneRegex = /^0[1-9]{1}[0-9]{8,9}$/;
	if (phone === "") {
		errors.phone = "Phone number is required!";
	} else if (!phoneRegex.test(phone)) {
		errors.phone = "Phone number is not valid! example: 0234242524";
	}
};

export const toVND = (number) => {
	return Intl.NumberFormat().format(number) + " VNĐ";
};
