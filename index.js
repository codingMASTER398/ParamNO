const fs = require('fs');
const { totalmem } = require('os');
const arguments = process.argv.slice(2);
var readlineSync = require('readline-sync')

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

if(arguments[0]){
    fs.readFile(`${arguments[0]}`,{encoding:'utf8'},function(err,data) {
        if(err) throw err;

        let currentFunc;
        let params = []
        let variables = {}
        let overrideUsed = false

        function parseInput(inn) {
            try{
                var casee = inn.split(" ")[0]
                var input = inn.substr(inn.indexOf(" ") + 1)
                switch (casee) {
                    case "TEXT":
                        return input
                    case "NUMBER":
                        return Number(input)
                    case "VAR":
                        return variables[input]
                    default:
                        return "wtf"
                }
            }catch{
                return "wtf"
            }
        }

        function runFunc(funcName) {
            if(funcName == "STOPOVERRIDE"){
                if(overrideUsed){process.exit()}else{overrideUsed=true}
            }
            if(funcName && functions[funcName]){
                let currentFunc;
                let params = []
                let going = true
                functions[funcName].forEach(function(line){
                    if(!line.startsWith("//") &&  line !== ""){
                        if(going){
                            if(currentFunc){
                                if(line.startsWith("-")){
                                    params.push(line.substring(1))
                                }else{
                                    shuffleArray(params)
                                    if(handle(currentFunc,params)){
                                        params=[]
                                        currentFunc=line
                                    }else{
                                        going = false
                                    }
                                }
                            }else{
                                currentFunc=line
                            }
                        }
                    }
                })
                if(currentFunc && going){
                    shuffleArray(params)
                    handle(currentFunc,params)
                }
            }else{
                console.log(`We looked far and wide, but function ${funcName} doesn't exist`)
                process.exit()
            }
        }

        let tempPrint = ""

        function handle(func,params) {
            switch (func) {
                case "ADDNEXTPRINT":
                    for (let i = 0; i < params.length; i++) {
                        tempPrint=tempPrint+parseInput(params[i])+" "
                    }
                    return true
                case "PRINT":
                    var toprint = tempPrint
                    tempPrint = ""
                    for (let i = 0; i < params.length; i++) {
                        toprint=toprint+parseInput(params[i])+" "
                    }
                    console.log(toprint)
                    return true
                
                case "SET":
                    if(params.length == 2){
                        variables[parseInput(params[0])] = parseInput(params[1])
                    }else{
                        console.log(`Error: Invalid amount of people who care`)
                    }
                    return true
                case "IF":
                    if(params.length == 3){
                        if(parseInput(params[0]) == parseInput(params[1])){
                            runFunc(params[2])
                            return false
                        }else{
                            return true
                        }
                    }else{
                        console.log(`H u h`)
                        return true
                    }
                case "IFGREATER":
                    if(params.length == 3){
                        if(parseInput(params[0]) > parseInput(params[1])){
                            runFunc(params[2])
                            return false
                        }else{
                            return true
                        }
                    }else{
                        console.log(`H u h`)
                        return true
                    }

                case "INPUT":
                    if(params.length == 1){
                        variables[parseInput(params[0])] = readlineSync.question("Greedy program wants text >")
                        return true
                    }else{
                        console.log(`H u h`)
                        return true
                    }

                case "INPUTNUM":
                    if(params.length == 1){
                        variables[parseInput(params[0])] = Number(readlineSync.question("Greedy program wants number >"))
                        if(variables[parseInput(params[0])] == NaN){
                            variables[parseInput(params[0])] =  0
                        }
                        return true
                    }else{
                        console.log(`H u h`)
                        return true
                    }
                
                case "GO":
                    if(params.length == 1){
                        runFunc(params[0])
                        return false
                    }else{
                        console.log(`Hnugh?`)
                        return true
                    }

                case "MINUSONE":
                    if(params.length == 1){
                        if(variables[params[0]] && typeof variables[params[0]] == "number"){
                            variables[params[0]] -= 1
                        }
                        return true
                    }else{
                        console.log(`Hnugh?`)
                        return true
                    }
                case "PLUSONE":
                    if(params.length == 1){
                        if(variables[params[0]] && typeof variables[params[0]] == "number"){
                            variables[params[0]] += 1
                        }
                        return true
                    }else{
                        console.log(`Hnugh?`)
                        return true
                    }

                case "CHANGE":
                    if(params.length == 2){
                        if(variables[params[0]] && typeof variables[params[0]] == "number" && typeof Number(params[1]) == "number"){
                            variables[params[0]] += Number(params[1])
                        }
                        return true
                    }else{
                        console.log(`Hnugh?`)
                        return true
                    }

                case "TIMES":
                    if(params.length == 2){
                        if(variables[params[0]] && typeof variables[params[0]] == "number" && typeof Number(params[1]) == "number"){
                            variables[params[0]] =  variables[params[0]] * Number(params[1])
                        }
                        return true
                    }else{
                        console.log(`Hnugh?`)
                        return true
                    }

                case "DIVIDE":
                    if(params.length == 2){
                        if(variables[params[0]] && typeof variables[params[0]] == "number" && typeof Number(params[1]) == "number"){
                            variables[params[0]] =  variables[params[0]] / Number(params[1])
                        }
                        return true
                    }else{
                        console.log(`Hnugh?`)
                        return true
                    }

                case "EXIT":
                    if(functions["STOPOVERRIDE"]){
                        runFunc("STOPOVERRIDE")
                    }else{
                        process.exit()
                    }
                    return false

                case "ZEROSTOP":
                    if(params.length == 1){
                        if(typeof parseInput(params[0]) == "number"){
                            if(parseInput(params[0]) <= 0){
                                if(functions["STOPOVERRIDE"]){
                                    runFunc("STOPOVERRIDE")
                                    return false
                                }else{
                                    process.exit()
                                }
                            }
                        }
                        return true
                    }else{
                        console.log(`Hnugh?`)
                        return true
                    }
        
                default:
                    console.log(`Hey, i'm gonna ask you something. What is '${func}'?!?? Like really, what?`)
                    return true
            }
        }

        var readingFunc = null
        var functions = {

        }

        data.split(/\r?\n/).forEach(function(line){
            if(line.startsWith("FUNC")){
                readingFunc = line.substring(line.indexOf(" ") + 1)
                functions[readingFunc] = []
            }else{
                if (readingFunc !== null) {
                    functions[readingFunc].push(line)
                }
            }
        })

        //Start her up
        runFunc("MAIN")
    });
}else{
    throw "Provide a file"
}