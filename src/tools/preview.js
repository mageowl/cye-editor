const PreviewTool = {
    ...Tool,

    previewMode: false,

    onadd() {
        editorToolbar.style.display = "none";
        this.previewMode = true;
        clearCanvas();

        window.onkeydown = (e) => {
            if (e.key == "Escape") {
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

        console.log(clickTarget)
        if (clickTarget != null) {
            switch (clickTarget[4].type) {
                case "text":
                    clickTarget[4].data.dialogue.split("\n\n\n").forEach(alert)
                    break;

                case "move":
                    currentRoom.el.classList.remove("current");
                    currentRoomIndex = clickTarget[4].data.roomID;
                    currentRoom = rooms[clickTarget[4].data.roomID];
                    currentRoom.el.classList.add("current");
                    break;
            
                default:
                    break;
            }
        }
    },

    onremove() {
        editorToolbar.style.display = "block";
        this.previewMode = false;
        window.onkeydown = () => {};
        renderBoxes();
    }
};