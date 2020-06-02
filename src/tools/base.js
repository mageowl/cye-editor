const Tool = {
    use(canvas, ctx) {
        this.canvas = canvas
        this.ctx = ctx

        this.canvas.onmousedown = this.onmousedown.bind(this)
        this.canvas.onmouseup = this.onmouseup.bind(this)
        this.canvas.onmousemove = this.onmousemove.bind(this)
        this.canvas.onmouseleave = this.onmouseleave.bind(this)

        return this
    },

    onmousedown() { },
    onmouseup() { },
    onmousemove() { },
    onmouseleave() { },

    onremove() { },

    cursor: "default"
}