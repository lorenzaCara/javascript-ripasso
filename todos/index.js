const baseUrl = 'https://jsonplaceholder.typicode.com';

const createTodoDiv = (todo) => {
    const div = document.createElement('div');
    
    const input = document.createElement('input');
    input.id = todo.id;
    input.type = "checkbox";
    input.checked = todo.completed;
    input.onchange = handleCheckbox;

    const label = document.createElement('label');
    label.textContent = todo.title;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => {
        const newTitle = prompt("Edit todo title:", todo.title);
        if (newTitle) {
            fetchUpdateTodo(todo.id, newTitle); // Passiamo il nuovo titolo alla funzione fetchUpdateTodo
        }
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => fetchDeleteTodo(todo.id);

    div.appendChild(input);
    div.appendChild(label);
    div.appendChild(editButton);
    div.appendChild(deleteButton);
    return div;
};

const loading = document.querySelector('#todos .loading');
const todosDiv = document.querySelector('#todos');

// Closure per gestire lo stato e renderizzare la lista
/* INIZIO CLOSURE */
const todoManager = () => {
    let state = []; 

    return {
        set: function(newState) {
            state = newState;
            this.render();
        },
        render: function() {
            todosDiv.innerHTML = "";
            state.forEach(element => { 
                todosDiv.appendChild(createTodoDiv(element));
            });
        },
        add: function(newElement) {
            state.unshift(newElement);
            this.render();
        },
        updateState: function(id, newTitle) {
            const todoIndex = state.findIndex(todo => todo.id === id);
            state[todoIndex].title = newTitle;
            this.render();
            /* if (todoIndex !== -1) {
                state[todoIndex].title = newTitle;
                this.render();
            } */
        },
        deleteState: function(id) {
            state = state.filter(todo => todo.id !== id); //controllo se l'id passato è diverso dagli altri e mi elimina quello diverso dagli altri. questa funzione significa "mantieni solo gli elementi il cui id è diverso da quello passato come parametro".
            this.render();
        }
    };
};

const firstTodos = todoManager();
/* FINE CLOSURE */

// Caricamento iniziale dei todo
fetch(baseUrl + '/todos')
    .then(response => response.json())
    .then(todos => {
        loading.remove();
        firstTodos.set(todos);
    })
    .catch(err => {
        console.log('err:', err);
        loading.textContent = "Errore!";
    });

// Gestione del checkbox
const handleCheckbox = (event) => {
    fetch(baseUrl + '/todos/' + event.target.id, 
        {
            method: 'PATCH',
            body: JSON.stringify({ completed: event.target.checked }),
            headers: { "Content-Type": "application/json" }
        }
    )
    .then(response => response.json())
    .then(todo => {
        console.log(todo);
    })
    .catch(() => {
        event.target.checked = !event.target.checked;
    });
};

// Gestione del submit del form
const todoForm = document.querySelector('#todoForm');

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = e.target.children.title;

    fetch(baseUrl + '/todos', 
    {
        method: 'POST',
        body: JSON.stringify({
            title: title.value,
            completed: false,
            userId: 1
        }),
        headers: { "Content-type": "application/json" }
    })
    .then(response => response.json())
    .then(newTodo => {
        firstTodos.add(newTodo);
        title.value = ''; // Resetta il campo input
    });
});

// Funzione fetch per l'aggiornamento del todo
const fetchUpdateTodo = (id, newTitle) => {
    fetch(baseUrl + '/todos/' + id, 
        {
            method: 'PATCH',
            body: JSON.stringify({ 
                title: newTitle 
            }),
            headers: { "Content-Type": "application/json" }
        }
    )
    .then(response => response.json())
    .then(updatedTodo => {
        firstTodos.updateState(id, updatedTodo.title);
    })
    .catch(err => console.log('Errore nella modifica:', err));
};

// Funzione fetch per la cancellazione del todo
const fetchDeleteTodo = (id) => {
    fetch(baseUrl + '/todos/' + id, {
        method: 'DELETE',
    })
    .then(() => {
        firstTodos.deleteState(id);
    })
    .catch(err => console.log('Errore nell\'eliminazione:', err));
};
