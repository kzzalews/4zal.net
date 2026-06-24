import rss from '@astrojs/rss';
import { SITE } from '../consts';

export async function GET(context) {
  return rss({
    title: SITE.author.name,
    description: 'Software Engineer at Dynatrace. Cloud, distributed systems, self-hosted infrastructure.',
    site: context.site,
    items: [],
    customData: `<language>en-us</language>`,
  });
}
