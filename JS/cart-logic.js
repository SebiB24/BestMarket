$(document).ready(function() {
    const PRAG_TRANSPORT = 7000; // La 7000 RON ai transport gratuit
    let reducere_procentuala = 0;

    // 1. Funcția care recalculează tot coșul
    function calculeazaCosul() {
        let total_brut = 0;
        
        // Căutăm toate cardurile care încă există pe pagină și adunăm sumele
        $('.cart-card').each(function() {
            total_brut += parseFloat($(this).data('price'));
        });

        // Aplicăm reducerea dacă există
        let total_final = total_brut - (total_brut * reducere_procentuala);

        // Dacă nu mai sunt produse, punem totul pe 0
        if(total_brut === 0) {
            total_final = 0;
        }

        // Animație fluidă pentru numărătoarea banilor
        $('#final-total').animate({ Counter: total_final }, {
            duration: 800,
            step: function (now) {
                $(this).text(Math.ceil(now).toLocaleString() + " RON");
            }
        });

        // Dacă avem reducere, arătăm și prețul vechi tăiat
        if (reducere_procentuala > 0 && total_brut > 0) {
            $('#original-total').text(total_brut.toLocaleString() + " RON").fadeIn();
        } else {
            $('#original-total').hide();
        }

        // Actualizăm graficul de transport
        updateIndicator(total_final);
    }

    // 2. Funcția care mișcă indicatorul rotund
    function updateIndicator(suma_curenta) {
        const MAX_DASH = 251; // Circumferința arcului din SVG
        
        // Limităm procentul la maxim 1 (100%)
        let procent = Math.min(suma_curenta / PRAG_TRANSPORT, 1);
        
        // Rotația acului (0 la 180 grade)
        let grade = procent * 180;
        $('#gauge-needle').css('transform', `rotate(${grade}deg)`);
        
        // Umplerea barei roșii
        let offset = MAX_DASH - (procent * MAX_DASH);
        $('#gauge-progress').css('stroke-dashoffset', offset);

        // Mesajul textului
        if (suma_curenta >= PRAG_TRANSPORT) {
            $('#shipping-info').text("LIVRARE GRATUITĂ!").css({'background': '#28a745', 'color': 'white'});
        } else if (suma_curenta === 0) {
            $('#shipping-info').text("Coșul este gol").css('background', '#777');
        } else {
            let rest = PRAG_TRANSPORT - suma_curenta;
            $('#shipping-info').text(`Încă ${rest.toLocaleString()} RON necesari`).css({'background': '#ffa500', 'color': 'white'});
        }
    }

    // 3. Funcționalitate: Eliminare Produs cu Animație
    $('.cart-remove-item').click(function() {
        let card = $(this).closest('.cart-card');
        
        // Ascundem cu fade, apoi îl ștergem definitiv din HTML și recalculăm
        card.fadeOut(400, function() {
            $(this).remove();
            calculeazaCosul();
        });
    });

    // 4. Funcționalitate Creativă: Validare Cupon & Confetti
    $('#apply-coupon').click(function() {
        let code = $('#coupon-code').val().trim().toUpperCase();
        
        if (code === "BESTMARKET2026") {
            // Nu lăsăm utilizatorul să aplice de 2 ori
            if (reducere_procentuala === 0.20) {
                $('#coupon-msg').text("Cuponul este deja aplicat!").css('color', '#ffa500');
                return;
            }

            reducere_procentuala = 0.20; // 20% reducere
            $('#coupon-msg').text("Succes! Reducere de 20% aplicată.").css('color', '#28a745');
            startConfetti();
            calculeazaCosul();
        } else {
            reducere_procentuala = 0; // Resetăm dacă bagă cod greșit
            $('#coupon-msg').text("Cod invalid sau expirat!").css('color', '#ff4d4d');
            calculeazaCosul();
        }
    });

    // Sistemul vizual de Confetti
    function startConfetti() {
        const canvas = document.getElementById('confetti-canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        $(canvas).show();

        let particles = [];
        for (let i = 0; i < 150; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                r: Math.random() * 6 + 2,
                d: Math.random() * 10,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`,
                tilt: Math.random() * 10 - 10
            });
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.beginPath();
                ctx.lineWidth = p.r;
                ctx.strokeStyle = p.color;
                ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
                ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
                ctx.stroke();
                p.y += 3;
                p.tilt += 0.1;
            });
        }

        let confettiInterval = setInterval(draw, 20);
        setTimeout(() => { 
            clearInterval(confettiInterval); 
            $(canvas).fadeOut(500);
        }, 3000);
    }

    // PORNIRE: Calculăm coșul imediat ce s-a încărcat pagina
    calculeazaCosul();
});