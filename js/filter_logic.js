export default class logicFilter{
    constructor(){
        this.labelAll = document.querySelector(".all");
        this.labelCompleted = document.querySelector(".completed");
        this.labelNoCompleted = document.querySelector(".no-completed");

        this.inputAll = document.getElementById("all");
        this.inputCompleted = document.getElementById("completed");
        this.inputNoCompleted = document.getElementById("no_completed");


        this.inputAll.checked = false;
        this.inputCompleted.checked = false;
        this.inputNoCompleted.checked = false;

        this.labelAll.addEventListener("click",()=>{
            this.labelAll.children[0].classList.add("all-toggle");
            this.labelCompleted.children[0].classList.remove("completed-toggle");
            this.labelNoCompleted.children[0].classList.remove("no-completed-toggle");
            this.inputAll.checked = true;
            this.inputCompleted.checked = false;
            this.inputNoCompleted.checked = false;
        });

        this.labelCompleted.addEventListener("click",()=>{
            this.labelAll.children[0].classList.remove("all-toggle");
            this.labelCompleted.children[0].classList.add("completed-toggle");
            this.labelNoCompleted.children[0].classList.remove("no-completed-toggle");
            this.inputAll.checked = false;
            this.inputCompleted.checked = true;
            this.inputNoCompleted.checked = false;
        });

        this.labelNoCompleted.addEventListener("click",()=>{
            this.labelAll.children[0].classList.remove("all-toggle");
            this.labelCompleted.children[0].classList.remove("completed-toggle");
            this.labelNoCompleted.children[0].classList.add("no-completed-toggle");
            this.inputAll.checked = false;
            this.inputCompleted.checked = false;
            this.inputNoCompleted.checked = true;
        });
    }
}