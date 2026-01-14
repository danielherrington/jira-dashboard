import React from 'react';
import styles from './DashboardLayout.module.css';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <div className={styles.logo}>Orbit Dashboard</div>
                <nav className={styles.nav}>
                    <div className={`${styles.navItem} ${styles.navItemActive}`}>Overview</div>
                    <div className={styles.navItem}>Roadmap</div>
                    <div className={styles.navItem}>Engineering Health</div>
                    <div className={styles.navItem}>Compliance</div>
                    <div className={styles.navItem}>Settings</div>
                </nav>
            </aside>
            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
}
