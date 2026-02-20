// Function to toggle between Login and Sign Up sections
function toggleForm(formType) {
    const loginSection = document.getElementById('login-section');
    const signupSection = document.getElementById('signup-section');

    if (formType === 'signup') {
        loginSection.style.display = 'none';
        signupSection.style.display = 'block';
    } else {
        loginSection.style.display = 'block';
        signupSection.style.display = 'none';
    }
}

// Handle Login Submission
function loginUser(event) {
    event.preventDefault(); // Prevents the page from reloading
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    console.log('Login Attempt:', { email, password });
    alert('Login button clicked! (Backend connection needed to actually log in)');
}

// Handle Sign Up Submission
function signupUser(event) {
    event.preventDefault(); // Prevents the page from reloading
    const email = document.getElementById('signup-email').value;
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm').value;

    // Basic Validation
    if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
    }

    console.log('Sign Up Attempt:', { email, username, password });
    alert('Sign Up button clicked! (Backend connection needed to save this user)');
}