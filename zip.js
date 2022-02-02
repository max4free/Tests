
const data = [
    {"varyLoooongIDFieldName":1,"extremelyLooooooooooooongActiveFiedName":true},
    {"varyLoooongIDFieldName":2,"extremelyLooooooooooooongActiveFiedName":false},
    {"varyLoooongIDFieldName":3,"extremelyLooooooooooooongActiveFiedName":true},
    {"varyLoooongIDFieldName":4,"extremelyLooooooooooooongActiveFiedName":false},
    {"varyLoooongIDFieldName":5,"extremelyLooooooooooooongActiveFiedName":false},
    {"varyLoooongIDFieldName":6,"extremelyLooooooooooooongActiveFiedName":false},
    {"varyLoooongIDFieldName":7,"extremelyLooooooooooooongActiveFiedName":true},
    {"varyLoooongIDFieldName":8,"extremelyLooooooooooooongActiveFiedName":true},
    {"varyLoooongIDFieldName":9,"extremelyLooooooooooooongActiveFiedName":true},
    {"varyLoooongIDFieldName":10,"extremelyLooooooooooooongActiveFiedName":true}]


const compress = (data) => {

    let keyName = Object.keys(data[0]);
    let result = new Array();
    result.push(keyName);
    data.forEach(element =>{
        let elementArr = new Array();
        for (let i = 0; i < keyName.length; i++){
            let unitArr = new Array();
            unitArr.push(i);
            unitArr.push(element[keyName[i]]);
            elementArr.push(unitArr);
        }
        result.push(elementArr);
    })
    console.log(result);
}

compress(data) // [["varyLoooongIDFieldName","extremelyLooooooooooooongActiveFiedName"],
                // [[[0,1],[1,true]],
                // [[0,2],[1,false]],
                // [[0,3],[1,true]],
                // [[0,4],[1,false]],
                // [[0,5],[1,false]],
                // [[0,6],[1,false]],
                // [[0,7],[1,true]],
                // [[0,8],[1,true]],
                // [[0,9],[1,true]],
                // [[0,10],[1,true]]]]