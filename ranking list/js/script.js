const containerImg = document.querySelector(".container-img")
const tierlist = document.querySelector(".tierlist")
const tierPrint = document.querySelector("#print-tier")

let element, preview, originalParent, originalNextSibling;

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
    element = document.getElementById(e.target.id); // La imagen que estás arrastrando

    // Guardar el contenedor original y el siguiente hermano
    originalParent = element.parentNode;
    originalNextSibling = element.nextSibling;

    // Ocultar el elemento original temporalmente
    setTimeout(() => {
        element.style.display = "none";
    }, 0);

    // Crear la vista previa
    preview = element.cloneNode(true);
    preview.classList.add("preview");
    preview.style.opacity = "0.5";  // Semitransparente
}

function dragEnd (e) {
    console.log("dragend")

    // Si no se hizo el drop, restaurar el elemento en su lugar original
    if (element && !element.parentNode) {
        originalParent.insertBefore(element, originalNextSibling);
    }

    // Mostrar el elemento original nuevamente
    element.style.display = "block";

    // Limpiar la vista previa
    if (preview) {
        preview.remove();
        preview = null;
    }
}

function drag(e){
    console.log("drag")

}

function drop(e) {
    e.preventDefault();
    
    // let element = document.getElementById(e.dataTransfer.getData("text"));

    if (preview) {
        preview.remove(); // Eliminar la vista previa cuando se hace el drop
    }

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
    const container = e.target.closest(".tier-sort, .container-img");

    if (container) {
        if (container.classList.contains("tier-sort")) {
            container.classList.add("highlight");
        }

        // Si ya existe una vista previa, moverla a la posición correcta
        const afterElement = getDragAfterElement(container, e.clientX, e.clientY);
        if (afterElement == null) {
            container.appendChild(preview);    // Insertar al final si no hay elementos
        } else {
            container.insertBefore(preview, afterElement); // Insertar en la posición correcta
        }
    }
}

function dragLeave(e){
    e.preventDefault();
    const container = e.target.closest(".tier-sort");
    if (container && container.classList.contains("tier-sort")) {
        container.classList.remove("highlight")
        if (preview) {
            preview.remove(); // Eliminar la vista previa cuando el mouse sale
        }
    }

}

function getDragAfterElement(container, x, y) {
    const draggableElements = [...container.querySelectorAll(".img")];
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

tierPrint.addEventListener("click", () => {
    
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    import("https://cdn.jsdelivr.net/npm/html2canvas-pro@1.5.8/+esm")
    .then(({default: html2canvas}) => {
        html2canvas(tierlist).then(canvas => {
            ctx.drawImage(canvas, 0, 0)
            const imgURL = canvas.toDataURL("image/png")
            const downloadLink = document.createElement("a")
            downloadLink.download = "tier.png"
            downloadLink.href = imgURL
            downloadLink.click()
        })
    })
})