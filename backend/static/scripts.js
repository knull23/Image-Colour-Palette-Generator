document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.querySelector('input[type="file"]');
    const uploadButton = document.querySelector('button');
    const colorDisplay = document.querySelector('#color-display');

    uploadButton.addEventListener('click', function() {
        const file = fileInput.files[0];

        if (!file) {
            alert('Please select an image first.');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        // Send the image to the backend
        fetch('http://127.0.0.1:5000/upload', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            const colors = data.top_colors;
            colorDisplay.innerHTML = '';

            colors.forEach(color => {
                const colorBox = document.createElement('div');
                colorBox.style.backgroundColor = `rgb(${color.rgb.join(',')})`;
                colorBox.classList.add('color-box');
                colorDisplay.appendChild(colorBox);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error uploading image');
        });
    });
});
