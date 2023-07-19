$(window).on('load', function () { })

$(function () {
    $('.dropdown__general__header').click(function () {
        $(this).closest('.dropdown__general').toggleClass('show')
    });

    $('.dropdown__general__body span').click(function () {
        const value = $(this).data("value")
        const text = $(this).text()
        const dropdown = $(this).closest('.dropdown__general')

        dropdown.find('.dropdown__general__header').data("value", value)
        dropdown.find('.dropdown__general__header__content').text(text)
        dropdown.find('.dropdown__general__body span').removeClass("selected")
        dropdown.removeClass('show')
        $(this).addClass('selected')
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

    $('.btn__fav').click(function () {
        $(this).find('svg').toggle()
    });

    // Tel input
    const isNumericInput = (event) => {
        const key = event.keyCode;
        return ((key >= 48 && key <= 57) || // Allow number line
            (key >= 96 && key <= 105) // Allow number pad
        );
    };

    const isModifierKey = (event) => {
        const key = event.keyCode;
        return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
            (key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
            (key > 36 && key < 41) || // Allow left, up, right, down
            (
                // Allow Ctrl/Command + A,C,V,X,Z
                (event.ctrlKey === true || event.metaKey === true) &&
                (key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
            )
    };

    const enforceFormat = (event) => {
        // Input must be of a valid number format or a modifier key, and not longer than ten digits
        if (!isNumericInput(event) && !isModifierKey(event)) {
            event.preventDefault();
        }
    };

    const formatToPhone = (event) => {

        const target = event.target;
        const input = event.target.value.replace(/\D/g, '').substring(0, 7);

        if (input.length === 7) {
            $(event.target).closest('.form-general').find('.btn__submit').prop('disabled', false)
        } else {
            $(event.target).closest('.form-general').find('.btn__submit').prop('disabled', true)
        }

        if (isModifierKey(event)) { return; }

        const start = input.substring(0, 3);
        const middle = input.substring(3, 5);
        const last = input.substring(5, 7);

        if (input.length > 4) {
            target.value = `${start} - ${middle} - ${last}`;
        }
        else if (input.length > 2) {
            target.value = `${start} - ${middle}`;
        }
        else if (input.length > 0) {
            target.value = `${start}`;
        }
    };

    const phoneInputs = Array.from(document.querySelectorAll('.phoneNumber'));
    phoneInputs && phoneInputs.forEach(phoneInput => {
        phoneInput.addEventListener('keydown', enforceFormat);
        phoneInput.addEventListener('keyup', formatToPhone);
    })


    // form general
    $(document).on('keydown', 'input[pattern]', function (e) {
        var input = $(this);
        var oldVal = input.val();
        var regex = new RegExp(input.attr('pattern'), 'g');

        setTimeout(function () {
            var newVal = input.val();
            if (!regex.test(newVal)) {
                input.val(oldVal);
            }
        }, 1);
    });

    // tooltips
    const tooltips = document.querySelectorAll('.tooltip-general')
    tooltips.forEach(t => {
        new bootstrap.Tooltip(t)
    });

    $('.form-control-file').change(function () {
        let files = $(this)[0].files;

        if (files.length) {
            let label = $('.form-control-file').prev('.file-upload-label')
            label.empty()
            $.map(files, function (f) {
                return label.append(`<span>${f.name}</span>`)
            })
        }
    });
})
