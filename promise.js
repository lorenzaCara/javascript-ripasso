//promise & concurrency => SI USATO TANTO CON LE API
//la promise è un oggetto.

/* console.log(1);

setTimeout(() => { //è una promise. Succederà ma non nell'immediato. Verrà eseguito dopo il log 3
    console.log(2);
},5000);

console.log(3); */

const error = false; //se error è true, entra nell'if e la promise si risolve in con l'err/rej
const sleep = new Promise((res, rej) => {
    if (error) {
        rej('Non ho mantenuto la promessa');
    } else {
        setTimeout(() => {
            res('Ho mantenuto la promessa'); //è il risultato della promessa. Viene usato nelle promise come un return
        }, 4000);
    }
}); //accetta una callback con due parametri resolve e reject. Perchè una promessa può risolversi o no.


//il (.) davanti a then e catch, viene utilizzato per accedere a delle proprietà dell'oggetto (promise)
sleep
    .then((res => { //per stampare la variabile quando sleep si risolve
        console.log(res);
    }))
    .catch((err => { //gli posso passare quello che voglio, quindi posso scrivere err (per errore). Perchè con rej vi va in errore, e mi eseguirà il catch quando mi va in errore.
        console.log(err);
    }))

//rej e res si comportano come il return. Ovvero concluderanno l'esecuzione della funzione. O l'uno o l'altro, mai insieme.
//la promise è comunque asincrona, quindi anche se il rej non aspetta il setTimeOut parte sempre qualche millesimo di secondo dopo altri console.log() che si trovano fuori dalla promise

fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(json => console.log(json))
    .catch((err) => {
        console.log(err);
    })



