document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');

    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateRegistrationForm()) {
            alert('Registration successful!');
        }
    });

    function validateRegistrationForm() {
        let isValid = true;

        const username = document.getElementById('username');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        const email = document.getElementById('email');
        const age = document.getElementById('age');

        const usernamePattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!usernamePattern.test(username.value)) {
            document.getElementById('usernameError').textContent = 'Username must be at least 6 characters long and contain at least one letter and one number.';
            document.getElementById('usernameError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('usernameError').style.display = 'none';
        }

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordPattern.test(password.value)) {
            document.getElementById('passwordError').textContent = 'Password must be at least 8 characters long and contain one uppercase letter, one lowercase letter, one number, and one special character.';
            document.getElementById('passwordError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('passwordError').style.display = 'none';
        }

        if (password.value !== confirmPassword.value) {
            document.getElementById('confirmPasswordError').textContent = 'Passwords do not match.';
            document.getElementById('confirmPasswordError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('confirmPasswordError').style.display = 'none';
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value)) {
            document.getElementById('emailError').textContent = 'Invalid email format.';
            document.getElementById('emailError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('emailError').style.display = 'none';
        }

        const ageValue = parseInt(age.value);
        if (isNaN(ageValue) || ageValue < 18 || ageValue > 60) {
            document.getElementById('ageError').textContent = 'Age must be between 18 and 60.';
            document.getElementById('ageError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('ageError').style.display = 'none';
        }

        return isValid;
    }
});
