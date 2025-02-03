document.getElementById('registration-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const photo = document.getElementById('photo').files[0];
    const errorMessage = document.getElementById('error-message');

    errorMessage.textContent = '';

    if (!fullName || !email || !phone || !photo) {
        errorMessage.textContent = 'All fields are required.';
        return;
    }

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('photo', photo);

    try {
        const response = await fetch('http://localhost:8080/api/register', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log(result);

        if (result.message === 'User Registered Successfully') {
            const fullName = encodeURIComponent(result.data.fullName);
            const email = encodeURIComponent(result.data.email);
            const phone = encodeURIComponent(result.data.phone);
            const photoPath = encodeURIComponent(result.data.photoPath);

            // Redirect with query parameters
            window.location.href = `../Pages/badge.html?fullName=${fullName}&email=${email}&phone=${phone}&photoPath=${photoPath}`;
        } else {
            errorMessage.textContent = 'Registration failed. Please try again.';
        }
    } catch (error) {
        console.error('Error:', error);
        errorMessage.textContent = 'An error occurred. Please try again later.';
    }
});
