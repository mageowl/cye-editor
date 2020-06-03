const roomMenu = document.getElementById("room-menu");
const roomButtonContainer = document.getElementById("room-options");
const roomMenuButton = document.getElementsByName("roomSelect")[0];

const RoomMenuAction = {
    ...Action,

    menuOpen: false,

    action() {
        this.menuOpen = !this.menuOpen;
        roomMenu.style.opacity = this.menuOpen + 0;
        roomMenu.style.display = this.menuOpen ? "block" : "none";

        if (this.menuOpen) {
            Array.from(roomButtonContainer.children).forEach((option) => {
                option.remove();
            });

            rooms.forEach((room, i) => {
                let roomEl = document.createElement("h3");
                roomEl.classList.add("option");
                if (currentRoomIndex == i) roomEl.classList.add("current");
                else {
                    roomEl.onclick = () => {
                        if (currentToolID == "edit" && EditTool.selection != null) {
                            EditTool.applyConfig();
                        }
                        currentRoom.el.classList.remove("current");
                        currentRoomIndex = i;
                        currentRoom = room;
                        currentRoom.el.classList.add("current");
                        renderBoxes();
                        roomMenuButton.click();
                    }
                }
                roomEl.innerText = room.name;
                roomButtonContainer.appendChild(roomEl);
            });
        }
    },

    newRoom() {
        let name = prompt("Enter the room name: ");
        if (name == null) return;

        currentRoom.el.classList.remove("current");

        let el = document.createElement("div");
        el.classList.add("room", "current");

        let imageEl = document.createElement("img");
        imageEl.classList.add("room-image");
        imageEl.src = "./assets/images/placeholder-room.png";
        el.appendChild(imageEl);

        roomContainer.appendChild(el);

        let room = {
            name,
            el,
            imageEl,
            boxes: []
        };

        currentRoomIndex = rooms.length;
        currentRoom = room;
        rooms.push(room);

        roomMenuButton.click();
        clearCanvas();
    }
};