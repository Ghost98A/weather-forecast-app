import { useSubscribeDev } from '@subscribe.dev/react'

export default function SignInScreen() {
  const { signIn } = useSubscribeDev()

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.iconContainer}>
          <svg
            style={styles.icon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
            />
          </svg>
        </div>
        <h1 style={styles.title}>AI Weather Forecast</h1>
        <p style={styles.description}>
          Get personalized weather forecasts powered by AI. Sign in to access unlimited weather predictions and insights.
        </p>
        <button onClick={signIn} style={styles.button}>
          Sign In to Continue
        </button>
      </div>
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    width: '100%',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    padding: '3rem 2rem',
    maxWidth: '450px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1.5rem',
  },
  icon: {
    width: '80px',
    height: '80px',
    color: '#3b82f6',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '1rem',
  },
  description: {
    fontSize: '1.125rem',
    color: '#64748b',
    marginBottom: '2rem',
    lineHeight: '1.6',
  },
  button: {
    width: '100%',
    fontSize: '1.125rem',
    padding: '1rem',
  },
}