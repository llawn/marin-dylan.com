document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById("dark-mode-toggle");
    const isDarkMode = localStorage.getItem("dark-mode") === "enabled";
    
    if (isDarkMode) {
        document.body.classList.add("dark-mode");
    }
    
    toggleButton.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("dark-mode", "enabled");
        } else {
            localStorage.setItem("dark-mode", "disabled");
        }
    });
});

document.getElementById('sendEmailLink').onclick = function(event) {
    event.preventDefault(); // Prevent the default link behavior
    const email = 'dylan.marin@etu.ec-lyon.fr';
    const subject = 'Contact from your personal Website';
    const body = 'Hello,%0A%0AI found your website and CV and I would like to get in touch.%0A%0ABest regards,%0A[Your Name]';
    
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
}
