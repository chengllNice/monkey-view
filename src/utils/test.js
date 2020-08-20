
/*111111*/
function Person(){
    this.name = 'xiaopao';
    this.colors = ['red', 'blue'];
}

Person.prototype.getName = function(){
    console.log(this.name);
}

function Child(){

}

Child.prototype = new Person();
var child1 = new Child();
var child2 = new Child();
child1.colors.push('yellow');



/*222222*/

setTimeout(()=>{
    console.log('1')
})

new Promise((resolve, reject) => {
    console.log('2')
    resolve();
    console.log('3')
}).then(res=>{
    console.log('4')
})

console.log('5')