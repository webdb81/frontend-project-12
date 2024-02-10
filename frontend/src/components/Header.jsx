import { Container, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth.jsx';
import appRoutes from '../routes.js';

const Header = () => {
  const authContext = useAuth();
  const { t } = useTranslation();

  const handleLogOut = () => {
    authContext.logOut();
  };

  return (
    <Navbar
      expand="lg"
      variant="light"
      className="shadow-sm bg-white"
    >
      <Container>
        <Navbar.Brand as={Link} to={appRoutes.chatPage()}>
          {t('header.site')}
        </Navbar.Brand>

        {authContext.loggedIn && <Button type="primary" onClick={handleLogOut}>{t('header.signoutButton')}</Button>}
      </Container>
    </Navbar>
  );
};

export default Header;
