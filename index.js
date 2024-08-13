const { ApifyClient } = require('apify-client');

require('dotenv').config();
const MY_APIFY_TOKEN = process.env.MY_APIFY_TOKEN
/* require ApifyClient

import { ApifyClient } from 'apify-client';
 */

async function main() {
    const client = new ApifyClient({ token: MY_APIFY_TOKEN });

    const actorClient = client.actor('apify/instagram-hashtag-scraper');

    const input = { hashtags: ['rainbow'], resultsLimit: 20 };

    const runData = await actorClient.call(input, { waitSecs: 60 });

    console.log("Run data:");
    console.log(runData);    
}

main();