import React from 'react';
import styles from './TimelineChart.module.css';

interface Milestone {
    id: string;
    name: string;
    start: number; // 0-100 percentage of Q1-Q4
    end: number;
    status: 'on-track' | 'risk' | 'delayed' | 'completed';
    owner: string;
}

const milestones: Milestone[] = [
    { id: '1', name: 'Cloud Migration', start: 0, end: 40, status: 'completed', owner: 'Infra' },
    { id: '2', name: 'Q2 Feature Pack', start: 30, end: 60, status: 'on-track', owner: 'Product' },
    { id: '3', name: 'Mobile Redesign', start: 50, end: 90, status: 'risk', owner: 'Design' },
    { id: '4', name: 'AI Integration', start: 70, end: 95, status: 'on-track', owner: 'AI Labs' },
];

export default function TimelineChart() {
    return (
        <div className={styles.container}>
            <div className={styles.gridBackground}>
                <div className={styles.quarter}>Q1</div>
                <div className={styles.quarter}>Q2</div>
                <div className={styles.quarter}>Q3</div>
                <div className={styles.quarter}>Q4</div>
            </div>

            <div className={styles.barsContainer}>
                {milestones.map((m) => (
                    <div key={m.id} className={styles.track}>
                        <div className={styles.trackLabel}>
                            <span className={styles.trackName}>{m.name}</span>
                            <span className={styles.trackOwner}>{m.owner}</span>
                        </div>
                        <div className={styles.trackLane}>
                            <div
                                className={`${styles.bar} ${styles[m.status]}`}
                                style={{
                                    left: `${m.start}%`,
                                    width: `${m.end - m.start}%`
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
