import { useSubscribeDev } from '@subscribe.dev/react'
import './App.css'
import SignInScreen from './components/SignInScreen'
import WeatherApp from './components/WeatherApp'

function App() {
  const { isSignedIn } = useSubscribeDev()

  return isSignedIn ? <WeatherApp /> : <SignInScreen />
}

export default App
