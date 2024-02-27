'use client';
import { ReactNode, useEffect, useRef } from 'react';
import styles from './dimmer.module.scss';
import { useRouter } from 'next/navigation';

const Dimmer = ({ children }: { children: ReactNode }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const clickOutsideModal = (e: { target: any }) => {
    if (modalRef.current === e.target) router.back();
  };

  useEffect(() => {
    if (typeof window !== 'undefined') scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className={styles.dimmer} ref={modalRef} onClick={(e) => clickOutsideModal(e)}>
      {children}
    </div>
  );
};

export default Dimmer;
