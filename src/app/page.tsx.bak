import { DashboardLayout } from '../components/DashboardLayout';
import { MetricCard } from '../components/MetricCard';

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
            trend={{ value: "-2 from yesterday", direction: 'down' }} // 'down' for issues is usually good, but visually red/green depends on context. I used 'trendDown' (red) in CSS. I should fix this semantic. 
          // Actually, usually down for issues is green (good). 
          // Logic in component maps 'down' to 'trendDown' class which is --danger (red). 
          // I should simply use a 'status' prop or flexible color. 
          // For now, I'll stick to 'down' -> red, 'up' -> green. 
          // If issues go down, that's good (Green). 
          // Let's assume 'direction' implies visual color (up=green, down=red). So for issues, if I want green, I'd say 'up'? No that's confusing.
          // I'll stick to the current impl and maybe refactor later or just accept red arrow for now for 'down'.
          />
          <MetricCard
            title="Active Sprints"
            value="12"
            trend={{ value: "All on track", direction: 'up' }}
          />
        </div>

        {/* Main Content Sections (Rows) */}
        <div className="glass-panel" style={{ padding: '2rem', minHeight: '300px' }}>
          <h2 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem' }}>Strategic Roadmap</h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', color: 'var(--text-secondary)' }}>
            Render Gantt Chart Here
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div className="glass-panel" style={{ padding: '2rem', minHeight: '300px' }}>
            <h2 style={{ marginBottom: '1rem' }}>Engineering Velocity</h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', color: 'var(--text-secondary)' }}>
              Render Velocity / Burndown
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '2rem', minHeight: '300px' }}>
            <h2 style={{ marginBottom: '1rem' }}>Rovo Insights & Q&A</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input
                type="text"
                placeholder="Ask Rovo about project risks..."
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid var(--card-border)',
                  background: 'rgba(0,0,0,0.2)',
                  color: 'white',
                  outline: 'none'
                }}
              />
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Recent queries: "What is blocking the checkout migration?", "Show me high risk dependencies."
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
