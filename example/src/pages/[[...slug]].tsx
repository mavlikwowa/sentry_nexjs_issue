/** библиотеки */
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';

/** компоненты */
import FeedPage from '~/components/Feed/FeedPage';
import Error from './_error';

/** api */
import { getFeedBySlug, getFeeds, getMenu } from '~/api/api';
import { getCities, getContactPhones } from '~/api/api';

/** утилиты */
import { getEnhancedInfo } from '~/components/Blocks/BlockSelector.utils';

/** интерфейсы */
import { PageProps } from '~/interfaces/Page.interface';
import { ProviderData } from '~/components/Providers/ProviderData.types';

export const Page: NextPage<PageProps> = ({
  feed,
  menu,
  preview,
  error,
}: PageProps) => {
  if (error && error.statusCode !== 404) {
    return <Error {...error} />;
  }
  return <FeedPage feed={feed} menu={menu} preview={preview} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const originalFeeds = await getFeeds();

  if (!originalFeeds) return { paths: [], fallback: true };

  const paths = originalFeeds.map(({ slug }) => ({
    params: { slug: slug.split('/') },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = null,
}) => {
  const isIndexSlug = params.slug?.toString() === 'index';
  const slug = params.slug === undefined ? 'index' : params.slug;
  const fullSlug = Array.isArray(slug)
    ? slug.map((s) => encodeURIComponent(s)).join('/')
    : encodeURIComponent(slug);
  let enhancedFeed = {};
  const providerData: ProviderData = {};
  try {
    if (!isIndexSlug) {
      const originalFeed = await getFeedBySlug(fullSlug, preview);
      enhancedFeed = await getEnhancedInfo(originalFeed);
    }
    providerData.cities = await getCities();
    providerData.contactPhones = await getContactPhones();
    const menu = await getMenu(preview);
    const enhancedMenu = await getEnhancedInfo(menu);

    return {
      revalidate: Number(process.env.REVALIDATE_STATIC_PERIOD),
      props: {
        feed: enhancedFeed,
        slug: fullSlug,
        providerData,
        menu: enhancedMenu,
        preview,
        error: null,
      },
    };
  } catch (e) {
    return {
      revalidate: Number(process.env.REVALIDATE_STATIC_PERIOD),
      props: {
        feed: enhancedFeed,
        slug: fullSlug,
        providerData,
        menu: {},
        preview,
        error: e ?? null,
      },
    };
  }
};

export default Page;
