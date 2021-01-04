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


    // Slide =====================================================================================
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


    // Modal window ==============================================================================

    // Show modal window
    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('slow');
    });

    // Show modal window and rename .catalog__product-name
    $('.button_mini').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.catalog__product-name').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    // Hide modal window
    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });


    // Validate form
    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите своё имя",
                    minlength: jQuery.validator.format("Введите {0} символа")
                },
                phone: "Пожалуйста, введите свой номер",
                email: {
                    required: "Пожалуйста, введите свой E-mail",
                    email: "Неправильно введён адрес"
                }
            }
        });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    // Masked (https://github.com/digitalBush/jquery.maskedinput)
    $('input[name=phone]').mask("+7 (999) 999-99-99");

    // ajax
    $('form').submit(function (e) {
        e.preventDefault();
        if (!$(this).valid()) {
            return;
        }
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn();
            $('form').trigger('reset');
        });
        return false;
    });

    // Smoth scroll and pageup
    // Icon appearing and disappearing
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1100) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    // Smoth scroll 
    $("a[href^=#up]").click(function () {
        const _href = $(this).attr("href");
        $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
        return false;
    });

    // wow
    new WOW().init();
});