class Circle {
    constructor(radius) {
        this.radius = radius;
    }

    get area() {
        return Math.PI * Math.pow(this.radius, 2);
    }
}

const circle = Circle(10);
console.log(circle)