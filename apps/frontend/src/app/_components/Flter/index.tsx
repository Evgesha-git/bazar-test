import React, { FC, useState } from 'react';
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import s from './Filter.module.scss';

type TPRops = {
  fetching: (params: string) => void
}

const Filter: FC<TPRops> = (props) => {
  const { fetching } = props;
  const [open, setOpen] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');

  const closeHandler = () => setOpen(false);

  const sendFilter = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (!minPrice && !maxPrice && !desc && !city && !district) {
      fetching('');
      setOpen(false);
      return;
    }
    const minPriceParam = minPrice ? `minPrice=${minPrice}` : '';
    const maxPriceParam = maxPrice ? `maxPrice=${maxPrice}` : '';
    const searchParam = desc ? `search=${desc}` : '';
    const cityParam = city ? `city=${city}` : '';
    const districtParam = district ? `district=${district}` : '';
    const params = `${minPriceParam}${minPriceParam ? '&' : ''
      }${maxPriceParam}${maxPriceParam ? '&' : ''}${searchParam}${searchParam ? '&' : ''
      }${cityParam}${cityParam ? '&' : ''}${districtParam}`;
    fetching(params);
    setOpen(false);
  };

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
