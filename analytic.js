// ==========================================
// AdminPro Analytics
// ==========================================


// ==========================================
// Load Data From LocalStorage
// ==========================================

let users =
    JSON.parse(localStorage.getItem("users")) || [];

let products =
    JSON.parse(localStorage.getItem("products")) || [];

let orders =
    JSON.parse(localStorage.getItem("orders")) || [];


// ==========================================
// Statistics Elements
// ==========================================

const usersCount =
    document.getElementById("usersCount");

const productsCount =
    document.getElementById("productsCount");

const ordersCount =
    document.getElementById("ordersCount");

const revenue =
    document.getElementById("revenue");


// ==========================================
// Calculate Revenue
// ==========================================

function calculateRevenue(){

    return orders
        .filter(order => order.status !== "Cancelled")
        .reduce((total, order) => {

            return total + Number(order.amount || 0);

        }, 0);

}


// ==========================================
// Update Statistics
// ==========================================

function updateStatistics(){

    usersCount.textContent =
        users.length;

    productsCount.textContent =
        products.length;

    ordersCount.textContent =
        orders.length;

    revenue.textContent =
        "₦" +
        calculateRevenue().toLocaleString(
            "en-NG",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

}


// ==========================================
// Orders Status Data
// ==========================================

function getOrderStatusData(){

    return {

        pending:
            orders.filter(
                order => order.status === "Pending"
            ).length,

        processing:
            orders.filter(
                order => order.status === "Processing"
            ).length,

        shipped:
            orders.filter(
                order => order.status === "Shipped"
            ).length,

        delivered:
            orders.filter(
                order => order.status === "Delivered"
            ).length,

        cancelled:
            orders.filter(
                order => order.status === "Cancelled"
            ).length

    };

}


// ==========================================
// Sales Chart
// ==========================================

const salesCanvas =
    document.getElementById("salesChart");

const salesChart =
    new Chart(salesCanvas, {

        type: "line",

        data: {

            labels: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ],

            datasets: [

                {

                    label: "Sales",

                    data: [
                        12000,
                        19000,
                        15000,
                        22000,
                        18000,
                        25000,
                        30000
                    ],

                    borderWidth: 3,

                    fill: false,

                    tension: 0.4

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {
                    display: true
                }

            },

            scales: {

                y: {

                    beginAtZero: true

                }

            }

        }

    });


// ==========================================
// Orders Chart
// ==========================================

const orderStatus =
    getOrderStatusData();


const ordersCanvas =
    document.getElementById("ordersChart");


const ordersChart =
    new Chart(ordersCanvas, {

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

                        orderStatus.pending,
                        orderStatus.processing,
                        orderStatus.shipped,
                        orderStatus.delivered,
                        orderStatus.cancelled

                    ],

                    borderWidth: 2

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });


// ==========================================
// Products Stock Chart
// ==========================================

const inStock =
    products.filter(
        product => product.stock > 10
    ).length;


const lowStock =
    products.filter(
        product =>
            product.stock > 0 &&
            product.stock <= 10
    ).length;


const outOfStock =
    products.filter(
        product => product.stock <= 0
    ).length;


const productsCanvas =
    document.getElementById("productsChart");


const productsChart =
    new Chart(productsCanvas, {

        type: "bar",

        data: {

            labels: [

                "In Stock",
                "Low Stock",
                "Out of Stock"

            ],

            datasets: [

                {

                    label: "Products",

                    data: [

                        inStock,
                        lowStock,
                        outOfStock

                    ],

                    borderWidth: 1

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            scales: {

                y: {

                    beginAtZero: true,

                    ticks: {

                        stepSize: 1

                    }

                }

            }

        }

    });


// ==========================================
// Users Chart
// ==========================================

const admins =
    users.filter(
        user => user.role === "Admin"
    ).length;


const managers =
    users.filter(
        user => user.role === "Manager"
    ).length;


const normalUsers =
    users.filter(
        user => user.role === "User"
    ).length;


const usersCanvas =
    document.getElementById("usersChart");


const usersChart =
    new Chart(usersCanvas, {

        type: "pie",

        data: {

            labels: [

                "Users",
                "Managers",
                "Admins"

            ],

            datasets: [

                {

                    data: [

                        normalUsers,
                        managers,
                        admins

                    ],

                    borderWidth: 2

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });


// ==========================================
// Sales Period Selector
// ==========================================

const salesPeriod =
    document.getElementById("salesPeriod");


salesPeriod.addEventListener(
    "change",
    function(){

        const period =
            this.value;

        if(period === "7"){

            salesChart.data.labels = [

                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"

            ];

            salesChart.data.datasets[0].data = [

                12000,
                19000,
                15000,
                22000,
                18000,
                25000,
                30000

            ];

        }


        else if(period === "30"){

            salesChart.data.labels = [

                "Week 1",
                "Week 2",
                "Week 3",
                "Week 4"

            ];

            salesChart.data.datasets[0].data = [

                75000,
                92000,
                85000,
                110000

            ];

        }


        else if(period === "12"){

            salesChart.data.labels = [

                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"

            ];

            salesChart.data.datasets[0].data = [

                80000,
                95000,
                110000,
                90000,
                125000,
                140000,
                135000,
                150000,
                165000,
                180000,
                175000,
                200000

            ];

        }


        salesChart.update();

    }
);


// ==========================================
// Initialize
// ==========================================

updateStatistics();


console.log("Analytics loaded successfully.");