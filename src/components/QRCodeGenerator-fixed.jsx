import { useState, useEffect } from 'react'
import { 
  Paper, 
  TextInput, 
  Stack, 
  Group, 
  Button, 
  Select, 
  ColorInput,
  Slider,
  Text,
  Grid,
  Badge,
  Box,
  Loader,
  Center
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { 
  IconDownload, 
  IconCopy, 
  IconQrcode,
  IconCheck,
  IconAlertCircle
} from '@tabler/icons-react'
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react'

function QRCodeGenerator({ onGenerate }) {
  const [qrValue, setQrValue] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const form = useForm({
    initialValues: {
      text: '',
      size: 256,
      fgColor: '#000000',
      bgColor: '#ffffff',
      errorLevel: 'M',
      format: 'PNG'
    },
    validate: {
      text: (value) => {
        if (!value) return 'Please enter text or URL'
        if (value.length > 2000) return 'Text is too long (max 2000 characters)'
        return null
      }
    }
  })

  useEffect(() => {
    if (form.values.text) {
      setIsGenerating(true)
      const timer = setTimeout(() => {
        setQrValue(form.values.text)
        setIsGenerating(false)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setQrValue('')
    }
  }, [form.values.text, form.values.fgColor, form.values.bgColor, form.values.size, form.values.errorLevel])

  const handleDownload = () => {
    if (!qrValue) {
      notifications.show({
        title: 'Error',
        message: 'Please generate a QR code first',
        color: 'red',
        icon: <IconAlertCircle />
      })
      return
    }

    try {
      let dataUrl
      
      if (form.values.format === 'PNG') {
        const canvas = document.getElementById('qr-canvas')
        dataUrl = canvas.toDataURL('image/png')
      } else {
        const svg = document.getElementById('qr-svg')
        const svgData = new XMLSerializer().serializeToString(svg)
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
        dataUrl = URL.createObjectURL(svgBlob)
      }

      const link = document.createElement('a')
      link.download = `qrcode-${Date.now()}.${form.values.format.toLowerCase()}`
      link.href = dataUrl
      link.click()

      if (form.values.format === 'SVG') {
        URL.revokeObjectURL(dataUrl)
      }

      // Add to history
      if (onGenerate) {
        onGenerate({
          text: form.values.text,
          size: form.values.size,
          fgColor: form.values.fgColor,
          bgColor: form.values.bgColor,
          errorLevel: form.values.errorLevel
        })
      }

      notifications.show({
        title: 'Success',
        message: 'QR code downloaded successfully',
        color: 'green',
        icon: <IconCheck />
      })
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to download QR code',
        color: 'red',
        icon: <IconAlertCircle />
      })
    }
  }

  const handleCopyToClipboard = async () => {
    if (!qrValue) {
      notifications.show({
        title: 'Error',
        message: 'Please generate a QR code first',
        color: 'red',
        icon: <IconAlertCircle />
      })
      return
    }

    try {
      const canvas = document.getElementById('qr-canvas')
      canvas.toBlob(async (blob) => {
        await navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob
          })
        ])
        notifications.show({
          title: 'Success',
          message: 'QR code copied to clipboard',
          color: 'green',
          icon: <IconCheck />
        })
      })
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to copy QR code. Try downloading instead.',
        color: 'red',
        icon: <IconAlertCircle />
      })
    }
  }

  return (
    <Paper shadow="sm" p="xl" radius="md" withBorder>
      <Stack gap="lg">
        <Group justify="space-between">
          <Group>
            <IconQrcode size={24} />
            <Text size="xl" fw={700}>Generate QR Code</Text>
          </Group>
          {qrValue && <Badge color="green" size="lg">Active</Badge>}
        </Group>

        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="md">
              {/* Text Input */}
              <TextInput
                label="Enter Text or URL"
                placeholder="https://example.com or any text"
                description="The content to encode in the QR code"
                {...form.getInputProps('text')}
                size="md"
                required
              />

              {/* Size Slider */}
              <Box>
                <Text size="sm" fw={500} mb="xs">
                  QR Code Size: {form.values.size}px
                </Text>
                <Slider
                  min={128}
                  max={512}
                  step={32}
                  value={form.values.size}
                  onChange={(value) => form.setFieldValue('size', value)}
                  marks={[
                    { value: 128, label: 'Small' },
                    { value: 256, label: 'Medium' },
                    { value: 512, label: 'Large' }
                  ]}
                />
              </Box>

              {/* Color Inputs */}
              <Group grow>
                <ColorInput
                  label="Foreground Color"
                  placeholder="Pick color"
                  {...form.getInputProps('fgColor')}
                  format="hex"
                />
                <ColorInput
                  label="Background Color"
                  placeholder="Pick color"
                  {...form.getInputProps('bgColor')}
                  format="hex"
                />
              </Group>

              {/* Error Correction Level */}
              <Select
                label="Error Correction Level"
                description="Higher levels allow the QR code to be read even if partially damaged"
                {...form.getInputProps('errorLevel')}
                data={[
                  { value: 'L', label: 'Low (~7%)' },
                  { value: 'M', label: 'Medium (~15%)' },
                  { value: 'Q', label: 'Quartile (~25%)' },
                  { value: 'H', label: 'High (~30%)' }
                ]}
              />

              {/* Format Selection */}
              <Select
                label="Download Format"
                {...form.getInputProps('format')}
                data={[
                  { value: 'PNG', label: 'PNG (Raster)' },
                  { value: 'SVG', label: 'SVG (Vector)' }
                ]}
              />

              {/* Action Buttons */}
              <Group grow>
                <Button
                  leftSection={<IconDownload size={18} />}
                  onClick={handleDownload}
                  disabled={!qrValue}
                  size="md"
                >
                  Download
                </Button>
                <Button
                  leftSection={<IconCopy size={18} />}
                  onClick={handleCopyToClipboard}
                  disabled={!qrValue}
                  variant="light"
                  size="md"
                >
                  Copy
                </Button>
              </Group>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper shadow="xs" padding="lg" radius="md" withBorder>
              <Stack gap="md" align="center">
                <Text size="sm" fw={500} c="dimmed">
                  QR Code Preview
                </Text>
                
                {isGenerating ? (
                  <Center style={{ minHeight: 300 }}>
                    <Loader size="xl" />
                  </Center>
                ) : qrValue ? (
                  <Box style={{ position: 'relative' }}>
                    {/* Always render canvas for download/copy */}
                    <QRCodeCanvas
                      id="qr-canvas"
                      value={qrValue}
                      size={form.values.size}
                      bgColor={form.values.bgColor}
                      fgColor={form.values.fgColor}
                      level={form.values.errorLevel}
                      includeMargin={true}
                      style={{ 
                        maxWidth: '100%', 
                        height: 'auto',
                        display: form.values.format === 'PNG' ? 'block' : 'none'
                      }}
                    />
                    
                    {/* SVG version (only shown when SVG format selected) */}
                    {form.values.format === 'SVG' && (
                      <QRCodeSVG
                        id="qr-svg"
                        value={qrValue}
                        size={form.values.size}
                        bgColor={form.values.bgColor}
                        fgColor={form.values.fgColor}
                        level={form.values.errorLevel}
                        includeMargin={true}
                        style={{ maxWidth: '100%', height: 'auto' }}
                      />
                    )}
                  </Box>
                ) : (
                  <Center style={{ minHeight: 300 }}>
                    <Stack align="center" gap="xs">
                      <IconQrcode size={64} color="gray" />
                      <Text c="dimmed" size="sm">
                        Enter text to generate QR code
                      </Text>
                    </Stack>
                  </Center>
                )}

                {qrValue && (
                  <Text size="xs" c="dimmed" ta="center">
                    {form.values.text.length > 50 
                      ? form.values.text.substring(0, 50) + '...' 
                      : form.values.text}
                  </Text>
                )}
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>
      </Stack>
    </Paper>
  )
}

export default QRCodeGenerator

