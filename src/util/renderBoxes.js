function renderBoxes() {
    clearCanvas()
    boxes.forEach((box) => {
        let color = {
            none: "#222222",
            code: "#eb7734",
            move: "#349eeb",
            dialouge: "#d92eff",
            item: "#54ff2e"
        }[box[4].type]

        ctx.fillStyle = color + "40";
        ctx.fillRect(...box);
        ctx.strokeStyle = color;
        ctx.strokeRect(...box);
        ctx.fillStyle = color;
        ctx.textBaseline = "hanging";
        ctx.font = "10px Verdana";
        ctx.fillText(box[4].name.toUpperCase(), box[0] + 3, box[1] + 3)
    });
}