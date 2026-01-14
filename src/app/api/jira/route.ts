import { NextResponse } from 'next/server';
import { JiraClient } from '@/lib/jira';

export async function GET() {
    try {
        const client = new JiraClient();
        const metrics = await client.getMetrics();
        const roadmap = await client.fetchRoadmap();

        return NextResponse.json({ metrics, roadmap });
    } catch (error) {
        console.error('Failed to fetch Jira metrics:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
