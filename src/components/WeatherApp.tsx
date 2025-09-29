import { useState } from 'react'
import { useSubscribeDev } from '@subscribe.dev/react'

interface WeatherForecast {
  location: string
  forecast: string
  timestamp: number
}

interface ErrorState {
  type?: string
  message: string
  retryAfter?: number
}

export default function WeatherApp() {
  const { client, user, usage, subscriptionStatus, subscribe, signOut } = useSubscribeDev()

  const [location, setLocation] = useState('')
  const [forecast, setForecast] = useState<WeatherForecast | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ErrorState | null>(null)

  const handleGetForecast = async () => {
    if (!client || !location.trim()) return

    setLoading(true)
    setError(null)

    try {
      const { output } = await client.run('openai/gpt-4o', {
        input: {
          messages: [
            {
              role: 'system',
              content: `You are a friendly and helpful weather forecasting assistant. Provide detailed, accurate weather forecasts based on the location provided. Include temperature, conditions, precipitation chances, wind, and any notable weather patterns. Make your response engaging and easy to understand. If the location is unclear, ask for clarification.`
            },
            {
              role: 'user',
              content: `What's the weather forecast for ${location}? Please provide a detailed forecast including current conditions and the next few days.`
            }
          ]
        }
      })

      setForecast({
        location,
        forecast: output[0] as string,
        timestamp: Date.now()
      })
    } catch (err: any) {
      setError({
        type: err.type,
        message: err.message || 'Failed to get weather forecast. Please try again.',
        retryAfter: err.retryAfter
      })
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      handleGetForecast()
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.mainCard}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.logoSection}>
              <svg
                style={styles.logoIcon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                />
              </svg>
              <h1 style={styles.headerTitle}>AI Weather Forecast</h1>
            </div>
            <button onClick={signOut} style={styles.signOutButton}>
              Sign Out
            </button>
          </div>

          {/* User Info Bar */}
          <div style={styles.infoBar}>
            <div style={styles.userInfo}>
              <span style={styles.infoLabel}>User:</span>
              <span style={styles.infoValue}>{user?.email}</span>
            </div>
            <div style={styles.divider}></div>
            <div style={styles.userInfo}>
              <span style={styles.infoLabel}>Credits:</span>
              <span style={styles.infoValue}>{usage?.remainingCredits ?? 0}</span>
            </div>
            <div style={styles.divider}></div>
            <div style={styles.userInfo}>
              <span style={styles.infoLabel}>Plan:</span>
              <span style={styles.infoValue}>{subscriptionStatus?.plan?.name ?? 'Free'}</span>
            </div>
            {subscribe && (
              <>
                <div style={styles.divider}></div>
                <button onClick={subscribe} style={styles.managePlanButton}>
                  Manage Plan
                </button>
              </>
            )}
          </div>
        </div>

        {/* Search Section */}
        <div style={styles.searchSection}>
          <div style={styles.searchContainer}>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter city name (e.g., New York, London, Tokyo)"
              style={styles.input}
              disabled={loading}
            />
            <button
              onClick={handleGetForecast}
              disabled={loading || !location.trim()}
              style={styles.searchButton}
            >
              {loading ? 'Getting Forecast...' : 'Get Forecast'}
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div style={styles.errorContainer}>
            <div style={styles.errorIcon}>⚠️</div>
            <div style={styles.errorContent}>
              <h3 style={styles.errorTitle}>
                {error.type === 'insufficient_credits' && 'Insufficient Credits'}
                {error.type === 'rate_limit_exceeded' && 'Rate Limit Exceeded'}
                {!error.type && 'Error'}
              </h3>
              <p style={styles.errorMessage}>{error.message}</p>
              {error.type === 'insufficient_credits' && subscribe && (
                <button onClick={subscribe} style={styles.upgradeButton}>
                  Upgrade Plan
                </button>
              )}
              {error.type === 'rate_limit_exceeded' && error.retryAfter && (
                <p style={styles.retryMessage}>
                  Please retry in {Math.ceil(error.retryAfter / 1000)} seconds
                </p>
              )}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>Analyzing weather patterns with AI...</p>
          </div>
        )}

        {/* Forecast Display */}
        {forecast && !loading && (
          <div style={styles.forecastContainer}>
            <div style={styles.forecastHeader}>
              <h2 style={styles.forecastLocation}>{forecast.location}</h2>
              <p style={styles.forecastTimestamp}>
                Generated: {new Date(forecast.timestamp).toLocaleString()}
              </p>
            </div>
            <div style={styles.forecastContent}>
              {forecast.forecast.split('\n').map((line, index) => (
                line.trim() && <p key={index} style={styles.forecastLine}>{line}</p>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!forecast && !loading && !error && (
          <div style={styles.emptyState}>
            <svg
              style={styles.emptyStateIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p style={styles.emptyStateText}>
              Enter a location above to get your AI-powered weather forecast
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    minHeight: '100vh',
    width: '100%',
    padding: '2rem 1rem',
  },
  mainCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    maxWidth: '900px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',
  },
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '2rem',
    color: 'white',
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  logoIcon: {
    width: '48px',
    height: '48px',
  },
  headerTitle: {
    fontSize: '1.875rem',
    fontWeight: '700',
    margin: 0,
  },
  signOutButton: {
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    color: 'white',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
  },
  infoBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    padding: '1rem',
    borderRadius: '12px',
  },
  userInfo: {
    display: 'flex',
    gap: '0.5rem',
  },
  infoLabel: {
    opacity: 0.9,
    fontSize: '0.875rem',
  },
  infoValue: {
    fontWeight: '600',
    fontSize: '0.875rem',
  },
  divider: {
    width: '1px',
    height: '20px',
    background: 'rgba(255, 255, 255, 0.3)',
  },
  managePlanButton: {
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    color: 'white',
    padding: '0.375rem 1rem',
    fontSize: '0.875rem',
  },
  searchSection: {
    padding: '2rem',
  },
  searchContainer: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  input: {
    flex: 1,
    minWidth: '250px',
  },
  searchButton: {
    whiteSpace: 'nowrap',
  },
  errorContainer: {
    margin: '0 2rem 2rem',
    padding: '1.5rem',
    background: '#fee2e2',
    border: '2px solid #ef4444',
    borderRadius: '12px',
    display: 'flex',
    gap: '1rem',
  },
  errorIcon: {
    fontSize: '2rem',
  },
  errorContent: {
    flex: 1,
  },
  errorTitle: {
    color: '#991b1b',
    fontSize: '1.125rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
  },
  errorMessage: {
    color: '#7f1d1d',
    marginBottom: '0.75rem',
  },
  upgradeButton: {
    background: '#ef4444',
    fontSize: '0.875rem',
  },
  retryMessage: {
    color: '#7f1d1d',
    fontSize: '0.875rem',
    fontStyle: 'italic',
  },
  loadingContainer: {
    padding: '3rem 2rem',
    textAlign: 'center',
  },
  spinner: {
    width: '48px',
    height: '48px',
    border: '4px solid rgba(59, 130, 246, 0.2)',
    borderTopColor: '#3b82f6',
    borderRadius: '50%',
    margin: '0 auto 1rem',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    color: '#64748b',
    fontSize: '1rem',
  },
  forecastContainer: {
    margin: '0 2rem 2rem',
    padding: '1.5rem',
    background: 'rgba(59, 130, 246, 0.05)',
    borderRadius: '12px',
    border: '2px solid rgba(59, 130, 246, 0.2)',
  },
  forecastHeader: {
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
  },
  forecastLocation: {
    color: '#1e293b',
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '0.25rem',
  },
  forecastTimestamp: {
    color: '#64748b',
    fontSize: '0.875rem',
  },
  forecastContent: {
    color: '#334155',
  },
  forecastLine: {
    marginBottom: '0.75rem',
    lineHeight: '1.6',
  },
  emptyState: {
    padding: '3rem 2rem',
    textAlign: 'center',
  },
  emptyStateIcon: {
    width: '80px',
    height: '80px',
    color: '#cbd5e1',
    margin: '0 auto 1rem',
  },
  emptyStateText: {
    color: '#94a3b8',
    fontSize: '1.125rem',
  },
}