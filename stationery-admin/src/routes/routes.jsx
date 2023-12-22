import NonLayout from "../layouts/NonLayout";
//
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import OrderPage from "../pages/OrderPage";
import ProductPage from "../pages/ProductPage";
import RevenuePage from "../pages/RevenuePage";
import CategoryPage from "../pages/CategoryPage";
import BrandPage from "../pages/BrandPage";

export const routes = {
	signIn: "/sign-in",
	signUp: "/sign-up",

	order: "/order",
	listProduct: "/product",
	revenue: "/revenue",
	listCategory: "/category",
	listBrand: "/brand",
};

export const publicRoutes = [
	{ path: routes.signIn, page: SignInPage, layout: NonLayout },
	{ path: routes.signUp, page: SignUpPage, layout: NonLayout },
];

export const privateRoutes = [
	{ path: routes.order, page: OrderPage, layout: null },
	{ path: routes.listProduct, page: ProductPage, layout: null },
	{ path: routes.revenue, page: RevenuePage, layout: null },
	{ path: routes.listCategory, page: CategoryPage, layout: null },
	{ path: routes.listBrand, page: BrandPage, layout: null },
];
