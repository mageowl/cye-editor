const PreviewTool = {
    ...Tool,

    previewMode: false,
    imported: false,
    inventory: [],

    onadd() {
        editorToolbar.style.display = "none";
        document.getElementById("export-reminder").style.display = this.imported ? "none" : "block";
        this.previewMode = true;
        this.inventory = [];

        renderBackArrows();

        window.onkeydown = (e) => {
            if (e.metaKey || (e.ctrlKey && !window.navigator.platform.indexOf('Mac') >= 0)) {
                handleCmdKey(e, true);
            } else if (e.key == "Escape" && !this.imported) {
                document.getElementsByName("preview")[0].click();
            }
        };
    },

    onmousedown(e) {

        let x = e.clientX - this.canvas.offsetLeft;
        let y = e.clientY - this.canvas.offsetTop;

        let clickTarget = null;
        currentRoom.boxes.forEach((box) => {
            if ((x > box[0] && x < (box[2] + box[0])) && (y > box[1] && y < (box[3] + box[1])) && clickTarget == null) {
                clickTarget = box;
            }
        });

        if (clickTarget != null) {
            switch (clickTarget[4].type) {
                case "text":
                    clickTarget[4].data.dialogue.split("\n\n\n").forEach(alert)
                    break;

                case "move":
                    if (clickTarget[4].data.roomID == "") return;
                    switch (clickTarget[4].data.condition.type) {
                        case "item":
                            if (!this.inventory.includes(clickTarget[4].data.condition.value)) {
                                alert(clickTarget[4].data.condition.dialogue)
                                return;
                            }
                            break;
                    
                        default:
                            break;
                    }

                    currentRoom.el.classList.remove("current");
                    currentRoomIndex = clickTarget[4].data.roomID;
                    currentRoom = rooms[clickTarget[4].data.roomID];
                    currentRoom.el.classList.add("current");
                    renderBackArrows();

                    let itemFound = false
                    currentRoom.boxes.forEach((box) => {
                        if (box[4].type == "item" && this.inventory.includes(box[4].name)) itemFound = true
                    })

                    if (itemFound) {
                        let roomNames = rooms.map((value) => value.name)
                        if (roomNames.includes(currentRoom.name + "-T")) {
                            let roomID = roomNames.indexOf(currentRoom.name + "-T")
                            currentRoom.el.classList.remove("current");
                            currentRoomIndex = roomID;
                            currentRoom = rooms[roomID];
                            currentRoom.el.classList.add("current");
                            renderBackArrows();
                        }
                    }

                    break;

                case "item":
                    if (this.inventory.includes(clickTarget[4].name)) return;
                    alert("You picked up a " + clickTarget[4].name + "!")
                    this.inventory.push(clickTarget[4].name)
                    
                    let roomNames = rooms.map((value) => value.name)
                    if (roomNames.includes(currentRoom.name + "-T")) {
                        let roomID = roomNames.indexOf(currentRoom.name + "-T")
                        currentRoom.el.classList.remove("current");
                        currentRoomIndex = roomID;
                        currentRoom = rooms[roomID];
                        currentRoom.el.classList.add("current");
                        renderBackArrows();
                    }
            
                default:
                    break;
            }
        }
    },

    onremove() {
        editorToolbar.style.display = "block";
        document.getElementById("export-reminder").style.display = "none";
        this.previewMode = false;
        window.onkeydown = (e) => {
            if (e.metaKey || (e.ctrlKey && !window.navigator.platform.indexOf('Mac') >= 0)) {
                handleCmdKey(e, false);
            }
        };
        renderBoxes();
    }
};