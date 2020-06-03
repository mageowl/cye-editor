const roomMenu = document.getElementById("room-menu");
const roomButtonContainer = document.getElementById("room-options");
const roomMenuButton = document.getElementsByName("roomSelect")[0];
const roomSettings = document.getElementById("room-settings")

const RoomMenuAction = {
    ...Action,

    menuOpen: false,
    settingsOpen: false,

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

        let imageEl = document.createElement("div");
        imageEl.classList.add("room-image");
        imageEl.style.backgroundImage = "url(./assets/images/placeholder-room.png)";
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
    },

    roomSettings() {
        roomMenuButton.click();
        roomSettings.style.display = "block";
        roomSettings.style.opacity = 1;
        this.settingsOpen = true;

        roomSettings.querySelector("input#room-name").value = currentRoom.name;
        if (rooms.length == 1) roomSettings.querySelector("button#room-delete").disabled = true;
        else roomSettings.querySelector("button#room-delete").disabled = false;
    },

    applyRoomSettings() {
        currentRoom.name = roomSettings.querySelector("input#room-name").value;

        roomSettings.style.display = "none";
        roomSettings.style.opacity = 0;
        this.settingsOpen = false;
    },

    deleteCurrentRoom() {
        if (rooms.length == 1) return;
        currentRoom.el.remove();
        rooms.splice(currentRoomIndex, 1);
        currentRoomIndex = Math.max(0, currentRoomIndex - 1);
        currentRoom = rooms[currentRoomIndex];
        currentRoom.el.classList.add("current");
        renderBoxes()

        roomSettings.style.display = "none";
        roomSettings.style.opacity = 0;
        this.settingsOpen = false;
    }
};