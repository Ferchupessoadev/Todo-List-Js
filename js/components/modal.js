export default function mostrarModal(title,description){
    const modal = document.getElementById("modal");
    const inputTitle = document.getElementById("title-edit");
    const inputDescription = document.getElementById("description-edit");
    modal.style.display = "flex";
    inputTitle.value = title;
    inputDescription.value = description;
    return  [ inputTitle , inputDescription , modal];
}