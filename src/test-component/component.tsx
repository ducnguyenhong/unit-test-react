import axios from 'axios';
import { useEffect, useState } from 'react';
import { User } from './component.type';

interface ComponentProps {
  apiTestUrl?: string;
}

const Component: React.FC<ComponentProps> = (props) => {
  const { apiTestUrl } = props;
  const [data, setData] = useState<User | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    if (!data) {
      setLoading(true);
      axios
        .get(apiTestUrl || '/')
        .then((response) => {
          setData(response.data?.data);
          setLoading(false);
        })
        .catch((e) => {
          setError(e);
          setLoading(false);
        });
    }
  }, [data, apiTestUrl]);

  if (loading) {
    return <div data-testid="loading">Loading...</div>;
  }

  if (error) {
    return <div data-testid="error">Error {error?.message}</div>;
  }

  if (!data) {
    return <div data-testid="no-data">No data</div>;
  }

  return <div data-testid="has-data">Full name:{data.fullName}</div>;
};

export default Component;
