export default class Model {
    constructor(){
        this.view = null;
        this.todos = [];
        this.id = -1;
    }

    getTodos() {
        return this.todos;
    }

    setView(view) {
        this.view = view;
    }

    save(){
        localStorage.setItem("todos",JSON.stringify(this.todos));
    }

    render() {  
        const todos = JSON.parse(localStorage.getItem("todos"));
        const forTodos = todos.map(element => {
            let {id,title,description,completed} = element;
            let todo = {
                id,
                title,
                description,
                completed,
            };
            this.todos.push(todo);          
            return todo;
        });
        return forTodos;
    }

    addTodo(title,description,id,completed) {
        const todo = {
            id,
            title,
            description,
            completed,
        }
        this.todos.push(todo);
        this.save();
        return {...todo};
    }

    removeTodo(id) {
        const todo = document.getElementById(id);
        let RemoveTodo = this.todos.findIndex((element) => id == element.id);
        this.todos.splice(RemoveTodo,1);
        this.save()
    }

    editTodo(id,titleEdit,descriptionEdit) {
        let index = this.todos.findIndex((todo) => id == todo.id);
        this.todos[index].title = titleEdit;
        this.todos[index].description = descriptionEdit;
        this.save();
    }

    check(title,description,completed) {
        const index = this.todos.findIndex((todo) => todo.title == title && todo.description == description);
        this.todos[index].completed = completed;
        this.save();
    };
};
