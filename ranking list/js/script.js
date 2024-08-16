const containerImg = document.querySelector(".container-img")
const tierlist = document.querySelector(".tierlist")

let element


[containerImg,tierlist].forEach(container => {
    container.addEventListener("dragstart" , dragStart)
    container.addEventListener("dragend", dragEnd)
    container.addEventListener("drag", drag)
    container.addEventListener("dragover", dragOver)
    container.addEventListener("dragleave", dragLeave)
    container.addEventListener("drop", drop)
})


function dragStart (e) {
    e.dataTransfer.setData("text/plain" , e.target.id)
}

function dragEnd () {
    console.log("dragend")
}

function drop (e) {
    e.preventDefault()
    const element = document.getElementById(e.dataTransfer.getData("text"))

    const container = e.target

    if(container.classList.contains("tier-sort") || container.classList.contains("container-img")){
        container.append(element)
    }
    container.classList.remove("highlight")
}

function dragOver (e) {
    e.preventDefault()
    const container = e.target
    if(container.classList.contains("tier-sort")){
        container.classList.add("highlight")
    }
}

function drag(){
    console.log("drag")
}

function dragLeave(e){

    const container = e.target
    if (container.classList.contains("tier-sort")) {
        container.classList.remove("highlight")
    }

}