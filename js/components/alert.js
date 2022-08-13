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
};