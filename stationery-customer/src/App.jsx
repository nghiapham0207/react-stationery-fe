import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import jQuery from "jquery";
// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel";

// import("./assets/template/js/jquery-3.3.1.min.js");
// import("./assets/template/js/bootstrap.min.js");
// import("./assets/template/js/jquery.nice-select.min.js");
// import("./assets/template/js/jquery-ui.min.js");
// import("./assets/template/js/jquery.slicknav.js");
// import("./assets/template/js/mixitup.min.js");
// import("./assets/template/js/owl.carousel.min.js");
// import("./assets/template/js/main.js");

// import { useEffect } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { renderRoutes } from "./utils/helpers";
import { privateRoutes, publicRoutes } from "./routes";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken, selectRefreshToken, selectUser } from "./redux/selectors";
import { useEffect } from "react";
import { getUser } from "./services/userServices";

const ProtectedRoute = ({ redirectPath = "/sign-in" }) => {
	const currentUser = useSelector(selectUser);
	const currentPathName = window.location.pathname;
	if (!currentUser) {
		return <Navigate to={`${redirectPath}?next=${encodeURIComponent(currentPathName)}`} replace />;
	}
	return <Outlet />;
};

function App() {
	const accessToken = useSelector(selectAccessToken);
	const refreshToken = useSelector(selectRefreshToken);

	const dispatch = useDispatch();
	// get user here every accessing web app, routes
	useEffect(() => {
		(async () => {
			await getUser(accessToken, refreshToken, dispatch);
		})();
	}, []);
	return (
		<BrowserRouter>
			<ToastContainer />
			<Routes>
				{renderRoutes(publicRoutes)}
				{<Route element={<ProtectedRoute />}>{renderRoutes(privateRoutes)}</Route>}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
