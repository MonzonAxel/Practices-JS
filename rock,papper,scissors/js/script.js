const textoInicial = document.querySelector(".texto-inicio")

const resultPlayer = document.querySelector(".result-player")
const resultPc = document.querySelector(".result-pc")

const playerHealth = document.querySelector(".progress-player-health")
const pcHealth = document.querySelector(".progress-pc-health")

const containerArmas = document.querySelector(".container-armas")
const weapons = document.querySelectorAll(".f")

const spanPlayer = document.querySelector(".span-player")
const spanPc = document.querySelector(".span-pc")

const info = document.querySelector(".info")
const final = document.querySelector(".final")
const button = document.querySelector(".btn")


let contadorPlayer = 0;
let contadorPc = 0;

const array = ["piedra","papel","tijera"]

const init = () => {
    weapons.forEach(res => {
        res.addEventListener("click", (e) =>{
            const valor = e.currentTarget.id
            const valorPc = Math.floor(Math.random()* 3);
            const valorPcFinal = array[valorPc]

            roundWinner(valor,valorPcFinal)
            setTurn(valor,valorPcFinal)
            setHealth()
            const winner = checkAWinner()
            if(winner) button.classList.remove("hidden")

        })
    });
}


const roundWinner = (valor,valorPcFinal) => {
    

    info.classList.remove("hidden")

    if(valor === valorPcFinal){
        return final.textContent= "¡Hubo un empate!"
    } 
    if ((valor === "piedra" && valorPcFinal === "tijera") ||
        (valor === "papel" && valorPcFinal === "piedra") ||
        (valor === "tijera" && valorPcFinal === "papel")) {

        final.textContent= "¡Ganaste esta ronda!";
        contadorPlayer++
        updateScore(resultPlayer, contadorPlayer)

    }else{
        final.textContent="¡Perdiste esta ronda!";
        contadorPc++
        updateScore(resultPc, contadorPc)
    }

}

const updateScore = (valor,contador) => {
    valor.textContent= contador
}

const setTurn = (valor,valorPcFinal) => {

    spanPlayer.innerHTML = getResult(valor)
    spanPc.innerHTML = getResult(valorPcFinal)

}

const getResult = (option) => {
   if(option === "piedra") return `<i class="fa-solid fa-hand-back-fist"></i>`
   if(option === "papel") return `<i class="fa-solid fa-hand"></i>`
   return `<i class="fa-solid fa-hand-scissors"></i>`
}

const setHealth = () =>{

    pcHealth.style.width = (100 - contadorPlayer * 20) + "%"
    playerHealth.style.width = (100 - contadorPc * 20) + "%"
    
}

const checkAWinner = () =>{
    if(contadorPc === 5 || contadorPlayer === 5){
        textoInicial.textContent= contadorPlayer === 5 ? "¡EL HUMANO GANO!" : "¡LA MAQUINA GANO!"
        containerArmas.classList.add("hidden")
        return true
    }
    return false 
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
    setHealth()
})

init()