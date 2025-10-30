import { MantineProvider, Container, Title, Text, Stack, Paper, TextInput, Button, Slider, Group, ColorInput, Select, Box } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { notifications } from '@mantine/notifications'
import { useState, useEffect } from 'react'
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react'
import { IconDownload, IconCopy, IconSun, IconMoon } from '@tabler/icons-react'
import { useLocalStorage } from '@mantine/hooks'

function AppWorking() {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
  })

  const [text, setText] = useState('')
  const [size, setSize] = useState(256)
  const [fgColor, setFgColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [errorLevel, setErrorLevel] = useState('M')
  const [format, setFormat] = useState('PNG')

  const toggleTheme = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')
  }

  const handleDownload = () => {
    if (!text) {
      notifications.show({
        message: 'Please enter text first',
        color: 'red'
      })
      return
    }

    try {
      let dataUrl
      
      if (format === 'PNG') {
        const canvas = document.getElementById('qr-canvas')
        dataUrl = canvas.toDataURL('image/png')
      } else {
        const svg = document.getElementById('qr-svg')
        const svgData = new XMLSerializer().serializeToString(svg)
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
        dataUrl = URL.createObjectURL(svgBlob)
      }

      const link = document.createElement('a')
      link.download = `qrcode-${Date.now()}.${format.toLowerCase()}`
      link.href = dataUrl
      link.click()

      if (format === 'SVG') {
        URL.revokeObjectURL(dataUrl)
      }

      notifications.show({
        message: 'QR code downloaded successfully',
        color: 'green'
      })
    } catch (error) {
      notifications.show({
        message: 'Failed to download',
        color: 'red'
      })
    }
  }

  const handleCopy = async () => {
    if (!text) return

    try {
      const canvas = document.getElementById('qr-canvas')
      canvas.toBlob(async (blob) => {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ])
        notifications.show({
          message: 'Copied to clipboard',
          color: 'green'
        })
      })
    } catch (error) {
      notifications.show({
        message: 'Failed to copy',
        color: 'red'
      })
    }
  }

  return (
    <MantineProvider defaultColorScheme={colorScheme}>
      <Notifications position="top-right" />
      
      <Container size="xl" py="xl">
        <Stack gap="xl">
          {/* Header */}
          <Group justify="space-between">
            <div>
              <Title>QR Code Generator</Title>
              <Text c="dimmed" size="sm">Create custom QR codes instantly</Text>
            </div>
            <Button variant="default" onClick={toggleTheme}>
              {colorScheme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
            </Button>
          </Group>

          {/* Main Generator */}
          <Paper p="xl" withBorder>
            <Stack gap="md">
              <TextInput
                label="Enter Text or URL"
                placeholder="https://example.com or any text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                size="md"
              />

              <Box>
                <Text size="sm" fw={500} mb="xs">Size: {size}px</Text>
                <Slider
                  value={size}
                  onChange={setSize}
                  min={128}
                  max={512}
                  step={32}
                  marks={[
                    { value: 128, label: 'Small' },
                    { value: 256, label: 'Medium' },
                    { value: 512, label: 'Large' }
                  ]}
                />
              </Box>

              <Group grow>
                <ColorInput
                  label="Foreground Color"
                  value={fgColor}
                  onChange={setFgColor}
                  format="hex"
                />
                <ColorInput
                  label="Background Color"
                  value={bgColor}
                  onChange={setBgColor}
                  format="hex"
                />
              </Group>

              <Select
                label="Error Correction Level"
                value={errorLevel}
                onChange={setErrorLevel}
                data={[
                  { value: 'L', label: 'Low (~7%)' },
                  { value: 'M', label: 'Medium (~15%)' },
                  { value: 'Q', label: 'Quartile (~25%)' },
                  { value: 'H', label: 'High (~30%)' }
                ]}
              />

              <Select
                label="Download Format"
                value={format}
                onChange={setFormat}
                data={[
                  { value: 'PNG', label: 'PNG (Raster)' },
                  { value: 'SVG', label: 'SVG (Vector)' }
                ]}
              />

              {/* QR Code Preview */}
              {text && (
                <Box style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                  <QRCodeCanvas
                    id="qr-canvas"
                    value={text}
                    size={size}
                    bgColor={bgColor}
                    fgColor={fgColor}
                    level={errorLevel}
                    includeMargin={true}
                    style={{ 
                      maxWidth: '100%',
                      height: 'auto',
                      display: format === 'PNG' ? 'block' : 'none'
                    }}
                  />
                  {format === 'SVG' && (
                    <QRCodeSVG
                      id="qr-svg"
                      value={text}
                      size={size}
                      bgColor={bgColor}
                      fgColor={fgColor}
                      level={errorLevel}
                      includeMargin={true}
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  )}
                </Box>
              )}

              {!text && (
                <Text c="dimmed" ta="center" py="xl">
                  Enter text to generate QR code
                </Text>
              )}

              {/* Action Buttons */}
              <Group grow>
                <Button
                  leftSection={<IconDownload size={18} />}
                  onClick={handleDownload}
                  disabled={!text}
                >
                  Download
                </Button>
                <Button
                  leftSection={<IconCopy size={18} />}
                  onClick={handleCopy}
                  disabled={!text}
                  variant="light"
                >
                  Copy
                </Button>
              </Group>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </MantineProvider>
  )
}

export default AppWorking

