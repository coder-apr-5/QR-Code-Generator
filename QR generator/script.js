const qrText = document.getElementById('qr-text');
const sizes = document.getElementById('sizes');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const qrContainer = document.querySelector('.qr-body');

let size = sizes.value;

// Update size dynamically
sizes.addEventListener('change', (e) => {
    size = e.target.value;
    isEmptyInput();
});

// Generate QR Code when button is clicked
generateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    isEmptyInput();
});

// Handle Download Button
downloadBtn.addEventListener('click', () => {
    const qrCanvas = qrContainer.querySelector('canvas');
    if (qrCanvas) {
        const borderSize = 10; // Border size in pixels
        const canvasWithBorder = document.createElement('canvas');
        const context = canvasWithBorder.getContext('2d');

        canvasWithBorder.width = qrCanvas.width + borderSize * 2;
        canvasWithBorder.height = qrCanvas.height + borderSize * 2;

        // Fill with white background
        context.fillStyle = '#fff';
        context.fillRect(0, 0, canvasWithBorder.width, canvasWithBorder.height);

        // Draw the QR code onto the new canvas
        context.drawImage(qrCanvas, borderSize, borderSize);

        // Generate data URL and set it for download
        const imgDataUrl = canvasWithBorder.toDataURL('image/png');
        downloadBtn.setAttribute("href", imgDataUrl);
        downloadBtn.setAttribute("download", "qrcode_with_border.png"); // Set download filename
    }
});

// Check if input is empty
function isEmptyInput() {
    if (qrText.value.length > 0) {
        generateQRCode();
    } else {
        alert("Enter the text or URL to generate your QR code");
    }
}

// Generate QR code
function generateQRCode() {
    qrContainer.innerHTML = ""; // Clear previous QR code

    new QRCode(qrContainer, {
        text: qrText.value,
        height: size,
        width: size,
        colorLight: "#fff",
        colorDark: "#000"
    });
}
