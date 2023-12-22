import { useEffect, useState } from "react";
//
import HumbergerMenu from "../HumbergerMenu";
import Header from "../Header";
import Footer from "../Footer";
import ScrollTopButton from "../../components/ScrollTopButton";

export default function DefaultLayout({ children }) {
	const [gotoTop, setGoToTop] = useState(false);
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 300) {
				setGoToTop(true);
			} else {
				setGoToTop(false);
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);
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
			{children}
			<Footer />
			{gotoTop && <ScrollTopButton />}
		</>
	);
}
