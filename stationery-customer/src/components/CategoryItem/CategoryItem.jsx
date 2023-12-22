export default function CategoryItem({ category }) {
	const { name, image } = category;
	return (
		<div
			className="categories__item set-bg"
			data-setbg={image}
			style={{
				backgroundImage: `url(${image})`,
			}}>
			<h5>
				<a href="#" title={name}>
					{name}
				</a>
			</h5>
		</div>
	);
}
