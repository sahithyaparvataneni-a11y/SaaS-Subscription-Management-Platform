// ============================
// Session Check
// ============================

function checkLogin() {

    const isLoggedIn =
        localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {

        alert("Please login first");

        window.location.href =
            "login.html";
    }
}


// ============================
// Logout
// ============================

function logout() {

    localStorage.removeItem(
        "isLoggedIn"
    );

    alert(
        "Logged out successfully"
    );

    window.location.href =
        "login.html";
}


// ============================
// Plan Selection
// ============================

function selectPlan(plan) {

    localStorage.setItem(
        "plan",
        plan
    );

    alert(
        plan + " plan selected"
    );

    window.location.href =
        "dashboard.html";
}


// ============================
// Get Current User
// ============================

function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem("user")
    );
}


// ============================
// Display User Information
// ============================

function displayUser() {

    const user =
        getCurrentUser();

    if (!user) return;

    const userName =
        document.getElementById(
            "userName"
        );

    const userEmail =
        document.getElementById(
            "userEmail"
        );

    if (userName) {
        userName.innerHTML =
            user.name;
    }

    if (userEmail) {
        userEmail.innerHTML =
            user.email;
    }
}


// ============================
// Delete User
// ============================

function deleteUser() {

    const confirmDelete =
        confirm(
            "Are you sure?"
        );

    if (confirmDelete) {

        localStorage.removeItem(
            "user"
        );

        localStorage.removeItem(
            "plan"
        );

        localStorage.removeItem(
            "isLoggedIn"
        );

        alert(
            "User deleted"
        );

        window.location.href =
            "index.html";
    }
}


// ============================
// Invoice Download Demo
// ============================

function downloadInvoice() {

    alert(
        "Invoice feature coming soon"
    );
}


// ============================
// Subscription Status
// ============================

function getSubscriptionStatus() {

    return "Active";
}


// ============================
// Renewal Date Demo
// ============================

function getRenewalDate() {

    return "31-Dec-2026";
}