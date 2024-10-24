//calcolatrice

const calculatorLor = () => { 
    let result = 0;

    return { //se ritorno un oggetto, possi ritornare più cose e non una cosa unica
        add: function(num){
            return result += num; 
        },
        sub: function(num){
            return result -= num;
        },
        myResult: function(){
            return result;
        },
        reset: function(){
            return result = 0;
        }
    }
}

const calc = calculatorLor();

console.log(calc.add(4));
console.log(calc.add(6));
console.log(calc.reset());
console.log(calc.sub(5));
console.log(calc.reset());
console.log(calc.myResult());





//1
//calcolatrice simone
const calculator = (n = 0) => { //nel parametro inserisco che di default n = 0 
    let result = n;

    //se al posto di return uso una variabile, ritornandola in add e sub, posso passare le operazioni che voglio fare in un'unica console.log
    let operations = { //se ritorno un oggetto, possi ritornare più cose e non una cosa unica
        add: (num) => {
            result += num; 
            return operations; 
        },
        sub: (num) => {
            result -= num;
            return operations;
        },
        /* myResult: () => {
            return result;
        }  */
        myResult: () => result
    }
    return operations;
}

//const calc = calculator(11); //qui vario il numero di partenza, che da zero di default va a 11 e fa le operazioni a partire dall'11.
/* 
calc.add(4);
calc.sub(2);
calc.sub(6); */

console.log(calculator(11).add(2).sub(5).myResult()); //cosi bypasso la costante calc e i log consecutivi. Alla fine devo scrivere myResult senno non mi scrive il risultato

//2
//calcolatrice + breve (uso il this al posto di esplicitare una costante)
const calculatorTwo = (n = 0) => { 
    let result = n;

    return { 
        add: function(num) {
            result += num; 
            return this; 
        },
        sub: function(num) {
            result -= num;
            return this;
        },
        myResult: () => result //myResult: () => {return result}
    }
}


console.log(calculatorTwo(11).add(2).sub(5).myResult());