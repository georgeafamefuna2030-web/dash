// ==========================================
// AdminPro Main Dashboard
// ==========================================


// ==========================================
// Load Data
// ==========================================

let users =
    JSON.parse(localStorage.getItem("users")) || [];

let products =
    JSON.parse(localStorage.getItem("products")) || [];

let orders =
    JSON.parse(localStorage.getItem("orders")) || [];


// ==========================================
// Dashboard Elements
// ==========================================

const totalUsers =
    document.getElementById("totalUsers");

const totalProducts =
    document.getElementById("totalProducts");

const totalOrders =
    document.getElementById("totalOrders");

const totalRevenue =
    document.getElementById("totalRevenue");


// ==========================================
// Calculate Revenue
// ==========================================

function calculateRevenue() {

    return orders

        .filter(order =>
            order.status !== "Cancelled"
        )

        .reduce(
            (total, order) => {

                return total +
                    Number(order.amount || 0);

            },
            0
        );
}


// ==========================================
// Update Statistics
// ==========================================

function updateDashboard() {

    if (totalUsers) {

        totalUsers.textContent =
            users.length;

    }


    if (totalProducts) {

        totalProducts.textContent =
            products.length;

    }


    if (totalOrders) {

        totalOrders.textContent =
            orders.length;

    }


    if (totalRevenue) {

        totalRevenue.textContent =
            "₦" +
            calculateRevenue().toLocaleString(
                "en-NG",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            );

    }
}


// ==========================================
// Greeting
// ==========================================

function displayGreeting() {

    const greeting =
        document.getElementById("greeting");

    if (!greeting) {
        return;
    }


    const hour =
        new Date().getHours();


    let message;


    if (hour < 12) {

        message = "Good Morning";

    }

    else if (hour < 18) {

        message = "Good Afternoon";

    }

    else {

        message = "Good Evening";

    }


    const settings =
        JSON.parse(
            localStorage.getItem("settings")
        ) || {};


    const name =
        settings.name || "Admin";


    greeting.textContent =
        `${message}, ${name} 👋`;


    // Also update profile name

    const profileName =
        document.getElementById(
            "profileName"
        );


    if (profileName) {

        profileName.textContent =
            name;

    }
}


// ==========================================
// Recent Orders
// ==========================================

function displayRecentOrders() {

    const table =
        document.getElementById(
            "recentOrders"
        );


    if (!table) {
        return;
    }


    table.innerHTML = "";


    const recentOrders =
        orders.slice(0, 5);


    if (recentOrders.length === 0) {

        table.innerHTML = `

            <tr>

                <td colspan="6"
                    class="empty-message">

                    No orders available.

                </td>

            </tr>

        `;

        return;
    }


    recentOrders.forEach(order => {

        const status =
            order.status || "Pending";


        const statusClass =
            status
                .toLowerCase()
                .replace(/\s+/g, "-");


        table.innerHTML += `

            <tr>

                <td>
                    ${order.id || "N/A"}
                </td>

                <td>
                    ${order.customerName || "Unknown"}
                </td>

                <td>
                    ${order.product || "Unknown"}
                </td>

                <td>
                    ₦${Number(order.amount || 0)
                        .toLocaleString("en-NG")}
                </td>

                <td>
                    ${order.date || "N/A"}
                </td>

                <td>

                    <span class="status ${statusClass}">

                        ${status}

                    </span>

                </td>

            </tr>

        `;

    });
}


// ==========================================
// SALES CHART
// ==========================================

let salesChart;


// ==========================================
// Create Sales Chart
// ==========================================

