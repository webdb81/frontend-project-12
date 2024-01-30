import { Container, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';
import routes from '../utils/routes.js';

const NavButton = () => {
  const auth = useAuth();

  return auth.currentUser ? (
    <Button onClick={auth.logOut} as={Link} to={routes.login()}>
      Выйти
    </Button>
  ) : null;
};

const Nav = () => (
  <Navbar expand="lg" className="shadow-sm bg-white">
    <Container>
      <Navbar.Brand as={Link} to={routes.chatPage()}>
        Hexlet Chat
      </Navbar.Brand>
      <NavButton />
    </Container>
  </Navbar>
);

export default Nav;
