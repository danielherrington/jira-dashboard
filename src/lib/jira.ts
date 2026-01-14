export interface JiraMetrics {
    roadmapProgress: number;
    engineeringHealth: number;
    complianceIssues: number;
    activeSprints: number;
}

export class JiraClient {
    private apiKey: string;
    private domain: string;
    private email: string;

    constructor(apiKey?: string, domain?: string, email?: string) {
        this.apiKey = apiKey || process.env.JIRA_API_KEY || '';
        this.domain = domain || process.env.JIRA_DOMAIN || '';
        this.email = email || process.env.JIRA_EMAIL || '';
    }

    private getHeaders() {
        const auth = Buffer.from(`${this.email}:${this.apiKey}`).toString('base64');
        return {
            'Authorization': `Basic ${auth}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
    }

    async fetchRoadmap(): Promise<any[]> {
        if (!this.apiKey || !this.domain) {
            console.warn('Jira credentials missing, using mock roadmap.');
            return this.getMockRoadmap();
        }

        try {
            // Portfolio View: Fetch Initiatives/Epics from top active projects
            const activeProjects = 'ADIG, AI, CI, COPRO, CORE';
            const jql = `project in (${activeProjects}) AND issuetype in (Initiative, Epic) AND statusCategory != Done ORDER BY rank ASC`;

            const body = {
                jql,
                maxResults: 20, // Fetch more items for portfolio view
                fields: ['summary', 'status', 'duedate', 'customfield_10000', 'project']
            };

            const res = await fetch(`https://${this.domain}/rest/api/3/search/jql`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                const text = await res.text();
                console.error(`Jira API Error: ${res.status} - ${text}`);
                return this.getMockRoadmap();
            }

            const data = await res.json();
            return data.issues.map((issue: any) => ({
                id: issue.key,
                name: issue.fields.summary,
                status: issue.fields.status.name,
                // Fallback: Use now and now+3 months if timestamps missing
                start: issue.fields.customfield_10000 || new Date().toISOString().split('T')[0],
                end: issue.fields.duedate || new Date(Date.now() + 7776000000).toISOString().split('T')[0],
                owner: issue.fields.project.name // Map Project Name to Owner for visualization
            }));
        } catch (error) {
            console.error('Fetch roadmap failed:', error);
            return this.getMockRoadmap();
        }
    }

    async getMetrics(): Promise<JiraMetrics> {
        // TODO: Implement real metrics fetching later
        return {
            roadmapProgress: 68,
            engineeringHealth: 98.2,
            complianceIssues: 3,
            activeSprints: 12
        };
    }

    private getMockRoadmap() {
        return [
            { id: 'MOCK-1', name: 'Q1 Financial Review', start: '2026-01-01', end: '2026-03-31', status: 'In Progress' },
            { id: 'MOCK-2', name: 'Cloud Migration', start: '2026-02-15', end: '2026-06-30', status: 'Planning' },
            { id: 'MOCK-3', name: 'AI Customer Support', start: '2026-04-01', end: '2026-09-30', status: 'Backlog' },
        ];
    }
}
