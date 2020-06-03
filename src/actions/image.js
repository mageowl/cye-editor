const ImageAction = {
    ...Action,

    action() {
        let imageURL = prompt("Enter the URL:");
        if (imageURL == null) return;
        currentRoom.imageEl.style.backgroundImage = "url(" + imageURL + ")";
        renderBoxes();
    }
}