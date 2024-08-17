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

function dragEnd (e) {
    console.log("dragend")
}

function drag(e){
    console.log("drag")

}

function drop (e) {
    e.preventDefault()
    const element = document.getElementById(e.dataTransfer.getData("text"))

    const container = e.target.closest(".tier-sort, .container-img");

    if (container) {
        const afterElement = getDragAfterElement(container, e.clientX);

        if (afterElement == null) {
            container.appendChild(element);
        } else {
            container.insertBefore(element, afterElement);
        }
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


function dragLeave(e){

    const container = e.target
    if (container.classList.contains("tier-sort")) {
        container.classList.remove("highlight")
    }

}

function getDragAfterElement (container,x) {
    const draggableElements = [...container.querySelectorAll('.img')];
    console.log(`este es el draggable` + draggableElements)
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = x - box.left - box.width / 2;

        console.log(offset)
        
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}
