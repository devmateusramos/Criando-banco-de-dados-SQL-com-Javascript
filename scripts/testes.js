const Rectangle = function(x, y) {
    this.x = x;
    this.y = y;
    if (this.x > 0 && this.y > 0){
    this.calculateArea = function (){
    return console.log(this.x * this.y);
    }} else {
        throw "Você passou um número inválido"
    }
}
/* const rectangle = new Rectangle (-4,3);
rectangle.calculateArea(); */
try{
const rectangle = new Rectangle (-4,3);
rectangle.calculateArea(); }
catch (error){
    console.log(error)
}
console.log("aoskdoas")