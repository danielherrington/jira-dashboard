import { DashboardLayout } from '../components/DashboardLayout';
import { MetricCard } from '../components/MetricCard';
import TimelineChart from '../components/charts/TimelineChart';
import HealthRadar from '../components/charts/HealthRadar';

export default function Home() {
  return (
    <DashboardLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <header style={{ marginBottom: '1rem' }}>
          <h1 className="text-gradient" style={{ fontSize: '2.5rem', fontWeight: 800 }}>Executive Overview</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Welcome back, Chief.</p>
        </header>

        {/* Top Level Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          <MetricCard
            title="Roadmap Progress"
            value="68%"
            trend={{ value: "+12% vs last month", direction: 'up' }}
          />
          <MetricCard
            title="Engineering Health"
            value="98.2"
            trend={{ value: "Stable", direction: 'neutral' }}
          />
          <MetricCard
            title="Open Compliance Issues"
            value="3"
            trend={{ value: "-2 from yesterday", direction: 'down' }}
          />
          <MetricCard
            title="Active Sprints"
            value="12"
            trend={{ value: "All on track", direction: 'up' }}
          />
        </div>

        {/* Strategic Timeline */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Strategic Roadmap</h2>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-accent)' }}>Q1 - Q4 2026</div>
          </div>
          <TimelineChart />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
          {/* Engineering Radar */}
          <div className="glass-panel" style={{ padding: '2rem', minHeight: '400px' }}>
            <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 600 }}>Engineering Velocity</h2>
            <div style={{ width: '100%', height: '300px' }}>
              <HealthRadar />
            </div>
          </div>

          {/* Rovo Insights */}
          <div className="glass-panel" style={{ padding: '2rem', minHeight: '400px' }}>
            <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 600 }}>Rovo Insights & Q&A</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
              <div style={{ flex: 1, background: 'rgba(0,0,0,0.1)', borderRadius: '8px', padding: '1rem', overflowY: 'auto' }}>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '8px', marginBottom: '0.5rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-accent)', marginBottom: '0.25rem' }}>Rovo • Just now</div>
                  Dependencies for "Mobile Redesign" and "Compliance" are tightening. Suggest review of design specs.
                </div>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Ask Rovo about project risks..."
                  style={{
                    width: '100%',
                    padding: '1rem',
                    paddingRight: '3rem',
                    borderRadius: '8px',
                    border: '1px solid var(--card-border)',
                    background: 'rgba(0,0,0,0.2)',
                    color: 'white',
                    outline: 'none',
                    fontSize: '0.875rem'
                  }}
                />
                <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>↵</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
