# Project Structure

## 📁 Complete File Tree

```
QrcodeGenerator/
│
├── 📄 Configuration Files
│   ├── package.json              # Dependencies and scripts
│   ├── vite.config.js           # Vite configuration
│   ├── .eslintrc.cjs            # ESLint rules
│   └── .gitignore               # Git ignore patterns
│
├── 📄 Documentation
│   ├── README.md                # Main documentation
│   ├── QUICKSTART.md            # 5-minute quick start
│   ├── SETUP.md                 # Setup instructions
│   ├── FEATURES.md              # Feature documentation
│   ├── PROJECT_SUMMARY.md       # Complete overview
│   ├── STRUCTURE.md             # This file
│   └── LICENSE                  # MIT License
│
├── 🌐 HTML Entry
│   └── index.html               # HTML template
│
├── 📁 public/
│   └── qr-icon.svg              # Favicon (QR code icon)
│
└── 📁 src/
    ├── 📄 App Files
    │   ├── main.jsx             # Application entry point
    │   ├── App.jsx              # Root component
    │   └── App.css              # Global styles
    │
    ├── 📁 components/           # React Components
    │   ├── QRCodeGenerator.jsx  # Main QR generator
    │   ├── ThemeToggle.jsx      # Dark/light mode toggle
    │   ├── History.jsx          # History panel
    │   └── BatchGenerator.jsx   # Batch generation
    │
    ├── 📁 hooks/                # Custom Hooks
    │   └── useQRCode.js         # QR operations hook
    │
    ├── 📁 utils/                # Utilities
    │   └── validators.js        # Input validation
    │
    └── 📁 constants/            # Constants
        └── qrConfig.js          # Configuration values
```

---

## 🔍 File Details

### Configuration Layer
```
.
├── package.json          → Dependencies, scripts, metadata
├── vite.config.js       → Dev server, build config
├── .eslintrc.cjs        → Code quality rules
└── .gitignore           → Git exclusions
```

### Documentation Layer
```
.
├── README.md            → Main docs (setup, usage, tech stack)
├── QUICKSTART.md        → 5-minute getting started
├── SETUP.md             → Installation & troubleshooting
├── FEATURES.md          → Complete feature guide
├── PROJECT_SUMMARY.md   → Project overview
└── LICENSE              → MIT License text
```

### Application Layer
```
src/
├── main.jsx            → ReactDOM.render()
├── App.jsx             → Root component with providers
└── App.css             → Global styles, animations
```

### Component Layer
```
src/components/
├── QRCodeGenerator.jsx → Main generator component
│   ├── Text input with validation
│   ├── Size slider (128-512px)
│   ├── Color pickers (fg/bg)
│   ├── Error correction select
│   ├── Format selection (PNG/SVG)
│   ├── Download button
│   ├── Copy button
│   └── QR code preview
│
├── ThemeToggle.jsx     → Theme switcher
│   ├── Sun/Moon icon
│   ├── Click handler
│   └── LocalStorage persistence
│
├── History.jsx         → History management
│   ├── Collapsible panel
│   ├── Grid of thumbnails
│   ├── Click to load
│   ├── Clear all button
│   └── LocalStorage integration
│
└── BatchGenerator.jsx  → Batch processing
    ├── Multi-line textarea
    ├── Line counter
    ├── Progress bar
    ├── ZIP generation
    └── Batch download
```

### Utility Layer
```
src/
├── hooks/
│   └── useQRCode.js         → Custom hook for QR operations
│       ├── downloadQRCode()  → Download as PNG/SVG
│       ├── copyToClipboard() → Copy to clipboard
│       └── isProcessing      → Loading state
│
├── utils/
│   └── validators.js         → Input validation
│       ├── isValidUrl()
│       ├── validateQRText()
│       ├── sanitizeFilename()
│       ├── isValidHexColor()
│       ├── hasGoodContrast()
│       └── validateBatchInput()
│
└── constants/
    └── qrConfig.js          → Configuration constants
        ├── QR_SIZES
        ├── ERROR_LEVELS
        ├── DOWNLOAD_FORMATS
        ├── DEFAULT_COLORS
        ├── PRESET_COLORS
        ├── LIMITS
        └── STORAGE_KEYS
```

---

## 📊 Component Hierarchy

```
App.jsx (Root)
├── MantineProvider
│   ├── Notifications
│   └── Container
│       ├── Header
│       │   ├── Title
│       │   └── ThemeToggle
│       │
│       ├── QRCodeGenerator (Main)
│       │   ├── Paper
│       │   │   ├── TextInput
│       │   │   ├── Slider
│       │   │   ├── ColorInput (x2)
│       │   │   ├── Select (Error Level)
│       │   │   ├── Select (Format)
│       │   │   ├── Button (Download)
│       │   │   ├── Button (Copy)
│       │   │   └── QR Code Preview
│       │   │       ├── QRCodeCanvas (PNG)
│       │   │       └── QRCodeSVG (SVG)
│       │
│       ├── BatchGenerator
│       │   ├── Paper
│       │   │   ├── Collapse
│       │   │   │   ├── Textarea
│       │   │   │   ├── NumberInput (Size)
│       │   │   │   ├── Select (Error Level)
│       │   │   │   ├── Button (Generate)
│       │   │   │   └── Progress
│       │
│       └── History
│           └── Paper
│               ├── Collapse
│               │   ├── ScrollArea
│               │   │   └── Grid
│               │   │       └── Card[] (History Items)
│               │   │           ├── QRCodeSVG (Thumbnail)
│               │   │           ├── Text (Content)
│               │   │           └── Badge (Metadata)
│               └── Button (Clear)
```

