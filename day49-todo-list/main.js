const todoInput = document.getElementById('todoMaker');
const wrapper = document.getElementById('wrapper');

todoInput.addEventListener("keydown", (e) => {
    if(e.key == "Enter") {
        const todo = createTodo(todoInput.value);
        todo.onclick = () => todo.classList.toggle('completed');
        todo.oncontextmenu = (e) => {
            e.preventDefault();
            todo.remove();
        }

        wrapper.appendChild(todo);
        todoInput.value = "";
    }
})

function createTodo(value) {
    const todo = document.createElement('div');
    todo.className = "todo";
    todo.textContent = value;
    return todo;
}