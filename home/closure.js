//closure
const contatore = () => {
    let count = 0;

    return function() {
        count++;
        return count;
    }
}

const countOne = contatore();
console.log(countOne());
console.log(countOne());

//calcolatrice
const calculator = () => {
    let res = 0;

    let calculate = {
        add: function(num) {
            return res += num;
        },
        sub: function(num) {
            return res -= num;
        }
    }

    return calculate;
}

let calculate = calculator();
console.log(calculate.add(4));
console.log(calculate.add(4));
console.log(calculate.sub(4));

//nome
const nome = () => {
    let nameOne = 'James';

    return () => {
        return nameOne;
    }
}
const personName = nome();
console.log(personName())

//useState
const useState = (name) => {
    let primerNombre = name;

    return [primerNombre, (segunNombre) => {
        primerNombre = segunNombre;
        return primerNombre;
    }]
}

const persona = useState('James');
console.log(persona[0]); //persona[0] valore corrente dello stato.
console.log(persona[1]('Martin')); //persona[1] valore per aggiornare lo stato 
console.log(persona[1]('Jose'));




