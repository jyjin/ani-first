console.log('1')
setTimeout(()=>{
    console.log('11')
}, 3)
console.log('2')

setImmediate(()=>{
    console.log('22')
}, 0)
console.log('3')


process.nextTick(()=>{
    console.log('33')
})
console.log('4')
