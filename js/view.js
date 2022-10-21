import createTodo from './components/createTodo.js'; 
import Alert from './components/alert.js';
import Filter from './components/filter.js';
import toShowText from './components/toShowText.js';
import hideText from './components/hideText.js';


export default class View {
    constructor() {
        this.model = null;
        this.alert = new Alert;
        this.title = document.getElementById("title");
        this.description = document.getElementById("description");
        this.errTitle = document.getElementById("error-title");
        this.errDescription = document.getElementById("error-description");
        this.btnGuardar = document.querySelector(".guardar");
        this.btnCerrar = document.querySelector(".cerrar");
        this.btn = document.getElementById("add");
        this.form = document.querySelector(".filter__form");
        this.btn.addEventListener("click", (e) => {
            e.preventDefault();
            if (this.alert.alertForInputs()) {
                this.addTodo(this.title.value,this.description.value);
                this.title.value = null;
                this.description.value = null;
            };
        });
        this.navFilter = document.querySelector(".section-filter");
        this.btnMenuFilter = document.getElementById("menu-filter");
        this.btnMenuFilter.addEventListener("click",()=>{
            this.navFilter.classList.toggle("section-filter-toggle");
        });
        this.filter = new Filter();
        this.searchFilter = document.querySelector(".filter__search");
        this.searchFilter.addEventListener("click",(e)=>{
            e.preventDefault();
            this.filter.filterOnclick(this.filters,this.form,this.model.getTodos());
        });
        this.idViewModal = null;
        this.btnCerrar.addEventListener("click",()=>this.onClickCerrar());
	    this.btnGuardar.addEventListener("click",()=> this.onClickGuardar(this.idViewModal));
        this.hoverBox = false;
        this.viewWidth = window.innerWidth;
        
    };
    
    setModel(model) {
        this.model = model;
    };


    removeTodo(id) {
        this.model.removeTodo(id);
        let todo = document.getElementById(id);
        todo.remove();
        this.show
    };

    onClickCerrar() {
        const modal = document.getElementById("modal");
        const inputTitle = document.getElementById("title-edit");
        const inputDescription = document.getElementById("description-edit");
        inputTitle.value = null;
        inputDescription.value = null;
        modal.style.display = "none";
    }
  
    onClickGuardar(id){
        const inputTitle = document.getElementById("title-edit");
        const inputDescription = document.getElementById("description-edit");
        if (inputTitle.value == "" || inputDescription.value == "") {
            if (inputTitle.value == "" ) {
                inputTitle.style.border = "1px solid #f00";
                inputTitle.addEventListener("click",()=> inputTitle.style.border = "none");
            } else if (inputDescription.value == "" ) {
                inputDescription.style.border = "1px solid #f00";
                inputDescription.addEventListener("click",() => inputDescription.style.border = "none");
            }
        } else {
            this.model.editTodo(id,inputTitle.value,inputDescription.value);  
            this.editTodo(id,inputTitle.value,inputDescription.value);
        }
    }  

    viewModal(id) {
        let todoData = this.model.todos;
        let indexOfOneTodo = todoData.findIndex(todo => todo.id == id);
        const modal = document.getElementById("modal");
        const inputTitle = document.getElementById("title-edit");
        const inputDescription = document.getElementById("description-edit");
        modal.style.display = "flex";
        inputTitle.value = todoData[indexOfOneTodo].title;
        inputDescription.value = todoData[indexOfOneTodo].description; 
        this.idViewModal = id;  
    }

    editTodo(id,newTitle,newDescription) {
        const todo = document.getElementById(id);
        const title = todo.children[0];
        const description = todo.children[1];
        
        if(newTitle.length > 9) title.textContent = `${newTitle.substring(0,9)}...`;
        else title.textContent = newTitle;
        
        if(newDescription.length > 15) description.textContent = `${newDescription.substring(0,12)}...`;
        else description.textContent = newDescription;
    }

