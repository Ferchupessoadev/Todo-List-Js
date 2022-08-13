import Model from './model.js';
import View from './view.js';
import logicFilter from './filter_logic.js';

document.addEventListener("DOMContentLoaded", () => {
    const model = new Model();
    const view = new View();
    const logicFilterInputs = new logicFilter();
    view.setModel(model);
    model.setView(view);
    view.render();
})