---

## 🔗 Data Flow

```
User Input
    ↓
Form Validation (Mantine useForm)
    ↓
Debounced Value (useDebouncedValue - 300ms)
    ↓
QR Generation (qrcode.react)
    ↓
Preview Display
    ↓
User Action (Download/Copy)
    ↓
File Export or Clipboard
    ↓
History Update (LocalStorage)
    ↓
Notification (Success/Error)
```

---

## 💾 Storage Architecture

```
LocalStorage
├── 'mantine-color-scheme'
│   └── 'light' | 'dark'
│
└── 'qr-history'
    └── Array[20]
        └── {
              id: number,
              timestamp: string,
              text: string,
              size: number,
              fgColor: string,
              bgColor: string,
              errorLevel: string
            }
```

---

## 🎨 Styling Architecture

```
Styles
├── Mantine Theme
│   ├── Global theme object
│   ├── Color scheme (dark/light)
│   ├── Primary color (blue)
│   └── Component defaults
│
├── Mantine Core Styles
│   ├── @mantine/core/styles.css
│   └── @mantine/notifications/styles.css
│
└── Custom Styles (App.css)
    ├── Global resets
    ├── Animations
    ├── Custom scrollbar
    ├── Print styles
    ├── Accessibility styles
    └── Responsive utilities
```

---

## 📦 Dependency Graph

```
React Core
├── react (18.2.0)
└── react-dom (18.2.0)

Mantine Ecosystem
├── @mantine/core (7.3.2)
├── @mantine/hooks (7.3.2)
├── @mantine/notifications (7.3.2)
└── @mantine/form (7.3.2)

QR Code Libraries
├── qrcode.react (3.1.0)     → React components
└── qrcode (1.5.3)           → Core generation (batch)

UI Enhancements
├── @tabler/icons-react (2.44.0)
└── jszip (3.10.1)

Build Tools
└── vite (5.0.8)
    └── @vitejs/plugin-react (4.2.1)
```

---

## 🚀 Build Output

```
Production Build (npm run build)
└── dist/
    ├── index.html
    ├── assets/
    │   ├── index-[hash].js      → Main bundle
    │   ├── index-[hash].css     → Styles
    │   └── vendor-[hash].js     → Dependencies
    └── qr-icon.svg
```

---

## 📝 Code Organization

### By Responsibility
```
Presentation Layer  → components/
Business Logic      → hooks/, utils/
Configuration       → constants/
Styling            → App.css, Mantine theme
State Management   → React hooks, LocalStorage
Routing            → N/A (single page)
API Layer          → N/A (client-side only)
```

### By Feature
```
Theme Management
├── App.jsx (state)
├── ThemeToggle.jsx (UI)
└── LocalStorage (persistence)

QR Generation
├── QRCodeGenerator.jsx (UI)
├── useQRCode.js (logic)
└── qrConfig.js (config)

History Management
├── History.jsx (UI)
├── App.jsx (state)
└── LocalStorage (persistence)

Batch Processing
├── BatchGenerator.jsx (UI)
├── validators.js (validation)
└── jszip (export)
```

---

## 🔐 Security Boundaries

```
Client Browser
├── User Input        → Validated (validators.js)
├── QR Generation     → Client-side only
├── File Download     → Browser API
├── Clipboard Access  → Browser API
└── LocalStorage      → Sandboxed per domain

No Server
├── No data transmission
├── No authentication
├── No cookies
└── No tracking
```

---

## 🧪 Testing Points

```
Unit Tests (Recommended)
├── validators.js functions
├── useQRCode.js hook
├── Component rendering
└── Event handlers

Integration Tests (Recommended)
├── Form submission flow
├── Download functionality
├── Clipboard operations
└── History management

E2E Tests (Recommended)
├── Generate → Download flow
├── Batch generation flow
├── Theme persistence
└── History operations
```

---

## 📈 Performance Profile

```
Initial Load
├── HTML: ~2KB
├── JS: ~150KB (gzipped)
├── CSS: ~20KB (gzipped)
└── Total: ~172KB

Runtime
├── Debounce: 300ms
├── QR Generation: <50ms
├── Canvas Export: <100ms
└── ZIP Creation: ~50ms per code
```

---

## 🔄 State Management

```
Local State (useState)
├── QRCodeGenerator.jsx
│   ├── qrValue
│   └── isGenerating
├── BatchGenerator.jsx
│   ├── batchText
│   ├── isGenerating
│   └── progress
└── History.jsx
    └── opened

Persistent State (useLocalStorage)
├── App.jsx
│   ├── colorScheme
│   └── history

Form State (useForm)
└── QRCodeGenerator.jsx
    └── form values
```

---

## 🎯 Entry Points

```
Development:  npm run dev      → localhost:3000
Production:   npm run build    → dist/
Preview:      npm run preview  → Preview dist/
Browser:      index.html       → Loads main.jsx
Component:    App.jsx          → Root component
```

---

This structure provides a scalable, maintainable foundation for the QR Code Generator application.


