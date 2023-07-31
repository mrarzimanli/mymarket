$(window).on('load', function () { })

$(function () {
    $(document).click(function (e) {
        e.stopPropagation()

        const dropdown = $('.dropdown__general')

        if (!dropdown.is(e.target) && dropdown.has(e.target).length === 0) {
            dropdown.removeClass('show')
        }
    })

    $(document).on('click', '.dropdown__general__header', function (e) {
        e.stopPropagation()
        $('.dropdown__general').not($(this).closest('.dropdown__general')).removeClass('show')
        $(this).closest('.dropdown__general').toggleClass('show')
    });

    $(document).on('click', '.dropdown__general__body span', function () {
        selectDropdownValue($(this))
    });

    $(document).on('click', '.dropdown__general__header__prefix', function (e) {
        e.stopPropagation()
        clearDropdownValue($(this))
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

    $('.dropdown__general__body span.selected').each(function () {
        selectDropdownValue($(this))
    })

    $('#btn-toggle-catalog').click(function () {
        $(this).find('svg').toggle()
        $('.header__catalog').toggleClass('show')
    });

    $('.btn__fav').click(function () {
        $(this).toggleClass('is-fav')
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

    const formatToVerifyCode = (event) => {

        const target = event.target;
        const input = event.target.value.replace(/\D/g, '').substring(0, 4);

        if (input.length === 4) {
            $(event.target).closest('.form-general').find('.btn__submit').prop('disabled', false)
        } else {
            $(event.target).closest('.form-general').find('.btn__submit').prop('disabled', true)
        }

        if (isModifierKey(event)) { return; }

        const first = input.substring(0, 1);
        const second = input.substring(1, 2);
        const third = input.substring(2, 3);
        const fourth = input.substring(3, 4);

        if (input.length >= 4) {
            target.value = `${first} ${second} ${third} ${fourth}`;
        } else if (input.length === 3) {
            target.value = `${first} ${second} ${third} `;
        } else if (input.length === 2) {
            target.value = `${first} ${second} `;
        } else if (input.length === 1) {
            target.value = `${first} `;
        }
    };

    formatPhoneNumberInputs()
    formatVerifyCodeInputs()

    // Header search
    $('#headerSearchForm .btn__submit').click(function (e) {
        e.preventDefault()

        let form = $(this).closest('#headerSearchForm')
        let city = form.find('.dropdown__general__header').data('value')

        form.find('#searchCityInput').val(city)
        form.submit()
    })

    // Category filters
    $('#filtersForm .btn__submit').click(function (e) {
        e.preventDefault()

        let form = $(this).closest('#filtersForm')
        let filters = form.find('.filter')

        filters.each(function () {
            const filterValue = $(this).find('.filter__dropdown__header').data('value')
            $(this).children('.filter-input').val(filterValue)
        })

        form.submit()
    })

    $('.price-input-group input').keyup(function () {

        const input = $(this)
        const inputValue = input.val()
        const maxLenght = input.attr('maxlength')

        if (inputValue.length > maxLenght) {
            input.val(inputValue.slice(0, maxLenght))
            return
        }

        const inputGroup = input.closest('.price-input-group')
        const dropdown = input.closest('.dropdown__general')
        let minValue = inputGroup.find('.price-min').val()
        let maxValue = inputGroup.find('.price-max').val()

        dropdown.addClass('active')
        dropdown.find('.dropdown__general__header').data("min-value", minValue)
        dropdown.find('.dropdown__general__header').data("max-value", maxValue)

        if (minValue && maxValue) {
            dropdown.find('.dropdown__general__header__content__value').text(minValue + " - " + maxValue)
        } else if (maxValue) {
            dropdown.find('.dropdown__general__header__content__value').text("maks. " + maxValue)
        } else if (minValue) {
            dropdown.find('.dropdown__general__header__content__value').text("min. " + minValue)
        } else {
            const label = dropdown.find('.dropdown__general__header__content__label').text()
            dropdown.find('.dropdown__general__header__content__value').text(label)
            dropdown.removeClass('active')
            dropdown.find('.dropdown__general__header').removeData("value")
        }
    });

    // New ad
    $(document).on('keydown', 'input[pattern]', function () {
        const input = $(this);
        const oldVal = input.val();
        const regex = new RegExp(input.attr('pattern'), 'g');

        setTimeout(function () {
            const newVal = input.val();
            if (!regex.test(newVal)) {
                input.val(oldVal);
            }
        }, 1);
    });

    $(document).on('click', '.btn-add-phone', function () {
        const input = `<div class="input-group phone-input-group">
                            <div class="dropdown__general phone__dropdown">
                                <div class="dropdown__general__header phone__dropdown__header" data-value="050">
                                    <div class="dropdown__general__header__content phone__dropdown__header__content">050</div>
                                    <div class="dropdown__general__header__suffix phone__dropdown__header__suffix">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.5 5.75L8 10.25L3.5 5.75" stroke="#ACB1C4" stroke-linecap="round" />
                                        </svg>
                                    </div>
                                </div>
                                <div class="dropdown__general__body phone__dropdown__body">
                                    <span class="selected" data-value="050">050</span>
                                    <span data-value="051">051</span>
                                    <span data-value="070">070</span>
                                    <span data-value="077">077</span>
                                    <span data-value="055">055</span>
                                    <span data-value="099">099</span>
                                </div>
                            </div>
                            <input type="text" name="additional_phone[]" class="form-control phoneNumber" aria-label="Phone input" maxlength="13" placeholder="_ _ _ - _ _ - _ _">
                            <button type="button" class="input-group-text btn-remove-phone btn__icon--gray btn__icon--stroke">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M3 6H5M5 6H21M5 6V20C5 20.5304 5.21071 21.0391 5.58579 21.4142C5.96086 21.7893 6.46957 22 7 22H17C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0391 19 20.5304 19 20V6H5ZM8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M10 11V17M14 11V17" stroke="#ACB1C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>`;
        const count = $(this).closest('.input-group-wrapper').find('.input-group').length

        if (count < 3) {
            $(this).closest('.input-group-wrapper').append(input)
            formatPhoneNumberInputs()
        } else {
            $(this).prop('disabled',)
        }
    });

    $(document).on('click', '.btn-remove-phone', function () {
        $(this).closest('.input-group').remove()
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

    $('#discountSwitch').change(function () {
        $(this).closest('#newAdForm').find('.row.discount').toggleClass('d-none')
    })

    $('#btnNewAd').click(function () {
        $(this).closest('#newAdForm').find('.phoneNumber').each(function () {
            let tel = $(this).val()
            let prefix = $(this).prev('.phone__dropdown').find('.phone__dropdown__header').data('value');
            $(this).val((prefix + tel).replace(/\D/g, ''));
        })
        $('#smsCodeModal').modal('show')
    })

    $('#btnVerifyAd').click(function () {
        verifyNextStep($(this))
    });

    // Login
    $('#btnLogin').click(function () {
        verifyNextStep($(this))
    });

    $('.modal-verification .btn__prev').click(function () {
        verifyPrevStep($(this))
    });

    $('.modal-verification .btn__next').click(function () {
        verifyNextStep($(this))
    });

    $('.modal-verification').on('show.bs.modal', function () {
        $(this).find('[autofocus]').focus();
    });

    // Increase balance
    $('.payment-option').click(function () {
        $('.payment-option').not($(this)).removeClass('selected')
        $(this).addClass('selected')

        if (!$(this).hasClass('payment-option--custom')) {
            const payAmount = $(this).data('value')
            const customPayInput = $(this).closest('.payment-options').find('.payment-option--custom input')
            customPayInput.val(payAmount)
            customPayInput.text(payAmount)
        }

    })

    // Tooltips
    const tooltips = document.querySelectorAll('.tooltip-general')
    tooltips.forEach(t => {
        new bootstrap.Tooltip(t)
    });

    // Swiper
    let postThumbSwiper = new Swiper(".postThumbSwiper", {
        spaceBetween: 15,
        slidesPerView: 5,
        lazy: true,
        freeMode: true,
        keyboardControl: true,
        watchSlidesProgress: true,
        direction: 'vertical'
    });

    let postSwiper = new Swiper(".postSwiper", {
        spaceBetween: 15,
        lazy: true,
        thumbs: {
            swiper: postThumbSwiper,
        },
    });

    // Functions
    function selectDropdownValue(el) {
        const value = el.data("value")
        const text = el.text()
        const dropdown = el.closest('.dropdown__general')

        if (dropdown.hasClass('dropdown__general--clear')) {
            dropdown.find('.dropdown__general__header__content__value').text(text)
        } else {
            dropdown.find('.dropdown__general__header__content').text(text)
        }

        dropdown.find('.dropdown__general__header').data("value", value)
        dropdown.find('.dropdown__general__body span').removeClass("selected")
        dropdown.removeClass('show')
        dropdown.addClass('active')
        el.addClass('selected')
    }

    function clearDropdownValue(el) {
        const dropdown = el.closest('.dropdown__general')

        if (dropdown.hasClass('dropdown__general--clear')) {
            const label = dropdown.find('.dropdown__general__header__content__label').text()
            dropdown.removeClass('active')
            dropdown.find('.dropdown__general__header__content__value').text(label)
            dropdown.find('.dropdown__general__header').removeData("value")
            dropdown.find('.dropdown__general__body span').removeClass("selected")
            el.closest('.filter').find('.filter-input').val('')
        }
    }

    function formatPhoneNumberInputs() {
        const phoneInputs = Array.from(document.querySelectorAll('.phoneNumber'));
        phoneInputs && phoneInputs.forEach(phoneInput => {
            phoneInput.addEventListener('keydown', enforceFormat);
            phoneInput.addEventListener('keyup', formatToPhone);
        })
    }

    function formatVerifyCodeInputs() {
        const verifyCodeInputs = Array.from(document.querySelectorAll('.verifyCode'));
        verifyCodeInputs && verifyCodeInputs.forEach(verifyCodeInput => {
            verifyCodeInput.addEventListener('keydown', enforceFormat);
            verifyCodeInput.addEventListener('keyup', formatToVerifyCode);
        })
    }

    function verifyNextStep(el) {
        const target = el.data('target')
        if (target) {
            el.closest('.step').hide(0)
            el.closest('.modal-verification').find(target).show(0)
            el.closest('.step').find('.btn__next').show(0)
        }
    }

    function verifyPrevStep(el) {
        const target = el.data('target')
        if (target) {
            el.closest('.step').hide(0)
            el.closest('.modal-verification').find(target).show(0)
        } else {
            el.closest('.modal-verification').modal('hide')
            clearForm(el.closest('.modal-verification'))
        }
    }

    function clearForm(form) {
        form.find('input').val('')
        form.find('.btn__submit').prop('disabled', true)
        form.find('.btn__next').hide(0)
    }

    const uniqId = (() => {
        let i = 0;
        return () => {
            return i++;
        }
    })();
})
