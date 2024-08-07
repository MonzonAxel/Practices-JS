const imgEasy = [
    {name:"facebook",image:"./img/facebook.webp" ,id:"facebook"},
    {name:"github",image:"./img/github.webp" ,id:"facebook"},
    {name:"instagram",image:"./img/instagram.webp" ,id:"facebook"},
    {name:"itunes",image:"./img/itunes.webp" ,id:"facebook"},
    {name:"linkedin",image:"./img/linkedin.webp" ,id:"facebook"} ,
    {name:"messenger",image:"./img/messenger.webp" ,id:"facebook"},
    {name:"reddit",image:"./img/reddit.webp" ,id:"facebook"},
    {name:"skype",image:"./img/skype.webp" ,id:"facebook"},
]

const imgMedium = [
    {name:"facebook",image:"./img/facebook.webp"},
    {name:"github",image:"./img/github.webp"},
    {name:"instagram",image:"./img/instagram.webp"},
    {name:"itunes",image:"./img/itunes.webp"},
    {name:"linkedin",image:"./img/linkedin.webp"},
    {name:"messenger",image:"./img/messenger.webp"},
    {name:"reddit",image:"./img/reddit.webp"},
    {name:"skype",image:"./img/skype.webp"},
    {name:"spotify",image:"./img/spotify.webp"},
    {name:"steam",image:"./img/steam.webp"},
    {name:"telegram",image:"./img/telegram.webp"},
    {name:"tiktok",image:"./img/tik-tok.webp"}
]

const imgHard = [
    {name:"facebook",image:"./img/facebook.webp"},
    {name:"github",image:"./img/github.webp"},
    {name:"instagram",image:"./img/instagram.webp"},
    {name:"itunes",image:"./img/itunes.webp"},
    {name:"linkedin",image:"./img/linkedin.webp"},
    {name:"messenger",image:"./img/messenger.webp"},
    {name:"reddit",image:"./img/reddit.webp"},
    {name:"skype",image:"./img/skype.webp"},
    {name:"spotify",image:"./img/spotify.webp"},
    {name:"steam",image:"./img/steam.webp"},
    {name:"telegram",image:"./img/telegram.webp"},
    {name:"tiktok",image:"./img/tik-tok.webp"},
    {name:"twitch",image:"./img/twitch.webp"},
    {name:"twitter",image:"./img/twitter.webp"},
    {name:"whatsapp",image:"./img/whatsapp.webp"},
    {name:"youtube",image:"./img/youtube.webp"}
]

const selectors = {
    main:document.querySelector(".wrapped"),
    game:document.querySelector(".game-container"),
    moves:document.querySelector(".moves"),
    time:document.querySelector(".time"),
    success:document.querySelector(".success"),
    play:document.querySelector(".play"),
    result:document.querySelector(".result"),
    filter:document.querySelector("#filter")
}

const state = {
    flippedCards:0,
    totalFlip:0,
    success:0,
    time:60,
    interval:null,
}

let firstCard
let secondCard
let firstCardValue
let secondCardValue
let dimension

const initial = (imgItem) => {
    clearInterval(state.interval);
    const items = ramdonArray([...imgItem,...imgItem])
    dimension = items.length
    createBoard(items)
    addTime()
    
}

const ramdonArray = array => {
    const clonedArray = [...array]

    for (let index = clonedArray.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1))
        const original = clonedArray[index]
        clonedArray[index] = clonedArray[randomIndex]
        clonedArray[randomIndex] = original
    }

    return clonedArray
}



const createBoard = (items) => {
    selectors.game.innerHTML = ""
    
    items.forEach(res => {
        const element = `<div class="card" data-card-value="${res.name}">
                        <div class="card-before">?</div>
                        <div class="card-after" >
                        <img  src="${res.image}" alt="${res.name}">
                    </div>
                </div>`

        selectors.game.insertAdjacentHTML("beforeend", element)
    })
    const card = document.querySelectorAll(".card")
    cardList(card)
}

const cardList = (card) =>{
    card.forEach(res => {
        res.addEventListener("click", (e) => {
            state.flippedCards++
            const eventTarget = e.target
            const eventParent = eventTarget.parentElement
    
            
            if (eventTarget.className.includes("card-before") && !eventParent.className.includes('flipped')) {
                flipCard(eventParent)
            }
        })
    })
}

const flipCard = (res) =>{

    if(!res.classList.contains("matched")) {
        res.classList.add("flipped")

        if(state.flippedCards == 1){
            firstCard = res
            firstCardValue = res.getAttribute("data-card-value") 
        
        }else{
            
            secondCard = res
            secondCardValue = res.getAttribute("data-card-value")
            movesCounter()
           
            if(firstCardValue == secondCardValue){

                firstCard.classList.add("matched")
                secondCard.classList.add("matched")
                state.flippedCards = 0
                success()
                checkWinner()

            }else{
                setTimeout(()=>{
                    backFlip()
                },450)
            }
        }
    }
}

const backFlip = () => {
    document.querySelectorAll(".card:not(.matched)").forEach(res =>{
        res.classList.remove("flipped")
    })

    state.flippedCards = 0
}

const movesCounter = () => {
    selectors.moves.textContent =`Movimientos : ${++state.totalFlip}`
}

const success = () => {
    selectors.success.textContent = `Aciertos : ${++state.success}`
}

const checkWinner = () =>{
    if((state.success / (dimension / 2 )) === 1 ){
        clearInterval(state.interval)
        winner()
    }
}

//Duracion del juego 
const addTime = () => {
    state.time=60;
    state.interval = setInterval(()=>{
        state.time--
        selectors.time.textContent=`Tiempo: ${state.time} sec`
        if(state.time === 0){

            clearInterval(state.interval)
            revealCard()
        }
    },1000)
}

//Revela todas las cartas si se acaba el tiempo
const revealCard = () => {
    document.querySelectorAll(".card").forEach(res =>{
        res.classList.add("flipped")
        setTimeout(()=>{
            defeat()
        },1000)
    })
}

const defeat = () => {
    
    selectors.result.classList.remove("hidden")
    selectors.result.textContent = "¡Has perdido! Intentalo nuevamente"
    selectors.play.classList.remove("hidden")
    selectors.play.textContent= "Play Again"
}

const winner = () =>{
    
    selectors.result.textContent = "¡ Has ganado !"
    selectors.result.classList.remove("hidden")
    selectors.play.classList.remove("hidden")
}

const resetStatistic = () => {
    state.flippedCards=0
    state.totalFlip=0
    state.success=0
    selectors.moves.textContent ="Movimientos : "
    selectors.success.textContent = "Aciertos : "
}


selectors.play.addEventListener("click" , () =>{
    resetStatistic()
    selectors.main.classList.remove("hidden")
    selectors.result.classList.add("hidden")
    selectors.play.classList.add("hidden")
    
    const value = selectors.filter.value
    selectLevel(value)

})

const selectLevel = (value) =>{
    if(value === "easy"){
        initial(imgEasy)
    }else if ( value === "medium"){
        initial(imgMedium)
    }else{
        initial(imgHard)
    }
}

selectors.filter.addEventListener("change", (e) =>{

    const value=selectors.filter.value

    //Mientras el juego transcurre se PUEDE cambiar de difultad, pero al inicio y al finalizar el juego SOLO se reactiva al darle play.

    if(selectors.play.classList.contains("hidden")){
        resetStatistic()
        selectLevel(value)
    }   
})
