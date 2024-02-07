import { headers } from 'next/headers';

const MediaType = () => {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';

  return <div></div>;
};

export default MediaType;
