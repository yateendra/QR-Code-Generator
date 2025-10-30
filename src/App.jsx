import { MantineProvider, Container, Title, Text, Stack } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { useLocalStorage } from '@mantine/hooks'
import QRCodeGenerator from './components/QRCodeGenerator'
import ThemeToggle from './components/ThemeToggle'
import History from './components/History'
import BatchGenerator from './components/BatchGenerator'
import './App.css'

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
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')
  }

  const addToHistory = (qrData) => {
    const newHistoryItem = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...qrData
    }
    setHistory((prev) => [newHistoryItem, ...prev].slice(0, 20)) // Keep last 20 items
  }

  const clearHistory = () => {
    setHistory([])
  }

  const loadFromHistory = (item) => {
    // This will be passed to QRCodeGenerator to load saved settings
    return item
  }

  return (
    <MantineProvider defaultColorScheme={colorScheme}>
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
            <ThemeToggle colorScheme={colorScheme} toggleColorScheme={toggleColorScheme} />
          </div>

          {/* Main QR Generator */}
          <QRCodeGenerator onGenerate={addToHistory} history={history} />

          {/* Batch Generator */}
          <BatchGenerator onBatchGenerate={addToHistory} />

          {/* History */}
          <History 
            history={history} 
            onClear={clearHistory} 
            onLoad={loadFromHistory}
          />
        </Stack>
      </Container>
    </MantineProvider>
  )
}

export default App

