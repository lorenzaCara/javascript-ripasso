//calcolatrice

const calculator = () => { 
    let result = 0;

    return { 
        add: function(num){
            result += num; 
            return result; 
        },
        sub: function(num){
            result -= num;
            return result;
        },
        myResult: function(){
            return result;
        },
        reset: function(){
            result = 0;
            return result;
        }
    }
}

const calc = calculator();

console.log(calc.add(4));
console.log(calc.add(6));
console.log(calc.reset());
console.log(calc.sub(5));
console.log(calc.reset());
console.log(calc.myResult());



