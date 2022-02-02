const compressedData = [
    ["varyLoooongIDFieldName","extremelyLooooooooooooongActiveFiedName"],
    [
        [[0,1],[1,true]],
        [[0,2],[1,false]],
        [[0,3],[1,true]],
        [[0,4],[1,false]],
        [[0,5],[1,false]],
        [[0,6],[1,false]],
        [[0,7],[1,true]],
        [[0,8],[1,true]],
        [[0,9],[1,true]],
        [[0,10],[1,true]]]]

const decompress = (data) => {

    let names = data[0];
    let variables = data[1];
    let key = names[0];
    let value = names[1];
    let unzipData = new Array();
    for (let i = 0; i < variables.length; i++){
        let firstArr = variables[i][0];
        let secondArr = variables[i][1];
        let unzipSMallData = new Object();
        unzipSMallData[key]  = firstArr[1];
        unzipSMallData[value] = secondArr[1];
        unzipData.push(unzipSMallData);
    }
    return unzipData;
}

console.log(JSON.stringify(decompress(compressedData)))
// [{"varyLoooongIDFieldName":1,"extremelyLooooooooooooongActiveFiedName":true},
// {"varyLoooongIDFieldName":2,"extremelyLooooooooooooongActiveFiedName":false},
// {"varyLoooongIDFieldName":3,"extremelyLooooooooooooongActiveFiedName":true},
// {"varyLoooongIDFieldName":4,"extremelyLooooooooooooongActiveFiedName":false},
// {"varyLoooongIDFieldName":5,"extremelyLooooooooooooongActiveFiedName":false},
// {"varyLoooongIDFieldName":6,"extremelyLooooooooooooongActiveFiedName":false},
// {"varyLoooongIDFieldName":7,"extremelyLooooooooooooongActiveFiedName":true},
// {"varyLoooongIDFieldName":8,"extremelyLooooooooooooongActiveFiedName":true},
// {"varyLoooongIDFieldName":9,"extremelyLooooooooooooongActiveFiedName":true},
// {"varyLoooongIDFieldName":10,"extremelyLooooooooooooongActiveFiedName":true}]
