
export default class controlarDiseño {
    constructor() {
        addEventListener("DOMContentLoaded",()=>{
            if(innerWidth <= 850) this.responsiveTablet(); 
        window.addEventListener("resize",()=> {
            if(innerWidth <= 850) this.responsiveTablet();
        })
        })
    }



    responsiveTablet() {
        const contenedorDelForm = document.querySelector(".nav__div-2");
        contenedorDelForm.innerHTML = `
            <div class="nav__container-form-tablet">
                <form class="add-list nav__form">
                    <div class="nav__container-title">
                        <input type="text" id="title" placeholder="Titulo" class="nav__input" autocomplete="off">
                        <p class="nav__p-error" id="error-title">* Campo obligatorio</p>
                    </div>
                    <div class="nav__container-description">
                        <input type="text" id="description" placeholder="Descripción" class="nav__input" autocomplete="off">
                        <p class="nav__p-error" id="error-description">* Campo obligatorio</p>
                    </div>
                    <div class="nav__div-btn">
                        <img src="./img/menu.svg" alt="" class="nav__div-btn-img-menu" id="menu-filter">
                        <input type="submit" value="Add" class="nav__input-submit" id="add">
                    </div>
                </form>
            </div>
        `;

    }
}  