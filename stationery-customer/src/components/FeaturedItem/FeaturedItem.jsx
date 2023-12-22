export default function FeaturedItem() {
	return (
		<div className="featured__item">
			<div
				className="featured__item__pic set-bg"
				data-setbg="/img/featured/feature-1.jpg"
				style={{
					backgroundImage: 'url("/img/featured/feature-1.jpg")',
				}}>
				<ul className="featured__item__pic__hover">
					<li>
						<a href="#">
							<i className="fa fa-heart" />
						</a>
					</li>
					<li>
						<a href="#">
							<i className="fa fa-info-circle" />
						</a>
					</li>
					<li>
						<a href="#">
							<i className="fa fa-shopping-cart" />
						</a>
					</li>
				</ul>
			</div>
			<div className="featured__item__text">
				<h6>
					<a href="#">Crab Pool Security</a>
				</h6>
				<h5>$30.00</h5>
			</div>
		</div>
	);
}
