import 'dotenv/config';

async function main() {
    const domain = (process.env.JIRA_DOMAIN || '').trim();
    const apiKey = (process.env.JIRA_API_KEY || '').trim();
    const email = (process.env.JIRA_EMAIL || '').trim();

    if (!domain || !apiKey) {
        console.error('Missing credentials.');
        process.exit(1);
    }

    const auth = Buffer.from(`${email}:${apiKey}`).toString('base64');
    const headers = {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    console.log(`Analyzing activity on ${domain}...`);

    try {
        // 1. Get all projects
        const projectsRes = await fetch(`https://${domain}/rest/api/3/project/search`, { headers });
        if (!projectsRes.ok) throw new Error(await projectsRes.text());
        const projects = (await projectsRes.json()).values;

        console.log(`Found ${projects.length} projects. Checking recent activity (updated < 30 days)...`);

        const activity = [];

        for (const p of projects) {
            // Count recent issues
            const jql = `project = "${p.key}" AND updated >= -90d`;

            // POST /search/jql is required by new Jira environments
            const searchRes = await fetch(`https://${domain}/rest/api/3/search/jql`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    jql,
                    maxResults: 50
                })
            });

            if (searchRes.ok) {
                const data = await searchRes.json();
                const count = data.issues ? data.issues.length : 0;
                if (count > 0) {
                    // If we hit the limit, it's very active
                    const label = count === 50 ? '50+' : count;
                    console.log(`Project ${p.key}: ${label}`);
                    activity.push({ key: p.key, name: p.name, count: count });
                }
            } else {
                const text = await searchRes.text();
                console.log(`Failed for ${p.key}: ${searchRes.status} - ${text}`);
            }
        }

        console.log('\n\nTop Active Projects:');
        activity.sort((a, b) => b.count - a.count);
        activity.slice(0, 5).forEach(p => console.log(`- [${p.key}] ${p.name}: ${p.count} recent updates`));

    } catch (e) {
        console.error(e);
    }
}

main();
