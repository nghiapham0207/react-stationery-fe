export default function Language({
	className = "header__top__right__language",
}) {
	return (
		<div className={className}>
			<img src="/img/language.png" alt="" />
			<div>English</div>
			<span className="arrow_carrot-down" />
			<ul>
				<li>
					<a href="#">Spanis</a>
				</li>
				<li>
					<a href="#">English</a>
				</li>
			</ul>
		</div>
	);
}
