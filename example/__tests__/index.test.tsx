import { shallow } from 'enzyme';
import React from 'react';

import App from '../src/pages/[[...slug]]';
import { PageProps } from '~/interfaces/Page.interface';
import FeedPage from '~/components/Feed/FeedPage';
import { DEFAULT_CITY } from '~/constants/common';

describe('With Enzyme', () => {
  it('Example test', () => {
    const page: PageProps = {
      feed: {
        name: 'test',
        mode: 'test',
        createdDt: 'test',
        publishedDt: 'test',
        slug: 'test',
        fullSlug: 'test',
        parentId: 'test',
        fields: null,
        blocks: null,
        uId: 'test',
        announcement: null,
        cities: null,
      },
      slug: 'test',
      menu: {
        blocks: null,
        mode: 'test',
        createdDt: 'test',
        publishedDt: 'test',
        uId: 'test',
      },
      providerData: { cities: [DEFAULT_CITY] },
      error: null,
    };
    const app = shallow(<App {...page} />);
    app.equals(<FeedPage {...page} />);
  });
});
