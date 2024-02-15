import { ReactNode } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';

const MediaLayout = ({ children, modal }: { children: ReactNode; modal: ReactNode }) => {
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default MediaLayout;
