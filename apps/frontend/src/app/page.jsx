'use client';

import React from 'react';
import styles from './index.module.scss';
import AdsList from './_components/AdsList';

const Index = () => (
  <div className={styles.container}>
    <AdsList />
  </div>
);

export default Index;
