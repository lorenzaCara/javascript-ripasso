//CLOSURE
//es.1
//Scrivi una funzione counter che restituisce una funzione che, ogni volta che viene chiamata, incrementa e restituisce il contatore.
let counter = () => {
    let result = 0;

    return () => {
        return ++result;
    }
}

let couterResult = counter();
console.log(couterResult());
console.log(couterResult());
console.log(couterResult());

/* let counter = (result) => {

    return () => {
        return ++result;
    }
}

let couterResult = counter(0);
console.log(couterResult());
console.log(couterResult());
console.log(couterResult()); */

//es.2
//Scrivi una funzione sum che prende un numero iniziale e restituisce una funzione che può prendere un altro numero, sommando il precedente.
let sum = (a) => {
    return (b) => {
        return a+b;
    }
}

let resultSum = sum(4);
console.log(resultSum(3));

//es.3
//Scrivi una funzione multiplier che prende un numero x e restituisce una funzione che moltiplica qualsiasi numero dato per x.
let multiplier = (x) => {
    return (y) => {
        return x*y; 
    }
}

let resultMult = multiplier(2)
console.log(resultMult(4));

//es.4
//Scrivi una funzione delayedLogger che prende un messaggio e lo stampa dopo 3 secondi utilizzando una closure.
let delayedLogger = (message) => {
    return () => {
        setTimeout(() => {
            console.log(message) //setTimeout non restituisce nulla direttamente; invece, esegue una funzione dopo un certo tempo. Quindi, il return message all'interno di setTimeout non ha effetto, perché setTimeout non può restituire un valore immediatamente. Invece, dovresti usare console.log() per stampare il messaggio dopo il ritardo.
        }, 3000);
    }
}

let delayedMessage = delayedLogger("Hi I'm Pedro Pascal");
delayedMessage();

//MAP
//es.1
let frutti = ['apple', 'coconut', 'kiwi'];

frutti.map(frutto => {
    console.log(frutto);
})

//es.2
let numeri = [1, 2, 3];

let mult = numeri.map(numero => {
    return numero*2;
})

console.log(mult);

