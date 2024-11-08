console.log('Hello world!');

//recursive function
const countdown = (num) => {
    /* for (let i = num; i >= 0; i--) {
        console.log(i); 
    } */

    //if che va a riprodurre ciò che avviene nei cicli
    if(num > 0) { 
        console.log(num);
        countdown(num-1); //operatore -- se messo alla fine esegue l'operazione dopo averaver eseguito quella riga di codice, e quindi rilancia sempre il 10. Se lo metto prima, la sottrazione la fa prima di eseguire countdown e quindi (--num è uguale a num-1)
    } 
}
countdown(10);

//global scope or functions scope
let gl = 'ciao';    

//closure ==> funzione che ci permette di modificare variabili all'interno di una funzione. Ha accesso a variabili dichiarate dentro un blocco di codice {} 
const counter = () => { //può essere utile per creare più counter. Lo useState è un modello più complesso di closure.
    let count = 0;
    return () => { //qui torno una funzione che somma... e quindi ogni volta che lancio quella funzione aumenta 
        return ++count; //oppure cont+1 (in questo caso fa il count prima di eseguire il return)
    }
}
const counterOne = counter();
const counterTwo = counter();
console.log(counterOne());
console.log(counterOne());
console.log(counterTwo());

//simulazione useState usato con react
const useState = (initialState) => { //il parametro usato per date un valore allo stato
    let state = initialState; 
    return (newState) => {
        state = newState;
        return state;
    }
}
const person = useState('Mario');
console.log(person('Luigi')); //lo stato cambia da Mario a Luigi

//objects
const user = {
    firstName: 'Mario', //Chiave + valore => proprietà. Ovvero chiave che ha un valore diverso da una funzione.
    lastName: 'Rossi',
    age: 21,
    fullName: function() { ////Chiave + funzione => metodo. Chaive che ha come valore una funzione viene chiamato metodo. Le altre sono chiamate proprietà.
        //return user.firstName;
        return this.firstName + ' ' + this.lastName //this indica l'oggetto in cui mi trovo. This dentro l'arrow function non funziona. UTILIZZIAMO THIS PER INDICARE L'OGGETTO IN CUI CI TROVIAMO.
    } 
}; 
user.firstName = 'Luigi';
console.log(user.fullName());
//è un valore che noi assegna ad una variabile
//console.log(user); mi mostra tutto l'oggetto
//console.log(user.fullName()); 


