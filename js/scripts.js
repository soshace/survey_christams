'use strict';

$(function () {
    var selectedItemTemplate = '<span class="question-page__variants__item js-selected">' +
            '<span class="sprite sprite-option-enabled"></span>' +
            '<span class="js-selected-text"></span>' +
            '</span>',
        questionItem = '<a href="#" class="js-choose question-page__variants__item">' +
            '<span class="sprite sprite-option"></span>' +
            '<span class="js-text"></span>' +
            '</a>',
        currentStep = 0,
        originalTitle = document.title,
        $loaderScreen = $('.js-loading-screen'),
        $finalPage = $('.js-final-page'),
        steps = [
            $('.js-question-page-1'),
            $('.js-question-page-2'),
            $('.js-question-page-3'),
            $('.js-question-page-4')
        ];

    /**
     * Function shows loader page and start timer
     *
     * @function
     * @name showLoaderScreen
     * @param {number} loadTime
     * @returns {undefined}
     */
    function startLoader(loadTime) {
        var $loader = $('.js-loader'),
            fillerWidth = 0,
            intervalIndex,
            interval = 10,
            loaderIncrease = 100 / (loadTime / interval);

        if ($loader.length) {
            intervalIndex = setInterval(function () {
                fillerWidth += loaderIncrease;
                $loader.css('width', fillerWidth + '%');

                if (fillerWidth >= 100) {
                    clearInterval(intervalIndex);
                    location.href = 'index4.html';
                }
            }, interval);
        }
    }

    /**
     * Function return name of current city
     *
     * @function
     * @name getCity
     * @returns {string}
     */
    function getCity() {
        var city;

        if (typeof geoip_city === 'function') {
            city = geoip_city();
            if (city) {
                return city;
            }
        }

        return 'Chicago';
    }

    /**
     * Function positions modal window (.js-modal)
     *
     * @function
     * @name modalPositioning
     * @returns {undefined}
     */
    function modalPositioning() {
        var $this = $(this),
            $modalWindow = $('.js-modal'),
            modalWindowHeight,
            windowHeight;

        if ($modalWindow.length) {
            modalWindowHeight = $modalWindow.height();
            windowHeight = $this.height();

            if (windowHeight > modalWindowHeight) {
                $modalWindow.css('top', windowHeight / 2 - modalWindowHeight / 2);
                return;
            }

            $modalWindow.css('top', 0);
        }
    }

    /**
     * Function dynamically changes title of document
     *
     * @function
     * @name flashTitle
     * @param {string} title New title of document
     * @returns {undefined}
     */
    function flashTitle(title) {
        if (document.title === originalTitle) {
            document.title = title;
            return;
        }

        document.title = originalTitle;
    }

    $('.js-player').jPlayer({
        ready: function () {
            $(this).jPlayer('setMedia', {
                mp3: 'audio/uk.mp3'
            }).jPlayer('play');
        },
        swfPath: 'js/vendors/jplayer',
        supplied: 'mp3',
        cssSelectorAncestor: '',
        cssSelector: {
            play: '.js-play',
            pause: '.js-pause',
            playBar: '.js-play-bar',
            noSolution: '.js-no-solution'
        }
    });

    $('.js-next').on('click', function (event) {
        var $currentStep = steps[currentStep];

        $currentStep.addClass('hide');
        currentStep++;

        if (currentStep !== steps.length) {
            steps[currentStep].removeClass('hide');
            event.preventDefault();
        }
    });

    $('.js-previous').on('click', function (event) {
        event.preventDefault();
        steps[currentStep].addClass('hide');
        currentStep--;
        steps[currentStep].removeClass('hide');
    });

    setInterval(function () {
        flashTitle('2014 User Survey');
    }, 2000);

    $('.js-city').text(getCity());

    $('.js-questions').on('click', '.js-choose', function (event) {
        var $this = $(this),
            currentText = $this.text(),
            $newSelectedElement = $(selectedItemTemplate),
            $selected = $this.siblings('.js-selected'),
            selectedText,
            $questionItem = $(questionItem);

        if ($selected.length) {
            selectedText = $('.js-selected-text', $selected).text();
            $('.js-text', $questionItem).text(selectedText);
            $selected.replaceWith($questionItem);
        }

        $this.parents('.js-question-page').trigger('chosen');

        $('.js-selected-text', $newSelectedElement).text(currentText);
        $this.replaceWith($newSelectedElement);
        event.preventDefault();
    });

    $('.js-question-page').on('chosen', function () {
        var $this = $(this);

        $('.js-next', $this).removeClass('disabled');
    });

    $(window).on('resize', modalPositioning);
    modalPositioning.call(window);
    startLoader(3000);
});