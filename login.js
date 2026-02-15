// Current selected role
var selectedRole = "admin";

// Select Role
function selectRole(role) {
    selectedRole = role;

    var adminBtn = document.getElementById("adminBtn");
    var investigatorBtn = document.getElementById("investigatorBtn");

    if (role === "admin") {
        adminBtn.classList.add("active");
        investigatorBtn.classList.remove("active");
    } else {
        investigatorBtn.classList.add("active");
        adminBtn.classList.remove("active");
    }
}

// Show Toast Message
function showToast(message, type) {
    var toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "toast " + type + " show";

    setTimeout(function () {
        toast.className = "toast";
    }, 3000);
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();

    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var emailError = document.getElementById("emailError");
    var passwordError = document.getElementById("passwordError");
    var loginBtn = document.getElementById("loginBtn");

    // Clear old errors
    emailError.textContent = "";
    passwordError.textContent = "";
    email.classList.remove("has-error");
    password.classList.remove("has-error");

    var isValid = true;

    // Email check
    if (email.value.trim() === "") {
        emailError.textContent = "Email is required";
        email.classList.add("has-error");
        isValid = false;
    } else if (email.value.indexOf("@") === -1) {
        emailError.textContent = "Enter a valid email";
        email.classList.add("has-error");
        isValid = false;
    }

    // Password check
    if (password.value === "") {
        passwordError.textContent = "Password is required";
        password.classList.add("has-error");
        isValid = false;
    } else if (password.value.length < 6) {
        passwordError.textContent = "Minimum 6 characters";
        password.classList.add("has-error");
        isValid = false;
    }

    if (!isValid) return;

    // Show loading
    loginBtn.disabled = true;
    loginBtn.textContent = "Signing in...";

    // Simulate login
    setTimeout(function () {
        loginBtn.disabled = false;
        loginBtn.textContent = "Sign In";

        var roleName = selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1);
        showToast("Welcome, " + roleName + "! Redirecting...", "success");
    }, 1500);
}
