
// ROOMS
let rooms = [
    {
        name: "Room 1",
        el: document.getElementsByClassName("room")[0],
        imageEl: document.getElementsByClassName("room-image")[0],
        boxes: []
    }
];

let currentRoom = rooms[0];
let currentRoomIndex = 0;

const roomContainer = document.getElementById("rooms")

// VARIBLES
const toolTypes = {
    edit: EditTool,
    delete: DeleteTool,
    image: ImageAction,
    preview: PreviewTool,
    roomSelect: RoomMenuAction
};
let dirname = location.href.split("/").slice(0, -1).join("/");

const editorToolbar = document.getElementById("toolbar");

// CANVAS
const canvas = document.getElementsByTagName("canvas")[0];
const ctx = canvas.getContext("2d");

// TOOLBAR
let currentTool;
let currentToolID;

Array.from(document.querySelectorAll("#toolbar .btn")).forEach((button) => {
    button.onclick = () => {
        let useResponce = toolTypes[button.getAttribute("name")].use(canvas, ctx);
        if (currentTool != useResponce) {
            if (typeof useResponce != "undefined") {
                if (currentTool) currentTool.onremove();
                currentTool = useResponce;
                currentToolID = button.getAttribute("name");
                canvas.style.cursor = currentTool.cursor;
                if (currentTool) currentTool.onadd();
            }
        } else {
            if (currentTool) currentTool.onremove();
            currentTool = undefined;
            canvas.onmousedown = () => { };
            canvas.onmouseup = () => { };
            canvas.onmousemove = () => { };
            canvas.onmouseleave = () => { };
            canvas.style.cursor = "default";
            currentToolID = undefined;
        }
    };
});