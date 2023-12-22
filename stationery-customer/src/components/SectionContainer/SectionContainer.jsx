export default function SectionContainer({
	className = "latest-product spad",
	children,
}) {
	return (
		<>
			{/* <!-- Section Begin --> */}
			<section className={className}>
				<div className="container">{children}</div>
			</section>
			{/* <!-- Section End --> */}
		</>
	);
}
