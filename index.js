import Model from './model.js';
import View from './view.js';
import logicFilter from './filter_logic.js';
import controlarDiseño from './controlarDiseño.js'

document.addEventListener("DOMContentLoaded", () => {
    const model = new Model();
    const view = new View();
    const responsive = new controlarDiseño();
    const logicFilterInputs = new logicFilter();
    view.setModel(model);
    model.setView(view);
    view.render();
})
