import Footer from "../Footer";
import Header from "../Header";
import HumbergerMenu from "../HumbergerMenu";
import SidebarUser from "./SidebarUser";

export default function UserLayout({ children }) {
	const handleOpenOverlay = () => {
		$(".humberger__menu__wrapper").removeClass("show__humberger__menu__wrapper");
		$(".humberger__menu__overlay").removeClass("active");
		$("body").removeClass("over_hid");
	};
	return (
		<>
			<div className="humberger__menu__overlay" onClick={handleOpenOverlay} />
			<HumbergerMenu />
			<Header />
			<div>
				{/* body */}
				<div className="bg-white">
					<div className="container">
						<div className="d-flex flex-column">
							<div className="d-flex flex-column flex-lg-row gap-4 my-3">
								<SidebarUser />
								<div className="flex-grow-1 d-flex flex-column gap-3">
									{/* here */}
									{children}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
