import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
//
import { store, persistor } from "./redux/store";
import App from "./App.jsx";
import "./index.css";
import { CartsProvider } from "./contexts";

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

// import "./assets/template/js/jquery-3.3.1.min.js";
// import "./assets/template/js/bootstrap.min.js";
// import "./assets/template/js/jquery.nice-select.min.js";
// import "./assets/template/js/jquery-ui.min.js";
// import "./assets/template/js/jquery.slicknav.js";
// import "./assets/template/js/mixitup.min.js";
// import "./assets/template/js/owl.carousel.min.js";
// import "./assets/template/js/main.js";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<QueryClientProvider client={queryClient}>
					<CartsProvider>
						<App />
					</CartsProvider>
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
);
