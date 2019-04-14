var data = [{
    var data = [{
    name: 'jyjin'
}, {
    name: 'tom'
}, {
    name: 'lucy'
}, {
    name: 'jim'
}]


// for(var i=0;i<data.length;i++){
//     if(data[i].name=='tom'){
//         data.splice(i,1)
//     }
//     console.log(data[i].name)
// }

data.map((item, index) => {
    console.log(item.name)

    if (item.name === 'tom') {
        data.splice(index, 1)
    }
    console.log(item.name)
})

console.log('data==', data)