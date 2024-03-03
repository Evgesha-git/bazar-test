import React, { useCallback, useEffect, useState, FC } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import httpClient from '../../../services/http.service';
import Filter from '../Flter';
import AdsListItem from './AdsListItem';
import { TAds } from '../../../types/adsType';
import s from './AdsList.module.scss';

const AdsList: FC = () => {
  const [ads, setAds] = useState<TAds | null>(null);

  const fetchFilter = useCallback((params: string) => {
    const fetchData = async () => {
      try {
        const resp = await toast.promise(httpClient.get(`/api/ads?${params}`), {
          pending: 'Fetching data',
        });
        setAds(resp.data);
      } catch (e) {
        if (axios.isAxiosError(e))
          toast.error(e.message, {
            position: 'top-center',
          });
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const resp = await toast.promise(httpClient.get('/api/ads'), {
          pending: 'Fetching data',
        });
        setAds(resp.data);
      } catch (e) {
        if (axios.isAxiosError(e))
          toast.error(e.message, {
            position: 'top-center',
          });
      }
    };
    fetchingData();
  }, []);
  return (
    <div className={s.add__list}>
      <Box sx={{ pt: 2.5 }}>
        <div className={s.titleBlock}>
          <h1 className={s.title}>List of ads</h1>
          <Filter fetching={fetchFilter} />
        </div>
        <div className={s.items}>
          {ads &&
            ads.results.map((item) => (
              <AdsListItem key={item.id.toString()} item={item} />
            ))}
        </div>
        <ToastContainer />
      </Box>
    </div>
  );
};

export default AdsList;
