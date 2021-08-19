const book1 = {
    name: "12 hábitos do programador eficiente",
    author: "Zeno Rocha"
};
const book2 = JSON.parse(JSON.stringify(book1));

console.log(book2 === book1);
console.log(book2);
console.log(JSON.stringify(book1) === JSON.stringify(book2));