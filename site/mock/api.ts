import mockjs from 'mockjs';
// @ts-ignore
import { delay } from 'roadhog-api-doc';

const proxy = {
  '/api/proposals': mockjs.mock({
    'proposals|3-15': [
      {
        'id|+1': 1,
        title: '@ctitle',
        description: '@cparagraph',
        'funding|0-500.2': 1,
        'funders|1-100': 1,
        issues: {
          'mergers|0-5': [
            {
              'id|+1': 1,
              title: '@ctitle',
              description: '@cparagraph',
            },
          ],
          'changes|0-5': [
            {
              'id|+1': 1,
              title: '@ctitle',
              description: '@cparagraph',
            },
          ],
        },
        'simulations|0-5': [
          {
            'id|+1': 1,
            title: '@ctitle',
            description: '@cparagraph',
          },
        ],
      },
    ],
  }),
};

export default delay(proxy, 1000);
