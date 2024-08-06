import { useEffect, useState } from 'react';
import { User } from './component.type';

interface ComponentProps {
  loaderTest?: () => Promise<User>;
}

const Component: React.FC<ComponentProps> = (props) => {
  const { loaderTest } = props;
  const [data, setData] = useState<User | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    if (loaderTest) {
      setLoading(true);
      loaderTest()
        .then((user) => setData(user))
        .catch((e) => setError(e))
        .finally(() => setLoading(false));
    }
  }, [loaderTest]);

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
