const DeleteTool = {
    ...Tool,

    onmousedown(e) {
        let x = e.clientX - this.canvas.offsetLeft;
        let y = e.clientY - this.canvas.offsetTop;

        let found = false;
        boxes.forEach((box, i) => {
            if ((x > box[0] && x < (box[2] + box[0])) && (y > box[1] && y < (box[3] + box[1])) && !found) {
                boxes.splice(i, 1);
                found = true;
            }
        });
        
        renderBoxes();
    },

    cursor: "url(./assets/icons/delete.png) 9 9, default"
}