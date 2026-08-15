// ==========================================
// AdminPro Orders Management
// ==========================================

const modal = document.getElementById("modal");
const addOrderBtn = document.getElementById("addOrder");
const closeModalBtn = document.getElementById("closeModal");

const orderForm = document.getElementById("orderForm");
const orderTable = document.getElementById("orderTable");

const search = document.getElementById("search");
const statusFilter = document.getElementById("statusFilter");

// Statistics
const totalOrders = document.getElementById("totalOrders");
const pendingOrders = document.getElementById("pendingOrders");
const shippedOrders = document.getElementById("shippedOrders");
const deliveredOrders = document.getElementById("deliveredOrders");


// ==========================================
// Load Orders
// ==========================================

let orders = JSON.parse(localStorage.getItem("orders")) || [];

let editIndex = null;


// ==========================================
// Generate Order ID
// ==========================================

function generateOrderId(){

    return "ORD-" +
        Date.now().toString().slice(-6);

}


// ==========================================
// Open Modal
// ==========================================

addOrderBtn.addEventListener("click", () => {

    orderForm.reset();

    editIndex = null;

    modal.classList.add("active");

});


// ==========================================
// Close Modal
// ==========================================

closeModalBtn.addEventListener("click", () => {

    modal.classList.remove("active");

});


modal.addEventListener("click", (event) => {

    if(event.target === modal){

        modal.classList.remove("active");

    }

});


// ==========================================
// Add / Edit Order
// ==========================================

orderForm.addEventListener("submit", (event) => {

    event.preventDefault();


    const customerName =
        document.getElementById("customerName").value.trim();

    const customerEmail =
        document.getElementById("customerEmail").value.trim();

    const product =
        document.getElementById("orderProduct").value.trim();

    const amount =
        Number(document.getElementById("orderAmount").value);

    const status =
        document.getElementById("orderStatus").value;


    if(
        !customerName ||
        !customerEmail ||
        !product ||
        amount < 0
    ){

        alert("Please complete all fields.");

        return;

    }


    const order = {

        id:
            editIndex === null
            ? generateOrderId()
            : orders[editIndex].id,

        customerName: customerName,

        customerEmail: customerEmail,

        product: product,

        amount: amount,

        status: status,

        date:
            editIndex === null
            ? new Date().toLocaleDateString()
            : orders[editIndex].date

    };


    // Add
    if(editIndex === null){

        orders.unshift(order);

    }

    // Edit
    else{

        orders[editIndex] = order;

    }


    saveOrders();

    modal.classList.remove("active");

    orderForm.reset();

    editIndex = null;

});


// ==========================================
// Save Orders
// ==========================================

function saveOrders(){

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

    displayOrders();

    updateStatistics();

}


// ==========================================
// Display Orders
// ==========================================

function displayOrders(list = orders){

    orderTable.innerHTML = "";


    if(list.length === 0){

        orderTable.innerHTML = `

            <tr>

                <td colspan="7"
                    style="text-align:center;padding:30px;">

                    No orders found.

                </td>

            </tr>

        `;

        return;

    }


    list.forEach((order) => {

        // Find original index
        const originalIndex =
            orders.findIndex(
                item => item.id === order.id
            );


        const statusClass =
            order.status
                .toLowerCase()
                .replace(" ", "-");


        orderTable.innerHTML += `

            <tr>

                <td class="order-id">
                    ${order.id}
                </td>


                <td>

                    <strong>
                        ${order.customerName}
                    </strong>

                    <br>

                    <small>
                        ${order.customerEmail}
                    </small>

                </td>


                <td>
                    ${order.product}
                </td>


                <td>
                    $${Number(order.amount).toFixed(2)}
                </td>


                <td>
                    ${order.date}
                </td>


                <td>

                    <span class="status ${statusClass}">
                        ${order.status}
                    </span>

                </td>


                <td>

                    <button
                        class="edit-btn"
                        onclick="editOrder(${originalIndex})">

                        <i class="fas fa-edit"></i>

                        Edit

                    </button>


                    <button
                        class="delete-btn"
                        onclick="deleteOrder(${originalIndex})">

                        <i class="fas fa-trash"></i>

                        Delete

                    </button>

                </td>

            </tr>

        `;

    });

}


// ==========================================
// Edit Order
// ==========================================

function editOrder(index){

    const order = orders[index];

    document.getElementById("customerName").value =
        order.customerName;

    document.getElementById("customerEmail").value =
        order.customerEmail;

    document.getElementById("orderProduct").value =
        order.product;

    document.getElementById("orderAmount").value =
        order.amount;

    document.getElementById("orderStatus").value =
        order.status;


    editIndex = index;

    modal.classList.add("active");

}


// ==========================================
// Delete Order
// ==========================================

function deleteOrder(index){

    const confirmed =
        confirm(
            "Are you sure you want to delete this order?"
        );


    if(!confirmed){

        return;

    }


    orders.splice(index, 1);

    saveOrders();

}


// ==========================================
// Search
// ==========================================

search.addEventListener("input", filterOrders);


// ==========================================
// Status Filter
// ==========================================

statusFilter.addEventListener(
    "change",
    filterOrders
);


// ==========================================
// Search + Filter
// ==========================================

function filterOrders(){

    const searchValue =
        search.value.toLowerCase().trim();

    const selectedStatus =
        statusFilter.value;


    const filtered =
        orders.filter(order => {

            const matchesSearch =

                order.id
                    .toLowerCase()
                    .includes(searchValue)

                ||

                order.customerName
                    .toLowerCase()
                    .includes(searchValue)

                ||

                order.customerEmail
                    .toLowerCase()
                    .includes(searchValue)

                ||

                order.product
                    .toLowerCase()
                    .includes(searchValue);


            const matchesStatus =

                selectedStatus === "all"

                ||

                order.status === selectedStatus;


            return matchesSearch && matchesStatus;

        });


    displayOrders(filtered);

}


// ==========================================
// Update Statistics
// ==========================================

function updateStatistics(){

    totalOrders.textContent =
        orders.length;


    pendingOrders.textContent =
        orders.filter(
            order => order.status === "Pending"
        ).length;


    shippedOrders.textContent =
        orders.filter(
            order => order.status === "Shipped"
        ).length;


    deliveredOrders.textContent =
        orders.filter(
            order => order.status === "Delivered"
        ).length;

}


// ==========================================
// Initial Load
// ==========================================

displayOrders();

updateStatistics();


console.log("Orders page loaded successfully.");