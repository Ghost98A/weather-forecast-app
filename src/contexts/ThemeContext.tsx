import { createContext, useContext, ReactNode, useEffect, useState } from 'react'
import { useSubscribeDev } from '@subscribe.dev/react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

// Component for authenticated users with storage
function AuthenticatedThemeProvider({ children }: { children: ReactNode }) {
  const { useStorage } = useSubscribeDev()
  const [theme, setTheme] = useStorage<Theme>('theme-preference', 'light')

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Component for unauthenticated users (system preference only)
function UnauthenticatedThemeProvider({ children }: { children: ReactNode }) {
  const getSystemTheme = (): Theme => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  }

  const [theme, setTheme] = useState<Theme>(getSystemTheme)

  const toggleTheme = () => {
    setTheme((prev) => prev === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Main provider that delegates to the appropriate implementation
export function ThemeProvider({ children }: { children: ReactNode }) {
  const { isSignedIn } = useSubscribeDev()

  return isSignedIn ? (
    <AuthenticatedThemeProvider>{children}</AuthenticatedThemeProvider>
  ) : (
    <UnauthenticatedThemeProvider>{children}</UnauthenticatedThemeProvider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}