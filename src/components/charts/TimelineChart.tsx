import React from 'react';
import styles from './TimelineChart.module.css';

interface Milestone {
    id: string;
    name: string;
    start: number | string; // Allow raw date string or calculated number
    end: number | string;
    status: string;
    owner?: string;
}

interface TimelineChartProps {
    items?: Milestone[];
}

export default function TimelineChart({ items = [] }: TimelineChartProps) {
    const [selectedProject, setSelectedProject] = React.useState<string | null>(null);

    // Process items to calculate start/end percentages relative to "Now" or a fixed Quarter window
    // For simplicity V1: We will map raw dates to a 0-100 scale representing Q1-Q4 2026.
    // Q1 Start: 2026-01-01, Q4 End: 2026-12-31.
    const START_DATE = new Date('2026-01-01').getTime();
    const END_DATE = new Date('2026-12-31').getTime();
    const TOTAL_DURATION = END_DATE - START_DATE;

    const processedItems = items
        .map(item => {
            const start = typeof item.start === 'string' ? new Date(item.start).getTime() : item.start;
            const end = typeof item.end === 'string' ? new Date(item.end).getTime() : item.end;

            let startPct = 0;
            let endPct = 0;

            if (typeof start === 'number' && start < 100) {
                // Already percentage
                startPct = start;
                endPct = typeof end === 'number' ? end : start + 10;
            } else {
                // Calculate percentage from dates
                startPct = Math.max(0, Math.min(100, ((Number(start) - START_DATE) / TOTAL_DURATION) * 100));
                endPct = Math.max(0, Math.min(100, ((Number(end) - START_DATE) / TOTAL_DURATION) * 100));
            }

            return { ...item, startPct, endPct, owner: item.owner || 'Team' };
        })
        .filter(item => selectedProject ? item.owner === selectedProject : true);

    // Grouping colors by project (simple hash or map)
    const projectColors: Record<string, string> = {
        'AI Initiatives': 'var(--accent-purple)',
        'Agency - Digital': 'var(--accent-blue)',
        'CORE': 'var(--accent-emerald)',
        'COPRO': 'var(--accent-orange)',
        'Cloud Infrastructure': 'var(--accent-cyan)'
    };

    // Get unique owners for filter
    const owners = Array.from(new Set(items.map(i => i.owner || 'Team')));

    return (
        <div className={styles.container}>
            <div className={styles.gridBackground}>
                <div className={styles.quarter}>Q1</div>
                <div className={styles.quarter}>Q2</div>
                <div className={styles.quarter}>Q3</div>
                <div className={styles.quarter}>Q4</div>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <button
                    onClick={() => setSelectedProject(null)}
                    style={{
                        padding: '4px 8px',
                        borderRadius: '12px',
                        border: '1px solid var(--card-border)',
                        background: selectedProject === null ? 'var(--text-primary)' : 'transparent',
                        color: selectedProject === null ? 'var(--background)' : 'var(--text-secondary)',
                        fontSize: '0.75rem',
                        cursor: 'pointer'
                    }}
                >
                    All
                </button>
                {owners.map(owner => (
                    <button
                        key={owner}
                        onClick={() => setSelectedProject(owner === selectedProject ? null : owner)}
                        style={{
                            padding: '4px 8px',
                            borderRadius: '12px',
                            border: `1px solid ${projectColors[owner] || 'var(--card-border)'}`,
                            background: selectedProject === owner ? projectColors[owner] : 'transparent',
                            color: selectedProject === owner ? '#000' : 'var(--text-secondary)',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            opacity: selectedProject && selectedProject !== owner ? 0.5 : 1
                        }}
                    >
                        {owner}
                    </button>
                ))}
            </div>

            <div className={styles.barsContainer}>
                {processedItems.map((m) => (
                    <div key={m.id} className={styles.track}>
                        <div className={styles.trackLabel}>
                            <span className={styles.trackName} title={m.name}>{m.name}</span>
                            <span
                                className={styles.trackOwner}
                                style={{
                                    color: projectColors[m.owner || ''] || 'var(--text-secondary)',
                                    borderColor: projectColors[m.owner || ''] || 'var(--card-border)'
                                }}
                            >
                                {m.owner}
                            </span>
                        </div>
                        <div className={styles.trackLane}>
                            <div
                                className={`${styles.bar} ${styles[m.status.toLowerCase().replace(' ', '-')] || styles.generic}`}
                                style={{
                                    left: `${m.startPct}%`,
                                    width: `${Math.max(1, m.endPct - m.startPct)}%`
                                }}
                            >
                                <div className={styles.pulse}></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
