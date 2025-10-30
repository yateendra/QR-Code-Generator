/**
 * Configuration constants for QR Code Generator
 */

export const QR_SIZES = {
  SMALL: 128,
  MEDIUM: 256,
  LARGE: 512,
  MIN: 128,
  MAX: 512,
  STEP: 32
}

export const ERROR_LEVELS = [
  { value: 'L', label: 'Low (~7%)', description: 'Fastest to scan, least damage recovery' },
  { value: 'M', label: 'Medium (~15%)', description: 'Balanced performance and recovery' },
  { value: 'Q', label: 'Quartile (~25%)', description: 'Good damage recovery' },
  { value: 'H', label: 'High (~30%)', description: 'Best damage recovery, slower to scan' }
]

export const DOWNLOAD_FORMATS = [
  { value: 'PNG', label: 'PNG (Raster)', description: 'Best for digital use' },
  { value: 'SVG', label: 'SVG (Vector)', description: 'Best for print and scaling' }
]

export const DEFAULT_COLORS = {
  FOREGROUND: '#000000',
  BACKGROUND: '#ffffff'
}

export const PRESET_COLORS = [
  '#000000', '#ffffff', '#228be6', '#40c057', 
  '#fa5252', '#fd7e14', '#9c36b5', '#fab005'
]

export const LIMITS = {
  MAX_TEXT_LENGTH: 2000,
  MAX_BATCH_SIZE: 100,
  MAX_HISTORY_ITEMS: 20,
  DEBOUNCE_DELAY: 300
}

export const STORAGE_KEYS = {
  THEME: 'mantine-color-scheme',
  HISTORY: 'qr-history'
}


