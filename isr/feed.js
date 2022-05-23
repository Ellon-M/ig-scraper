const { IgApiClient } = require('instagram-private-api');
const winston = require('winston');
const download = require('download');
const path = require('path');
const Config = require('./config');

const logConfig = {
    'transports': [
        new winston.transports.Console()
    ]
}

const logger = winston.createLogger(logConfig);

(async () => {
    const ig = new IgApiClient();
    ig.state.generateDevice(Config.Instagram.Username);
    ig.simulate.preLoginFlow();
    const auth = await ig.account.login(Config.Instagram.Username, Config.Instagram.Password);
    const postsFeed = ig.feed.user(await ig.user.getIdByUsername(Config.FeedTarget.target));
    const wholeRes = await postsFeed.request();

    const folderPath = path.join(
      Config.FeedFolder,
      Config.FeedTarget.target,   
    )
    
    // paginated results
    const items = await postsFeed.items();
    
    logger.log({
      message: 'Carousel: first batch starting..',
      level: 'info'
    })
    items.forEach((item) => {
          if (item.carousel_media_count > 0){
              item.carousel_media.forEach((media) => {
               media.image_versions2.candidates.forEach((candidate) => {
                  download(candidate.url, folderPath);
               })
               if (media.video_versions != undefined) {
                media.video_versions.forEach((candidate) => {
                  download(candidate.url, folderPath);
               })
               }
              })
          }
      })

    // second batch
    const items2 = await postsFeed.items();
    logger.log({
      message: 'Carousel: second batch starting..',
      level: 'info'
    })
    setTimeout(() => {
    items2.forEach((item) => {
      if (item.carousel_media_count > 0){
          item.carousel_media.forEach((media) => {
           media.image_versions2.candidates.forEach((candidate) => {
              download(candidate.url, folderPath);
           })
           if (media.video_versions != undefined) {
            media.video_versions.forEach((candidate) => {
              download(candidate.url, folderPath);
           })
           }
          })
      }
    })
  }, 6000);

    // third batch 
    const items3 = await postsFeed.items();
    logger.log({
      message: 'Carousel: third batch starting..',
      level: 'info'
    })
    setTimeout(() => {
    items3.forEach((item) => {
      if (item.carousel_media_count > 0){
          item.carousel_media.forEach((media) => {
           media.image_versions2.candidates.forEach((candidate) => {
              download(candidate.url, folderPath);
           })
           if (media.video_versions != undefined) {
            media.video_versions.forEach((candidate) => {
              download(candidate.url, folderPath);
           })
           }
          })
      }
    })
  }, 12000);

    // fourth batch
    const items4 = await postsFeed.items();
    logger.log({
      message: 'Carousel: fourth batch starting..',
      level: 'info'
    })
    setTimeout(() => {
    items4.forEach((item) => {
      if (item.carousel_media_count > 0){
          item.carousel_media.forEach((media) => {
           media.image_versions2.candidates.forEach((candidate) => {
              download(candidate.url, folderPath);
           })
           if (media.video_versions != undefined) {
            media.video_versions.forEach((candidate) => {
              download(candidate.url, folderPath);
           })
           }
          })
      }
    })
  }, 18000);
   
  //....

    //single images

    items.forEach((item) => {
        logger.log({
            message: 'Single: first batch starting..',
            level: 'info'
        })
        if (item.image_versions2 != undefined){
          item.image_versions2.candidates.forEach((candidate) => {
            download(candidate.url, folderPath);
          })
        }
        if (item.video_versions != undefined){
          item.video_versions.forEach((candidate) => {
            download(candidate.url, folderPath);
          })
        }
    });

    setTimeout(() => {
        logger.log({
            message: 'Single: second batch starting..',
            level: 'info'
        })
        items2.forEach((item) => {
            if (item.image_versions2 != undefined){
              item.image_versions2.candidates.forEach((candidate) => {
                download(candidate.url, folderPath);
              })
            }
          if (item.video_versions != undefined){
                item.video_versions.forEach((candidate) => {
                  download(candidate.url, folderPath);
                })
              }
              })
      }, 6000);

    setTimeout(() => {
        logger.log({
            message: 'Single: third batch starting..',
            level: 'info'
        })
        items3.forEach((item) => {
            if (item.image_versions2 != undefined){
              item.image_versions2.candidates.forEach((candidate) => {
                download(candidate.url, folderPath);
              })
            }
             if (item.video_versions != undefined){
              item.video_versions.forEach((candidate) => {
                download(candidate.url, folderPath);
              })
            }
        })
    }, 12000);

    setTimeout(() => {
        logger.log({
            message: 'Single: fourth batch starting..',
            level: 'info'
        })
        items4.forEach((item) => {
            if (item.image_versions2 != undefined) {
              item.image_versions2.candidates.forEach((candidate) => {
                download(candidate.url, folderPath);
              })
            }
             if (item.video_versions != undefined){
              item.video_versions.forEach((candidate) => {
              download(candidate.url, folderPath);
          })
        }
        })

        logger.log({
          message: `Finito, ${Config.FeedTarget.target}`,
          level: 'info'
      })
    }, 18000);
})();