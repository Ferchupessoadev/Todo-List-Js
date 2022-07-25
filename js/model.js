export default class Model {
    constructor(){
        this.view = null;
        this.todos = [];
        this.id = -1;
    }

    setView(view) {
        this.view = view;
    }

    save(){
        localStorage.setItem("todos",JSON.stringify(this.todos));
    }

    render() {
        if(JSON.parse(localStorage.getItem("todos")).length > 0) {     
            const todos = JSON.parse(localStorage.getItem("todos"));
            const copyTodos = todos.map(element => {
                const {id,title,description,completed} = element
                const todo = {
                    id,
                    title,
                    description,
                    completed,
                };
                this.todos.push(todo);          
                return todo;
                
            });
            return copyTodos;
        };    
    }

    addTodo(title,description,id,completed) {
        const todo = {
            id,
            title,
            description,
            completed,
        }
        this.todos.push(todo);
        this.save()
        return {...todo};
    }

    removeTodo(id) {
        const todo = document.getElementById(id);
        let removeTodo = this.todos.findIndex((element)=> element.title == todo.children[0].textContent && element.description == todo.children[1].textContent);
        this.todos.splice(removeTodo);
        this.save()
    }

    editTodo(title,description,titleEdit,descriptionEdit) {
        let IndexEditTodo = this.todos.findIndex((element)=> element.title === title && element.description === description);
        this.todos[IndexEditTodo].title = titleEdit;
        this.todos[IndexEditTodo].description = descriptionEdit;
        this.save();
        return [this.todos[IndexEditTodo].title,this.todos[IndexEditTodo].description]
    }

    check(title,description,completed) {
        const index = this.todos.findIndex(todo => todo.title == title && todo.description == description);
        this.todos[index].completed = completed;
        this.save();
    };
};
