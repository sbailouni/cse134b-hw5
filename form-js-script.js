window.addEventListener('DOMContentLoaded', init);

let error_output = document.getElementById("error-message");
let char_counter = document.getElementById("info-message"); 
let comments = document.getElementById("comments");
let form = document.querySelector("form");
let form_errors = [];

function init() {

    const toggleButton = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");

    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    themeIcon.textContent = savedTheme === "dark" ? "🌙" : "☀️";

    toggleButton.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";

        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        themeIcon.textContent = newTheme === "dark" ? "🌙" : "☀️";
    });

    const themeSelector = document.getElementById("theme-selector");
    const themeNameInput = document.getElementById("theme-name");
    const textColorPicker = document.getElementById("text-color");
    const bgColorPicker = document.getElementById("bg-color");
    const fontStyleSelector = document.getElementById("font-style");
    const saveThemeBtn = document.getElementById("save-theme");
    const deleteThemeBtn = document.getElementById("delete-theme");

    function loadThemes() {
        const savedThemes = JSON.parse(localStorage.getItem("themes")) || {};
        themeSelector.innerHTML = '<option value="default">Default</option>'; // Reset options
        for (let themeName in savedThemes) {
            let option = document.createElement("option");
            option.value = themeName;
            option.textContent = themeName;
            themeSelector.appendChild(option);
        }
    }

    function applyTheme(themeName) {
        const savedThemes = JSON.parse(localStorage.getItem("themes")) || {};
        const theme = savedThemes[themeName];

        if (theme) {
            document.documentElement.style.setProperty("--text-color", theme.textColor);
            document.documentElement.style.setProperty("--site-color", theme.bgColor);
            document.documentElement.style.setProperty("--font-family", theme.fontStyle);
        } else {
            resetToDefault();
        }

        localStorage.setItem("selectedTheme", themeName);
    }

    function resetToDefault() {
        document.documentElement.style.removeProperty("--text-color");
        document.documentElement.style.removeProperty("--site-color");
        document.documentElement.style.removeProperty("--font-family");
    }

    saveThemeBtn?.addEventListener("click", () => {
        const themeName = themeNameInput.value.trim();
        if (!themeName) {
            alert("Please enter a theme name.");
            return;
        }

        const newTheme = {
            textColor: textColorPicker.value,
            bgColor: bgColorPicker.value,
            fontStyle: fontStyleSelector.value
        };

        let savedThemes = JSON.parse(localStorage.getItem("themes")) || {};
        savedThemes[themeName] = newTheme;
        localStorage.setItem("themes", JSON.stringify(savedThemes));

        loadThemes();
        themeSelector.value = themeName;
        applyTheme(themeName);
    });

    themeSelector?.addEventListener("change", () => {
        const selectedTheme = themeSelector.value;
        applyTheme(selectedTheme);
    });

    deleteThemeBtn?.addEventListener("click", () => {
        const selectedTheme = themeSelector.value;
        if (selectedTheme === "default") {
            alert("Cannot delete the default theme.");
            return;
        }

        let savedThemes = JSON.parse(localStorage.getItem("themes")) || {};
        delete savedThemes[selectedTheme];
        localStorage.setItem("themes", JSON.stringify(savedThemes));

        loadThemes();
        applyTheme("default");
    });

    const savedSelectedTheme = localStorage.getItem("selectedTheme") || "default";
    applyTheme(savedSelectedTheme);
    loadThemes();

    if (themeSelector) {
        themeSelector.value = savedSelectedTheme;
    }

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