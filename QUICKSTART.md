# Quick Start Guide - 5 Minutes to Running

## ⚡ Super Quick Start

```bash
npm install && npm run dev
```

That's it! Open http://localhost:3000 and start creating QR codes.

---

## 📋 Step-by-Step (First Time)

### Step 1: Install Dependencies (1 minute)
```bash
npm install
```

Wait for packages to download...

### Step 2: Start Development Server (30 seconds)
```bash
npm run dev
```

Look for:
```
VITE v5.0.8  ready in 500 ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

### Step 3: Open Browser (immediately)
Navigate to: **http://localhost:3000**

### Step 4: Create Your First QR Code! (30 seconds)
1. Type "Hello World" in the text input
2. Watch QR code generate instantly
3. Click "Download" to save as PNG
4. Done! 🎉

---

## 🎯 What You Can Do Right Now

### Basic Use (1 minute)
```
1. Enter text or URL → QR generates automatically
2. Adjust size with slider
3. Change colors with color pickers
4. Download or copy to clipboard
```

### Customize (2 minutes)
```
1. Move size slider → See QR resize in real-time
2. Click foreground color → Pick your brand color
3. Click background color → Choose background
4. Select error correction → Pick 'Medium' for most uses
5. Choose format → PNG for web, SVG for print
```

### Try Advanced Features (3 minutes)
```
1. Click "Batch Generator" section
2. Paste multiple URLs (one per line)
3. Click "Generate & Download ZIP"
4. Get all QR codes in one file!
```

---

## 🎨 Try These Examples

### Example 1: Website QR Code
```
Text: https://github.com
Size: 256px
Foreground: #000000 (black)
Background: #ffffff (white)
Error Level: M (Medium)
Format: PNG
```

### Example 2: Colorful QR Code
```
Text: https://example.com
Size: 384px
Foreground: #228be6 (blue)
Background: #fff5f5 (light pink)
Error Level: H (High)
Format: SVG
```

### Example 3: Business Card QR
```
Text: BEGIN:VCARD
VERSION:3.0
FN:John Doe
TEL:+1234567890
EMAIL:john@example.com
END:VCARD
Size: 320px
Error Level: M
Format: PNG
```

### Example 4: WiFi QR Code
```
Text: WIFI:T:WPA;S:YourNetworkName;P:YourPassword;;
Size: 256px
Error Level: H (High)
Format: PNG
```

---

## 💡 Pro Tips

### Tip 1: Fast Workflow
1. Toggle dark mode (button top-right)
2. Type or paste your content
3. Hit Ctrl+V to paste
4. QR generates while you type
5. Click Download when ready

### Tip 2: Reuse Settings
1. Generate a QR code
2. Check the History section
3. Click any previous code to reload settings
4. Modify and download again

### Tip 3: Batch Processing
1. Prepare list in Excel/Google Sheets
2. Copy column of URLs
3. Paste into Batch Generator
4. Get all QR codes in seconds

### Tip 4: Best Scanning
- Use black on white for best results
- Minimum 256px for reliable scanning
- Test with your phone's camera
- Use Medium or High error correction

---

## 🔧 Common Tasks

### Download as Image
```
1. Generate QR code
2. Select format (PNG/SVG)
3. Click "Download" button
4. Find file in Downloads folder
```

### Copy to Clipboard
```
1. Generate QR code
2. Click "Copy" button
3. Paste into any app (Ctrl+V)
4. Works in email, chat, documents
```

### Clear History
```
1. Scroll to History section
2. Click "Clear All" button
3. Confirm if prompted
```

### Switch Theme
```
1. Find sun/moon icon (top-right)
2. Click to toggle
3. Theme saves automatically
```

---

## 🚨 Troubleshooting

### "npm install" Fails
```bash
# Clear cache and retry
npm cache clean --force
npm install
```

### Port 3000 Busy
```bash
# Vite will suggest alternative port
# Or manually specify:
npm run dev -- --port 3001
```

### QR Code Won't Scan
```
✓ Increase size to 384px or 512px
✓ Use black and white colors
✓ Select higher error correction
✓ Reduce text length
✓ Try different scanner app
```

### Download Not Working
```
✓ Check browser permissions
✓ Try different format (PNG vs SVG)
✓ Use Copy to Clipboard instead
✓ Update browser to latest version
```

---

## 📱 Mobile Quick Start

### On Phone/Tablet
1. Run `npm run dev` on computer
2. Note the "Network" URL shown
3. Open that URL on mobile browser
4. Enjoy mobile-optimized interface!

### For Team Access
```bash
# Allow network access
npm run dev -- --host
```
Then share the Network URL with teammates.

---

## 🎓 Learn More

After the basics, explore:

1. **FEATURES.md** - Complete feature documentation
2. **README.md** - Full project overview
3. **SETUP.md** - Detailed setup and configuration

---

## ⌨️ Keyboard Shortcuts

```
Tab          → Navigate between fields
Enter        → Download (when QR active)
Esc          → Close panels
Ctrl/Cmd+V   → Paste in text field
```

---

## 🎉 You're Ready!

Start creating QR codes now:
```bash
npm run dev
```

**Happy QR Coding! 📱✨**

---

### Need Help?
- Check SETUP.md for troubleshooting
- Read FEATURES.md for detailed guides
- Review README.md for complete docs


