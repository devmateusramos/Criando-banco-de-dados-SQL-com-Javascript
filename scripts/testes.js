function sum(a, b) {
    return new Promise(function(resolve, reject) {
        if(!a || !b) return reject("Invalid input");
        setTimeout(function(){
            resolve(a + b);
        }, Math.random() * 1000);
    })
    
}
console.time("Performance")
Promise.race([
    sum(2,2),
    sum(4,4)
]).then(function(value) {
    console.log(value);
    return sum(value, value).then(function(result) {
        console.log(result);
        console.timeEnd("Performance")
    })
    
}).catch(function(e){
    console.log(e);
})
