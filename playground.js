const { IgApiClient } = require('instagram-private-api');
const winston = require('winston');

const logConfig = {
    'transports': [
        new winston.transports.Console()
    ]
}

const logger = winston.createLogger(logConfig);

(async () => {
    const ig = new IgApiClient();
    ig.state.generateDevice('extraimagination');
    ig.simulate.preLoginFlow();
    const auth = await ig.account.login('', '');
    const followingFeed = ig.feed.accountFollowing(auth.pk);
    const wholeRes = await followingFeed.request();
    const items = await followingFeed.items();
    // console.log(JSON.stringify(wholeRes));
    logger.log({
        message: items,
        level: 'info'
    })

})();

