const menuBtn = document.getElementById("menuBtn")
const sidebar = document.getElementById("sidebar")
if(menuBtn){
    menuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("show");
    });
}
//dark mode
const themeBtn = document.getElementById("themeBtn");
if(localStorage.getItem("theme") ==="dark"){
    document.body.classList.add("dark");
    if(themeBtn){
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
}
if(themeBtn){
    themeBtn.addEventListener("click", () =>{
        document.body.classList.toggle("dark");
        if(document.body.classList.contains("dark")){
            localStorage.setItem("theme", "dark");
            themeBtn.innerHTML = '<i class="fas fa-sun"></i>';

        }else{
            localStorage.setItem("theme","light");
            themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}
