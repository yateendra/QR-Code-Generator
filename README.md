# QR Code Generator

A modern, feature-rich QR code generator built with React and Mantine UI. Generate, customize, and download QR codes with ease.

![QR Code Generator](https://img.shields.io/badge/React-18.2-blue) ![Mantine](https://img.shields.io/badge/Mantine-7.3-purple) ![License](https://img.shields.io/badge/license-MIT-green)

## Features

### Core Functionality
- ⚡ **Real-time Generation** - QR codes update instantly as you type
- 🎨 **Full Customization** - Adjust size, colors, and error correction levels
- 💾 **Multiple Formats** - Download as PNG or SVG
- 📋 **Copy to Clipboard** - Quick copy functionality for generated QR codes
- 🌓 **Dark/Light Mode** - Seamless theme switching

### Advanced Features
- 📜 **History Tracking** - Keep track of your last 20 generated QR codes
- 🔄 **Batch Generation** - Generate up to 100 QR codes at once and download as ZIP
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices
- ♿ **Accessible** - Built with accessibility in mind
- 🎯 **Input Validation** - Smart validation with helpful error messages

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/qrcode-generator.git
cd qrcode-generator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The optimized files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

### Basic QR Code Generation

1. Enter your text or URL in the input field
2. Watch the QR code generate in real-time
3. Customize colors, size, and error correction level as needed
4. Download as PNG or SVG, or copy to clipboard

### Customization Options

- **Size**: Choose from 128px to 512px
- **Colors**: Full color picker for foreground and background
- **Error Correction**: Four levels (L, M, Q, H) for different damage resistance
- **Format**: PNG (raster) or SVG (vector)

### Batch Generation

1. Click on the "Batch Generator" section
2. Enter one text/URL per line (up to 100)
3. Set your desired size and error correction level
4. Click "Generate & Download ZIP"
5. All QR codes will be packaged in a ZIP file

### History

- Automatically saves your last 20 generated QR codes
- Click on any history item to load its settings
- Clear all history with one click

## Technology Stack

- **React 18** - UI framework
- **Mantine UI 7** - Component library
- **qrcode.react** - QR code generation
- **Vite** - Build tool and dev server
- **Tabler Icons** - Icon set
- **JSZip** - ZIP file creation for batch downloads

## Project Structure

```
qrcode-generator/
├── src/
│   ├── components/
│   │   ├── QRCodeGenerator.jsx   # Main QR generator component
│   │   ├── ThemeToggle.jsx       # Dark/light mode toggle
│   │   ├── History.jsx           # History management
│   │   └── BatchGenerator.jsx    # Batch generation feature
│   ├── App.jsx                   # Main app component
│   └── main.jsx                  # Entry point
├── public/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Features in Detail

### Real-time Generation with Debouncing
The app uses debouncing to optimize performance while providing real-time feedback. Changes are processed after 300ms of inactivity.

### Error Correction Levels
- **Low (L)**: ~7% damage recovery
- **Medium (M)**: ~15% damage recovery
- **Quartile (Q)**: ~25% damage recovery
- **High (H)**: ~30% damage recovery

### Local Storage
- Theme preference is saved automatically
- History is persisted across sessions
- Maximum 20 history items stored

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Mantine UI](https://mantine.dev/) - Amazing React component library
- [qrcode.react](https://github.com/zpao/qrcode.react) - QR code generation
- [Tabler Icons](https://tabler-icons.io/) - Beautiful icon set

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.

---

Made with ❤️ using React and Mantine


