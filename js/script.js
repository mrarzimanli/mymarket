$(window).on('load', function () { })

$(function () {
    $('.search__dropdown__header').click(function () {
        $(this).closest('.search__dropdown').toggleClass('show')
    });

    $('.search__dropdown__body span').click(function () {
        const value = $(this).data("value")
        const text = $(this).text()

        $('.search__dropdown__header').data("value", value)
        $('.search__dropdown__header__content').text(text)
        $('.search__dropdown').removeClass('show')
    });

    $('.categories__content-header .category').click(function () {
        if (!$(this).hasClass('show')) {
            $('.categories__content-header .category').removeClass('show')
            $(this).addClass('show')
            $('.categories__content-body').addClass('show')
        } else {
            $('.categories__content-body').removeClass('show')
            $(this).removeClass('show')
        }
    });

    $('#btn-toggle-catalog').click(function () {
        $(this).find('svg').toggle()
        $('.header__catalog').toggleClass('show')
    });

    $('.catalog-list li').hover(function () {
        const catalogItem = $(this).data("catalog-item")

        if (catalogItem !== undefined) {
            $(this).closest('.catalog-list__item').find('.catalog-attributes').removeClass('show')
            $(this).closest('.catalog-list__item').find('.catalog-attributes--' + catalogItem).addClass('show')
        }
    });

    $('.catalog-list--level-1 > ul > li').hover(function () {
        $(".catalog-list.show").removeClass('show')
    });

    $('.btn__fav').click(function () {
        $(this).find('svg').toggle()
    });
})
