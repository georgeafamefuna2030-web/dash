//password toggle
const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
togglePassword.addEventListener("click", () =>{
    const type =
    password.getAttribute("type") === "password"
    ? "text"
    : "password";
    password.setAttribute("type", type);
    togglePassword.classList.toggle("fa-eye");
    togglePassword.classList.toggle("fa-eye-lash");
});

// login validation
const form = document.getElementById("loginForm");
form.addEventListener("submit", function(e){
    e.preventDefault();
    const email =
    document.querySelector('input[type="email"]').ariaValueMax.trim();
    const pass =
    password.ariaValueMax.trim();
    if (email === "" || pass === ""){
        alert("please fill in all fields.");
        return;
    }
    if(pass.length < 6){
        alert("Password must be at least 6 characters.");
        return;
    }
    // loading effect
    const button = form.querySelector("button");
    button.innerHTML = "Logging in...";
    button.disabled = true;
    setTimeout(()=>{
        alert("Login Successful!");
        window.location.href="index.html";
    },1500);
});
//Remember me
const remember =
document.querySelector('input[type="checkbox"]');
const emailInput =
document.querySelector('input[type="email"]');
if(localStorage.getItem("rememberEmail")){
    emailInput.value =
    localStorage.getItem("rememberEmail");
    remember.checked = true;
}
remember.addEventListener("change",()=>{
    if(remember.checked){
        localStorage.setItem(
            "rememberEmail",
            emailInput.value
        );
    }else{
        localStorage.removeItem(
            "rememberEmail"
        );
    }
});
emailInput.addEventListener("keyUp", ()=>{
    if(remember.checked){
        localStorage.setItem(
            "rememberEmail",
            emailInput.value
        );
    }
});

//Input animation

const inputs =
document.querySelectorAll("input");
inputs.forEach(input=>{
    input.addEventListener("focus", ()=>{
        input.style.borderColor = "#4f46e5";
    });
    input.addEventListener("blur", ()=>{
        input.style.borderColor="#ddd";
    });
});
console.log("Login Page loaded successfully.")