export default class Filter {
    constructor(){

    } 

    filterOnclick(call,form,todos) {
        const data = new FormData(form);
        const input = document.getElementById("input-filter")
        let type = null;
        let all = data.has("all");
        let completed = data.has("completed");
        let noCompleted = data.has("no-completed");
        if(all) type = "all";
        else if(completed) type = "completed";
        else if(noCompleted) type = "no completed";
        
        call({
            type,
            words:input.value,
        },todos);
    }
}