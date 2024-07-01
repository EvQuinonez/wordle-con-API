let intentos = 5;
let palabra;

fetch('https://random-word-api.herokuapp.com/word?length=5&lang=es')
    .then(response => response.json())
    .then(response => {
        palabra = response[0].toUpperCase()
        console.log(palabra)
    })
    .catch(err => console.log(err));

const button = document.getElementById("intentar");
button.addEventListener("click", intentar);

const ayudaButton = document.getElementById("ayuda");
ayudaButton.addEventListener("click", () => {
    window.open("https://www.xataka.com/basics/que-wordle-quien-ha-creado-como-se-juega", "_blank");
});

const input = document.getElementById("entrada");
input.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        intentar();
    }
});

function intentar() {
    const INTENTO = leerIntento();

    if (!INTENTO || INTENTO.length !== palabra.length) {
        alert(`La palabra debe tener ${palabra.length} letras`);
        return;
    }

    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');

    ROW.className = 'row';
    for (let i in palabra) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        if (INTENTO[i] === palabra[i]) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundImage = 'linear-gradient(to right, green, limegreen)';
        } else if (palabra.includes(INTENTO[i])) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundImage = 'linear-gradient(to right, yellow, gold)';
        } else {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundImage = 'linear-gradient(to right, grey, darkgrey)';
        }
        ROW.appendChild(SPAN);
    }
    GRID.appendChild(ROW);
    document.getElementById("entrada").value = '';
    intentos--;

    if (intentos === 0 || INTENTO === palabra) {
        terminar(INTENTO === palabra ? "<h1>GANASTE!</h1>" : "<h1>PERDISTE!</h1>");
    }
}

function leerIntento() {
    let intento = document.getElementById("entrada").value;
    intento = intento.toUpperCase();
    return intento;
}

function terminar(mensaje) {
    const input = document.getElementById("entrada");
    input.disabled = true;
    button.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}