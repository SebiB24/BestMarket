$(document).ready(function () {
    const PRAG_TRANSPORT = 7000;
    let reducere_procentuala = 0;

    // calculare pret
    function calculeazaCosul() {
        let total_brut = 0;

        $('.cart-card').each(function () {
            total_brut += parseFloat($(this).data('price'));
        });

        let total_final = total_brut - (total_brut * reducere_procentuala);

        $('#final-total').text(Math.ceil(total_final).toLocaleString() + " RON")

        if (reducere_procentuala > 0 && total_brut > 0) {
            $('#original-total').text(total_brut.toLocaleString() + " RON").show();
        } else {
            $('#original-total').hide();
        }

        updateIndicator(total_final);
    }


    // miscare ac
    function updateIndicator(suma_curenta) {
        const CIRCUMFERINTA = 251; // Circumferința

        let procent = suma_curenta / PRAG_TRANSPORT

        let grade = procent * 180;
        $('#gauge-needle').css('transform', `rotate(${grade}deg)`);

        let offset = CIRCUMFERINTA - (procent * CIRCUMFERINTA);
        $('#gauge-progress').css('stroke-dashoffset', offset);

        if (suma_curenta >= PRAG_TRANSPORT) {
            $('#shipping-info').text("LIVRARE GRATUITĂ!").css({ 'background': '#28a745', 'color': 'white' });
        } else if (suma_curenta === 0) {
            $('#shipping-info').text("Coșul este gol").css('background', '#777');
        } else {
            let rest = PRAG_TRANSPORT - suma_curenta;
            $('#shipping-info').text(`Încă ${rest.toLocaleString()} RON necesari`).css({ 'background': '#ffa500', 'color': 'white' });
        }
    }


    $('.cart-remove-item').click(function () {
        let card = $(this).closest('.cart-card');
        card.fadeOut(400, function () {
            $(this).remove();
            calculeazaCosul();
        });
    });

    
    // VALIDARE CUPON ------------------------------------------------------------------
    $('#apply-coupon').click(function () {
        let code = $('#coupon-code').val();

        if (code === "BESTMARKET2026") {
            if (reducere_procentuala === 0.20) {
                return;
            }

            let $gift = $('#jquery-gift-overlay');
            let $icon = $gift.find('i');
            let $text = $('#gift-text');

            $gift.css({ top: '-150px', display: 'block' });
            $icon.css({ fontSize: '100px', color: '#e74c3c' });
            $text.hide();

            $gift.animate({ top: '40%' }, 600, 'swing', function () {
                $icon.animate({ fontSize: '140px' }, 200).css('color', '#28a745');
                $text.slideDown(300);

                setTimeout(function () {
                    $gift.fadeOut(500, function () {
                        reducere_procentuala = 0.20;
                        $('#coupon-msg').text("Succes! Reducere de 20% aplicată.").css('color', '#28a745');
                        calculeazaCosul();
                    });
                }, 1500);
            });

        } else {
            reducere_procentuala = 0;
            $('#coupon-msg').text("Cod invalid sau expirat!").css('color', '#ff4d4d');
            calculeazaCosul();
        }
    });

    calculeazaCosul();
});