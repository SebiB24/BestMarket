$(document).ready(function () {

    const media = [
        { tip: 'img', src: '../resources/asus_vivobook_pres_1.png' },
        { tip: 'img', src: '../resources/asus_vivobook_pres_2.png' },
        { tip: 'img', src: '../resources/asus_vivobook_pres_3.png' },
        { tip: 'img', src: '../resources/asus_vivobook_pres_4.png' },
        { tip: 'video', src: '../resources/asus_laptop_video.mp4' },
    ];

    let timer;

    $.each(media, function (index, item) {
        if (item.tip === 'img') {
            $('<img>', {
                src: item.src,
                class: 'slide'
            }).appendTo('#slider-container');
        } else {
            $('<video>', {
                src: item.src,
                class: 'slide',
                autoplay: true,
                muted: true,
                loop: true
            }).appendTo('#slider-container');
        }
    });


    function updateWindowHeight() {
        let nrVisible = parseInt($('#imgCount').val()) || 1;

        let slideHeight = $('.slide').first().height();
        $('#slider-wrapper').css('height', (nrVisible * slideHeight) + 'px');
    }
    updateWindowHeight();
    $('#imgCount').on('input', updateWindowHeight);


    function slideUp() {
        let slideHeight = $('.slide').first().height();

        $('.slide').first().animate({
            marginTop: -slideHeight
        }, 500, function () {
            $(this).appendTo('#slider-container').css('marginTop', 0);
        });
    }
    function slideDown() {
        let slideHeight = $('.slide').first().height();

        $('.slide').last()
            .prependTo('#slider-container')
            .css('marginTop', -slideHeight)
            .animate({ marginTop: 0 }, 500);
    }


    function startTimer() {
        clearInterval(timer);
        let timeVal = parseInt($('#timerCount').val());
        timer = setInterval(slideUp, timeVal * 1000);
    }

    startTimer();
    $("#timerCount").on('input', startTimer);

    $('.arrow-down').click(function () {
        slideUp();
        startTimer();
    });

    $('.arrow-up').click(function () {
        slideDown();
        startTimer();
    });

});


// POPUP ------------------------------------------------------------------

$('#slider-container').on('click', '.slide', function () {
    let sursa = $(this).attr('src');
    let esteVideo = $(this).is('video');

    $('#popup-media-container').empty();

    if (esteVideo) {
        $('<video>', {
            src: sursa,
            controls: true,
            autoplay: true
        }).appendTo('#popup-media-container');
    } else {
        $('<img>', {
            src: sursa
        }).appendTo('#popup-media-container');
    }

    $('#custom-popup').css('display', 'flex').fadeIn(300);
});

$('.popup-close').on('click', function () {
    $('#custom-popup').fadeOut(300);
});

$('#custom-popup').on('click', function (e) {
    if (e.target !== this) return;
    $(this).fadeOut(300);
});
