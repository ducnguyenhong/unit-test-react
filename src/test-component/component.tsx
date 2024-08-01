import axios from 'axios';
import { useEffect, useState } from 'react';

type User = {
  id: string;
  fullName: string;
  email: string;
};

interface ComponentProps {
  requestUrl?: string;
}

const Component: React.FC<ComponentProps> = (props) => {
  const { requestUrl } = props;
  const [data, setData] = useState<User | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    if (!data) {
      setLoading(true);
      axios
        .get(requestUrl || '/')
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((e) => {
          setError(e);
          setLoading(false);
        });
    }
  }, [data, requestUrl]);

  if (loading) {
    return <div id="loading">Loading...</div>;
  }

  if (error) {
    return <div id="error">Error {error.message}</div>;
  }

  if (!data) {
    return <div id="no-data">No data</div>;
  }

  return <div id="has-data">Full name:{data.fullName}</div>;
};

export default Component;
