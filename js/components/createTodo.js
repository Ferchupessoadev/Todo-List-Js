export default class CreateTodo {
    constructor () {
        this.addTodos = document.getElementById("add-todo");
        this.fragmento = document.createDocumentFragment();
    }

    insertElements(title,description,id,completed) {
        const addTodo = document.createElement("DIV");
        addTodo.setAttribute("id",id);
        addTodo.classList.add("add-todo");

        const createTitle = document.createElement("P");
        createTitle.classList.add("add-todo__title");
        createTitle.innerHTML = title;

        const createDescription = document.createElement("P");
        createDescription.classList.add("add-todo__description");
        createDescription.innerHTML = description;

        const createDivComplete = document.createElement("DIV");
        createDivComplete.classList.add("add-todo__completed");

        const createChech = document.createElement("Input");
        createChech.setAttribute("type","checkbox");
        createChech.checked = completed;
        createChech.classList.add("checkbox");

        const divBtn = document.createElement("DIV");
        divBtn.classList.add("add-todo__completed-img");

        const removeBtn = document.createElement("img");
        removeBtn.setAttribute("src","./img/trash.svg");
        removeBtn.classList.add("trash");
            
        const editBtn = document.createElement("img"); 
        editBtn.setAttribute("src","./img/edit.svg");
        editBtn.classList.add("edit");

        addTodo.appendChild(createTitle);
        addTodo.appendChild(createDescription);
        addTodo.appendChild(createDescription)
        addTodo.appendChild(createDivComplete);
        addTodo.appendChild(createChech);
        divBtn.appendChild(editBtn);
        divBtn.appendChild(removeBtn);
        addTodo.appendChild(divBtn);
        this.fragmento.appendChild(addTodo);
        this.addTodos.appendChild(this.fragmento);
        return [removeBtn,editBtn, addTodo,createChech];
    }

}
