document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById("dark-mode-toggle");
    const darkModeIcon = toggleButton.querySelector('i');
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Check localStorage for dark mode preference
    const isDarkMode = localStorage.getItem("dark-mode") === "enabled";

    // Set initial dark mode state based on localStorage or system preference
    if (isDarkMode || prefersDarkMode) {
        document.body.classList.add("dark-mode");
        darkModeIcon.classList.remove("nf-oct-moon");
        darkModeIcon.classList.add("nf-oct-sun");
    }
    
    // Togle dark mode on button click
    toggleButton.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
        
        // Update icon based on dark mode state
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("dark-mode", "enabled");
            darkModeIcon.classList.remove("nf-oct-moon");
            darkModeIcon.classList.add("nf-oct-sun");
        } else {
            darkModeIcon.classList.remove("nf-oct-sun");
            darkModeIcon.classList.add("nf-oct-moon");
            localStorage.setItem("dark-mode", "disabled");
        }
    });

    // Handle localStorage availability
    try {
        localStorage.setItem("test", "test");
        localStorage.removeItem("test");
    } catch (e){
        console.warn("LocalStorage not available. Dark mode prefrence will not persits.");
    }
});

document.getElementById('sendEmailLink').onclick = function(event) {
    event.preventDefault(); // Prevent the default link behavior
    const email = 'dylan.marin@etu.ec-lyon.fr';
    const subject = 'Contact from your personal Website';
    const body = 'Hello,%0A%0AI found your website and CV and I would like to get in touch.%0A%0ABest regards,%0A[Your Name]';
    
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
}
