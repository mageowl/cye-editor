const room = document.getElementsByClassName("room")[0];
const roomImage = document.getElementsByClassName("room-image")[0];
const canvas = document.getElementsByTagName("canvas")[0];


const toolTypes = {
    edit: EditTool,
    image: ImageAction,
    delete: DeleteTool,
    preview: PreviewAction
}
let boxes = []

// CANVAS
const ctx = canvas.getContext("2d");

// TOOLBAR
let currentTool;

Array.from(document.querySelectorAll("#toolbar .btn")).forEach((button) => {
    button.onclick = () => {
        let useResponce = toolTypes[button.getAttribute("name")].use(canvas, ctx);
        if (currentTool != useResponce) {
            if (typeof useResponce != "undefined") {
                if (currentTool) currentTool.onremove();
                currentTool = useResponce;
                canvas.style.cursor = currentTool.cursor;
            }
        } else {
            if (currentTool) currentTool.onremove();
            currentTool = undefined;
            canvas.onmousedown = () => { };
            canvas.onmouseup = () => { };
            canvas.onmousemove = () => { };
            canvas.onmouseleave = () => { };
            canvas.style.cursor = "default";
        }
    };
});