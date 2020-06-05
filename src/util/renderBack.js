function renderBackArrows() {
    clearCanvas();

    let image = new Image();
    image.src = "./assets/icons/back.svg";


    image.onload = () => {
        currentRoom.boxes.forEach((box) => {
            if (box[4].name.toLowerCase() == "back") {
                if (box[2] < box[3]) ctx.drawImage(image, box[0], box[1], box[2], box[2]);
                else ctx.drawImage(image, box[0], box[1], box[3], box[3]);
            }
        });
    }
}