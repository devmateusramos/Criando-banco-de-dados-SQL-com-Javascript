class Shape {
    toString() {
        return `area: ${this.calculateArea()}`
    };
}

class Square extends Shape {
    constructor(side) {
        super();
        this.side = side;
    }

    toString() {
        return `side: ${this.side} e ${super.toString()}`;
    }

    calculateArea() {
        return Math.pow(this.side, 2)
    }

    static fromArea(area) {
        return new Square(Math.sqrt(area));
    }

}
const square = Square.fromArea(25);

console.log(square)
console.log(square.toString())
console.log("A área é: " + square.calculateArea())

class Circle extends Shape{
    constructor(radius) {
        super();
        this.radius = radius;
    }

    calculateArea() {
        return Math.PI * Math.pow(this.radius, 2);
    }

    toString() {
        return `radius: ${this.radius} e ${super.toString()}`
    }

    static fromArea(area) {
        return new Circle(Math.sqrt(area / Math.PI))
    }

}

const circle = Circle.fromArea(314.1592653589793);
console.log(circle);
console.log(circle.toString())
console.log("A área é: " + circle.calculateArea())