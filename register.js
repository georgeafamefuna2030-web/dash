//password toggle
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const togglePassword = document.getElementById("togglePassword");
togglePassword.addEventListener("click", ()=>{
    const type =
    password.type === "password"
    ? "text"
    : "password";
    togglePassword.classList.toggle("fa-eye");
    togglePassword.classList.toggle("fa-eye-slash");
});
// password strength
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");
password.addEventListener("keyup", () =>{
    const value = password.value;
    let strength = 0;
    if(value.length >= 8)
        strength++;
    if(/[A-Z]/.test(value))
        strength++;
    if(/[0-9]/.test(value))
        strength++;
    if(/[!@#$%^&*]/.test(value))
        strength++;
    switch(strength){
        case 1:
        strengthBar.style.width="25%";
strengthBar.style.background="3ef4444";
strengthText.innerText="Weak";
break;

case 2:
    strengthBar.style.width="50%";
strengthBar.style.background="#f59e0b";
strengthText.innerText="Fair";
break;

case 3:
    strengthBar.style.width="75%";
strengthBar.style.background="#3b82f6";
strengthText.innerText="Good";
break;

case 4:
    strengthBar.style.width="100%";
strengthBar.style.background="#22c55e";
strengthText.innerText="Strong";
break;

default:
    strengthBar.style.width="0%";
    strengthText.innerText="Password Strength";
    }
});
// form validation
const form = document.getElementById("registerForm");
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const fullName = document.getElementById("fullname").value.trim();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    if(
fullName===""||
username===""||
email===""||
phone===""||
password.value===""||
confirmPassword.value===""
    ){
        alert("Please fill all fields.");
        return;
    }
    if(password.value!==confirmPassword.value){
        alert("passwords do not match.");
        return;
    }
    const user={
        fullName,
        username,
        email,
        phone,
        password:password.value
    };
    localStorage.setItem(
        "adminUser",
        JSON.stringify(user)
    );
    const button=form.querySelector("button");
    button.innerHTML="Creating Account...";
    button.disabled=true;
    setTimeout(()=>{
        alert("Registration Successful");
        window.location.href="login.html";
    },1500);
});
// email validation
document.getElementById("email")
.addEventListener("blur", function(){
    const pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!pattern.test(this.value)){
        alert("please enter a valid email address.");
    }
});
//phone validation
document.getElementById("phone")
.addEventListener("input", function(){
    this.value=this.value.replace(/[^0-9]/g,'');
});
// profile image preview
const profileImage = document.getElementById("profileImage");
const preview = document.getElementById("preview");
profileImage.addEventListener("change", function(){
    const file = this.files[0];
    if(file){
        const reader = new FileReader();
        reader.onload = function(e){
            preview.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});
//input animation
document.querySelectorAll("ibput")
.forEach(input=>{
    input.addEventListener("focus", ()=>{
        input.style.borderColor="#4f46e5";
    });
    input.addEventListener("blur", ()=>{
        input.style.borderColor="#ddd";
    });
});
console.log("Register page loaded successfully.")