var num = 1;
let obj = {
    num: 2,
    add: function() {
        this.num = 3;
        (function() {
            // // 这里的立即指向函数，因为我们没有手动去指定它的this指向，所以都会指向window/global
            console.log(this);  //global
            console.log(this.num);  //undefined
            this.num = 4;
        })();
        console.log(this.num);  ///3
    },
    sub: function() {
        console.log(this.num)
    }
}
obj.add();
console.log(obj.num); //3
console.log(num);  //1
const sub = obj.sub;
sub();  //4
