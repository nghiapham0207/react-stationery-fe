import HomePage from "../pages/HomePage";
import ShopDetailPage from "../pages/ShopDetailPage";
import ShopPage from "../pages/ShopPage";
import SigInPage from "../pages/SignInPage";
import NonLayout from "../layouts/NonLayout";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import ShopingCartPage from "../pages/ShopingCartPage";
import CheckoutPage from "../pages/CheckoutPage";
import SignUpPage from "../pages/SignUpPage";
import PurchasePage from "../pages/PurchasePage";
import UserLayout from "../layouts/UserLayout";
import ProfilePage from "../pages/ProfilePage";
import ContactPage from "../pages/ContactPage";
import TestSocketPage from "../pages/TestSocketPage";

export const routes = {
	home: "/",
	shop: "/shop",
	shopDetail: "/shop/:productId",
	signIn: "/sign-in",
	signUp: "/sign-up",
	forgotPassword: "/forgot-password",
	resetPassword: "/reset-password",
	shopingCart: "/cart",
	checkout: "/checkout",
	purchase: "/user/purchase",
	profile: "/user/profile",
	contact: "/contact",
	testSocket: "/test-socket",
};

export const publicRoutes = [
	{ path: routes.home, page: HomePage, layout: null },
	{ path: routes.shop, page: ShopPage, layout: null },
	{ path: routes.signIn, page: SigInPage, layout: NonLayout },
	{ path: routes.signUp, page: SignUpPage, layout: null },
	{ path: routes.forgotPassword, page: ForgotPasswordPage, layout: NonLayout },
	{ path: routes.resetPassword, page: ResetPasswordPage, layout: null },
	{ path: routes.contact, page: ContactPage, layout: null },
];

export const privateRoutes = [
	{ path: routes.shopDetail, page: ShopDetailPage, layout: null },
	{ path: routes.shopingCart, page: ShopingCartPage, layout: null },
	{ path: routes.checkout, page: CheckoutPage, layout: null },
	{ path: routes.purchase, page: PurchasePage, layout: UserLayout },
	{ path: routes.profile, page: ProfilePage, layout: UserLayout },
	{ path: routes.testSocket, page: TestSocketPage, layout: null },
];
