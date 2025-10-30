import { useState, useCallback } from 'react'
import { notifications } from '@mantine/notifications'
import { IconCheck, IconAlertCircle } from '@tabler/icons-react'

/**
 * Custom hook for QR code operations
 * Provides utilities for downloading and copying QR codes
 */
export function useQRCode() {
  const [isProcessing, setIsProcessing] = useState(false)

  const downloadQRCode = useCallback(async (format, elementId, filename = null) => {
    setIsProcessing(true)
    
    try {
      let dataUrl
      const timestamp = Date.now()
      const downloadName = filename || `qrcode-${timestamp}.${format.toLowerCase()}`

      if (format === 'PNG') {
        const canvas = document.getElementById(elementId || 'qr-canvas')
        if (!canvas) throw new Error('Canvas element not found')
        dataUrl = canvas.toDataURL('image/png')
      } else if (format === 'SVG') {
        const svg = document.getElementById(elementId || 'qr-svg')
        if (!svg) throw new Error('SVG element not found')
        const svgData = new XMLSerializer().serializeToString(svg)
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
        dataUrl = URL.createObjectURL(svgBlob)
      } else {
        throw new Error('Invalid format')
      }

      const link = document.createElement('a')
      link.download = downloadName
      link.href = dataUrl
      link.click()

      if (format === 'SVG') {
        URL.revokeObjectURL(dataUrl)
      }

      notifications.show({
        title: 'Success',
        message: 'QR code downloaded successfully',
        color: 'green',
        icon: <IconCheck />
      })

      return true
    } catch (error) {
      notifications.show({
        title: 'Download Failed',
        message: error.message || 'Failed to download QR code',
        color: 'red',
        icon: <IconAlertCircle />
      })
      return false
    } finally {
      setIsProcessing(false)
    }
  }, [])

  const copyToClipboard = useCallback(async (elementId = 'qr-canvas') => {
    setIsProcessing(true)

    try {
      const canvas = document.getElementById(elementId)
      if (!canvas) throw new Error('Canvas element not found')

      const blob = await new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob)
          else reject(new Error('Failed to create blob'))
        }, 'image/png')
      })

      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ])

      notifications.show({
        title: 'Copied!',
        message: 'QR code copied to clipboard',
        color: 'green',
        icon: <IconCheck />
      })

      return true
    } catch (error) {
      notifications.show({
        title: 'Copy Failed',
        message: 'Failed to copy QR code. Try downloading instead.',
        color: 'red',
        icon: <IconAlertCircle />
      })
      return false
    } finally {
      setIsProcessing(false)
    }
  }, [])

  return {
    downloadQRCode,
    copyToClipboard,
    isProcessing
  }
}


