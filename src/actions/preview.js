const PreviewAction = {
    ...Action,

    /**
     * @type {Window}
     */
    previewWindow: null,

    /**
     * @type {HTMLBodyElement}
     */
    body: null,

    /**
     * @type {HTMLHeadElement}
     */
    head: null,

    /**
     * @type {HTMLDocument}
     */
    document: null,

    action() {
        this.previewWindow = window.open("", "_blank");
        this.body = this.previewWindow.document.body;
        this.head = this.previewWindow.document.head;
        this.document = this.previewWindow.document;

        this.body.innerHTML += "<div id='rooms'></div>";
        this.head.innerHTML += "<link rel='stylesheet' href='http://127.0.0.1:5500/assets/client/client.css'>";

        let roomsEl = this.body.querySelector("#rooms");

        let roomEl = this.document.createElement("div");
        roomEl.classList.add("room", "current");

        let roomImageEl = this.document.createElement("img");
        roomImageEl.classList.add("room-image");
        roomImageEl.src = roomImage.src;
        roomEl.appendChild(roomImageEl);

        let boxContainerEl = this.document.createElement("div")
        boxContainerEl.style.width = 1000;
        boxContainerEl.style.height = 600;
        setTimeout(() => {
            boxContainerEl.style.left = roomImageEl.getBoundingClientRect().left;
        }, 100);
        boxContainerEl.id = "boxContainer"
        roomEl.appendChild(boxContainerEl)

        boxes.forEach((box) => {
            let boxEl = this.document.createElement("div");
            boxEl.classList.add("box");

            boxEl.style.width = box[2];
            boxEl.style.height = box[3];
            boxEl.style.left = box[0];
            boxEl.style.top = box[1];

            boxEl.onclick = function () {
                switch (box[4].type) {
                    case "move":
                        
                        break;

                    case "item":

                        break;

                    case "text":
                        this.previewWindow.alert(box[4].data.dialouge)
                        break;

                    case "code":

                        break;
                
                    default:
                        break;
                }
            }.bind(this)

            boxContainerEl.appendChild(boxEl);
        });

        roomsEl.appendChild(roomEl);

        window.onfocus = () => {
            this.previewWindow.close();
        }

        this.previewWindow.onresize = () => {
            setTimeout(() => {
                boxContainerEl.style.left = roomImageEl.getBoundingClientRect().left;
            }, 10);
        }
    }
}