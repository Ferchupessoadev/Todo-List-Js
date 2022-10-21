
/*
<div class="box-view-text">
    <div class="box__triangulo-title">
        <div class="container-triangulo"><div class="triangulo"></div></div>
        <p class="box__data">titulo</p>
    </div>
    <hr>
    <div>
        <p class="box__text">Lorem ipsum dolor sit amet.</p>
    </div>
</div>

*/

export default function toShowText(id,clases,todos) {
    let hoverBox = true;
    const box = document.createElement("DIV");
    box.classList.add("box-view-text");
    const containerOfTrianguloAndData = document.createElement("DIV");
    const containerTriangulo = document.createElement("DIV");
    const triangulo = document.createElement("DIV");
    const dataTitle = document.createElement("P");
    dataTitle.classList.add("box__data");
    const line = document.createElement("HR");
    const containerDescription = document.createElement("DIV");
    const textDescription = document.createElement("P");
    textDescription.classList.add("box__text");
    box.style.width = "150px";
    box.style.height = "100px";
    box.style.zIndex = "10000";
    box.style.background = "linear-gradient(to bottom,rgb(6, 9, 15),rgb(5, 16, 37))";

    containerOfTrianguloAndData.style.display = "flex";
    containerTriangulo.style.transform = "translateY(-8px)";
    

    triangulo.style.width = "0";
    triangulo.style.height = "0";
    triangulo.style.transform = "rotate(-90deg)";
    triangulo.style.borderLeft = "20px solid rgb(6, 9, 15)";
    triangulo.style.borderTop = "10px solid transparent";
    triangulo.style.borderBottom = "10px solid transparent";
    dataTitle.style.color = "var(--color-dominator)"
    containerDescription.style.padding = "10px";
    textDescription.style.color = "var(--color-dominator)";
    
    containerTriangulo.appendChild(triangulo);
    containerOfTrianguloAndData.appendChild(containerTriangulo);
    containerOfTrianguloAndData.appendChild(dataTitle);
    containerDescription.appendChild(textDescription);
    box.appendChild(containerOfTrianguloAndData);
    box.appendChild(line);
    box.appendChild(containerDescription);
    let body = document.querySelector(".body");
    body.appendChild(box);

    const todo = document.getElementById(id);
    const titleHTML = todo.children[0];
    const descriptionHTML = todo.children[1];
    
    let elementHTML;
    let indexTodo = todos.findIndex((todo) => todo.id == id);
    let dataTodo = todos[indexTodo];


    if(clases == "add-todo__title add-todo__data"){
        elementHTML = titleHTML;
        dataTitle.textContent = "Titulo";
        textDescription.textContent = dataTodo.title;
        containerTriangulo.style.marginRight = "30px";
    } else {
        elementHTML = descriptionHTML;
        dataTitle.textContent = "Descripción";
        textDescription.textContent = dataTodo.description;
        containerTriangulo.style.marginRight = "15px";
    }
    

    box.style.position = "absolute";
    box.style.top = `${elementHTML.getBoundingClientRect().top + 25 + scrollY}px`;
    box.style.bottom = `${elementHTML.getBoundingClientRect().bottom}px`;
    box.style.left = `${elementHTML.getBoundingClientRect().left}px`;
    box.style.right = `${elementHTML.getBoundingClientRect().right}px`;

    return hoverBox;
}