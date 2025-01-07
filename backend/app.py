from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from PIL import Image
import os

app = Flask(__name__, template_folder='templates', static_folder='static')
CORS(app)

UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Create the upload folder if it doesn't exist
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/upload', methods=['POST'])
def upload_image():
    # Check if 'image' is in the request files
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    image = request.files['image']

    # Ensure a file is selected
    if image.filename == '':
        return jsonify({'error': 'No image selected'}), 400

    # Save the uploaded image
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], image.filename)
    image.save(file_path)

    # Open the image for color extraction
    img = Image.open(file_path).convert('RGB')

    # Resize image for faster processing
    img = img.resize((50, 50))  # Resize to 50x50 pixels

    # Extract all colors from the image
    pixels = list(img.getdata())  # Flatten all pixels into a list

    # Get the 10 most common colors
    from collections import Counter
    top_colors = Counter(pixels).most_common(10)

    # Extract RGB values from top colors
    color_list = [list(color[0]) for color in top_colors]

    return jsonify({'top_colors': color_list})


if __name__ == '__main__':
    app.run(debug=True)




