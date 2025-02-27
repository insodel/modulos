const algoritmos = {
    "O(1) - Tiempo Constante": arr => arr[0],

    "O(n) - Tiempo Lineal": arr => {
        let suma = 0;
        for (let i = 0; i < arr.length; i++) suma += arr[i];
        return suma;
    },

    "O(n²) - Tiempo Cuadrático": arr => {
        let conteo = 0;
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length; j++)
                conteo++;
        }
        return conteo;
    },

    "O(log n) - Tiempo Logarítmico": arr => {
        let i = 1;
        while (i < arr.length) i *= 2;
        return i;
    },

    "O(n log n) - Tiempo Linearítmico": arr => {
        if (arr.length <= 1) return arr;
        let linearitmico = algoritmos["O(n log n) - Tiempo Linearítmico"];
        let mitad = Math.floor(arr.length / 2);
        let izqd = linearitmico(arr.slice(0, mitad));
        let dcha = linearitmico(arr.slice(mitad));
        return [...izqd, ...dcha];
    }
};

function medirTiempoEjecucion(fn, volumenMuestra) {
    const arrayParaMedicion = [];
    for (let i = 0; i < volumenMuestra; i++)
        arrayParaMedicion.push(i);
    const t0 = performance.now();
    fn(arrayParaMedicion);
    const t1 = performance.now();
    return t1 - t0;
}

function analizarAlgoritmos() {
    const volumenMuestra = [10, 100, 1000, 5000, 10000];
    const resultados = {};

    Object.entries(algoritmos).forEach(([nombre, fn]) => {
        resultados[nombre] = volumenMuestra.map(volumenMuestra => medirTiempoEjecucion(fn, volumenMuestra));
    });

    return { volumenMuestra, resultados };
}

// Función para graficar resultados con Chart.js
function createChart() {
    const { volumenMuestra, resultados } = analizarAlgoritmos();
    const ctx = document.getElementById("canvasGrafica").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: volumenMuestra,
            datasets: Object.keys(resultados).map((nombre, i) => ({
                label: nombre,
                data: resultados[nombre],
                borderColor: `hsl(${i * 60}, 70%, 50%)`,
                fill: false
            }))
        },
        options: {
            responsive: true,
            plugins: { legend: { position: "top" } },
            scales: { x: { title: { display: true, text: "Tamaño de Entrada" } },
                      y: { title: { display: true, text: "Tiempo (en milisegundos)" }, beginAtZero: true } }
        }
    });
}

createChart();