function createSalesChart() {

    const canvas =
        document.getElementById(
            "salesChart"
        );


    if (!canvas) {
        return;
    }


    // Prevent duplicate chart

    if (salesChart) {

        salesChart.destroy();

    }


    const salesData =
        getSalesData(7);


    salesChart =
        new Chart(canvas, {

            type: "line",

            data: {

                labels:
                    salesData.labels,

                datasets: [

                    {

                        label:
                            "Sales",

                        data:
                            salesData.values,

                        borderWidth:
                            3,

                        tension:
                            0.4,

                        fill:
                            false

                    }

                ]

            },


            options: {

                responsive:
                    true,

                maintainAspectRatio:
                    false,

                plugins: {

                    legend: {

                        display:
                            true

                    }

                },


                scales: {

                    y: {

                        beginAtZero:
                            true

                    }

                }

            }

        });

}


// ==========================================
// Get Sales Data
// ==========================================

function getSalesData(days) {

    const labels = [];

    const values = [];


    for (
        let i = days - 1;
        i >= 0;
        i--
    ) {

        const date =
            new Date();

        date.setDate(
            date.getDate() - i
        );


        const label =
            date.toLocaleDateString(
                "en-NG",
                {
                    day: "numeric",
                    month: "short"
                }
            );


        labels.push(label);


        const dateString =
            date.toISOString()
                .split("T")[0];


        let total = 0;


        orders.forEach(order => {

            if (
                order.status === "Cancelled"
            ) {
                return;
            }


            if (
                order.date === dateString
            ) {

                total +=
                    Number(order.amount || 0);

            }

        });


        values.push(total);

    }


    // If there are no real orders,
    // display zero instead of fake data.

    return {
        labels,
        values
    };

}


// ==========================================
// ORDER STATUS CHART
// ==========================================

let orderStatusChart;


// ==========================================
// Create Order Status Chart
// ==========================================

function createOrderStatusChart() {

    const canvas =
        document.getElementById(
            "orderStatusChart"
        );


    if (!canvas) {
        return;
    }


    if (orderStatusChart) {

        orderStatusChart.destroy();

    }


    const pending =
        orders.filter(
            order =>
                order.status === "Pending"
        ).length;


    const processing =
        orders.filter(
            order =>
                order.status === "Processing"
        ).length;


    const shipped =
        orders.filter(
            order =>
                order.status === "Shipped"
        ).length;


    const delivered =
        orders.filter(
            order =>
                order.status === "Delivered"
        ).length;


    const cancelled =
        orders.filter(
            order =>
                order.status === "Cancelled"
        ).length;


    orderStatusChart =
        new Chart(canvas, {

            type: "doughnut",

            data: {

                labels: [

                    "Pending",
                    "Processing",
                    "Shipped",
                    "Delivered",
                    "Cancelled"

                ],


                datasets: [

                    {

                        data: [

                            pending,
                            processing,
                            shipped,
                            delivered,
                            cancelled

                        ],

                        borderWidth:
                            2

                    }

                ]

            },


            options: {

                responsive:
                    true,

                maintainAspectRatio:
                    false,

                plugins: {

                    legend: {

                        position:
                            "bottom"

                    }

                }

            }

        });

}


// ==========================================
// Sales Period Selector
// ==========================================

const salesPeriod =
    document.getElementById(
        "salesPeriod"
    );


if (salesPeriod) {

    salesPeriod.addEventListener(
        "change",
        function () {

            const period =
                Number(this.value);


            if (!salesChart) {
                return;
            }


            const salesData =
                getSalesData(period);


            salesChart.data.labels =
                salesData.labels;


            salesChart.data.datasets[0].data =
                salesData.values;


            salesChart.update();

        }
    );

}


// ==========================================
// Refresh Dashboard
// ==========================================

function refreshDashboard() {

    users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];


    products =
        JSON.parse(
            localStorage.getItem("products")
        ) || [];


    orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];


    updateDashboard();

    displayGreeting();

    displayRecentOrders();

    createSalesChart();

    createOrderStatusChart();

}


// ==========================================
// Start Dashboard
// ==========================================

refreshDashboard();


// ==========================================
// Detect LocalStorage Changes
// ==========================================

window.addEventListener(
    "storage",
    function () {

        refreshDashboard();

    }
);


// ==========================================
// Console Message
// ==========================================

console.log(
    "AdminPro Dashboard loaded successfully."
);