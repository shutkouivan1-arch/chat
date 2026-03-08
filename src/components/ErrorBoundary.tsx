import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('App crash:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000',
          color: '#fff',
          fontFamily: 'monospace',
          padding: '2rem',
        }}>
          <div style={{ maxWidth: 420, textAlign: 'center' }}>
            <h1 style={{ fontSize: '1rem', marginBottom: '1rem' }}>v0id crashed</h1>
            <p style={{ fontSize: '0.75rem', color: '#888', wordBreak: 'break-word' }}>
              {this.state.error?.message || 'Unknown error'}
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: '1.5rem',
                padding: '0.5rem 1.5rem',
                background: '#fff',
                color: '#000',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontFamily: 'monospace',
                fontSize: '0.875rem',
              }}
            >
              reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
