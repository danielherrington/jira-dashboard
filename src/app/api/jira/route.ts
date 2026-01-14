import { NextResponse } from 'next/server';
import { JiraClient } from '@/lib/jira';

export async function GET() {
    try {
        // In a real app, we would get these from env/config
        const client = new JiraClient('mock-key', 'mock-domain');
        const metrics = await client.getMetrics();

        return NextResponse.json(metrics);
    } catch (error) {
        console.error('Failed to fetch Jira metrics:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
