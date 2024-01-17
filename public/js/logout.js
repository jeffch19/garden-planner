
const logoutLink = document.getElementById('logoutLink');
console.log(logoutLink)
logoutLink.addEventListener('click', async function (event) {
  event.preventDefault();

  try {
    // Send a request to the backend's logout endpoint
    const response = await fetch('api/users/logout', {
      method: 'POST', // or 'GET' depending on your server route
    });

    if (response.status === 200) {
      // Successfully logged out, perform any necessary UI updates
      window.location.href = '/home'; // Redirect to homepage
    } else {
      // Handle error cases
      console.error('Logout failed.');
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
});
