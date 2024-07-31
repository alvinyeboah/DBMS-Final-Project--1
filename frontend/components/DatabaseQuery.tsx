// components/DatabaseQuery.tsx
import React, { useEffect, useState } from 'react';

interface DatabaseQueryProps<T> {
  query: string;
  render: (data: T[], loading: boolean, error: string | null) => React.ReactNode;
}

function DatabaseQuery<T>({ query, render }: DatabaseQueryProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/query', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        
        if (Array.isArray(result)) {
          setData(result);
        } else {
          throw new Error('Unexpected data format');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return <>{render(data, loading, error)}</>;
}

export default DatabaseQuery;