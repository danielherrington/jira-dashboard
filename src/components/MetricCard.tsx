import React from 'react';
import styles from './MetricCard.module.css';

interface MetricCardProps {
    title: string;
    value: string | number;
    trend?: {
        value: string;
        direction: 'up' | 'down' | 'neutral';
    };
    icon?: React.ReactNode;
    className?: string;
}

export function MetricCard({ title, value, trend, icon, className }: MetricCardProps) {
    return (
        <div className={`glass-panel ${styles.card} ${className || ''}`}>
            <div className={styles.header}>
                <span className={styles.title}>{title}</span>
                {icon && <span className={styles.icon}>{icon}</span>}
            </div>
            <div className={styles.value}>{value}</div>
            {trend && (
                <div className={`${styles.trend} ${trend.direction === 'up' ? styles.trendUp :
                        trend.direction === 'down' ? styles.trendDown : styles.trendNeutral
                    }`}>
                    <span>{trend.direction === 'up' ? '↗' : trend.direction === 'down' ? '↘' : '→'}</span>
                    <span>{trend.value}</span>
                </div>
            )}
        </div>
    );
}
