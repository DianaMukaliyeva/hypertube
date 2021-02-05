import React from 'react';
import { useTranslation } from 'react-i18next';

import ToRemove from './ToRemove';

const Hypertube = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('Welcome')}</h1>
      <p>Hypertube is here!!!</p>
      <ToRemove />
    </div>
  );
};

export default Hypertube;
