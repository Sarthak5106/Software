// ========================================
// ForensicDesk Login Page Script
// ========================================

document.addEventListener("DOMContentLoaded", function () {
    const adminBtn = document.getElementById("adminBtn");
    const investigatorBtn = document.getElementById("investigatorBtn");
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const togglePassword = document.getElementById("togglePassword");
    const submitBtn = document.getElementById("submitBtn");
    const btnLoader = document.getElementById("btnLoader");

    let selectedRole = "admin";

    // ---- Role Selection ----

    function selectRole(role) {
        selectedRole = role;
        adminBtn.classList.toggle("active", role === "admin");
        investigatorBtn.classList.toggle("active", role === "investigator");
    }

    adminBtn.addEventListener("click", function () {
        selectRole("admin");
    });

    investigatorBtn.addEventListener("click", function () {
        selectRole("investigator");
    });

    // ---- Toggle Password Visibility ----

    togglePassword.addEventListener("click", function () {
        const isPassword = passwordInput.type === "password";
        passwordInput.type = isPassword ? "text" : "password";

        const eyeOpen = togglePassword.querySelector(".eye-open");
        const eyeClosed = togglePassword.querySelector(".eye-closed");

        eyeOpen.style.display = isPassword ? "none" : "block";
        eyeClosed.style.display = isPassword ? "block" : "none";
    });

    // ---- Validation ----

    function validateEmail(email) {
        var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

    function clearErrors() {
        emailError.textContent = "";
        passwordError.textContent = "";
        emailInput.classList.remove("input-error");
        passwordInput.classList.remove("input-error");
    }

    function validateForm() {
        var isValid = true;
        clearErrors();

        // Email validation
        if (!emailInput.value.trim()) {
            emailError.textContent = "Email address is required";
            emailInput.classList.add("input-error");
            isValid = false;
        } else if (!validateEmail(emailInput.value.trim())) {
            emailError.textContent = "Please enter a valid email address";
            emailInput.classList.add("input-error");
            isValid = false;
        }

        // Password validation
        if (!passwordInput.value) {
            passwordError.textContent = "Password is required";
            passwordInput.classList.add("input-error");
            isValid = false;
        } else if (passwordInput.value.length < 6) {
            passwordError.textContent = "Password must be at least 6 characters";
            passwordInput.classList.add("input-error");
            isValid = false;
        }

        return isValid;
    }

    // Clear individual errors on input
    emailInput.addEventListener("input", function () {
        emailError.textContent = "";
        emailInput.classList.remove("input-error");
    });

    passwordInput.addEventListener("input", function () {
        passwordError.textContent = "";
        passwordInput.classList.remove("input-error");
    });

    // ---- Toast Notification ----

    function showToast(message, type) {
        // Remove existing toast
        var existingToast = document.querySelector(".toast");
        if (existingToast) {
            existingToast.remove();
        }

        var toast = document.createElement("div");
        toast.className = "toast " + type;
        toast.textContent = message;
        document.body.appendChild(toast);

        // Trigger animation
        requestAnimationFrame(function () {
            toast.classList.add("visible");
        });

        // Auto-remove
        setTimeout(function () {
            toast.classList.remove("visible");
            setTimeout(function () {
                toast.remove();
            }, 300);
        }, 3000);
    }

    // ---- Form Submission ----

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        btnLoader.classList.add("visible");

        var email = emailInput.value.trim();
        var role = selectedRole;

        // Simulate authentication request
        setTimeout(function () {
            submitBtn.disabled = false;
            btnLoader.classList.remove("visible");

            // Demo credentials check
            if (role === "admin" && email === "admin@forensicdesk.com") {
                showToast("Welcome back, Admin! Redirecting...", "success");
                setTimeout(function () {
                    // Redirect to admin dashboard
                    window.location.href = "admin-dashboard.html";
                }, 1500);
            } else if (role === "investigator" && email === "investigator@forensicdesk.com") {
                showToast("Welcome back, Investigator! Redirecting...", "success");
                setTimeout(function () {
                    // Redirect to investigator dashboard
                    window.location.href = "investigator-dashboard.html";
                }, 1500);
            } else {
                // For demo, accept all valid inputs
                var displayRole = role.charAt(0).toUpperCase() + role.slice(1);
                showToast("Signed in as " + displayRole + ". Redirecting...", "success");
                setTimeout(function () {
                    if (role === "admin") {
                        window.location.href = "admin-dashboard.html";
                    } else {
                        window.location.href = "investigator-dashboard.html";
                    }
                }, 1500);
            }
        }, 1500);
    });
});
