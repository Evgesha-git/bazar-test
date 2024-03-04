import React, { FC, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import s from './Filter.module.scss';

const Filter: FC = () => {
  const [open, setOpen] = useState(false);
  const [minPrice, setMinPrice] = useState<string | null>('');
  const [maxPrice, setMaxPrice] = useState<string | null>('');
  const [desc, setDesc] = useState<string | null>('');
  const [city, setCity] = useState<string | null>('');
  const [district, setDistrict] = useState<string | null>('');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const closeHandler = () => setOpen(false);

  const sendFilter = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (!minPrice && !maxPrice && !desc && !city && !district) {
      setOpen(false);
      router.push(`${pathname}`);
      return;
    }
    const regParams = /&$/gi;
    const minPriceParam = minPrice ? `minPrice=${minPrice}` : '';
    const maxPriceParam = maxPrice ? `maxPrice=${maxPrice}` : '';
    const searchParam = desc ? `search=${desc}` : '';
    const cityParam = city ? `city=${city}` : '';
    const districtParam = district ? `district=${district}` : '';
    const params = `${minPriceParam}${minPriceParam ? '&' : ''
      }${maxPriceParam}${maxPriceParam ? '&' : ''}${searchParam}${searchParam ? '&' : ''
      }${cityParam}${cityParam ? '&' : ''}${districtParam}`;
    setOpen(false);
    router.push(`${pathname}?${params.replace(regParams, '')}`);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get('minPrice')){
      setMinPrice(params.get('minPrice'));
    }
    if (params.get('maxPrice')){
      setMaxPrice(params.get('maxPrice'));
    }
    if (params.get('search')){
      setDesc(params.get('search'));
    }
    if (params.get('city')){
      setCity(params.get('city'));
    }
    if (params.get('district')){
      setDistrict(params.get('district'));
    }
  }, [searchParams]);

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="contained">
        Open filter
      </Button>
      <Dialog
        open={open}
        onClose={closeHandler}
        PaperProps={{
          component: 'form',
          onSubmit: sendFilter,
        }}
      >
        <DialogTitle>Filter ads</DialogTitle>
        <DialogContent>
          <div className={s.filter}>
            <div className={s.inputs}>
              <TextField
                type="text"
                label="Min price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className={s.input}
              />
              <TextField
                type="text"
                label="Max price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className={s.input}
              />
              <TextField
                type="text"
                label="Search content text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className={s.input}
              />
              <TextField
                type="text"
                label="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={s.input}
              />
              <TextField
                type="text"
                label="District"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className={s.input}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            variant="outlined"
            color="secondary"
          >
            Close
          </Button>
          <Button variant="outlined" type="submit" className={s.button}>
            Apply filter
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Filter;
