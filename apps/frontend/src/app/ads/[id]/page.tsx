'use client';

import React, { FC } from 'react'
import AdDetails from '../../_components/AdDetails';
import s from '../../index.module.scss';

type TProps = {
    params: {
        id: string,
    }
}

const Detail: FC<TProps> = (props) => {
    const { params } = props;

    return (
        <div className={s.container}>
            <AdDetails id={params.id} />
        </div>
    )
}

export default Detail;