const input = document.querySelector('input');
const add = document.querySelector('.add');
const form = document.querySelector('form');

const todo_works = document.querySelector('.todo-works');

const todos = JSON.parse(localStorage.getItem('todos'));

if (todos) {
    todos.forEach((todo) => {
        addToDo(todo);
    })
}

function addToDo(todo) {
    const li = document.createElement('li');

    li.setAttribute('class', todo.completed ? 'completed' : '');

    li.innerHTML = `
    <span>${todo.text}</span>
    <button class="delete">Del</button>
    `

    li.addEventListener('click', () => {
        li.classList.toggle('completed');
        updateToDo();
    })

    li.querySelector('.delete').addEventListener('click', (e) => {
        e.target.parentElement.remove();
        updateToDo();
    })

    todo_works.appendChild(li);
    updateToDo();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let text = input.value.trim();

    text != '' ? addToDo({text, completed: false}) : undefined;

    input.value = '';
})

function updateToDo() {
    const li = document.querySelectorAll('li');

    const todos = [];

    li.forEach((item) => {
        todos.push({
            text: item.querySelector('span').innerHTML,
            completed: item.classList.contains('completed')
        })
    })

    localStorage.setItem('todos', JSON.stringify(todos));
}