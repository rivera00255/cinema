export const getTrendingLists = async (type: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}trending/${type}/week?language=ko&page=1`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json();
};

export const getPopularLists = async (type: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${type}/popular?language=ko&page=1`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json();
};

export const getDetailById = async (type: string, id: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${type}/${id}?language=ko`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
  });
  if (!response.ok) throw new Error(`Failed to fetch ${type} - ${id}`);
  return response.json();
};

export const getCredits = async (type: string, id: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${type}/${id}/credits?language=ko`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
  });
  if (!response.ok) throw new Error(`Failed to fetch ${type} - ${id}`);
  return response.json();
};
