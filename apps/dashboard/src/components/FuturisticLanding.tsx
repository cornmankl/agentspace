import { useState } from 'react';

interface FuturisticLandingProps {
  onEnterDashboard: () => void;
}

export function FuturisticLanding({ onEnterDashboard }: FuturisticLandingProps) {
  const [inputValue, setInputValue] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleStartBuilding = () => {
    if (inputValue.trim()) {
      // Could pass the input value to dashboard
      console.log('Building:', inputValue);
    }
    onEnterDashboard();
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0f',
      color: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Cinematic Gradient Horizon Background */}
      <div style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '140%',
        height: '80%',
        background: 'radial-gradient(ellipse at center, rgba(88, 28, 135, 0.4) 0%, rgba(29, 78, 216, 0.3) 25%, rgba(15, 23, 42, 0.1) 50%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        opacity: 0.8,
        animation: 'pulse 8s ease-in-out infinite'
      }} />

      {/* Additional Glow Effects */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '20%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float 12s ease-in-out infinite'
      }} />
      
      <div style={{
        position: 'absolute',
        top: '50%',
        right: '15%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(70px)',
        animation: 'float 15s ease-in-out infinite reverse'
      }} />

      {/* Navigation Bar */}
      <nav style={{
        position: 'relative',
        zIndex: 100,
        padding: '20px 60px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        background: 'rgba(10, 10, 15, 0.8)'
      }}>
        {/* Logo */}
        <div style={{
          fontSize: '22px',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.5px'
        }}>
          AGENTSPACE
        </div>

        {/* Nav Links */}
        <div style={{
          display: 'flex',
          gap: '32px',
          alignItems: 'center'
        }}>
          {['Community', 'Enterprise', 'Resources', 'Careers', 'Pricing'].map((link) => (
            <a
              key={link}
              href="#"
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.3s',
                letterSpacing: '0.3px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
              }}
            >
              {link}
            </a>
          ))}
          
          <button
            onClick={onEnterDashboard}
            style={{
              padding: '10px 24px',
              background: 'rgba(139, 92, 246, 0.15)',
              border: '1px solid rgba(139, 92, 246, 0.5)',
              borderRadius: '8px',
              color: '#a78bfa',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(139, 92, 246, 0.25)';
              e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.8)';
              e.currentTarget.style.color = '#c4b5fd';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(139, 92, 246, 0.15)';
              e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)';
              e.currentTarget.style.color = '#a78bfa';
            }}
          >
            Dashboard
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 200px)',
        padding: '80px 40px'
      }}>
        {/* Main Headline */}
        <h1 style={{
          fontSize: '72px',
          fontWeight: '700',
          margin: '0 0 60px 0',
          textAlign: 'center',
          letterSpacing: '-2px',
          lineHeight: '1.1',
          background: 'linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.7) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          What should we build today?
        </h1>

        {/* Central Chat Input Box */}
        <div style={{
          width: '100%',
          maxWidth: '800px',
          position: 'relative',
          marginBottom: '40px'
        }}>
          {/* Glow Effect on Focus */}
          {isInputFocused && (
            <div style={{
              position: 'absolute',
              inset: '-2px',
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.5), rgba(59, 130, 246, 0.5))',
              borderRadius: '16px',
              filter: 'blur(20px)',
              opacity: 0.6,
              animation: 'pulse 2s ease-in-out infinite'
            }} />
          )}
          
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 8px 8px 24px',
            background: 'rgba(20, 20, 30, 0.8)',
            border: isInputFocused 
              ? '1px solid rgba(139, 92, 246, 0.6)' 
              : '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            backdropFilter: 'blur(20px)',
            boxShadow: isInputFocused
              ? '0 8px 32px rgba(139, 92, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
              : '0 4px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
            transition: 'all 0.3s'
          }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleStartBuilding();
                }
              }}
              placeholder="Describe what you want to build..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#ffffff',
                fontSize: '18px',
                fontWeight: '400',
                padding: '16px 0',
                letterSpacing: '0.3px'
              }}
            />

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handleStartBuilding}
                style={{
                  padding: '14px 32px',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#ffffff',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 16px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  letterSpacing: '0.5px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(139, 92, 246, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                }}
              >
                Plan
              </button>

              <button
                style={{
                  width: '48px',
                  height: '48px',
                  background: 'rgba(139, 92, 246, 0.15)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '12px',
                  color: '#a78bfa',
                  fontSize: '24px',
                  fontWeight: '400',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(139, 92, 246, 0.25)';
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.6)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(139, 92, 246, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Subtext */}
        <p style={{
          fontSize: '16px',
          color: 'rgba(255, 255, 255, 0.5)',
          textAlign: 'center',
          maxWidth: '600px',
          lineHeight: '1.6',
          letterSpacing: '0.3px'
        }}>
          Powered by advanced AI agents. Start describing your project and watch it come to life.
        </p>
      </main>

      {/* Footer */}
      <footer style={{
        position: 'relative',
        zIndex: 10,
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        padding: '40px 60px',
        background: 'rgba(10, 10, 15, 0.6)',
        backdropFilter: 'blur(20px)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Column 1 */}
          <div>
            <h3 style={{
              fontSize: '12px',
              fontWeight: '600',
              color: 'rgba(255, 255, 255, 0.5)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '16px'
            }}>
              Product
            </h3>
            {['Support', 'Gallery', 'Pricing', 'Enterprise'].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  display: 'block',
                  color: 'rgba(255, 255, 255, 0.6)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  marginBottom: '12px',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Column 2 */}
          <div>
            <h3 style={{
              fontSize: '12px',
              fontWeight: '600',
              color: 'rgba(255, 255, 255, 0.5)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '16px'
            }}>
              Company
            </h3>
            {['Blog', 'Careers', 'Community', 'Resources'].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  display: 'block',
                  color: 'rgba(255, 255, 255, 0.6)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  marginBottom: '12px',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Column 3 */}
          <div>
            <h3 style={{
              fontSize: '12px',
              fontWeight: '600',
              color: 'rgba(255, 255, 255, 0.5)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '16px'
            }}>
              Legal
            </h3>
            {['Privacy', 'Terms', 'Security', 'Cookies'].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  display: 'block',
                  color: 'rgba(255, 255, 255, 0.6)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  marginBottom: '12px',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Column 4 - Social */}
          <div>
            <h3 style={{
              fontSize: '12px',
              fontWeight: '600',
              color: 'rgba(255, 255, 255, 0.5)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '16px'
            }}>
              Social
            </h3>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {['Discord', 'LinkedIn', 'YouTube', 'X', 'Instagram', 'Reddit'].map((social) => (
                <a
                  key={social}
                  href="#"
                  style={{
                    padding: '8px 16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    textDecoration: 'none',
                    fontSize: '12px',
                    fontWeight: '500',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(139, 92, 246, 0.15)';
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                    e.currentTarget.style.color = '#a78bfa';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
                  }}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            fontSize: '13px',
            color: 'rgba(255, 255, 255, 0.4)',
            letterSpacing: '0.3px'
          }}>
            © 2024 AGENTSPACE. All rights reserved.
          </div>
          <div style={{
            fontSize: '13px',
            color: 'rgba(255, 255, 255, 0.4)',
            letterSpacing: '0.3px'
          }}>
            Powered by GLM-4.6 AI
          </div>
        </div>
      </footer>

      {/* Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.9; }
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(30px, -30px); }
          66% { transform: translate(-20px, 20px); }
        }

        ::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }

        input:focus::placeholder {
          color: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
