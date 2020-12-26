$(document).ready(function () {

    // Carousel (slick) ==========================================================================

    $('.carousel__inner').slick({
        speed: 1000,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrow-left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/arrow-right.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            },
        ]
    });


    // Tabs ======================================================================================

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__row').removeClass('catalog__row_active').eq($(this).index()).addClass('catalog__row_active');
    });

    // Script =====================================================================================

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog__content').eq(i).toggleClass('catalog__content_active');
                $('.catalog__list').eq(i).toggleClass('catalog__list_active')
            })
        })
    };

    toggleSlide('.catalog__link');
    toggleSlide('.catalog__link-back');

});