const Action = {
    use(canvas, ctx) {
        this.canvas = canvas
        this.ctx = ctx

        this.action()

        return undefined
    },

    action() { },

    onremove() { },
    onadd() { },
}