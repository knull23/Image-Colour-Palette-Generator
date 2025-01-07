import React, { useState } from 'react';
 // Ensure the stylesheet is imported

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [colors, setColors] = useState([]);
  const [hoveredColor, setHoveredColor] = useState(null); // Track hovered color

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Display the selected image
    }
  };

  // Handle image upload
  const handleUpload = async () => {
    if (!image) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append('image', document.getElementById('image-input').files[0]);

    try {
      const response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        setColors(result.top_colors); // Assuming 'top_colors' is an array of RGB tuples
      } else {
        alert('Error: ' + result.error);
      }
    } catch (error) {
      alert('Error uploading image: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-container">
      {/* File Selection */}
      <div>
        <label className="upload-btn" htmlFor="image-input">
          Select Image
        </label>
        <input
          type="file"
          id="image-input"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </div>

      {/* Display Selected Image */}
      {image && (
        <div className="image-preview">
          <img src={image} alt="Selected" />
        </div>
      )}

      {/* Upload Button */}
      {image && (
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className="upload-image-btn"
        >
          {isUploading ? 'Uploading...' : 'Upload Image'}
        </button>
      )}

      {/* Display Top Colors */}
      {colors.length > 0 && (
        <div className="color-palette">
          <h3>Top Colors:</h3>
          <div className="palette">
            {colors.map((color, index) => (
              <div
                key={index}
                className="color-box"
                style={{
                  backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                }}
                onMouseEnter={() => setHoveredColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`)}
                onMouseLeave={() => setHoveredColor(null)}
              >
                {hoveredColor === `rgb(${color[0]}, ${color[1]}, ${color[2]})` && (
                  <div className="tooltip">
                    {`rgb(${color[0]}, ${color[1]}, ${color[2]})`}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;





