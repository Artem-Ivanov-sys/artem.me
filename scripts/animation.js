
function toggleMenu() {
    if (window.matchMedia("(max-width: 768px)").matches) {
        let menu = document.querySelector(".menu nav");
        menu.style.transform = menu.style.transform==="none"?"translate(0px, -100px)":"none";
        menu.style["pointer-events"] = menu.style.transform==="none"?"all":"none";
        menu.style.opacity = menu.style.opacity==="1"?"0":"1";
    } else {
        let menu = document.querySelector(".menu nav");
        menu.style.transform = menu.style.transform==="none"?"translate(-100px)":"none";
        menu.style.opacity = menu.style.opacity==="1"?"0":"1";
    }
}
