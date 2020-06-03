const ImageAction = {
    ...Action,

    action() {
        let imageURL = prompt("Enter the URL:");
        if (imageURL == null) return;
        currentRoom.imageEl.src = imageURL;
        renderBoxes();
    }
}