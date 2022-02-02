const articles = [
    {"title":"justo. Praesent luctus. Curabitur","text":"sapieen, gravida non, sollicitudin a,"},
    {"title":"quam quis diam. Pellentesque","text":"eu odio tristique pharetra. Quisque ac"},
    {"title":"quis lectus. Nullam suscipit,","text":"bibendum. Donec felis orci, adipiscing non, luctus sit"},
    {"title":"Cras dolor dolor, tempus","text":"eget magna. Suspendisse tristique neque"},
    {"title":"ut dolor dapibus gravida.","text":"ultricies adipiscing, enim mi tempor lorem, eget mollis"},
    {"title":"elit. Etiam laoreet, libero","text":"eget metus eu erat semper rutrum."},
    {"title":"velit eu sem. Pellentesque","text":"Aliquam auctor, velit eget laoreet posuere, enim nisl elementum"},
    {"title":"Aliquam ultrices iaculis odio.","text":"ligula consectetuer rhoncus. Nullam velit dui, semper et,"},
    {"title":"a nunc. In at","text":"semper cursus. Integer mollis. Integer tincidunt aliquam arcu. Aliquam ultrices"},
    {"title":"iaculis quis, pede. Praesent","text":"mi. Aliquam gravida mauris ut mi. Duis risus"}]

const FILTER_OPERATORS = {
    AND: 'AND',
    OR: 'OR'
}

const textLikeRule = {key: 'text', rule: 'like', params: ['mollis']}
const titleStartLikeRule = {key: 'title', rule: 'sLike', params: ['ve']}
const titleEndLikeRule = {key: 'title', rule: 'eLike', params: ['ur']}
const textRegExpRule = {key: 'text', rule: 'regExp', params: [new RegExp('[e]{2}')]}

const handlerLikeRule = (params, value) => {

    let likeResult = new Array();
    let ind;
    for (let i = 0; i < params.length; i++){
        if (value.key == 'text') {
            ind = params[i]['text'].indexOf(value.params);
            if (ind > 0)
                likeResult.push(i);
        }
    }
    return likeResult;
}
const handlerSLikeRule = (params, value) => {

    let sLikeResult = new Array();
    for (let i = 0; i < params.length; i++){
        if (value.key == 'title') {
            if (params[i]['title'].startsWith(value.params[0]))
                sLikeResult.push(i);
        }
    }
    return sLikeResult;
}
const handlerELikeRule = (params, value) => {

    let eLikeResult = new Array();
    for (let i = 0; i < params.length; i++){
        if (value.key == 'title') {
            if (params[i]['title'].endsWith(value.params[0]))
                eLikeResult.push(i);
        }
    }
    return eLikeResult;
}
const handlerRegExpRule = (params, value) => {
    let regExpResult = new Array();
    let ind;
    for (let i = 0; i < params.length; i++){
        if (value.key == 'text') {
            ind = params[i]['text'].search(value.params[0]);
            if (ind > 0)
                regExpResult.push(i);
        }
    }
    return regExpResult;
}

const ruleHandlers = {
    'like': handlerLikeRule,
    'sLike': handlerSLikeRule,
    'eLike': handlerELikeRule,
    'regExp': handlerRegExpRule,
}

const myFilter = (handlers) => (items, rules, operator = FILTER_OPERATORS.OR) => {

    let unSortedResult = new Array;
    for (let i = 0; i < rules.length; i++){
        switch (rules[i].rule) {
            case 'like':
                unSortedResult.push(handlerLikeRule(items, rules[i]));
                break;
            case 'sLike':
                unSortedResult.push(handlerSLikeRule(items, rules[i]));
                break;;
            case 'eLike':
                unSortedResult.push(handlerELikeRule(items, rules[i]));
                break;
            case 'regExp':
                unSortedResult.push(handlerRegExpRule(items, rules[i]));
        }
    }
    unSortedResult = unSortedResult.flat().sort((a,b) => {return a-b});
    let sortedResult = new Array();
    if (operator == FILTER_OPERATORS.OR){
        sortedResult = unSortedResult.filter((item, index) => {
            return unSortedResult.indexOf(item) === index
        });
    }
    else if (operator == FILTER_OPERATORS.AND){
        sortedResult = unSortedResult.filter((item, index) => {
            return unSortedResult.indexOf(item) != index
        });
    }
    let result = new Array();
    sortedResult.forEach(element =>{
        result.push(articles[element]);
    })
    console.log((result));
}


myFilter(ruleHandlers)(articles, [textLikeRule, titleEndLikeRule], FILTER_OPERATORS.OR)
// [{"title":"justo. Praesent luctus. Curabitur","text":"sapieen, gravida non, sollicitudin a,"},{"title":"ut dolor dapibus gravida.","text":"ultricies adipiscing, enim mi tempor lorem, eget mollis"},{"title":"a nunc. In at","text":"semper cursus. Integer mollis. Integer tincidunt aliquam arcu. Aliquam ultrices"}]

myFilter(ruleHandlers)(articles, [textRegExpRule, titleStartLikeRule])
// [{"title":"justo. Praesent luctus. Curabitur","text":"sapieen, gravida non, sollicitudin a,"},{"title":"velit eu sem. Pellentesque","text":"Aliquam auctor, velit eget laoreet posuere, enim nisl elementum"}]

myFilter(ruleHandlers)(articles, [textRegExpRule, titleEndLikeRule], FILTER_OPERATORS.AND)
// [{"title":"justo. Praesent luctus. Curabitur","text":"sapieen, gravida non, sollicitudin a,"}]

