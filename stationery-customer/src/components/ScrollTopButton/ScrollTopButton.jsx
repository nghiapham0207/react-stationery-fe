export default function ScrollTopButton() {
	const handleClick = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
			block: "nearest",
			inline: "center",
		});
	};
	return (
		<div
			onClick={handleClick}
			className="d-inline-flex align-items-center justify-content-center position-fixed rounded-circle bg-primary text-white"
			style={{
				width: 50,
				height: 50,
				cursor: "pointer",
				right: 25,
				bottom: 25,
			}}>
			<i className="fa fa-arrow-up"></i>
		</div>
	);
}
