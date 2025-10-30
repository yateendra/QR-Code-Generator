import { MantineProvider, Container, Title, Text, Stack, Paper, TextInput, Button, Slider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'

function AppSimple() {
  const [text, setText] = useState('')
  const [size, setSize] = useState(256)

  return (
    <MantineProvider>
      <Notifications />
      <Container size="xl" py="xl">
        <Stack gap="xl">
          <Title>QR Code Generator</Title>
          <Text size="sm" c="dimmed">Create custom QR codes instantly</Text>
          
          <Paper p="xl" withBorder>
            <Stack gap="md">
              <TextInput
                label="Enter Text or URL"
                placeholder="Type something..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                size="md"
              />
              
              <div>
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
              </div>
              
              {text && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                  <QRCodeSVG value={text} size={size} />
                </div>
              )}
              
              {!text && (
                <Text c="dimmed" ta="center" py="xl">
                  Enter text to generate QR code
                </Text>
              )}
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </MantineProvider>
  )
}

export default AppSimple

