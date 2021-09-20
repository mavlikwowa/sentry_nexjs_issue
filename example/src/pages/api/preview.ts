/** api */
import { NextApiRequest, NextApiResponse } from 'next';
import { getFeedBySlug } from '~/api/api';

export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.query.secret !== process.env.PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  if (!req.query.slug) {
    return res.status(401).json({ message: 'Invalid slug' });
  }

  const feed = await getFeedBySlug(req.query.slug as string, true);

  if (!feed.slug) {
    return res.status(401).json({ message: 'Invalid slug' });
  }

  res.setPreviewData({});

  res.writeHead(307, {
    Location: `/${feed.slug === 'index' ? '' : feed.slug}`,
  });
  return res.end();
}
