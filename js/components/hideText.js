

export default function hideText(hoverBox) {
    let box = document.querySelector(".box-view-text");
    if(!hoverBox) return true;
    box.remove();
    return false;
}