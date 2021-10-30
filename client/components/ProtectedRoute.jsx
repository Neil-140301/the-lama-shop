import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const ProtectedRoute = (WrappedComponent) => {
  const user = useSelector((state) => state.user.currentUser);

  return (props) => {
    if (typeof window !== 'undefined') {
      const router = useRouter();

      if (!user) {
        router.replace('/login');
        return null;
      }

      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default ProtectedRoute;
