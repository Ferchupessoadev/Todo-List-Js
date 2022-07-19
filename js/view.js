import createTodo from './components/createTodo.js'; 
import mostrarModal from './components/modal.js';
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
    };
    
    setModel(model) {
        this.model = model;
    };


    removeTodo(id) {
        const todo = document.getElementById(id);
        this.model.removeTodo(id);
        todo.remove();
    };

    editTodo(id) {
        let todo = document.getElementById(id);
        const title = todo.children[0].textContent;
        const description = todo.children[1].textContent;
    
        const [ inputTitle , inputDescription , modal] = mostrarModal(title,description);

        this.btnCerrar.addEventListener("click",()=>{
            modal.style.display = "none";
            inputTitle.value = null;
            inputDescription.value = null;
        });

        this.btnGuardar.addEventListener("click",()=> {
            if (this.alert.alertForInputsOfEdit()){
                const [ newTitle , newDescription ] = this.model.editTodo(title,description,inputTitle.value,inputDescription.value);  

                todo.children[0].textContent = newTitle;
                todo.children[1].textContent = newDescription;

                modal.style.display = "none";
                inputTitle.value = null;
                inputDescription.value = null;
            }
        });
    };

    addTodo(title,description) {
        this.model.id++
        const todo = this.model.addTodo(title,description,this.model.id,false);//es ultimo parametro es para marcar si esta completada la tarea.
        const addTodo = new createTodo();
        let [ removeBtn , editBtn , todos , checkBtn] = addTodo.insertElements(todo.title,todo.description,this.model.id);
        
        checkBtn.addEventListener("click",(e)=>{
            if(checkBtn.checked) {
                this.model.check(title,description,e.target.checked);
            } else {
                this.model.check(title,description,e.target.checked);
            }
        });

        removeBtn.addEventListener("click",()=> this.removeTodo(todos.getAttribute("id")));
        editBtn.addEventListener("click",()=> this.editTodo(todos.getAttribute("id")));
    };

    render() {    
        if(JSON.parse(localStorage.getItem("todos")).length > 0 && localStorage.length > 0){
        const todo = this.model.render();// nos retorna una copia de los objetos del localStorage.
            todo.forEach((element) => {
                const addTodo = new createTodo();
                let [ removeBtn , editBtn , checkBtn] = addTodo.insertElements(element.title,element.description,element.id,element.completed);
                checkBtn.addEventListener("click",(e)=>{
                    if(checkBtn.checked) {
                        this.model.check(element.title,element.description,e.target.checked);
                    } else {
                        this.model.check(element.title,element.description,e.target.checked);
                    }
                });
                removeBtn.addEventListener("click",()=> this.removeTodo(element.id));
                editBtn.addEventListener("click",()=> this.editTodo(element.id));
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
