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

function drop(e) {
    e.preventDefault();
    
    const element = document.getElementById(e.dataTransfer.getData("text"));
    const container = e.target.closest(".tier-sort, .container-img");

    if (container) {
        const afterElement = getDragAfterElement(container, e.clientX, e.clientY);

        if (afterElement == null) {
            container.appendChild(element);
        } else {
            container.insertBefore(element, afterElement);
        }
    }

    container.classList.remove("highlight")
    
}


function dragOver (e) {
    e.preventDefault();
    const container = e.target
    if(container.classList.contains("tier-sort")){
        container.classList.add("highlight")
    }
}


function dragLeave(e){
    e.preventDefault();
    const container = e.target
    if (container.classList.contains("tier-sort")) {
        container.classList.remove("highlight")
    }

}

function getDragAfterElement(container, x, y) {
    const draggableElements = [...container.querySelectorAll('.img')];
    const containerRect = container.getBoundingClientRect();
    const relativeX = x - containerRect.left;
    const relativeY = y - containerRect.top;

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const childTop = box.top - containerRect.top;
        const childBottom = childTop + box.height;
        const isSameRow = (relativeY >= childTop && relativeY <= childBottom);

        if (isSameRow) {
            const childCenterX = box.left - containerRect.left + box.width / 2;
            const offset = relativeX - childCenterX;

            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            }
        }
        return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}
