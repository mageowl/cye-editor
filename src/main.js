
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
const roomContainer = document.getElementById("rooms");

let saves = JSON.parse(localStorage.cye_saves || "[]");

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

// SAVE AND LOAD
window.onkeydown = (e) => {
    if (e.metaKey || e.ctrlKey) { 
        if (e.key == "s") {
            e.preventDefault()
            let simplfiedRooms = rooms.map((value) => { return { ...value, imageEl: value.imageEl.style.getPropertyValue("background-image").slice(5, -2), el: undefined }});

            let el = document.createElement('a');
            el.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify({rooms: simplfiedRooms})));
            el.setAttribute('download', "project.json");

            el.style.display = 'none';
            document.body.appendChild(el);

            el.click();

            document.body.removeChild(el);
        } else if (e.key == "o") {
            e.preventDefault();

            readFile().then((text) => {
                let json

                try {
                    json = JSON.parse(text)
                } catch (err) {
                    alert("That file is not valid.");
                    return;
                }

                rooms.forEach((room) => {
                    room.el.remove();
                })
                rooms = []

                json.rooms.forEach((room) => {
                    currentRoom.el.classList.remove("current");

                    let el = document.createElement("div");
                    el.classList.add("room");

                    let imageEl = document.createElement("div");
                    imageEl.classList.add("room-image");
                    imageEl.style.backgroundImage = "url(" + room.imageEl + ")";
                    el.appendChild(imageEl);

                    roomContainer.appendChild(el);

                    let roomObj = {
                        name: room.name,
                        el,
                        imageEl,
                        boxes: room.boxes
                    };

                    rooms.push(roomObj);

                    clearCanvas();
                })

                currentRoomIndex = 0;
                currentRoom = rooms[0];
                currentRoom.el.classList.add("current");

                editorToolbar.querySelector("div.btn[name=preview]").click();
            });
        }
    }
}