window.onload = function () {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData) {
        console.log('User Data from localStorage:', userData);
        console.log('Photo Path:', userData.photoPath);

        document.getElementById('visitor-name').textContent = userData.fullName;
        document.getElementById('visitor-photo').src = userData.photoPath;
    } else {
        console.error('No user data found');
    }
};
