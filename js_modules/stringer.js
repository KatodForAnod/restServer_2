function trimString(string){
    return string.replace(/\s+/g, ' ').trim();
    
}

function wordsCount(str){
    str = trimString(str);
    let counter = 0;

    for ( let symbol of str) {
        if( symbol == ' ' ){
            counter++;
        }
    }

    counter = counter > 1 ? ++counter : counter;

    return counter;
}

function* getWords( str ){
    str = trimString(str);

    let words = str.split(' ');
    for( let i = 0; i < words.length; i++){
        yield words[i];
    }
}

export {wordsCount, getWords };