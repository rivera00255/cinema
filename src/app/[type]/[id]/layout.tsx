import { ReactNode } from 'react';

const MediaLayout = ({ children, modal }: { children: ReactNode; modal: ReactNode }) => {
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default MediaLayout;
