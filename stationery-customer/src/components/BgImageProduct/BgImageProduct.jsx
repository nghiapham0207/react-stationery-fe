/**
 *
 * @param {Object} param0
 * @param {String} param0.className
 * @param {String} param0.img
 * @param {React.JSX.Element} param0.children
 * @returns
 */
export default function BgImageProduct({ className = "product__item__pic set-bg", img, children }) {
	// console.log(img);
	return (
		<div
			className={className}
			data-setbg={img}
			style={{
				backgroundImage: `url(${img})`,
				// backgroundImage: `url("${img}"), url(${defaultProduct})`,
			}}>
			{children}
		</div>
	);
}
