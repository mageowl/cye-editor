async function readFile() {
    let el = document.createElement("input");
    el.type = "file";

    el.style.display = "none";
    document.body.appendChild(el);

    el.click();

    let file = await new Promise((resolve) => {
        el.onchange = (e) => {
            resolve(e.target.files[0]);
        }
    });

    document.body.removeChild(el);

    if (file == undefined) return;
    
    let reader = new FileReader();
    reader.readAsText(file);
    
    return await new Promise((resolve) => {
        reader.onload = (e) => {
            resolve(e.target.result);
        }
    })
}