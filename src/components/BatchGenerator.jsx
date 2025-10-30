import { useState } from 'react'
import {
  Paper,
  Stack,
  Group,
  Text,
  Button,
  Textarea,
  Collapse,
  ActionIcon,
  Grid,
  Badge,
  Box,
  Select,
  NumberInput,
  Progress
} from '@mantine/core'
import {
  IconChevronDown,
  IconChevronUp,
  IconBatch,
  IconDownload,
  IconCheck,
  IconAlertCircle
} from '@tabler/icons-react'
import { notifications } from '@mantine/notifications'
import { QRCodeCanvas } from 'qrcode.react'
import QRCodeLib from 'qrcode'
import JSZip from 'jszip'

function BatchGenerator({ onBatchGenerate }) {
  const [opened, setOpened] = useState(false)
  const [batchText, setBatchText] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [batchSize, setBatchSize] = useState(256)
  const [errorLevel, setErrorLevel] = useState('M')

  const generateBatch = async () => {
    const lines = batchText.split('\n').filter(line => line.trim())
    
    if (lines.length === 0) {
      notifications.show({
        title: 'Error',
        message: 'Please enter at least one line of text',
        color: 'red',
        icon: <IconAlertCircle />
      })
      return
    }

    if (lines.length > 100) {
      notifications.show({
        title: 'Error',
        message: 'Maximum 100 QR codes per batch',
        color: 'red',
        icon: <IconAlertCircle />
      })
      return
    }

    setIsGenerating(true)
    setProgress(0)

    try {
      const zip = new JSZip()
      
      for (let i = 0; i < lines.length; i++) {
        const text = lines[i].trim()
        
        // Create temporary canvas for each QR code
        const tempCanvas = document.createElement('canvas')
        
        await QRCodeLib.toCanvas(tempCanvas, text, {
          width: batchSize,
          margin: 2,
          errorCorrectionLevel: errorLevel
        })

        // Convert to blob and add to zip
        const blob = await new Promise(resolve => tempCanvas.toBlob(resolve, 'image/png'))
        const fileName = `qrcode_${i + 1}_${text.substring(0, 20).replace(/[^a-z0-9]/gi, '_')}.png`
        zip.file(fileName, blob)

        // Update progress
        setProgress(((i + 1) / lines.length) * 100)

        // Add to history
        onBatchGenerate({
          text,
          size: batchSize,
          fgColor: '#000000',
          bgColor: '#ffffff',
          errorLevel
        })
      }

      // Generate zip file
      const zipBlob = await zip.generateAsync({ type: 'blob' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(zipBlob)
      link.download = `qrcodes_batch_${Date.now()}.zip`
      link.click()
      URL.revokeObjectURL(link.href)

      notifications.show({
        title: 'Success',
        message: `Generated ${lines.length} QR codes successfully`,
        color: 'green',
        icon: <IconCheck />
      })

      setBatchText('')
      setProgress(0)
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to generate batch QR codes',
        color: 'red',
        icon: <IconAlertCircle />
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const linesCount = batchText.split('\n').filter(line => line.trim()).length

  return (
    <Paper shadow="sm" p="xl" radius="md" withBorder>
      <Stack gap="md">
        <Group justify="space-between">
          <Group>
            <IconBatch size={24} />
            <Text size="xl" fw={700}>
              Batch Generator
            </Text>
            <Badge size="lg" color="violet">
              Advanced
            </Badge>
          </Group>
          <ActionIcon
            variant="subtle"
            onClick={() => setOpened(!opened)}
            size="lg"
          >
            {opened ? <IconChevronUp size={20} /> : <IconChevronDown size={20} />}
          </ActionIcon>
        </Group>

        <Collapse in={opened}>
          <Stack gap="md">
            <Text size="sm" c="dimmed">
              Generate multiple QR codes at once. Enter one text/URL per line (max 100).
            </Text>

            <Grid>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <Textarea
                  placeholder="https://example.com/page1&#10;https://example.com/page2&#10;Product Code: ABC123&#10;..."
                  value={batchText}
                  onChange={(e) => setBatchText(e.target.value)}
                  minRows={8}
                  maxRows={12}
                  disabled={isGenerating}
                />
                
                {linesCount > 0 && (
                  <Text size="xs" c="dimmed" mt="xs">
                    {linesCount} QR code{linesCount !== 1 ? 's' : ''} will be generated
                  </Text>
                )}
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }}>
                <Stack gap="md">
                  <NumberInput
                    label="QR Code Size"
                    description="Size in pixels"
                    value={batchSize}
                    onChange={setBatchSize}
                    min={128}
                    max={512}
                    step={32}
                    disabled={isGenerating}
                  />

                  <Select
                    label="Error Correction"
                    value={errorLevel}
                    onChange={setErrorLevel}
                    disabled={isGenerating}
                    data={[
                      { value: 'L', label: 'Low' },
                      { value: 'M', label: 'Medium' },
                      { value: 'Q', label: 'Quartile' },
                      { value: 'H', label: 'High' }
                    ]}
                  />

                  <Button
                    leftSection={<IconDownload size={18} />}
                    onClick={generateBatch}
                    disabled={linesCount === 0 || isGenerating}
                    loading={isGenerating}
                    size="md"
                    fullWidth
                  >
                    Generate & Download ZIP
                  </Button>
                </Stack>
              </Grid.Col>
            </Grid>

            {isGenerating && (
              <Box>
                <Text size="sm" mb="xs">
                  Generating QR codes... {Math.round(progress)}%
                </Text>
                <Progress value={progress} animated />
              </Box>
            )}
          </Stack>
        </Collapse>
      </Stack>
    </Paper>
  )
}

export default BatchGenerator

