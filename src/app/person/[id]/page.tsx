'use client';
import { Movies, Person, TVSeries } from '@/app/type';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './person.module.scss';
import { camelize } from '@/utilities/snakeToCamel';

const Person = () => {
  const searchParams = useSearchParams();

  const [people, setPeople] = useState<Person | undefined>();
  // console.log(people);

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      const data = JSON.parse(decodeURIComponent(query));
      setPeople(data);
    }
  }, [searchParams]);

  if (!people) return null;
  return (
    <div className={styles.container}>
      <h3>Person</h3>
      <div className={styles.detail}>
        <div className={styles.image}>
          <Image
            src={`${process.env.NEXT_PUBLIC_IMG_URL}/w500${people.profilePath}`}
            width={160}
            height={240}
            alt={people.id}
          />
          <div>
            <h4>{people.name}</h4>
            <p>{people.knownForDepartment}</p>
          </div>
        </div>
        <div className={styles.info}>
          <div>
            {camelize(people.knownFor).map((item: Movies | TVSeries) => (
              <div key={item.id} className={styles.media}>
                <div>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}/w500${item.posterPath}`}
                    width={160}
                    height={240}
                    alt={item.id}
                  />
                </div>
                <p>{(item as Movies).title || (item as TVSeries).name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Person;
