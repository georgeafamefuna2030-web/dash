// ==========================================
// AdminPro Settings
// ==========================================


// ==========================================
// Get Elements
// ==========================================

const profileForm =
    document.getElementById("profileForm");

const passwordForm =
    document.getElementById("passwordForm");

const darkMode =
    document.getElementById("darkMode");

const compactSidebar =
    document.getElementById("compactSidebar");

const emailNotifications =
    document.getElementById("emailNotifications");

const orderNotifications =
    document.getElementById("orderNotifications");

const stockNotifications =
    document.getElementById("stockNotifications");

const clearData =
    document.getElementById("clearData");


// ==========================================
// Load Settings
// ==========================================

let settings =
    JSON.parse(
        localStorage.getItem("settings")
    ) || {

        name: "",
        email: "",
        phone: "",

        darkMode: false,
        compactSidebar: false,

        emailNotifications: true,
        orderNotifications: true,
        stockNotifications: true

    };


// ==========================================
// Load Profile Information
// ==========================================

document.getElementById("settingsName").value =
    settings.name || "";

document.getElementById("settingsEmail").value =
    settings.email || "";

document.getElementById("settingsPhone").value =
    settings.phone || "";


// ==========================================
// Load Switch States
// ==========================================

darkMode.checked =
    settings.darkMode;

compactSidebar.checked =
    settings.compactSidebar;

emailNotifications.checked =
    settings.emailNotifications;

orderNotifications.checked =
    settings.orderNotifications;

stockNotifications.checked =
    settings.stockNotifications;


// ==========================================
// Apply Saved Appearance
// ==========================================

if(settings.darkMode){

    document.body.classList.add("dark-mode");

}


if(settings.compactSidebar){

    document.body.classList.add("compact-sidebar");

}


// ==========================================
// Save Settings
// ==========================================

function saveSettings(){

    localStorage.setItem(
        "settings",
        JSON.stringify(settings)
    );

}


// ==========================================
// Profile Form
// ==========================================

profileForm.addEventListener(
    "submit",
    function(event){

        event.preventDefault();


        settings.name =
            document.getElementById(
                "settingsName"
            ).value.trim();


        settings.email =
            document.getElementById(
                "settingsEmail"
            ).value.trim();


        settings.phone =
            document.getElementById(
                "settingsPhone"
            ).value.trim();


        saveSettings();


        alert(
            "Profile settings saved successfully!"
        );

    }
);


// ==========================================
// Dark Mode
// ==========================================

darkMode.addEventListener(
    "change",
    function(){

        settings.darkMode =
            this.checked;


        if(this.checked){

            document.body.classList.add(
                "dark-mode"
            );

        }

        else{

            document.body.classList.remove(
                "dark-mode"
            );

        }


        saveSettings();

    }
);


// ==========================================
// Compact Sidebar
// ==========================================

compactSidebar.addEventListener(
    "change",
    function(){

        settings.compactSidebar =
            this.checked;


        if(this.checked){

            document.body.classList.add(
                "compact-sidebar"
            );

        }

        else{

            document.body.classList.remove(
                "compact-sidebar"
            );

        }


        saveSettings();

    }
);


// ==========================================
// Email Notifications
// ==========================================

emailNotifications.addEventListener(
    "change",
    function(){

        settings.emailNotifications =
            this.checked;

        saveSettings();

    }
);


// ==========================================
// Order Notifications
// ==========================================

orderNotifications.addEventListener(
    "change",
    function(){

        settings.orderNotifications =
            this.checked;

        saveSettings();

    }
);


// ==========================================
// Stock Notifications
// ==========================================

stockNotifications.addEventListener(
    "change",
    function(){

        settings.stockNotifications =
            this.checked;

        saveSettings();

    }
);


// ==========================================
// Password Form
// ==========================================

passwordForm.addEventListener(
    "submit",
    function(event){

        event.preventDefault();


        const currentPassword =
            document.getElementById(
                "currentPassword"
            ).value;


        const newPassword =
            document.getElementById(
                "newPassword"
            ).value;


        const confirmPassword =
            document.getElementById(
                "confirmNewPassword"
            ).value;


        // Basic validation

        if(newPassword.length < 6){

            alert(
                "New password must contain at least 6 characters."
            );

            return;

        }


        if(newPassword !== confirmPassword){

            alert(
                "New passwords do not match."
            );

            return;

        }


        /*
            This is only a frontend demonstration.

            A real application should NEVER
            store passwords in localStorage.

            Password changes should be handled
            securely by your backend.
        */


        alert(
            "Password change request submitted."
        );


        passwordForm.reset();

    }
);


// ==========================================
// Clear Dashboard Data
// ==========================================

clearData.addEventListener(
    "click",
    function(){

        const confirmation =
            confirm(
                "WARNING!\n\n" +
                "This will remove your dashboard " +
                "users, products and orders.\n\n" +
                "Do you want to continue?"
            );


        if(!confirmation){

            return;

        }


        const secondConfirmation =
            confirm(
                "Are you absolutely sure? " +
                "This action cannot be easily undone."
            );


        if(!secondConfirmation){

            return;

        }


        localStorage.removeItem("users");

        localStorage.removeItem("products");

        localStorage.removeItem("orders");


        alert(
            "Dashboard data has been cleared."
        );


        location.reload();

    }
);


// ==========================================
// Settings Loaded
// ==========================================

console.log(
    "Settings loaded successfully."
);