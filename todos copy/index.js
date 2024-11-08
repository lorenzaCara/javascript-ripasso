const baseUrl = 'http://localhost:3300';

//passo todo come parametro perchè non disponibile all'esterno (VEDI SOTTO)
const createTodoDiv = (todo) => {
    const div = document.createElement('div');
    const input = document.createElement('input'); //creo l'input che poi inserisco dentro al div.
    input.id = todo.id; //lo recupero dalla lista dei todo
    input.type = "checkbox";
    input.checked = todo.completed; //lo recupero dalla lista dei todo
    input.onchange = handleCheckbox; //non ci metto le tonde perchè sennò me la lancia. Qui gliela passo soltanto. Mentre io voglio che si esegua all'evento (event) FUNZIONE SOTTO.
    const label = document.createElement('input');
    label.value = todo.title; //lo recupero dalla lista dei todo. gli passo il value per scrivere il titolo nell'input, e per cambiarlo all'onchange.
    label.onchange = function (e) {
        handleChange(todo, e.target.value); //.target corrisponde all'input quindi potrei anche scrivere 'e.tagert.value'
        //handleChange(todo, label.value); 
    }
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    //deleteButton.onclick = () => handleDelete(todo); //(all'onclick devo passare per forza una funzione), non la devo lanciare subito.
    deleteButton.onclick = function (e) {
        handleDelete(todo);
    }
    div.appendChild(input);
    div.appendChild(label);
    div.appendChild(deleteButton);
    return div;
}

const loading = document.querySelector('#todos .loading'); //lo metto fuori dalla fetch
const todosDiv = document.querySelector('#todos');

//CLOSURE
/* Inizio closure */
const todoManager = () => {
    let state = []; 
    return {
        set: function(newState) {
            state = newState;
            this.render(); //per vedere le modifiche lato html
        },
        render: function() {
            //prende lo state fa un ciclo for e gestisce gli appendchild
            todosDiv.innerHTML = "";
            state.forEach(element => { 
                todosDiv.appendChild(createTodoDiv(element))
            });
        },
        add: function(newElement) {
            state.unshift(newElement);
            this.render(); //per vedere le modifiche lato html
        },
        delete: function(id) {
            state = state.filter(todo => todo.id !== id);
            this.render();
        },
        update: function(newTodo) {
            const index = state.findIndex(todo => todo.id === newTodo.id);
            state.splice(index, 1, newTodo); //sostituisce il vecchio todo con quello nuovo
            this.render();
        }
    }
}
const firstTodos = todoManager();
/* fine closure */

fetch(baseUrl + '/todos')
    .then(response => response.json())
    .then(todos => {
        loading.remove();
        /* todos.forEach(todo => {
            todosDiv.appendChild(createTodoDiv(todo)); //gli "appendo una funzione, che è quella creata sopra"
        }); */
        firstTodos.set(todos);
    })
    .catch(err => {
        console.log('err:', err);
        loading.textContent = "Errore!"; //messaggio che esce quando il sito va offline
    })

    const handleCheckbox = (event) => { //funzione per capire se la checkbox è checked o no!
        console.log(event.target.checked); //comando (event.target.checked) per vedere con un booleano è true o false
        fetch(baseUrl + '/todos/' + event.target.id, 
            {
                method: 'PATCH', //metodo per fare una modifica PUT. PUT per rimpiazzare completamente la lista di dati, tutte le sue info. PATCH, utilizzato per cambiare solo una parte della lista di dati, una parte delle sue info.
                body: JSON.stringify({completed: event.target.checked}),
                headers: {"Content-Type": "application/json"}
            } //servono per far funzionare la fetch. Es con il checked mi passa il checkbox da false a true.
        )//fetch per passare l'informazione al server/il back-end
        .then(response => response.json())
        .then(todo => {
            console.log(todo);
        })
        .catch(() => { //lo posso verificare solo se vado offline
            event.target.checked = !event.target.checked; //l'errore non mi fa modificare la checkbox, ovvero me lo riporta allo stato di default
        })
    }

    function handleDelete(todo) {
        fetch(baseUrl + '/todos/' + todo.id, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(() => { //non scrivo todo ma metto le parentesi, perchè devo prendere l'id.
            firstTodos.delete(todo.id);
        })
    }

    function handleChange(todo, newTitle) {
        fetch(baseUrl + '/todos/' + todo.id,
            {
                method: 'PATCH',
                body: JSON.stringify({
                    title: newTitle
                }),
                headers: {'Content-Type': 'application/json'}
            }
        )
        .then(response => response.json())
        .then(newTodo => {
            firstTodos.update(newTodo)
        })
    }


    //CREO UN NUOVO TODO
    const todoForm = document.querySelector('#todoForm');
    //todoForm.onsubmit = () => {}
    
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault(); //cosi al submit non mi ricarica la pagina
        //console.log(e.target.children.title.value); //lo trovo nell'ispeziona elemento. Value mi scrive il valore scritto nell'input.
        const title = e.target.children.title; //questo mi evita il query selector nell'input
        //console.log(title.value);

        fetch(baseUrl + '/todos', 
        {
            method: 'POST',
            body: JSON.stringify({ //questo viene convertito in JSON
                title: title.value, //cosi mi recupero il valore dell'input
                completed: false,
                userId: 1
            }),
            headers: {"Content-type": "application/json"}
        })
        .then(response => response.json())
        .then(newTodo => {
            firstTodos.add(newTodo);
        })
        
    })


    //visualizzare lista con titolo e immagine