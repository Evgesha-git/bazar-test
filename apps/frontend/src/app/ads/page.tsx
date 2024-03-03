'use client';

import React, { FC } from 'react';
import styles from '../index.module.scss';
import AdsList from '../_components/AdsList';

const Index: FC = () => (
  <div className={styles.container}>
    <AdsList />
  </div>
);

export default Index;