    addTodo(title,description) {
    
        this.model.id = this.model.id + 1;
        const { id,Title,Description, completed } = this.model.addTodo(title,description,this.model.id,false);//es ultimo parametro es para marcar si esta completada la tarea.
        const addTodo = new createTodo();
        const [ removeBtn , editBtn , todos , checkBtn] = addTodo.insertElements(title,description,id,completed);      
        
        checkBtn.addEventListener("click",(e) =>{
            this.model.check(todos.children[0].textContent,todos.children[1].textContent,e.target.checked);
        });

        removeBtn.addEventListener("click",()=> this.removeTodo(id));
        editBtn.addEventListener("click",()=> this.viewModal(id));
        
        let titleHTML = todos.children[0];
        let descriptionHTML = todos.children[1];
        
        titleHTML.addEventListener("mouseover",(e) => this.hoverBox = toShowText(id,e.target.className,this.model.todos));
        descriptionHTML.addEventListener("mouseover",(e) => this.hoverBox = toShowText(id,e.target.className,this.model.todos));


        titleHTML.addEventListener("mouseout",(e) =>  this.hoverBox = hideText(this.hoverBox));
        descriptionHTML.addEventListener("mouseout",(e) => this.hoverBox = hideText(this.hoverBox));

    };


    render() { 
        if(JSON.parse(localStorage.getItem("todos")).length > 0 && localStorage.length > 0){
        let todo = this.model.render();
            todo.forEach((element) => {
                const addTodo = new createTodo();
                let [ removeBtn , editBtn , todos , checkBtn] = addTodo.insertElements(element.title,element.description,element.id,element.completed);
                checkBtn.addEventListener("click",(e)=>{
                    this.model.check(element.title,element.description,e.target.checked);
                });
                removeBtn.addEventListener("click",()=> this.removeTodo(element.id));
                editBtn.addEventListener("click",()=> this.viewModal(element.id));
                let titleHTML = todos.children[0];
                let descriptionHTML = todos.children[1];
                
                titleHTML.addEventListener("mouseover",(e) => this.hoverBox = toShowText(element.id,e.target.className,this.model.todos));
                descriptionHTML.addEventListener("mouseover",(e) => this.hoverBox =  toShowText(element.id,e.target.className,this.model.todos));

                titleHTML.addEventListener("mouseout",(e) => this.hoverBox = hideText(this.hoverBox));
                descriptionHTML.addEventListener("mouseout",(e) =>  this.hoverBox = hideText(this.hoverBox));
            });
            let ultimoElemento = todo.pop();
            this.model.id = ultimoElemento.id;
           
        };
        
    };

    filters(filters,todos){
        let addTodos = todos;
        const { type, words } = filters;
        const getTodoAndValues = (todo)=> {
            const title = todo.title;
            const description = todo.description;
            let check = todo.completed;
            let TitleIncludes = title.includes(words);
            let DescriptionIncludes = description.includes(words);
            return [check,TitleIncludes,DescriptionIncludes];
        }
        switch (type) {
            case "all":
                if (words.length > 0) {
                    addTodos.forEach(todo => {
                        const todos = document.getElementById(todo.id);
                        const [,TitleIncludes,DescriptionIncludes] = getTodoAndValues(todo);
                        if(TitleIncludes || DescriptionIncludes) todos.style.display = "flex";
                        else todos.style.display = "none";
                    })
                } else addTodos.forEach(todo => document.getElementById(todo.id).style.display = "flex");
                break;
            case "completed":
                if (words.length > 0) {
                    addTodos.forEach(todo => {
                        const todos = document.getElementById(todo.id);
                        const [check,TitleIncludes,DescriptionIncludes] = getTodoAndValues(todo);
                        if(check){ 
                            if(TitleIncludes || DescriptionIncludes) todos.style.display = "flex";
                            else todos.style.display = "none";
                        }
                        else todos.style.display = "none";
                    });
                } else addTodos.forEach(todo => {
                    const todos = document.getElementById(todo.id);
                    if(todo.completed) todos.style.display = "flex";
                    else todos.style.display = "none";
                })
                break;
            case "no completed":
                if(words.length > 0) {
                    addTodos.forEach(todo => {
                        const todos = document.getElementById(todo.id);
                        const [check,TitleIncludes,DescriptionIncludes] = getTodoAndValues(todo);
                        if(!check) {
                            if(TitleIncludes || DescriptionIncludes) todos.style.display = "flex";
                            else todos.style.display = "none";
                        } else todos.style.display = "none";
                    })
                } else addTodos.forEach(todo => {
                    const todos = document.getElementById(todo.id);
                    if(!todo.completed) todos.style.display = "flex";
                    else todos.style.display = "none";
                })
                break;
            default:
                addTodos.forEach(todo => document.getElementById(todo.id).style.display = "flex")
                break;
        }
    }
};
