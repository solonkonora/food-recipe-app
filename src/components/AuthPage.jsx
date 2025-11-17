import { useState } from 'react';
import PropTypes from 'prop-types';
import Login from './Login';
import Signup from './Signup';

export default function AuthPage({ onBack }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      {showLogin ? (
        <Login 
          onSwitchToSignup={() => setShowLogin(false)}
          onBack={onBack}
        />
      ) : (
        <Signup 
          onSwitchToLogin={() => setShowLogin(true)}
          onBack={onBack}
        />
      )}
    </>
  );
}

AuthPage.propTypes = {
  onBack: PropTypes.func,
};
