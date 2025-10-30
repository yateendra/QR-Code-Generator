import { useState } from 'react'
import {
  Paper,
  Stack,
  Group,
  Text,
  Button,
  Card,
  Badge,
  Grid,
  ActionIcon,
  Collapse,
  Box,
  ScrollArea
} from '@mantine/core'
import {
  IconHistory,
  IconTrash,
  IconChevronDown,
  IconChevronUp,
  IconClock
} from '@tabler/icons-react'
import { QRCodeSVG } from 'qrcode.react'

function History({ history, onClear, onLoad }) {
  const [opened, setOpened] = useState(false)

  const formatDate = (isoString) => {
    const date = new Date(isoString)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleLoadItem = (item) => {
    onLoad(item)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Paper shadow="sm" p="xl" radius="md" withBorder>
      <Stack gap="md">
        <Group justify="space-between">
          <Group>
            <IconHistory size={24} />
            <Text size="xl" fw={700}>
              History
            </Text>
            <Badge size="lg">{history.length}</Badge>
          </Group>
          <Group>
            {history.length > 0 && (
              <Button
                variant="light"
                color="red"
                leftSection={<IconTrash size={16} />}
                onClick={onClear}
                size="sm"
              >
                Clear All
              </Button>
            )}
            <ActionIcon
              variant="subtle"
              onClick={() => setOpened(!opened)}
              size="lg"
            >
              {opened ? <IconChevronUp size={20} /> : <IconChevronDown size={20} />}
            </ActionIcon>
          </Group>
        </Group>

        <Collapse in={opened}>
          {history.length === 0 ? (
            <Card withBorder padding="xl">
              <Stack align="center" gap="xs">
                <IconClock size={48} color="gray" />
                <Text c="dimmed">No history yet</Text>
                <Text size="sm" c="dimmed">
                  Generated QR codes will appear here
                </Text>
              </Stack>
            </Card>
          ) : (
            <ScrollArea h={400}>
              <Grid>
                {history.map((item) => (
                  <Grid.Col key={item.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                    <Card 
                      shadow="xs" 
                      padding="md" 
                      radius="md" 
                      withBorder
                      style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      onClick={() => handleLoadItem(item)}
                    >
                      <Stack gap="xs">
                        <Box
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '8px',
                            backgroundColor: item.bgColor || '#ffffff',
                            borderRadius: '8px'
                          }}
                        >
                          <QRCodeSVG
                            value={item.text}
                            size={120}
                            bgColor={item.bgColor}
                            fgColor={item.fgColor}
                            level={item.errorLevel}
                            includeMargin={true}
                          />
                        </Box>
                        
                        <Text size="xs" lineClamp={2} fw={500}>
                          {item.text}
                        </Text>
                        
                        <Group justify="space-between">
                          <Badge size="xs" variant="light">
                            {item.size}px
                          </Badge>
                          <Text size="xs" c="dimmed">
                            {formatDate(item.timestamp)}
                          </Text>
                        </Group>
                      </Stack>
                    </Card>
                  </Grid.Col>
                ))}
              </Grid>
            </ScrollArea>
          )}
        </Collapse>
      </Stack>
    </Paper>
  )
}

export default History


