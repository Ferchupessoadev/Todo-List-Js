export default class Alert {
    constructor() {

    }

    validationTheInputs(titleParametro,descriptionParametro,errTitleParametro,errDescriptionParametro) {
        const title = document.getElementById(titleParametro);  
        const description = document.getElementById(descriptionParametro);

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
    }

    alertForInputs() {
        const title = "title",description = "description";
        const valueOfTheValidation = this.validationTheInputs(title,description);
        return valueOfTheValidation;
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
            
            if (description.value == "" || description.value == null) {
                description.style.border = "1px solid #f00";
                description.addEventListener("click",()=>{
                    description.style.border = "none";
                })
            }
            return false;
        } else {
            return true;
        }
    } 
};