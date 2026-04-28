$(document).ready(function () {

    const media = [
        { tip: 'img', src: '../resources/asus_vivobook_pres_1.png' },
        { tip: 'img', src: '../resources/asus_vivobook_pres_2.png' },
        { tip: 'img', src: '../resources/asus_vivobook_pres_3.png' },
        { tip: 'img', src: '../resources/asus_vivobook_pres_4.png' },
        { tip: 'video', src: '../resources/asus_laptop_video.mp4' },
    ];

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
        
        if (slideHeight === 0) {
            slideHeight = $(window).height() * 0.85; 
        }

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

    let timer;

    function startTimer() {
        clearInterval(timer);
        let timeVal = parseInt($('#timerCount').val());
        if (isNaN(timeVal) || timeVal < 1) timeVal = 3; 
        
        timer = setInterval(slideUp, timeVal * 1000);
    }

    startTimer();
    $("#timerCount").on('input', startTimer);

    $('.arrow-down').click(function() {
        slideUp(); 
        startTimer(); 
    });

    $('.arrow-up').click(function() {
        slideDown(); 
        startTimer();
    });

});


// POPUP ------------------------------------------------------------------

// Detectăm click-ul pe orice imagine sau video din slider-container
$('#slider-container').on('click', '.slide', function() {
    let sursa = $(this).attr('src');
    let esteVideo = $(this).is('video');
    
    // Golim containerul de media din pop-up
    $('#popup-media-container').empty();
    
    if (esteVideo) {
        // Dacă e video, creăm un tag video
        $('<video>', {
            src: sursa,
            controls: true,
            autoplay: true
        }).appendTo('#popup-media-container');
    } else {
        // Dacă e imagine, creăm un tag img
        $('<img>', {
            src: sursa
        }).appendTo('#popup-media-container');
    }
    
    // Afișăm pop-up-ul cu un efect de Fade
    $('#custom-popup').css('display', 'flex').hide().fadeIn(300);
    
    // Oprim slider-ul să mai meargă în spate cât timp pop-up-ul e deschis
    clearInterval(timer); 
});

// Închiderea pop-up-ului la click pe X
$('.popup-close').on('click', function() {
    $('#custom-popup').fadeOut(300);
    startTimer(); // Repornim slider-ul
});

// Închiderea pop-up-ului la click oriunde pe fundalul negru
$('#custom-popup').on('click', function(e) {
    if (e.target !== this) return; // Nu închidem dacă dăm click pe imagine, doar pe fundal
    $(this).fadeOut(300);
    startTimer();
});
