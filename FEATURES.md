# Features Documentation

## Core Features

### 1. Real-time QR Code Generation

The application generates QR codes instantly as you type, with intelligent debouncing to optimize performance.

**How it works:**
- 300ms debounce delay prevents excessive re-renders
- Automatic validation before generation
- Visual loading state during generation
- Smooth transitions between updates

**Benefits:**
- Instant feedback
- Optimized performance
- No manual "Generate" button needed

---

### 2. Customization Options

#### Size Control
- **Range**: 128px to 512px
- **Presets**: Small (128px), Medium (256px), Large (512px)
- **Increment**: 32px steps
- **UI**: Interactive slider with visual markers

#### Color Customization
- **Foreground Color**: The dark modules of the QR code
- **Background Color**: The light areas of the QR code
- **UI**: Full color picker with hex input
- **Preset Colors**: Quick access to common colors
- **Contrast Warning**: (Future feature) Warns if colors lack contrast

#### Error Correction Levels
Choose based on your use case:

| Level | Recovery | Use Case |
|-------|----------|----------|
| **L (Low)** | ~7% | Clean environments, digital only |
| **M (Medium)** | ~15% | General use (recommended) |
| **Q (Quartile)** | ~25% | Outdoor use, possible damage |
| **H (High)** | ~30% | Critical data, high damage risk |

---

### 3. Download Functionality

#### PNG Format
- **Type**: Raster image
- **Best for**: Digital displays, social media, web
- **Size**: Fixed resolution based on selected size
- **Quality**: Lossless compression
- **Compatibility**: Universal support

#### SVG Format
- **Type**: Vector image
- **Best for**: Print, logos, scalable applications
- **Size**: Resolution independent
- **Quality**: Infinite scaling without quality loss
- **Compatibility**: Modern browsers and design software

**Download Process:**
1. Generate QR code with desired settings
2. Select format (PNG/SVG)
3. Click "Download" button
4. File saves with timestamp: `qrcode-{timestamp}.{format}`

---

### 4. Copy to Clipboard

**Quick Share Feature:**
- One-click copy to clipboard
- Copies as PNG image
- Paste directly into documents, emails, chat apps
- Works in modern browsers (Chrome, Firefox, Edge, Safari)

**Use Cases:**
- Quick sharing in messaging apps
- Pasting into presentations
- Adding to documents
- Social media posts

---

### 5. Dark/Light Mode

**Intelligent Theme System:**
- Toggle between dark and light modes
- Preference saved in localStorage
- Persists across sessions
- Smooth color transitions
- All components adapt automatically

**Theme Affects:**
- Background colors
- Text colors
- Border colors
- Component styling
- Icons and buttons

---

### 6. History Management

**Automatic Tracking:**
- Last 20 QR codes saved automatically
- Stored in browser localStorage
- Includes all settings (text, colors, size, error level)
- Timestamp for each entry

**History Features:**
- **View**: Expandable panel with grid layout
- **Load**: Click any item to restore settings
- **Preview**: Thumbnail view of each QR code
- **Clear**: One-click to clear all history
- **Persistent**: Survives browser restarts

**History Item Display:**
- QR code thumbnail
- Text preview (truncated if long)
- Size indicator
- Timestamp

---

### 7. Batch Generation

**Advanced Feature for Power Users:**

**Capabilities:**
- Generate up to 100 QR codes at once
- One text/URL per line
- Automatic ZIP file creation
- Individual PNG files for each code
- Progress indicator during generation

**Batch Settings:**
- Uniform size for all codes
- Uniform error correction level
- Sequential numbering
- Sanitized filenames

**Process:**
1. Open Batch Generator panel
2. Enter multiple lines of text/URLs
3. Set size and error correction
4. Click "Generate & Download ZIP"
5. Wait for progress bar to complete
6. ZIP file downloads automatically

**Filename Format:**
```
qrcode_1_first_20_chars_of_text.png
qrcode_2_next_item.png
...
```

**Use Cases:**
- Event tickets (multiple entries)
- Product codes (inventory management)
- Contact cards (team members)
- URLs (multiple landing pages)
- Menu items (restaurant QR menus)

---

## Input Validation

**Text/URL Input:**
- Required field validation
- Maximum 2000 characters
- Real-time character count
- Clear error messages
- Automatic trimming

