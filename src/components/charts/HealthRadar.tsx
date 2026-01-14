'use client';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip
} from 'recharts';

const data = [
    { subject: 'Velocity', A: 90, fullMark: 100 },
    { subject: 'Quality', A: 85, fullMark: 100 },
    { subject: 'Morale', A: 70, fullMark: 100 },
    { subject: 'Tech Debt', A: 60, fullMark: 100 },
    { subject: 'Innovation', A: 80, fullMark: 100 },
    { subject: 'Compliance', A: 95, fullMark: 100 },
];

export default function HealthRadar() {
    return (
        <div style={{ width: '100%', height: '100%', minHeight: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                        name="Engineering Health"
                        dataKey="A"
                        stroke="#6366f1"
                        strokeWidth={3}
                        fill="#6366f1"
                        fillOpacity={0.3}
                    />
                    <Tooltip
                        contentStyle={{ borderRadius: '12px', border: 'none', background: '#1e293b', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        itemStyle={{ color: '#fff' }}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
