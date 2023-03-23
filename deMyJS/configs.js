// Get the dropdown button and dropdown content
var dropdownBtn = document.querySelector(".dropbtn");
var dropdownContent = document.querySelector(".dropdown-content");

// Toggle the dropdown content when the button is clicked
dropdownBtn.addEventListener("click", function() {
  dropdownContent.classList.toggle("show");
});

// Close the dropdown content if the user clicks outside of it
window.addEventListener("click", function(event) {
  if (!event.target.matches(".dropbtn")) {
    if (dropdownContent.classList.contains("show")) {
      dropdownContent.classList.remove("show");
    }
  }
});