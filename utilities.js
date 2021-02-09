const path = require('path')
const fs = require('fs')


//functoin that gets file path ending and based off this clips the end to the correct length.

const test = function(){
// console.log('this is a test and it worked')
return 'Test Words'
}

const numberI = function(){
    return 'functions 2'
}
const getAllBooks = function(){
    let books;
    books = fs.readdir('./uploads', function(err, files){
        return files;
    })
}
//clip the last two - - off a string  regex

exports.test = test
exports.numberI = numberI
exports.getAllBooks = getAllBooks
