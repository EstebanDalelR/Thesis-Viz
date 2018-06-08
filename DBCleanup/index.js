const readline = require('readline');
const fs = require('fs');
/* const wstream = fs.createWriteStream("file.txt")
 */
let finalArray = [];
let partidos = [];
let puestos = [];
let localidades = [];
let candidatos = [];

/* ------------------------------------- */
/* --- DEFINIR INTERFACES DE LECTURA --- */
/* ------------------------------------- */

let lineReaderPartidos = readline.createInterface({
    input: fs.createReadStream('partidos.txt')
});

let lineReaderPuestos = readline.createInterface({
    input: fs.createReadStream('puestos.txt')
});

let lineReaderLocalidades = readline.createInterface({
    input: fs.createReadStream('localidades.txt')
});

let lineReaderCandidatos = readline.createInterface({
    input: fs.createReadStream('candidatos.txt')
});

/* El archivo a limpiar */
let lineReaderFinal = readline.createInterface({
    input: fs.createReadStream('con.txt')
});

/* ------------------------------------- */
/* --- PASAR A ARREGLO PARA LAS BUSQUEDAS --- */
/* ------------------------------------- */

function arrayPartidos() {
    lineReaderPartidos.on('line', (inLine) => {
        partidos.push(inLine.toString().slice(4).trim());
    })
}

function arrayPuestos() {
    lineReaderPuestos.on('line', (inLine) => {
        let aAgregar = [
            inLine.toString().slice(0, 3).trim(),
            inLine.toString().slice(2, 5).trim(),
            inLine.toString().slice(6).trim()
        ]
        puestos.push(aAgregar);
    })
}

function arrayLocalidades() {
    lineReaderLocalidades.on('line', (inLine) => {
        let aAgregar = [
            inLine.toString().slice(0, 3).trim(),
            inLine.toString().slice(3).trim()
        ]
        localidades.push(aAgregar);
    })
}

function arrayCandidatos() {
    lineReaderCandidatos.on('line', (inLine) => {
        candidatos.push(inLine.toString().split(","));
    })
}

/* ------------------------------------- */
/* --- FUNCION FINAL --- */
/* ------------------------------------- */


function final() {

    lineReaderFinal.once('line', function (inLine) {
        let line = inLine.toString();

        let current = new Object;

        let codDepartamento = line.slice(0, 2);
        current.codDepartamento = codDepartamento;

        let departamento = "BOG";
        current.departamento = departamento;


        let codMunicipio = line.slice(2, 5);
        current.codMunicipio = codMunicipio;

        let municipio = "BOG";
        current.municipio = municipio;


        let codLocalidad = line.slice(5, 7);
        current.codLocalidad = codLocalidad;

        let localidad;
        localidades.forEach((inLocalidades) => {
            if (parseInt(inLocalidades[0]) === parseInt(codLocalidad)) {
                current.localidad = inLocalidades[1];
            }
        })


        let codPuesto = line.slice(7, 9);
        current.codPuesto = codPuesto;

        let puesto;
        puestos.forEach((inPuestos) => {
            if (inPuestos[0] == codLocalidad && inPuestos[1] == codPuesto) {
                current.puesto = inPuestos[2];
            }
        })

        let numMesa = line.slice(9, 15);
        current.numMesa = numMesa;

        let codJAL = line.slice(15, 17);
        current.codJAL = codJAL;

        let numComunicado = line.slice(17, 21);
        current.numComunicado = numComunicado;


        let codCircunscripcion = line.slice(21, 22);
        current.codCircunscripcion = codCircunscripcion;

        let circunscripcion;
        switch (codCircunscripcion) {
            case "1":
                circunscripcion = "DEP"
                break;
            case "2":
                circunscripcion = "MUN"
                break;
            case "3":
                circunscripcion = "LOC"
                break;
        }
        current.circunscripcion = circunscripcion;


        let codListaOPartido = line.slice(22, 25);
        current.codListaOPartido = codListaOPartido;

        let partido = partidos[parseInt(codListaOPartido) - 1];
        current.partido = partido;


        let codCandidato = line.slice(25, 28);
        current.codCandidato = codCandidato;

        let candidato;
        candidatos.forEach((inCandidato) => {
            if(
                inCandidato[0].slice(4,9) == "16001" &&
                inCandidato[0].slice(4,9) == codListaOPartido &&
                inCandidato[0].slice(4,9) == codCandidato
            ){

            }
        })

        let votos = line.slice(28, 36);
        current.votos = votos;

        console.log(current)
        finalArray.push(current);
    });
}

async function imprimir() {
    /*     await arrayPuestos();
        await arrayPartidos();
        await arrayLocalidades(); */
    await arrayCandidatos();
    /*     await final(); */
}
function imprimirDivipol() {
    console.log(final());
}
imprimir();
/* setTimeout(imprimirDivipol, 6000) */