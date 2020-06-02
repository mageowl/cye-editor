const ImageAction = {
    ...Action,

    action() {
        let imageURL = prompt("Enter the URL:");
        if (imageURL == null) return;
        roomImage.src = imageURL;
        renderBoxes();
    }
}