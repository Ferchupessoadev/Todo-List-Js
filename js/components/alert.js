export default class Alert {
    constructor() {

    }

    alertForInputs() {
        const title = document.getElementById("title");  
        const description = document.getElementById("description");

        if (title.value === "" || description.value === "") {
            if (title.value === "") {
                title.placeholder = "*Campo obligatorio";
                title.classList.add("addTodo-err");
                title.addEventListener("click",() => {
                    title.placeholder = "Titulo";
                    title.classList.remove("addTodo-err");
                });
            } else {
                description.placeholder = "*Campo obligatorio";
                description.classList.add("addTodo-err");
                description.addEventListener("click",() => {
                    description.placeholder = "Description";
                    description.classList.remove("addTodo-err");
                });
            };
            return false
        } else {
            return true
        };
    };

    alertForInputsOfEdit() {
        const title = document.getElementById("title-edit");
        const description = document.getElementById("description-edit");
        if (title.value == "" || description.value == "") {
            if (title.value == "" || title.value == null) {
                title.style.border = "1px solid #f00";
                title.addEventListener("click",()=>{
                    title.style.border = "none";
                })
            }
            
            else if (description.value == "" || description.value == null) {
                description.style.border = "1px solid #f00";
                description.addEventListener("click",()=>{
                    description.style.border = "none";
                });
            };
            return false;
        } 
        else {
            return true;
        }
    } 
};