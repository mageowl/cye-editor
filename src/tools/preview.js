const PreviewTool = {
    ...Tool,

    previewMode: false,
    imported: false,
    inventory: [],

    onadd() {
        editorToolbar.style.display = "none";
        document.getElementById("export-reminder").style.display = this.imported ? "none" : "block";
        this.previewMode = true;
        clearCanvas();
        this.inventory = [];

        window.onkeydown = (e) => {
            if (e.metaKey || e.ctrlKey) {
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
                    break;

                case "item":
                    if (this.inventory.includes(clickTarget[4].name)) return;
                    alert("You picked up a " + clickTarget[4].name + "!")
                    this.inventory.push(clickTarget[4].name)
            
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
            if (e.metaKey || e.ctrlKey) {
                handleCmdKey(e, false);
            }
        };
        renderBoxes();
    }
};