const numeric = [1, 2, 8, 10, 0]
const literals = ['1', '2', '8', '10', '0']
//mySort(numeric, 'asc') // [0, 1, 2, 8, 10]
//mySort(literals, 'asc') // ['0', '1', '10', '2', '8']
//mySort(numeric, 'desc') // [10, 8, 2, 1, 0]
//mySort(literals, 'desc') //['8', '2', '10', '1', '0']

function mySort(arr, meth) {
    if (typeof (arr[0] === 'number'))
        arr.sort((a, b) =>{
            return a-b;
        })
    if (typeof (arr[0]) === 'string')
        arr.sort();

    if (meth == 'dsc')
        arr.reverse();
    console.log(arr);
}

mySort(numeric, 'asc');
mySort(literals, 'asc');
mySort(numeric, 'dsc');
mySort(literals, 'dsc');