const containerImg = document.querySelector(".container-img")
const tierlist = document.querySelector(".tierlist")

let element


[containerImg,tierlist].forEach(container => {
    container.addEventListener("dragstart" , dragStart)
    container.addEventListener("dragend", dragEnd)
    container.addEventListener("drag", drag)
    container.addEventListener("dragover", dragOver)
    container.addEventListener("drop", drop)
})


function dragStart (e) {
    e.dataTransfer.setData("text/plain" , e.target.id)
}

function dragEnd () {
    console.log("dragend")
}

function drag () {
    console.log("haciendo drag")
}

function drop (e) {
    e.preventDefault()
    const element = document.getElementById(e.dataTransfer.getData("text"))
    
    const container = e.target

    if(container.classList.value === "tier-sort" || container.classList.value == "container-img"){
        container.append(element)
    }
}

function dragOver (e) {
    e.preventDefault()
}