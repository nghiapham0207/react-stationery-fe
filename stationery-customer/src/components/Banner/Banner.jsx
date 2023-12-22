const imgStyle = {
	width: 555,
	height: 262,
	borderRadius: 8,
};

export default function Banner() {
	return (
		<>
			{/* <!-- Banner Begin --> */}
			<div className="banner">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 col-md-6 col-sm-6">
							<div className="banner__pic">
								<img style={imgStyle} src="/img/banner/home-2.png" alt="" />
							</div>
						</div>
						<div className="col-lg-6 col-md-6 col-sm-6">
							<div className="banner__pic">
								<img style={imgStyle} src="/img/banner/home-3.webp" alt="" />
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <!-- Banner End --> */}
		</>
	);
}
