// Adminpro users management

const modal = document.getElementById("modal");
const addUserBtn = document.getElementById("addUser");
const userForm = document.getElementById("userForm");
const userTable = document.getElementById("userTable");
const search = document.getElementById("search");

let users = JSON.parse(localStorage.getItem("users")) || [];
let editIndex = null;

// open modal
addUserBtn.addEventListener("click", () =>{
    modal.classList.add("active");
    userForm.requestFullscreen();
    editIndex = null
});
// close modal
modal.addEventListener("click", (e) =>{
    if (e.target === modal){
        modal.classList.remove("active");
    }
});

// save User
userForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    const user = {
        name: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        role: document.getElementById("role").value,
        avatar:
        "https://ui-avatars.com/api/?background=4f46e5&color=fff&name=" +
        encodeURIComponent(document.getElementById("fullName").value)
    };
    if(editIndex === null){
        users.push(user);
    } else{
        users[editIndex] = user;
    }
    localStorage.setItem("users", JSON.stringify(users));
    modal.classList.remove("active");
    displayUsers();
});
// Display Users
function displayUsers(list = users){
    userTable.innerHTML = "";
    list.forEach((user,index)=>{
        userTable.innerHTML +=`
        <tr>
        <td>
        <img
        class="avatar"
        src="${user.avatar}">
        </td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.role}</td>
        <td>
        <button
        class="edit-btn"
        onclick="editUser(${index})">
        Edit
        </button>
        <button
        class="delete-btn"
        onclick="deleteUser(${index})">
        Delete
        </button>
        </td>
        </tr>
        `;
    });
}
displayUsers();
//delete
function deleteUser(index){
    if(confirm("Delete this user?")){
        users.splice(index,1);
        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );
        displayUsers();
    }
}
//edit
function editUser(index){
    const user = users[index];
    document.getElementById("fullName").value=user.name;
    document.getElementById("email").value=user.email;
    document.getElementById("phone").value=user.phone;
    document.getElementById("role").value=user.role;
    editIndex = index;
    modal.classList.add("active");
}
//search
search.addEventListener("keyup", ()=>{
    const value = search.value.toLowerCase();
    const filtered = users.filter(user =>
        user.name.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value) ||
        user.role.toLowerCase().includes(value) 
    );
    displayUsers(filtered);
});
console.log("Users Page loaded successfully.");