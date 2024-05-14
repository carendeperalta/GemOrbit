var loginAttempts = 0;

document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  
  var hardcodedUsername = 'admin@gmail.com';
  var hardcodedPassword = '18516212091514';
  
  if (username === hardcodedUsername && password === hardcodedPassword) {
    window.location.href = 'GemOrbitShop.html';
  } else {
    loginAttempts++;
    
    if (loginAttempts >= 3) {
      document.getElementById('username').disabled = true;
      document.getElementById('password').disabled = true;
      document.getElementById('error-message').textContent = 'Maximum login attempts reached. Please try again later.';
      document.getElementById('loginForm').reset(); 
    } else {
      document.getElementById('error-message').textContent = 'Incorrect username or password. Please try again.';
    }
  }
});

// Reset error message when the user interacts with the form again
document.getElementById('username').addEventListener('input', function() {
  document.getElementById('error-message').textContent = '';
});

document.getElementById('password').addEventListener('input', function() {
  document.getElementById('error-message').textContent = '';
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