import { ActionIcon } from '@mantine/core'
import { IconSun, IconMoon } from '@tabler/icons-react'

function ThemeToggle({ colorScheme, toggleColorScheme }) {
  return (
    <ActionIcon
      onClick={toggleColorScheme}
      size="xl"
      variant="default"
      aria-label="Toggle color scheme"
    >
      {colorScheme === 'dark' ? (
        <IconSun size={20} />
      ) : (
        <IconMoon size={20} />
      )}
    </ActionIcon>
  )
}

export default ThemeToggle

