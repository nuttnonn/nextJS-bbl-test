import { useEffect, useState } from 'react';
import { useAuth } from 'oidc-react';
import { Alert, Snackbar } from '@mui/material';

const Login = () => {
  const auth = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (auth && auth.userData) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [auth]);

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      setOpenSuccessAlert(true);
      const timer = setTimeout(() => {
        setOpenSuccessAlert(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn]);

  return (
    <div>
      {openSuccessAlert && (
        <Snackbar open={true} autoHideDuration={6000} onClose={() => setOpenSuccessAlert(false)}>
          <Alert severity="success">
            You are logged in!
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default Login;