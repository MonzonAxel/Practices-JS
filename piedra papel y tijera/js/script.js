const textoInicial = document.querySelector(".texto-inicio")
const resultPlayer = document.querySelector(".result-player")
const resultPc = document.querySelector(".result-pc")
const containerArmas = document.querySelector(".container-armas")
const weapons = document.querySelectorAll(".f")
const button = document.querySelector(".btn")

const spanPlayer = document.querySelector(".span-player")
const spanPc = document.querySelector(".span-pc")

const info = document.querySelector(".info")
const final = document.querySelector(".final")

let contadorPlayer = 0;
let contadorPc = 0;

const array = ["piedra","papel","tijera"]

const init = () => {
    weapons.forEach(res => {
        res.addEventListener("click", (e) =>{
            const valor = e.currentTarget.id

            initial(valor)
            const winner = checkAWinner()
            if(winner) button.classList.remove("hidden")

        })
    });
}


const initial = (valor) => {
    const valorPc = Math.floor(Math.random()* 3);
    const valorPcFinal = array[valorPc]

    info.classList.remove("hidden")

    setTurn(valor,valorPcFinal)

    console.log(valorPcFinal)

    if(valor === valorPcFinal){
        return final.textContent= "¡Hubo un empate!"
    } 
    if ((valor === "piedra" && valorPcFinal === "tijera") ||
        (valor === "papel" && valorPcFinal === "piedra") ||
        (valor === "tijera" && valorPcFinal === "papel")) {

        final.textContent= "¡Ganaste esta ronda!";
        contadorPlayer++
        resultPlayer.textContent = contadorPlayer

    }else{
        final.textContent="¡Perdiste esta ronda!";
        contadorPc++
        resultPc.textContent = contadorPc
    }


}

const setTurn = (valor,valorPcFinal) => {


    if(valor === "piedra"){
        spanPlayer.innerHTML=`<i class="fa-solid fa-hand-back-fist"></i>`
    }else if (valor === "papel"){
        spanPlayer.innerHTML=`<i class="fa-solid fa-hand"></i>`
    }else{
        spanPlayer.innerHTML=`<i class="fa-solid fa-hand-scissors"></i>`
    }
    
    if(valorPcFinal === "piedra"){
        spanPc.innerHTML=`<i  class="fa-solid fa-hand-back-fist"></i>`
    }else if (valorPcFinal === "papel"){
        spanPc.innerHTML=`<i  class="fa-solid fa-hand"></i>`
    }else{
        spanPc.innerHTML=`<i class="fa-solid fa-hand-scissors"></i>`
    }

}

const checkAWinner = () =>{
    if(contadorPc === 5){
        textoInicial.textContent="!LA MAQUINA GANA!"
        containerArmas.classList.add("hidden")
        return true
    } 
    
    if(contadorPlayer === 5){
        textoInicial.textContent="¡EL HUMANO GANO!"
        containerArmas.classList.add("hidden")
        return true
    } 

}

button.addEventListener("click", () => {
    contadorPc = 0
    contadorPlayer = 0
    containerArmas.classList.remove("hidden")
    button.classList.add("hidden")
    textoInicial.textContent="¡El mejor de 10 será el ganador!"
    resultPlayer.textContent = 0
    resultPc.textContent = 0
    spanPlayer.innerHTML=""
    spanPc.innerHTML=""
    info.classList.add("hidden")

})

init()