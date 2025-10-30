/**
 * Validation utilities for QR code generator
 */

/**
 * Validates URL format
 * @param {string} url - URL to validate
 * @returns {boolean}
 */
export function isValidUrl(url) {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Validates text length for QR code
 * @param {string} text - Text to validate
 * @param {number} maxLength - Maximum allowed length
 * @returns {object} - { valid: boolean, error: string }
 */
export function validateQRText(text, maxLength = 2000) {
  if (!text || text.trim().length === 0) {
    return { valid: false, error: 'Please enter text or URL' }
  }

  if (text.length > maxLength) {
    return { 
      valid: false, 
      error: `Text is too long (max ${maxLength} characters)` 
    }
  }

  return { valid: true, error: null }
}

/**
 * Sanitizes text for filename
 * @param {string} text - Text to sanitize
 * @param {number} maxLength - Maximum length for filename
 * @returns {string}
 */
export function sanitizeFilename(text, maxLength = 30) {
  return text
    .substring(0, maxLength)
    .replace(/[^a-z0-9]/gi, '_')
    .toLowerCase()
}

/**
 * Validates color hex format
 * @param {string} color - Hex color to validate
 * @returns {boolean}
 */
export function isValidHexColor(color) {
  return /^#[0-9A-F]{6}$/i.test(color)
}

/**
 * Checks if two colors have sufficient contrast
 * @param {string} fg - Foreground color (hex)
 * @param {string} bg - Background color (hex)
 * @returns {boolean}
 */
export function hasGoodContrast(fg, bg) {
  const getLuminance = (hex) => {
    const rgb = parseInt(hex.slice(1), 16)
    const r = (rgb >> 16) & 0xff
    const g = (rgb >> 8) & 0xff
    const b = (rgb >> 0) & 0xff
    
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  }

  const l1 = getLuminance(fg)
  const l2 = getLuminance(bg)
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
  
  return ratio >= 3 // WCAG AA for large text
}

/**
 * Validates batch input
 * @param {string} text - Batch text with multiple lines
 * @param {number} maxLines - Maximum allowed lines
 * @returns {object}
 */
export function validateBatchInput(text, maxLines = 100) {
  const lines = text.split('\n').filter(line => line.trim())
  
  if (lines.length === 0) {
    return { valid: false, error: 'Please enter at least one line' }
  }
  
  if (lines.length > maxLines) {
    return { 
      valid: false, 
      error: `Too many lines (max ${maxLines})` 
    }
  }
  
  return { valid: true, error: null, lines }
}


