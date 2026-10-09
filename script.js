javascript
$(document).ready(function () {

    // =========================
    // 1. DARK MODE TOGGLE
    // =========================

    const themeButton = $("#theme");

    // Load the saved theme
    let savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "dark") {
        $("html").attr("data-theme", "dark");
        themeButton.html("☀");
        themeButton.attr("title", "Switch to light mode");
    } else {
        $("html").removeAttr("data-theme");
        themeButton.html("☾");
        themeButton.attr("title", "Switch to dark mode");
    }

    themeButton.on("click", function () {

        if ($("html").attr("data-theme") === "dark") {

            $("html").removeAttr("data-theme");
            localStorage.setItem("portfolio-theme", "light");

            themeButton.html("☾");
            themeButton.attr("title", "Switch to dark mode");

        } else {

            $("html").attr("data-theme", "dark");
            localStorage.setItem("portfolio-theme", "dark");

            themeButton.html("☀");
            themeButton.attr("title", "Switch to light mode");
        }

    });


    // =========================
    // 2. MOBILE MENU
    // =========================

    const menuButton = $("#menu");
    const navMenu = $("nav ul");

    menuButton.on("click", function () {

        navMenu.toggleClass("open");

        let isOpen = navMenu.hasClass("open");

        menuButton.attr("aria-expanded", isOpen);

        menuButton.html(isOpen ? "✕" : "☰");

    });

    // Close menu after clicking a navigation link
    $("nav ul a").on("click", function () {

        navMenu.removeClass("open");

        menuButton.attr("aria-expanded", "false");

        menuButton.html("☰");

    });

    // Close menu when clicking outside it
    $(document).on("click", function (event) {

        if (
            !$(event.target).closest("nav, #menu").length
        ) {
            navMenu.removeClass("open");

            menuButton.attr("aria-expanded", "false");

            menuButton.html("☰");
        }

    });


    // =========================
    // 3. ACTIVE NAVIGATION LINK
    // =========================

    let currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    if (currentPage === "") {
        currentPage = "index.html";
    }

    $("nav ul a").each(function () {

        let linkPage = $(this)
            .attr("href")
            .split("/")
            .pop()
            .toLowerCase();

        if (linkPage === currentPage) {
            $("nav ul a").removeClass("active");
            $(this).addClass("active");
        }

    });


    // =========================
    // 4. CONTACT FORM VALIDATION
    // =========================

    $("#contact").on("submit", function (event) {

        event.preventDefault();

        let name = $("#name").val().trim();
        let email = $("#email").val().trim();
        let message = $("#msg").val().trim();

        let valid = true;

        // Clear previous errors
        $(".err").text("");
        $("#ok").hide();

        // Validate name
        if (name === "") {

            $("#e-name").text("Please enter your name.");
            valid = false;

        } else if (name.length < 2) {

            $("#e-name").text("Name must contain at least 2 characters.");
            valid = false;

        }

        // Validate email
        let emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {

            $("#e-email").text("Please enter your email address.");
            valid = false;

        } else if (!emailPattern.test(email)) {

            $("#e-email").text("Please enter a valid email address.");
            valid = false;

        }

        // Validate message
        if (message === "") {

            $("#e-msg").text("Please enter your message.");
            valid = false;

        } else if (message.length < 10) {

            $("#e-msg").text("Message must contain at least 10 characters.");
            valid = false;

        }

        // Show success message
        if (valid) {

            $("#ok")
                .stop(true, true)
                .fadeIn(300);

            // Reset the form
            $("#contact")[0].reset();

        }

    });


    // =========================
    // 5. ANIMATED SKILL BARS
    // =========================

    $(".fill").each(function () {

        let bar = $(this);
        let targetWidth = bar[0].style.width;

        // Reset bar before animation
        bar.css("width", "0");

        setTimeout(function () {
            bar.css("width", targetWidth);
        }, 300);

    });


    // =========================
    // 6. SMOOTH SCROLLING
    // =========================

    $('a[href^="#"]').on("click", function (event) {

        let target = $(this).attr("href");

        if (target.length > 1 && $(target).length) {

            event.preventDefault();

            $("html, body").animate({
                scrollTop: $(target).offset().top - 85
            }, 500);

        }

    });

});

