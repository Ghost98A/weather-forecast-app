import { useSubscribeDev } from '@subscribe.dev/react'
import './App.css'
import SignInScreen from './components/SignInScreen'
import WeatherApp from './components/WeatherApp'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  const { isSignedIn } = useSubscribeDev()

  return (
    <ThemeProvider>
      {isSignedIn ? <WeatherApp /> : <SignInScreen />}
    </ThemeProvider>
  )
}

export default App
