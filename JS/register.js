// Ex 1 ------------------------------------------------------------------
const regex = /^[a-z0-9]+$/;

document.querySelectorAll('.validation-text').forEach(input => {
    input.addEventListener('input', function() {
        const value = this.value;
        const dot = this.nextElementSibling;
        if (value === '') {
            dot.className = 'dot';
        }
        else if (regex.test(value)) {
            dot.className = 'dot valid';
        } else {
            dot.className = 'dot invalid';
        }
    });
});


// Ex 2 ------------------------------------------------------------------
const regexParola = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*!).+$/;

document.querySelectorAll('.validation-password').forEach(input => {
    input.addEventListener('input', function() {
        const value = this.value;
        const dot = this.nextElementSibling;
        if (value === '') {
            dot.className = 'dot';
        }
        else if (regexParola.test(value)) {
            dot.className = 'dot valid';
        } else {
            dot.className = 'dot invalid';
        }
    });
});


// Ex 3 ------------------------------------------------------------------
const regexEmail = /^(?=.*\.)[a-zA-Z0-9_.]+@[a-zA-Z0-9_.]+$/;

document.querySelectorAll('.validation-email').forEach(input => {
    input.addEventListener('input', function() {
        const value = this.value;
        const dot = this.nextElementSibling;
        if (value === '') {
            dot.className = 'dot';
        }
        else if (regexEmail.test(value)) {
            dot.className = 'dot valid';
        } else {
            dot.className = 'dot invalid';
        }
    });
});


// Ex 4 ------------------------------------------------------------------
const regexTelefon = /^\(\+40\) \d{3} \d{3} \d{3}$/;

document.querySelectorAll('.validation-phone').forEach(input => {
    input.addEventListener('input', function() {
        const value = this.value;
        const dot = this.nextElementSibling;
        if (value === '') {
            dot.className = 'dot';
        }
        else if (regexTelefon.test(value)) {
            dot.className = 'dot valid';
        } else {
            dot.className = 'dot invalid';
        }
    });
});

// Ex 6 ------------------------------------------------------------------
document.querySelectorAll('.validation-birthday').forEach(input => {
    input.addEventListener('input', function() {
        const value = this.value;
        const dot = this.nextElementSibling;
        if (value === '') {
            dot.className = 'dot';
        }
        else if(valideaza(value, 'zz/ll/aaaa')) {
            dot.className = 'dot valid';
        } else {
            dot.className = 'dot invalid';
        }
    });
});

 //functie de validare a datei dupa un anumit format
 function valideaza(data, format) {
    const dataParts = data.split('/');
    const formatParts = format.split('/');

    if (dataParts.length !== formatParts.length) {
        return false;
    }

    let zi, luna, an;
    for(let i = 0; i < formatParts.length; i++) {
        if(formatParts[i] === 'zz') {
            zi = parseInt(dataParts[i]);
        }
        else if(formatParts[i] === 'll') {
            luna = parseInt(dataParts[i]);
        }
        else if(formatParts[i] === 'aaaa') {
            an = parseInt(dataParts[i]);
        }
        else if(formatParts[i] === 'aa') {
            an = parseInt(dataParts[i]) + 2000;
            an = an < 50 ? an + 2000 : an + 1900;
        }
    }
    const dataValida = new Date(an, luna - 1, zi);
    if(dataValida.getFullYear() !== an || dataValida.getMonth() + 1 !== luna || dataValida.getDate() !== zi) {
        return false;
    }
    return true;
}


// Ex 7 ------------------------------------------------------------------
document.querySelector('form[name="registerForm"]').addEventListener('submit', function(event) {
    let valid = true;
    const buline = document.querySelectorAll('.dot');
    buline.forEach(dot => {
        if(dot.classList.contains('invalid') || dot.className === 'dot') {
            valid = false;
        }
    });
    if(!valid) {
        event.preventDefault();
        alert('Date incomplete sau invalide!');
    }
});

// Ex 8 ------------------------------------------------------------------
const dateLocatii = {
    'Cluj': ['Cluj-Napoca', 'Turda', 'Dej'],
    'Mureș': ['Târgu Mureș', 'Reghin', 'Sighișoara'],
    'Bistrița Năsăud': ['Bistrița', 'Năsăud', 'Sângeorz-Băi']
};

const selectJudet = document.getElementById('judet');
const selectOras = document.getElementById('oras');

for(let judet in dateLocatii) {
    const option = document.createElement('option');
    option.value = judet;
    option.textContent = judet;
    selectJudet.appendChild(option);
}

selectJudet.addEventListener('change', function() {
    const judetSelectat = this.value;
    selectOras.innerHTML = '<option value="">Alege un oraș</option>';
    if(judetSelectat in dateLocatii) {
        dateLocatii[judetSelectat].forEach(oras => {
            const option = document.createElement('option');
            option.value = oras;
            option.textContent = oras;
            selectOras.appendChild(option);
        });
        selectOras.disabled = false;
    } else {
        selectOras.disabled = true;
    }
});




