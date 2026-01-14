import 'dotenv/config';

async function main() {
    // robustly trim env vars
    const domain = (process.env.JIRA_DOMAIN || '').trim();
    const apiKey = (process.env.JIRA_API_KEY || '').trim();
    const email = (process.env.JIRA_EMAIL || 'me@example.com').trim();

    if (!domain || !apiKey) {
        console.error('Missing JIRA_DOMAIN or JIRA_API_KEY env vars.');
        process.exit(1);
    }

    // Debug Log (Masked)
    console.log(`Debug: Domain=[${domain}] Email=[${email}] API_KEY_LEN=[${apiKey.length}]`);
    if (apiKey.length > 8) {
        console.log(`Debug: Key Starts With: ${apiKey.substring(0, 4)}... Ends With: ...${apiKey.substring(apiKey.length - 4)}`);
    }

    const auth = Buffer.from(`${email}:${apiKey}`).toString('base64');
    const baseUrl = `https://${domain}/rest/api/3`;
    const headers = {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    console.log(`Connecting to Jira at ${domain}...`);

    try {
        // 1. Get Projects
        console.log('\n--- Active Projects ---');
        const projectsRes = await fetch(`${baseUrl}/project/search?maxResults=10`, { headers });
        if (!projectsRes.ok) {
            const text = await projectsRes.text();
            throw new Error(`Failed to fetch projects: ${projectsRes.status} ${projectsRes.statusText} - ${text}`);
        }
        const projects = await projectsRes.json();
        projects.values.forEach((p: any) => console.log(`- [${p.key}] ${p.name} (ID: ${p.id})`));

        // 2. Get Issue Types (to identify Epics vs Initiatives)
        console.log('\n--- Issue Types ---');
        const typesRes = await fetch(`${baseUrl}/issuetype`, { headers });
        if (!typesRes.ok) {
            const text = await typesRes.text();
            console.error(`Failed to fetch issue types: ${typesRes.status} - ${text.substring(0, 100)}...`);
        } else {
            const types = await typesRes.json();
            const hierarchy = types.filter((t: any) => t.hierarchyLevel > 0).map((t: any) => `${t.name} (Level ${t.hierarchyLevel})`);
            console.log('Hierarchy Levels (>0):', hierarchy.join(', '));
        }

        // 3. Get Statuses (to map "Done" vs "In Progress")
        console.log('\n--- Status Categories ---');
        const statusRes = await fetch(`${baseUrl}/statuscategory`, { headers });
        if (!statusRes.ok) {
            const text = await statusRes.text();
            console.error(`Failed to fetch statuses: ${statusRes.status} - ${text.substring(0, 100)}...`);
        } else {
            const statuses = await statusRes.json();
            statuses.forEach((s: any) => console.log(`- ${s.name} (Key: ${s.key}, Color: ${s.colorName})`));
        }

    } catch (error) {
        console.error('Discovery failed:', error);
    }
}

main().catch(console.error);
