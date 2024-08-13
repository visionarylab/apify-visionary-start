const { ApifyClient } = require('apify-client');

require('dotenv').config();
const MY_APIFY_TOKEN = process.env.MY_APIFY_TOKEN

async function main() {
    const animalsHashtags = ['zebra', 'lion', 'hippo'];
    const client = new ApifyClient({ token: MY_APIFY_TOKEN });

    const socialsTasksPromises = animalsHashtags.map((hashtag) => client.tasks().create({
        actId: 'apify/instagram-hashtag-scraper',
        name: `hashtags-${hashtag}`,
        input: { hashtags: [hashtag], resultsLimit: 20 },
        options: { memoryMbytes: 1024 },
    }));

    // Create all tasks in parallel
    const createdTasks = await Promise.all(socialsTasksPromises);

    console.log("Created tasks:");
    console.log(createdTasks);

    // Run all tasks in parallel
    await Promise.all(createdTasks.map((task) => client.task(task.id).call())); 
}

main();