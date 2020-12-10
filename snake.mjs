import { default_size } from "./config.mjs"

export function Snake(pos, boundary, size) {
    this.x = pos.x || 0
    this.y = pos.y || 0
    this.velocity = vector(1, 0)
    this.size = size || default_size
    this.boundary = boundary || vector(0, 0)
    this.length = 3
    this.body = [
        vector(this.x, this.y),
        vector(this.x - 10, this.y),
        vector(this.x - 20, this.y),
    ]
    this.show = (ctx) => {
        let counter = 0
        for (let body of this.body) {
            counter++
            ctx.beginPath()
            ctx.fillStyle = counter == 1 ? "green" : "black"
            ctx.rect(body.x, body.y, this.size, this.size)
            ctx.fill()
        }
    }
    this.eat = (food) => {
        this.body.push(vector(food.x, food.y))
        this.length++
    }
    this.isDead = () => {
        for (let i = 1; i < this.length; i++) {
            if (
                this.body[0].x == this.body[i].x &&
                this.body[0].y == this.body[i].y
            )
                return true
        }
        return false
    }
    this.run = () => {
        this.update(this.velocity)
    }
    this.update = (pos) => {
        if (
            pos.isEqual(vector(-1, 0)) &&
            this.body[1]?.x == this.body[0].x - this.size
        )
            return
        if (
            pos.isEqual(vector(1, 0)) &&
            this.body[1]?.x == this.body[0].x + this.size
        )
            return
        if (
            pos.isEqual(vector(0, -1)) &&
            this.body[1]?.y == this.body[0].y - this.size
        )
            return
        if (
            pos.isEqual(vector(0, 1)) &&
            this.body[1]?.y == this.body[0].y + this.size
        )
            return

        if (pos.isEqual(vector(-1, 0)) && this.body[0].x == 0)
            this.x = this.boundary.x
        if (
            pos.isEqual(vector(1, 0)) &&
            this.body[0].x + this.size == this.boundary.x
        )
            this.x = -this.size
        if (pos.isEqual(vector(0, -1)) && this.body[0].y == 0)
            this.y = this.boundary.y
        if (
            pos.isEqual(vector(0, 1)) &&
            this.body[0].y + this.size == this.boundary.y
        )
            this.y = -this.size

        this.velocity = pos
        this.x += this.velocity.x * this.size
        this.y += this.velocity.y * this.size
        let tempPos = vector(this.x, this.y)
        let currentPos = vector(this.x, this.y)
        for (let i = 0; i < this.length; i++) {
            tempPos = this.body[i]
            this.body[i] = currentPos
            currentPos = tempPos
        }
    }
}

export const vector = (x, y) => new vec(x, y)

function vec(x, y) {
    this.x = x || 0
    this.y = y || 0
    this.isEqual = function (vec) {
        return this.x == vec.x && this.y == vec.y
    }
}
