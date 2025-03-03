window.addEventListener('DOMContentLoaded', init);

let error_output = document.getElementById("error-message");
let char_counter = document.getElementById("info-message"); 
let comments = document.getElementById("comments");
let form = document.querySelector("form");
let form_errors = [];

function init() {

    document.getElementById("name").addEventListener("input", function (event) {
        let regex = /[A-Za-zÀ-ÿ]+(?:[-' ][A-Za-zÀ-ÿ]+)*/;
        if (!regex.test(event.target.value) && event.target.value.length > 0) {
            showErrorMessage("name", "You've input invalid characters! Only letters, hyphens, and non-preceding spaces are allowed.");
            changeInputBorder(event.target);
            event.target.value = event.target.value.replace(/[^A-Za-zÀ-ÿ\s'-]/g, "");
        }
    });

    document.getElementById("email").addEventListener("blur", function (event) {
        if (!event.target.checkValidity() && event.target.value.length > 0) {
            showErrorMessage("email", "Please enter a valid email address.");
            changeInputBorder(event.target);
        }
    });

    comments.addEventListener("input", function () {
        let remaining = 300 - comments.value.length;

        char_counter.textContent = remaining + " characters remaining";

        if (remaining < 20) {
            char_counter.style.color = "red";
        }
        else {
            char_counter.style.color = "black";
        }

        if (remaining < 0) {
            comments.classList.add("error");
            showErrorMessage("comments", "You have exceeded the character limit!");
        }
    });

    document.getElementById("comments").addEventListener("input", function (event) {
        let regex = /^[A-Za-z0-9À-ÿ.,!?()'" \n\r-]+$/;
    
        if (!regex.test(event.target.value) && event.target.value.length > 0) {
            showErrorMessage("comments", "Invalid characters detected! Only letters, numbers, spaces, and common punctuation characters are allowed.");
            changeInputBorder(event.target);
            event.target.value = event.target.value.replace(/[^A-Za-z0-9À-ÿ.,!?()'" \n\r-]/g, "");
        }
    });

    document.querySelector("form").addEventListener("submit", function (event) {

        let errorField = document.getElementById("form-errors");
        errorField.value = JSON.stringify(form_errors);
        let valid = true;

        if (comments.value.length > 300) {
            showErrorMessage("comments", "You have exceeded the character limit! To submit, make sure your comments are at most 300 characters.");
            valid = false;
        }

        if (!document.getElementById("name").checkValidity()) {
            showErrorMessage("name", "Invalid name input! Please enter a valid name to submit.");
            valid = false;
        }

        if (!document.getElementById("email").checkValidity()) {
            showErrorMessage("email", "Please enter a valid email address to submit.");
            valid = false;
        }

        if (!valid) {
            event.preventDefault(); 
        }
    });

}

function changeInputBorder(inputElement) {
    inputElement.style.border = "2px solid red";
    setTimeout(() => {
        inputElement.style.border = "";
    }, 3500);
}

function showErrorMessage(fieldID, message) {
    let field = document.getElementById(fieldID);
    field.classList.add("error");

    error_output.textContent = message;
    error_output.classList.add("visible");
    form_errors.push({ field: fieldID, message: message });

    setTimeout(() => {
        error_output.textContent = "";
        field.classList.remove("error");
        error_output.classList.remove("visible");
    }, 3500);
}