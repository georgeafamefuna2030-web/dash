// ==========================================
// AdminPro Product Management
// ==========================================

const modal = document.getElementById("modal");
const addProductBtn = document.getElementById("addProduct");
const productForm = document.getElementById("productForm");
const productTable = document.getElementById("productTable");
const search = document.getElementById("search");

let products = JSON.parse(localStorage.getItem("products")) || [];
let editIndex = null;

// ==========================================
// Open Modal
// ==========================================

addProductBtn.addEventListener("click", () => {

    modal.classList.add("active");

    productForm.reset();

    editIndex = null;

});

// ==========================================
// Close Modal
// ==========================================

modal.addEventListener("click", (e) => {

    if(e.target === modal){

        modal.classList.remove("active");

    }

});

// ==========================================
// Save Product
// ==========================================

productForm.addEventListener("submit",(e)=>{

    e.preventDefault();

    const stock = Number(document.getElementById("stock").value);

    let status = "In Stock";

    if(stock <= 0){

        status = "Out of Stock";

    }else if(stock <= 10){

        status = "Low Stock";

    }

    const product = {

        name:document.getElementById("productName").value,

        category:document.getElementById("category").value,

        price:Number(document.getElementById("price").value),

        stock:stock,

        status:status,

        image:document.getElementById("image").value ||

        "https://via.placeholder.com/60"

    };

    if(editIndex === null){

        products.push(product);

    }else{

        products[editIndex] = product;

    }

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

    modal.classList.remove("active");

    displayProducts();

});

// ==========================================
// Display Products
// ==========================================

function displayProducts(list = products){

    productTable.innerHTML = "";

    list.forEach((product,index)=>{

        let badge = "";

        if(product.status === "In Stock"){

            badge = "in-stock";

        }else if(product.status === "Low Stock"){

            badge = "low-stock";

        }else{

            badge = "out-stock";

        }

        productTable.innerHTML += `

        <tr>

            <td>

                <img
                src="${product.image}"
                class="product-image">

            </td>

            <td>${product.name}</td>

            <td>${product.category}</td>

            <td>$${product.price.toFixed(2)}</td>

            <td>${product.stock}</td>

            <td>

                <span class="status ${badge}">

                    ${product.status}

                </span>

            </td>

            <td>

                <button
                class="edit-btn"
                onclick="editProduct(${index})">

                    Edit

                </button>

                <button
                class="delete-btn"
                onclick="deleteProduct(${index})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}

displayProducts();

// ==========================================
// Delete Product
// ==========================================

function deleteProduct(index){

    if(confirm("Delete this product?")){

        products.splice(index,1);

        localStorage.setItem(
            "products",
            JSON.stringify(products)
        );

        displayProducts();

    }

}

// ==========================================
// Edit Product
// ==========================================

function editProduct(index){

    const product = products[index];

    document.getElementById("productName").value = product.name;

    document.getElementById("category").value = product.category;

    document.getElementById("price").value = product.price;

    document.getElementById("stock").value = product.stock;

    document.getElementById("image").value = product.image;

    editIndex = index;

    modal.classList.add("active");

}

// ==========================================
// Search Products
// ==========================================

search.addEventListener("keyup",()=>{

    const value = search.value.toLowerCase();

    const filtered = products.filter(product=>

        product.name.toLowerCase().includes(value) ||

        product.category.toLowerCase().includes(value) ||

        product.status.toLowerCase().includes(value)

    );

    displayProducts(filtered);

});

console.log("Product page loaded successfully.");