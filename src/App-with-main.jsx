import { MantineProvider, Container, Title, Text, Stack, ActionIcon, createTheme } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { useLocalStorage } from '@mantine/hooks'
import { IconSun, IconMoon } from '@tabler/icons-react'
import QRCodeGenerator from './components/QRCodeGenerator-fixed'
import './App.css'

const theme = createTheme({
  primaryColor: 'blue',
})

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
  })

  const [history, setHistory] = useLocalStorage({
    key: 'qr-history',
    defaultValue: [],
  })

  const toggleColorScheme = () => {
    const newScheme = colorScheme === 'dark' ? 'light' : 'dark'
    setColorScheme(newScheme)
  }

  const addToHistory = (qrData) => {
    const newHistoryItem = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...qrData
    }
    setHistory((prev) => [newHistoryItem, ...prev].slice(0, 20))
  }

  return (
    <MantineProvider theme={theme} forceColorScheme={colorScheme}>
      <Notifications position="top-right" />
      
      <Container size="xl" py="xl">
        <Stack gap="xl">
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Title order={1}>QR Code Generator</Title>
              <Text c="dimmed" size="sm">
                Create custom QR codes instantly with advanced options
              </Text>
            </div>
            <ActionIcon 
              variant="default" 
              onClick={toggleColorScheme} 
              size="xl"
              aria-label="Toggle color scheme"
            >
              {colorScheme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
            </ActionIcon>
          </div>

          {/* Main QR Generator */}
          <QRCodeGenerator onGenerate={addToHistory} />
        </Stack>
      </Container>
    </MantineProvider>
  )
}

export default App

