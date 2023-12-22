/**
 *
 * @param {Function} sliderFn
 */
export const initiallizeSlider = (sliderFn) => {
	setTimeout(() => {
		sliderFn();
	}, 500);
};

export const categoriesSlider = () => {
	$(".categories__slider").owlCarousel({
		loop: true,
		margin: 0,
		items: 4,
		dots: false,
		nav: true,
		navText: ["<span class='fa fa-angle-left'><span/>", "<span class='fa fa-angle-right'><span/>"],
		animateOut: "fadeOut",
		animateIn: "fadeIn",
		// smartSpeed: 1200,
		smartSpeed: 600,
		autoHeight: false,
		// autoplay: true,
		responsive: {
			0: {
				items: 1,
			},
			480: {
				items: 2,
			},
			768: {
				items: 3,
			},
			992: {
				items: 4,
			},
		},
	});
};

export const latestProductsSlider = () => {
	/*--------------------------
				Latest Product Slider
		----------------------------*/
	$(".latest-product__slider").owlCarousel({
		loop: true,
		margin: 0,
		items: 1,
		dots: false,
		nav: true,
		navText: ["<span class='fa fa-angle-left'><span/>", "<span class='fa fa-angle-right'><span/>"],
		smartSpeed: 1200,
		autoHeight: false,
		autoplay: true,
	});
};

export const productDetailsPicSlider = () => {
	/*---------------------------------
        Product Details Pic Slider
    ----------------------------------*/
	$(".product__details__pic__slider").owlCarousel({
		loop: true,
		margin: 20,
		items: 4,
		dots: true,
		smartSpeed: 1200,
		autoHeight: false,
		autoplay: true,
	});

	/*------------------
        Single Product
    --------------------*/
	$(".product__details__pic__slider img").on("click", function () {
		var imgurl = $(this).data("imgbigurl");
		var bigImg = $(".product__details__pic__item--large").attr("src");
		if (imgurl != bigImg) {
			$(".product__details__pic__item--large").attr({
				src: imgurl,
			});
		}
	});
};
