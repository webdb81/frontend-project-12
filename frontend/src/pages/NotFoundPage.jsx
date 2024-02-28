import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import appRoutes from '../routes.js';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <h1 className="h2 text-muted">{t('notFoundPage.title')}</h1>
      <p className="text-muted">
        {t('notFoundPage.text')}
        {' '}
        <Link to={appRoutes.chatPage()}>{t('notFoundPage.linkMainPage')}</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
