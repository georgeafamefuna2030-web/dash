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
// active sidebar
const links = document.querySelectorAll(".sidebar li");
links.forEach(link => {
    link.addEventListener("click", () => {
        links.forEach(item => {
            item.classList.remove("active");
        });
        link.classList.add("active");
    })
})

//dashboard animation counter
const counters = document.querySelectorAll(".card h3");
counters.forEach(counter => {
    const target = counter.innerText
    .replace("$", "")
    .replace(",", "");
    let count = 0;
    const speed = target / 80;
    function updateCounter(){
        count += speed;
        if (count < target){
            if (counter.innerText.includes("$")){
                counter.innerText = "$" + Math.floor(count).toLocaleString();
            } else{
                counter.innerText = Math.floor(count).toLocaleString();
            }
            requestAnimationFrame(updateCounter);
        } else{
            if (counter.innerText.includes("$")){
                counter.innerText = "$" + Number(target).toLocaleString();
            } else{
                counter.innerText = Number(target).toLocaleString();

            }
        }
    }
    updateCounter();
})

// notification
const bell = document.querySelector(".notification");
if (bell) {
    bell.addEventListener("click", () =>{
        alert(
           
            ` Notifications,
            3 New Orders,
           2 New Users,
            Revenue increased by 15%
            `);
    });
}

//search
const serach = document.querySelector(".search input");
if (search) {
    search.addEventListener("keyup", function (){
        const value = this.value.toLowerCase();
        document.querySelectorAll("tbody tr")
        .forEach(row => {
            row.computedStyleMap.display =
            row.innerText
            .toLowerCase()
            .includes(value)
            ? ""
            : "none";
        });
    });
}
//chart.js
const sales = document.getElementById("salesChart");
if (sales) {
    new CharacterData(sales, {
        type: "line",
        data: {
            labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "June"
            ],
            datasets: [{
                label: "Sales",
                data:  [
                    120,
                    190,
                    150,
                    220,
                    270,
                    320
                ],
                borderColor: "#4f46e5",
                backgroundColor:
                "rgba(79,70,229,.15)",
                fill: true,
                tension: .4
            }]
        }
    })
}

const revenue = document.getElementById("revenueChart");
if (revenue) {
    new CharacterData(revenue, {
        type: "doughnut",
        data: {
            labels: [
                "products",
                "Servuces",
                "Subscriptions"
            ],
            datasets: [{
                data: [
                    45,
                    35,
                    20
                ],
                backgroundColor: [
                    "#4f46e5",
                    "#22c55e",
                    "#f59e0b"
                ]
            }]
        }
    })
}

//welcome message

const hour = new Date().getHours();
let greeting = "";
if(hour < 12){
    greeting = "Good Mornning";

}else if(hour < 18){
    greeting = "Good  Afternoon";
}else{
    greeting = "good Evening";
}
const welcome = document.querySelector(".welcome h1");
if(welcome){
    welcome.innerText = greeting;
}
console.log("AdminPro Dashboard Loaded Successfully");