let currentStep = 1;

document.addEventListener("DOMContentLoaded", function() {
    showStep(currentStep);

    const form = document.getElementById("multiStepForm");
    const fileInput = document.getElementById("fileUpload");
    const thumbnails = document.getElementById("thumbnails");
    const fileError = document.getElementById("fileError");

    fileInput.addEventListener("change", function(event) {
        thumbnails.innerHTML = "";
        fileError.textContent = "";
        const files = event.target.files;
        if (files.length > 0) {
            Array.from(files).forEach(file => {
                if (!file.type.startsWith("image/")) {
                    fileError.textContent = "Only JPEG/PNG images are allowed.";
                    return;
                }
                if (file.size > 2 * 1024 * 1024) {
                    fileError.textContent = "Each file must be under 2MB.";
                    return;
                }
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.createElement("img");
                    img.src = e.target.result;
                    thumbnails.appendChild(img);
                };
                reader.readAsDataURL(file);
            });
        }
    });

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        if (validateForm()) {
            alert("Form submitted successfully!");
            // Perform the upload operation (e.g., using Fetch API or XMLHttpRequest)
        }
    });
});

function showStep(step) {
    const steps = document.querySelectorAll(".step-content");
    const stepIndicators = document.querySelectorAll(".step");
    steps.forEach((stepContent, index) => {
        stepContent.style.display = index === step - 1 ? "block" : "none";
        stepIndicators[index].classList.toggle("active", index === step - 1);
    });
    document.getElementById("prevButton").style.display = step === 1 ? "none" : "inline-block";
    document.getElementById("nextButton").style.display = step === steps.length ? "none" : "inline-block";
    document.getElementById("submitButton").style.display = step === steps.length ? "inline-block" : "none";
}

function showPrevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

function showNextStep() {
    if (currentStep < 4) {
        currentStep++;
        showStep(currentStep);
    }
}

function validateForm() {
    let isValid = true;

    // Step 1 validation
    if (currentStep === 1) {
        const firstName = document.getElementById("first-name").value;
        const lastName = document.getElementById("last-name").value;
        const email = document.getElementById("email").value;
        const phoneNumber = document.getElementById("phone-number").value;

        if (firstName.length < 3) {
            isValid = false;
            document.getElementById("first-name-error").textContent = "First name must be at least 3 characters long.";
        } else {
            document.getElementById("first-name-error").textContent = "";
        }

        if (lastName.length < 3) {
            isValid = false;
            document.getElementById("last-name-error").textContent = "Last name must be at least 3 characters long.";
        } else {
            document.getElementById("last-name-error").textContent = "";
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            isValid = false;
            document.getElementById("email-error").textContent = "Enter a valid email address.";
        } else {
            document.getElementById("email-error").textContent = "";
        }

        const phonePattern = /^\d{10}$/;
        if (!phonePattern.test(phoneNumber)) {
            isValid = false;
            document.getElementById("phone-number-error").textContent = "Phone number must be 10 digits long.";
        } else {
            document.getElementById("phone-number-error").textContent = "";
        }
    }

    // Step 2 validation
    if (currentStep === 2) {
        const address = document.getElementById("address").value;
        const city = document.getElementById("city").value;
        const zipCode = document.getElementById("zip-code").value;

        if (address.length < 1) {
            isValid = false;
            document.getElementById("address-error").textContent = "Street address cannot be empty.";
        } else {
            document.getElementById("address-error").textContent = "";
        }

        if (city.length < 1) {
            isValid = false;
            document.getElementById("city-error").textContent = "City cannot be empty.";
        } else {
            document.getElementById("city-error").textContent = "";
        }

        const zipPattern = /^\d{5}$/;
        if (!zipPattern.test(zipCode)) {
            isValid = false;
            document.getElementById("zip-code-error").textContent = "Zip code must be exactly 5 digits.";
        } else {
            document.getElementById("zip-code-error").textContent = "";
        }
    }

    // Step 3 validation
    if (currentStep === 3) {
        const creditCardNumber = document.getElementById("credit-card-number").value;
        const expirationDate = document.getElementById("expiration-date").value;
        const cvv = document.getElementById("cvv").value;

        const cardPattern = /^\d{16}$/;
        if (!cardPattern.test(creditCardNumber)) {
            isValid = false;
            document.getElementById("credit-card-number-error").textContent = "Credit card number must be 16 digits.";
        } else {
            document.getElementById("credit-card-number-error").textContent = "";
        }

        const today = new Date().toISOString().split('T')[0];
        if (expirationDate <= today) {
            isValid = false;
            document.getElementById("expiration-date-error").textContent = "Expiration date must be in the future.";
        } else {
            document.getElementById("expiration-date-error").textContent = "";
        }

        const cvvPattern = /^\d{3}$/;
        if (!cvvPattern.test(cvv)) {
            isValid = false;
            document.getElementById("cvv-error").textContent = "CVV must be 3 digits.";
        } else {
            document.getElementById("cvv-error").textContent = "";
        }
    }

    return isValid;
}
