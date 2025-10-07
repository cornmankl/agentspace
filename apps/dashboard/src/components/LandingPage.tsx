import { useState } from 'react';

interface LandingPageProps {
  onEnterDashboard: () => void;
}

export function LandingPage({ onEnterDashboard }: LandingPageProps) {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: '🤖',
      title: 'Multi-Agent Coordination',
      description: 'Orchestrate multiple AI agents working together seamlessly',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      icon: '⚡',
      title: 'Smart Auto-Assignment',
      description: 'Tasks automatically assigned to agents with matching capabilities',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      icon: '🔄',
      title: 'Real-Time Updates',
      description: 'WebSocket-powered live updates for instant synchronization',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      icon: '🎯',
      title: 'Priority Queuing',
      description: 'Intelligent task prioritization with critical, high, medium, low levels',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
      icon: '📊',
      title: 'System Metrics',
      description: 'Comprehensive analytics and monitoring dashboard',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      icon: '🚀',
      title: 'Quick Actions',
      description: '17+ pre-built prompt templates for instant task creation',
      gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
    }
  ];

  const stats = [
    { value: '100%', label: 'Test Coverage' },
    { value: '<22ms', label: 'Avg Response' },
    { value: '31/31', label: 'Tests Passed' },
    { value: '17+', label: 'Smart Prompts' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Animated Background Blobs */}
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(102,126,234,0.3) 0%, transparent 70%)',
        borderRadius: '50%',
        top: '-250px',
        left: '-250px',
        filter: 'blur(60px)',
        animation: 'float 20s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(245,87,108,0.3) 0%, transparent 70%)',
        borderRadius: '50%',
        bottom: '-200px',
        right: '-200px',
        filter: 'blur(60px)',
        animation: 'float 15s ease-in-out infinite reverse'
      }} />

      {/* Navigation */}
      <nav style={{
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            fontSize: '32px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}>
            🤖
          </div>
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>AGENTSPACE</span>
        </div>
        <button
          onClick={onEnterDashboard}
          style={{
            padding: '12px 32px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '12px',
            color: 'white',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s',
            boxShadow: '0 4px 15px rgba(102,126,234,0.4)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(102,126,234,0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(102,126,234,0.4)';
          }}
        >
          Launch Dashboard →
        </button>
      </nav>

      {/* Hero Section */}
      <section style={{
        padding: '80px 40px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          fontSize: '14px',
          fontWeight: '600',
          letterSpacing: '2px',
          color: '#a0aec0',
          marginBottom: '20px',
          textTransform: 'uppercase'
        }}>
          Next-Generation AI Workspace
        </div>
        
        <h1 style={{
          fontSize: '72px',
          fontWeight: '900',
          margin: '0 0 30px 0',
          lineHeight: '1.1',
          background: 'linear-gradient(135deg, #ffffff 0%, #667eea 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-2px'
        }}>
          Build with
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Multiple AI Agents
          </span>
        </h1>

        <p style={{
          fontSize: '24px',
          color: '#a0aec0',
          maxWidth: '700px',
          margin: '0 auto 50px',
          lineHeight: '1.6'
        }}>
          Coordinate, manage, and scale AI agents with intelligent task distribution,
          real-time monitoring, and seamless automation.
        </p>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '60px' }}>
          <button
            onClick={onEnterDashboard}
            style={{
              padding: '18px 40px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '16px',
              color: 'white',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 8px 30px rgba(102,126,234,0.4)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(102,126,234,0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(102,126,234,0.4)';
            }}
          >
            Get Started Free →
          </button>
          <button
            style={{
              padding: '18px 40px',
              background: 'rgba(255,255,255,0.05)',
              border: '2px solid rgba(255,255,255,0.1)',
              borderRadius: '16px',
              color: 'white',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            }}
          >
            View Demo
          </button>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '30px',
          maxWidth: '900px',
          margin: '0 auto',
          padding: '40px',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)'
        }}>
          {stats.map((stat, idx) => (
            <div key={idx} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '36px',
                fontWeight: '900',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '8px'
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '14px', color: '#a0aec0', fontWeight: '500' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section style={{
        padding: '80px 40px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '48px',
            fontWeight: '800',
            margin: '0 0 20px 0',
            background: 'linear-gradient(135deg, #ffffff 0%, #667eea 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Powerful Features
          </h2>
          <p style={{ fontSize: '20px', color: '#a0aec0' }}>
            Everything you need to build with AI agents
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {features.map((feature, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredFeature(idx)}
              onMouseLeave={() => setHoveredFeature(null)}
              style={{
                padding: '40px',
                background: hoveredFeature === idx 
                  ? 'rgba(255,255,255,0.08)' 
                  : 'rgba(255,255,255,0.03)',
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px)',
                transition: 'all 0.3s',
                cursor: 'pointer',
                transform: hoveredFeature === idx ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow: hoveredFeature === idx 
                  ? '0 20px 60px rgba(0,0,0,0.3)' 
                  : '0 4px 20px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{
                fontSize: '48px',
                marginBottom: '20px',
                display: 'inline-block',
                background: feature.gradient,
                padding: '20px',
                borderRadius: '16px'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                margin: '0 0 12px 0',
                color: 'white'
              }}>
                {feature.title}
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#a0aec0',
                lineHeight: '1.6',
                margin: 0
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Code Preview Section */}
      <section style={{
        padding: '80px 40px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '48px',
            fontWeight: '800',
            margin: '0 0 20px 0',
            background: 'linear-gradient(135deg, #ffffff 0%, #667eea 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Simple, Yet Powerful
          </h2>
        </div>

        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          background: 'rgba(0,0,0,0.4)',
          borderRadius: '24px',
          padding: '40px',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)'
        }}>
          <pre style={{
            color: '#a0aec0',
            fontSize: '16px',
            lineHeight: '1.8',
            margin: 0,
            fontFamily: 'Monaco, Consolas, monospace'
          }}>
            <code>{`// Create an agent
const agent = await agentApi.create({
  name: "Data Analyst Pro",
  type: "analyst",
  capabilities: ["analysis", "reporting"]
});

// Create a task - auto-assigned!
const task = await taskApi.create({
  name: "Analyze Q4 Sales",
  priority: "high",
  input: { dataset: "sales.csv" }
});

// Real-time updates via WebSocket
ws.onmessage = (event) => {
  console.log("Task completed!", event.data);
};`}</code>
          </pre>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '80px 40px 120px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '60px',
          background: 'linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)',
          borderRadius: '32px',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)'
        }}>
          <h2 style={{
            fontSize: '48px',
            fontWeight: '800',
            margin: '0 0 20px 0',
            background: 'linear-gradient(135deg, #ffffff 0%, #667eea 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Ready to Get Started?
          </h2>
          <p style={{
            fontSize: '20px',
            color: '#a0aec0',
            marginBottom: '40px'
          }}>
            Start building with AI agents in minutes. No credit card required.
          </p>
          <button
            onClick={onEnterDashboard}
            style={{
              padding: '20px 50px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '16px',
              color: 'white',
              fontSize: '20px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 8px 30px rgba(102,126,234,0.4)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(102,126,234,0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(102,126,234,0.4)';
            }}
          >
            Launch Dashboard Now →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '40px',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ fontSize: '14px', color: '#718096' }}>
          © 2024 AGENTSPACE. Built with ❤️ for the AI community.
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -50px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
      `}</style>
    </div>
  );
}
