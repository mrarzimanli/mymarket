$(window).on('load', function () { })

$(function () {
    $(document).on('click', '.dropdown__general__header', function () {
        $(this).closest('.dropdown__general').toggleClass('show')
    });

    $(document).on('click', '.dropdown__general__body span', function () {
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

    // form general
    $('#headerSearchForm .btn__submit').click(function (e) {
        e.preventDefault()

        let form = $(this).closest('#headerSearchForm')
        let city = form.find('.dropdown__general__header').data('value')

        form.find('#searchCityInput').val(city)
        form.submit()
    })
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

    $('#btnNewAd').click(function () {
        // burda validasiyalar zad ola bilər
        if (true) {
            $('#smsCodeModal').modal('show')
        } else {

        }
    })

    $('#btnLogin').click(function () {
        verifyNextStep($(this))
    });

    $('#btnVerifyLogin').click(function () {
        alert("meyveye deyme")
    });

    $('#btnVerifyAd').click(function () {
        console.log("efwjhfesj");
        verifyNextStep($(this))
    });

    $('.modal-verification .btn__prev').click(function () {
        verifyPrevStep($(this))
    });

    $('.modal-verification .btn__next').click(function () {
        verifyNextStep($(this))
    });

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

    $('.modal-verification').on('show.bs.modal', function () {
        $(this).find('[autofocus]').focus();
    })

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

    // functions
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

    function clearForm(form) {
        form.find('input').val('')
        form.find('.btn__submit').prop('disabled', true)
    }

    const uniqId = (() => {
        let i = 0;
        return () => {
            return i++;
        }
    })();
})
