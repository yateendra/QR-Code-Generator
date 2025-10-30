# Quick Setup Guide

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages:
- React and React DOM
- Mantine UI components
- QR code generation libraries
- Icons and utilities

### 2. Start Development Server

```bash
npm run dev
```

The app will open automatically at `http://localhost:3000`

### 3. Build for Production

```bash
npm run build
```

### 4. Preview Production Build

```bash
npm run preview
```

## First-time Setup

No additional configuration needed! The app works out of the box with:
- ✅ Dark/Light theme (auto-saved)
- ✅ Local storage for history
- ✅ All features enabled

## Troubleshooting

### Port Already in Use

If port 3000 is busy, Vite will automatically suggest an alternative port.

### Module Not Found

Make sure you've run `npm install` first.

### Build Errors

Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Project Features Checklist

- ✅ Real-time QR code generation
- ✅ Customizable size (128px - 512px)
- ✅ Color customization (foreground & background)
- ✅ Error correction levels (L, M, Q, H)
- ✅ Download as PNG or SVG
- ✅ Copy to clipboard
- ✅ Dark/Light mode with persistence
- ✅ History tracking (last 20 codes)
- ✅ Batch generation (up to 100 codes)
- ✅ Fully responsive design
- ✅ Input validation
- ✅ Loading states
- ✅ Notifications

## Usage Tips

1. **Quick Generation**: Just start typing in the text field
2. **Batch Mode**: Use the Batch Generator for multiple QR codes
3. **History**: Click any history item to reload its settings
4. **Download**: Choose PNG for images or SVG for scalable graphics
5. **Clipboard**: Use Copy button for quick sharing

## Dependencies

### Core
- `react` - UI framework
- `react-dom` - DOM rendering
- `vite` - Build tool

### UI Components
- `@mantine/core` - Component library
- `@mantine/hooks` - Utility hooks
- `@mantine/notifications` - Toast notifications
- `@mantine/form` - Form handling
- `@tabler/icons-react` - Icons

### QR Code
- `qrcode.react` - React QR components
- `qrcode` - Core QR generation
- `jszip` - Batch ZIP creation

## Browser Requirements

- Modern browsers (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- LocalStorage support (for theme/history)
- Canvas API support (for QR generation)

## Performance

- Debounced input (300ms) for optimal performance
- LocalStorage limited to 20 history items
- Batch generation capped at 100 codes
- Optimized bundle size with code splitting

## Development

### File Structure
```
src/
├── components/
│   ├── QRCodeGenerator.jsx   # Main generator
│   ├── ThemeToggle.jsx       # Theme switch
│   ├── History.jsx           # History panel
│   └── BatchGenerator.jsx    # Batch mode
├── App.jsx                   # Root component
└── main.jsx                  # Entry point
```

### Adding New Features

1. Create new component in `src/components/`
2. Import in `App.jsx`
3. Use Mantine components for consistency
4. Update README with new features

## Support

For issues or questions, refer to:
- [Mantine Documentation](https://mantine.dev/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)