**Color Inputs:**
- Hex format validation
- Visual color picker
- Manual hex input
- Real-time preview

**Batch Input:**
- Line count validation (max 100)
- Empty line filtering
- Progress feedback
- Error handling

---

## Accessibility Features

**Keyboard Navigation:**
- Tab through all controls
- Enter to submit/download
- Escape to close modals
- Arrow keys in sliders

**Screen Reader Support:**
- ARIA labels on all interactive elements
- Descriptive button text
- Form field labels
- Status announcements

**Visual Accessibility:**
- High contrast mode support
- Focus indicators
- Large touch targets (mobile)
- Readable font sizes

---

## Responsive Design

**Mobile (< 768px):**
- Single column layout
- Touch-optimized controls
- Collapsible sections
- Full-width buttons

**Tablet (768px - 1024px):**
- Two-column grid
- Balanced layout
- Optimized spacing

**Desktop (> 1024px):**
- Multi-column grid
- Expanded controls
- Maximum screen utilization

---

## Performance Optimizations

**Debouncing:**
- 300ms delay on text input
- Prevents excessive re-renders
- Smooth user experience

**Local Storage:**
- Efficient data structure
- Automatic cleanup (20 item limit)
- Minimal storage footprint

**Lazy Loading:**
- Components load on demand
- Optimized bundle size
- Fast initial load

**Canvas Optimization:**
- Hidden canvas for PNG export
- Efficient rendering
- Memory management

---

## Browser Storage

**What's Stored:**
- Theme preference (dark/light)
- QR code history (last 20)
- Settings are NOT stored (by design)

**Storage Size:**
- ~10-50KB typical usage
- Automatic cleanup
- No server required
- Privacy-focused (all local)

---

## Security & Privacy

**No Server Communication:**
- 100% client-side operation
- No data sent to servers
- No tracking or analytics
- No cookies

**Local Processing:**
- QR generation in browser
- Downloads direct from browser
- History stays on your device

**Data Control:**
- Clear history anytime
- No account required
- No data collection

---

## Technical Specifications

**QR Code Specifications:**
- Version: Automatic (based on data length)
- Mask Pattern: Automatic (optimal readability)
- Character Encoding: UTF-8
- Module Size: Responsive
- Quiet Zone: Included

**Image Specifications:**

PNG:
- Format: PNG-24
- Compression: Lossless
- Transparency: Support available
- DPI: 96 (standard web)

SVG:
- Format: SVG 1.1
- Encoding: UTF-8
- Scalability: Infinite
- File size: Minimal (~1-2KB)

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Tab` | Navigate between fields |
| `Shift + Tab` | Navigate backwards |
| `Enter` | Download (when QR code active) |
| `Esc` | Close modals |
| `Ctrl/Cmd + V` | Paste in text field |

---

## Best Practices

### For Digital Use:
- Use PNG format
- Medium error correction
- 256px size minimum
- High contrast colors

### For Print:
- Use SVG format
- High error correction
- Large size (512px reference)
- Black on white for best scanning

### For Damaged Environments:
- High (H) error correction
- Black and white colors
- Larger size
- Simple, short URLs

### For Business Cards:
- Medium (M) error correction
- 256-384px size
- Brand colors (with good contrast)
- vCard format for contacts

---

## Troubleshooting

**QR Code Won't Scan:**
- Increase size
- Use higher error correction
- Improve color contrast
- Reduce data length
- Test different scanning apps

**Download Not Working:**
- Check browser permissions
- Try different format
- Clear browser cache
- Update browser

**Copy to Clipboard Fails:**
- Use Download instead
- Check clipboard permissions
- Try different browser
- Use PNG format

**History Not Saving:**
- Check localStorage enabled
- Clear browser data and retry
- Check available storage
- Try incognito/private mode

---

## Future Enhancements

Potential features for future releases:
- [ ] Logo/image embedding in QR codes
- [ ] Custom shapes and styles
- [ ] Animated QR codes
- [ ] QR code scanning/reading
- [ ] URL shortening integration
- [ ] vCard/WiFi QR templates
- [ ] Export history as JSON
- [ ] QR code analytics
- [ ] Share via URL
- [ ] PWA support

---

## API Reference

See `src/hooks/useQRCode.js` for custom hook documentation.
See `src/utils/validators.js` for validation utilities.
See `src/constants/qrConfig.js` for configuration options.


