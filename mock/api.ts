import mockjs from 'mockjs';

export default {
  '/api/proposals': mockjs.mock({
    'proposals|10': [
      {
        'id|+1': 1,
        'title': '@ctitle',
        'description': '@cparagraph',
        'funding|0-500.2': 1,
        'funders|1-100': 1
      },
    ],
  }),
};
