"use strict";
document.addEventListener('DOMContentLoaded', function() {
const title = document.getElementById("title");
const description = document.getElementById("description");
const btnAdd = document.getElementById("add");
const errTitle = document.getElementById("error-title");
const errDescription = document.getElementById("error-description");
const addTodos = document.getElementById("add-todo");
const todoList = document.getElementById("todo-list");
const modal = document.getElementById("modal");
const btnGuardar = document.querySelector(".guardar");
const btnCerrar = document.querySelector(".cerrar");
const inputTitle = document.getElementById("title-edit");
const inputDescription = document.getElementById("description-edit");
// id para identificar a cada todo creado cada vez que se crea una nueva tarea aumenta, su valor mas uno
let id = 1;

// funcion que verifica la cantidad de tareas para quitar o dejar la fila de descripcion de datos
// titulo, descripcion, etc.
const verificarCantidadDeTodos = () => {
    if (addTodos.children == undefined) {
        todoList.style.display = "none";
    } else {
        todoList.style.display = "block";
    }
}

const deleteTodo = idToRemove => {
  const todoDelete = document.getElementById(idToRemove);
  todoDelete.remove();
  verificarCantidadDeTodos();
}

function editTodo (idAddTodo) {
    // modal con dos inputs y dos botones. 
    modal.style.display = "flex";

    // selecciono el add todo con el id que le pase en la funcion addList
    let addTodo = document.getElementById(idAddTodo);
    // selecciono los parrafos de titulo y description ya previamente seleccionando el addTodo
    let titleToEdit = addTodo.children[0];
    let descriptionToEdit = addTodo.children[1];

    inputTitle.value = titleToEdit.textContent;
    inputDescription.value = descriptionToEdit.textContent;

    btnCerrar.addEventListener("click",()=> {
        modal.style.display = "none";
        inputTitle.value = "";
        inputDescription.value = "";
    });

    btnGuardar.addEventListener("click",() => {
        modal.style.display = "none";
        if (inputTitle.value.length >= 1 || inputDescription >= 1) {
            titleToEdit.innerHTML = inputTitle.value;
            descriptionToEdit.innerHTML = inputDescription.value;
        }
        titleToEdit = null;
        descriptionToEdit = null;

        inputTitle.value = "";
        inputDescription.value = "";
    });
};


const fragmento = document.createDocumentFragment();

const addList = () => {         
    verificarCantidadDeTodos();
    // valido si los inputs de entrada estan vacio.
    if (title.value === "" || description.value === "") {
        if (title.value === "") {
            errTitle.style.display = "block";
            title.addEventListener("click",() => errTitle.style.display = "none");
        } else {
            errDescription.style.display = "block";
            description.addEventListener("click",() => errDescription.style.display = "none");
        };
    } else { 
    verificarCantidadDeTodos();
    // creo los elementos para la nueva lista y le agrego sus respectivas clases y atributos.
    let addTodo = document.createElement("DIV");
    addTodo.classList.add("add-todo");
    addTodo.setAttribute("id",id++);
    let createTitle = document.createElement("P");
    createTitle.classList.add("add-todo__title");
    createTitle.innerHTML = title.value;
    let createDescription = document.createElement("P");
    createDescription.classList.add("add-todo__description");
    createDescription.innerHTML = description.value;
    let createDivComplete = document.createElement("DIV");
    createDivComplete.classList.add("add-todo__completed");
    let createChech = document.createElement("Input")
    createChech.setAttribute("type","checkbox");
    createChech.classList.add("checkbox");
    let divBtn = document.createElement("DIV");
    divBtn.classList.add("add-todo__completed-img");
    let removeBtn = document.createElement("img");
    removeBtn.setAttribute("src","../img/trash.svg");
    removeBtn.classList.add("trash"); 
    removeBtn.addEventListener("click", ()=> deleteTodo(addTodo.getAttribute("id")));
    let editBtn = document.createElement("img"); 
    editBtn.setAttribute("src","../img/edit.svg");
    editBtn.classList.add("edit");
    editBtn.addEventListener("click", () => editTodo(addTodo.getAttribute("id")));

    title.value = "";
    description.value = "";
    // inserto todos los elementos en el div addTodo y a ese addTodo lo inserto en un div contenedor.
    addTodo.appendChild(createTitle);
    addTodo.appendChild(createDescription);
    addTodo.appendChild(createDescription)
    addTodo.appendChild(createDivComplete);
    addTodo.appendChild(createChech);
    addTodo.appendChild(divBtn);
    divBtn.appendChild(editBtn);
    divBtn.appendChild(removeBtn);
    fragmento.appendChild(addTodo);
  };
};
btnAdd.addEventListener("click", e => {
    e.preventDefault();
    addList();
    addTodos.appendChild(fragmento);
  });
});