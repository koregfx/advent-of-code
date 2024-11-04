import fs from 'fs';

const namedDigits = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
}
const namedEntries = Object.entries(namedDigits)
const rawData = fs.readFileSync('./01/input.txt' , { encoding: 'utf8' })
const data = rawData.split('\r\n')
data.shift();

const numbers1 = data.map(a=>findNumber(a))
const result1 = numbers1.reduce((a,b)=>a+b,0)
console.log('Solution problem 1: ' + result1)


const numbers2 = data.map(a=>findNumber(replaceTextForNumber(a)))
const result2 = numbers2.reduce((a,b)=>a+b,0)
console.log('Solution problem 2: ' + result2)


function findNumber(str = ""){
    const matches = str.match(/[0-9]/g)
    if(!matches) return 0
    if(matches.length <= 1) return Number(`${matches[0]}${matches[0]}`)
    return Number(`${matches[0]}${matches.at(-1)}`)
}



function replaceTextForNumber(str = ""){
    const source = str.split('')
    let firstBuffer = ''
    let lastBuffer = ''
    while (source.length > 0){
        firstBuffer = firstBuffer + source.shift()
        lastBuffer = (source.pop() ?? '') + lastBuffer
        namedEntries.forEach(([name,digit]) => {
            if(firstBuffer.includes(name)){
                firstBuffer = firstBuffer.replace(name, digit + name.charAt(name.length -1))
            }
            if(lastBuffer.includes(name)){
                lastBuffer = lastBuffer.replace(name, name.charAt(0) + digit)
            }
        })
    }
    let combinedBuffer = firstBuffer + lastBuffer
    namedEntries.forEach(([name, digit]) => {
        if (combinedBuffer.includes(name)) {
          combinedBuffer = combinedBuffer.replace(name, digit)
        }
    })
    return combinedBuffer
}