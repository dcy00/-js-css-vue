// 作者 ：凉玉
new Promise((resolve)=>{
    setTimeout(()=>{
        resolve();
        console.log("promise-resolve");   //1.5
    },0)
})
// 简称set1
setTimeout(()=>{
    console.log('timer1')  //2
    Promise.resolve().then(function() {
        console.log('promise1')  //3
    })
}, 0)
// 简称set2
setTimeout(()=>{
    console.log('timer2')    //4
    Promise.resolve().then(function() {
        console.log('promise2') //5
    })
    // 简称set3
    setTimeout(() => {
        console.log('timer3')  //6
    }, 0)
}, 0)

Promise.resolve().then(function() {
    console.log('promise3')   //1
})

console.log('start')        // 0
/**
 * 运行的过程
循环一

1、将脚本任务放入到task队列。
2、从task中取出一个任务运行，运行的结果是将set1和set2放入到task中，将promise.then放入到microtask中，输出start。
3、检查microtask checkpoint，看microtask队列中是否有任务。
4、运行microtask中所有的任务，输出promise3。
5、清空microtask队列之后，进入下一个循环。
// --------执行了第一个任务 0  以及其下的微任务 1 1.5-----然后进入下个任务

循环二

1、从task中在取出一个set1任务，运行的结果是输出timer1，将promise.then放入到microtask队列中。
2、检查microtask checkpoint，看microtask队列中是否有任务。
3、运行microtask中所有的任务，输出promise1。
4、清空microtask队列之后，进入下一个循环。
// -------执行第二个任务 set1--2 以及其下的微任务3---- 

循环三

1、从task中在取出一个set2任务，运行的结果是输出timer2，将promise.then放入到microtask队列中，将set3放入到task队列中。
2、检查microtask checkpoint，看microtask队列中是否有任务。
3、运行microtask中所有的任务，输出promise2。
4、清空microtask队列之后，进入下一个循环。

循环四

1、从task中在取出一个set3任务，运行的结果是输出timer3
2、检查microtask checkpoint，看microtask队列中没有任务，进入下一个循环。

循环五

检测task队列和microtask队列都为空，WorkerGlobalScope对象中closing标志位为true，销毁event loop。
 */