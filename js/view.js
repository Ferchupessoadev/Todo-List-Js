import createTodo from './components/createTodo.js'; 
import Alert from './components/alert.js';
import Filter from './components/filter.js';

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
            this.filter.filterOnclick(this.filters,this.form);
        });
        this.idViewModal = null;
        this.changeListener = false;
        this.btnCerrar.addEventListener("click",()=>this.onClickCerrar())
	    this.btnGuardar.addEventListener("click",()=> this.onClickGuardar(this.idViewModal))
    };
    
    setModel(model) {
        this.model = model;
    };


    removeTodo(id) {
        this.model.removeTodo(id);
        let todo = document.getElementById(id);
        todo.remove();
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
        let todos = document.getElementById(id);
        let title = todos.children[0];
        let description = todos.children[1];
        const modal = document.getElementById("modal");
        const inputTitle = document.getElementById("title-edit");
        const inputDescription = document.getElementById("description-edit");
        modal.style.display = "flex";
        inputTitle.value = title.textContent;
        inputDescription.value = description.textContent; 
        this.idViewModal = id;  
    }

    editTodo(id,newTitle,newDescription) {
        const todo = document.getElementById(id);
        const title = todo.children[0];
        const description = todo.children[1];
        title.textContent = newTitle;
        description.textContent = newDescription;
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
    };

    render() { 
        if(JSON.parse(localStorage.getItem("todos")).length > 0 && localStorage.length > 0){
        let todo = this.model.render();
            todo.forEach((element) => {
                const addTodo = new createTodo();
                let [ removeBtn , editBtn ,  , checkBtn] = addTodo.insertElements(element.title,element.description,element.id,element.completed);
                checkBtn.addEventListener("click",(e)=>{
                    this.model.check(element.title,element.description,e.target.checked);
                });
                removeBtn.addEventListener("click",()=> this.removeTodo(element.id));
                editBtn.addEventListener("click",()=> this.viewModal(element.id));
            });
            let ultimoElemento = todo.pop();
            this.model.id = ultimoElemento.id;
        };
    };

    filters(filters){
        const addTodos = document.getElementsByClassName("add-todo");
        const { type, words } = filters;
        const getTodoAndValues = (todo,words)=> {
            const title = todo.children[0].textContent;
            const description = todo.children[1].textContent;
            const check = todo.children[3].checked;
            const TitleIncludes = title.includes(words);
            const DescriptionIncludes = description.includes(words);
            return [check,TitleIncludes,DescriptionIncludes];
        }
        if (type === "all" || type == undefined) {
            if (words.length >= 1) {
                for (const todo of addTodos) {
                    let [,TitleIncludes,DescriptionIncludes] = getTodoAndValues(todo,words);
                    if (TitleIncludes || DescriptionIncludes) todo.style.display = "flex";
                    else todo.style.display = "none";
                }
            } else {
                 for (const todo of addTodos) todo.style.display = "flex";
            }
        }
        if (type == "completed") {
            if(words.length > 0) {
                for(const todo of addTodos) {
                    todo.style.display = "none";
                    const [check,TitleIncludes,DescriptionIncludes] = getTodoAndValues(todo,words);
                    if(check) {
                        if (TitleIncludes || DescriptionIncludes) todo.style.display = "flex";
                    } 
                    else todo.style.display = "none";
                }
            }
            else {
                for(let todo of addTodos) {
                    let check = todo.children[3].checked;
                    if (check) todo.style.display = "flex";
                    else todo.style.display = "none";
                }
            }
        }
        if(type == "no completed"){
            if(words.length >= 1) {
                for(const todo of addTodos) {
                    todo.style.display = "none";
                    const [check,TitleIncludes,DescriptionIncludes] = getTodoAndValues(todo,words);
                    if (!check) {
                        if (TitleIncludes || DescriptionIncludes) todo.style.display = "flex";
                        else todo.style.display = "none";
                    }
                } 
            } else {
                for(const todo of addTodos) {
                    const check = todo.children[3].checked;
                    if(check == false) todo.style.display = "flex";
                    else todo.style.display = "none";
                }
            }
        }
    }
};
