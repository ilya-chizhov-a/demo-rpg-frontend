import { useParams } from 'react-router';
import { GuideBlockedPage } from 'src/pages/Guides';

export default function NewsDetailRoute() {
  const params = useParams();
  return <GuideBlockedPage kind="newsDetail" pathname={`/news/${params.slug ?? ''}`} />;
}
