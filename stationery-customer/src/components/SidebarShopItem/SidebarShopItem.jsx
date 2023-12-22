export default function SidebarShopItem({ title, children }) {
	return (
		<div className="sidebar__item">
			<h4>{title}</h4>
			{children}
		</div>
	);
}
