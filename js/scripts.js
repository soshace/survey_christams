$(function () {
    var currentStep = 0,
        originalTitle = document.title,
        $loaderScreen = $('.js-loading-screen'),
        $finalPage = $('.js-final-page'),
        steps = [
            $('.js-start-page'),
            $('.question-page-1'),
            $('.question-page-2'),
            $('.question-page-3'),
            $('.question-page-4')
        ];

    /**
     * Function shows loader page and start timer
     *
     * @function
     * @name showLoaderScreen
     * @param {number} loadTime
     * @returns {undefined}
     */
    function showLoaderScreen(loadTime) {
        $loaderScreen.removeClass('hide');
        setTimeout(function () {
            $loaderScreen.addClass('hide');
            $finalPage.removeClass('hide');
        }, loadTime);
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
                mp3: '/audio/uk.mp3'
            }).jPlayer('play');
        },
        swfPath: '/js/vendors/jplayer',
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
        event.preventDefault();
        steps[currentStep].addClass('hide');
        currentStep++;
        if (currentStep !== steps.length) {
            steps[currentStep].removeClass('hide');
            return;
        }

        showLoaderScreen(3000);
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
});