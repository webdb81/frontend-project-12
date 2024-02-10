import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <h1 className="h2 text-muted">{t('notFoundPage.title')}</h1>
      <p className="text-muted">
        {t('notFoundPage.text')}
        {' '}
        <a href="/">{t('notFoundPage.linkMainPage')}</a>
      </p>
    </div>
  );
};

export default NotFoundPage;
