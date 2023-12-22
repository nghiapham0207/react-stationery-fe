import { useMemo } from "react";

const DOTS = "...";

// return range
function usePagination(
	totalCount,
	totalPage = 0,
	pageSize,
	siblingCount = 1,
	currentPage,
) {
	const range = (start, end) => {
		const length = end - start + 1;
		// index + start because Array has length items and index from 0
		// so range will be from start
		return Array.from({ length }, (_, index) => index + start);
	};
	const paginationRange = useMemo(() => {
		let totalPageCount = Math.ceil(totalCount / pageSize);
		if (totalPage) {
			totalPageCount = totalPage;
		}
		// siblingCount + firstPage + lastPage + currentPage + 2*DOTS
		const totalPageNumbers = siblingCount + 5; // UI
		if (totalPageCount <= 0) {
			return [];
		}
		/*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
		if (totalPageNumbers >= totalPageCount) {
			return range(1, totalPageCount);
		}
		/*
      Calculate left and right sibling index and make sure they are within
      range 1 and totalPageCount
    */
		const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
		const rightSiblingIndex = Math.min(
			currentPage + siblingCount,
			totalPageCount,
		);
		/*
        We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
    */
		const shouldShowLeftDots = leftSiblingIndex > 2; // just one case cause DOTS should be show
		const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

		const firstPageIndex = 1;
		const lastPageIndex = totalPageCount;
		/*
      Case 2: No left dots to show, but rights dots to be shown
    */
		if (!shouldShowLeftDots && shouldShowRightDots) {
			let leftItemCount = 3 + 2 * siblingCount;
			let leftRange = range(1, leftItemCount);
			return [...leftRange, DOTS, totalPageCount];
		}
		/*
      Case 3: No right dots to show, but left dots to be shown
    */
		if (shouldShowLeftDots && !shouldShowRightDots) {
			let rightItemCount = 3 + 2 * siblingCount; // items left in right side
			let rightRange = range(
				totalPageCount - rightItemCount + 1,
				totalPageCount,
			);
			return [firstPageIndex, DOTS, ...rightRange];
		}
		/*
      Case 4: Both left and right dots to be shown
    */
		if (shouldShowLeftDots && shouldShowRightDots) {
			let middleRange = range(leftSiblingIndex, rightSiblingIndex);
			return [
				firstPageIndex,
				DOTS + "L",
				...middleRange,
				DOTS + "R",
				lastPageIndex,
			];
		}
	}, [totalPage, siblingCount, currentPage]);
	return paginationRange;
}

export default usePagination;
