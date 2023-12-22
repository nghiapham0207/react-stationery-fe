import starIcon from "../../assets/star.svg";
import halfStar from "../../assets/half-star.svg";

export default function Stars({ numberOfStar = 0, className = "d-inline-block" }) {
	const star = Math.floor(numberOfStar);
	const hasHalfStar = numberOfStar - star > 0;
	return (
		<>
			{Array.from({ length: star }).map((_, index) => (
				<img
					key={index}
					className="d-inline-block"
					src={starIcon}
					alt="star"
					style={{ width: 18, height: 18 }}
				/>
			))}
			{hasHalfStar && (
				<img
					className="d-inline-block"
					src={halfStar}
					alt="star"
					style={{ width: 18, height: 18 }}
				/>
			)}
		</>
	);
}
