// Get the form and password input elements
const logoutForm = document.getElementById('logoutForm');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');

// Add a submit event listener to the form
logoutForm.addEventListener('submit', (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the entered password value
  const enteredPassword = passwordInput.value;

  // Check if the entered password is equal to "1234"
  if (enteredPassword === '18516212091514') {
    // Password is correct, show the new HTML file
    window.location.href = 'index.html';

    // Clear the password input value and hide the error message
    passwordInput.value = '';
    errorMessage.textContent = '';
  } else {
    // Password is incorrect, show an error message
    errorMessage.textContent = 'Invalid password. Please try again.';
  }
});

//scroll reveal
ScrollReveal({
  // reset: true, 
  distance: '80px',
  duration: 2000,
  delay: 200
});

ScrollReveal().reveal('.wrapper, .home-img', {
  origin: 'top'
});