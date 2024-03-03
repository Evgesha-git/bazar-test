import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import httpClient from "../../../services/http.service";
import { TItem } from "../../../types/adsType";
import s from './AdDetails.module.scss';
import AdDetailsSlider from "./AdDetailsSlider";
import LikeButton from "../LikeButton";


type TProps = {
    id: string,
}

const AdDetails: FC<TProps> = (props) => {
    const { id } = props;
    const [pageData, setPageData] = useState<TItem | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await toast.promise(
                    httpClient.get<TItem>(`/api/ads/${id}`),
                    {
                        pending: 'Data loading'
                    }
                );
                setPageData(data);
            } catch (error) {
                if (axios.isAxiosError(error))
                    toast.error(error.message);
            }
        }
        fetchData();
    }, [id]);

    return (
        <div className={s.container}>
            {pageData &&
                <div className={s.content}>
                    <AdDetailsSlider images={pageData.images} />
                    <div>
                        <div className={s.titleTop}>
                            <h1 className={s.title}>{pageData.title}</h1>
                            <LikeButton id={pageData.id} />
                        </div>

                        <div className={s.midle}>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <p className={s.city}>{pageData.city_name}</p>
                                <p className={s.district}>{pageData.district_name}</p>
                            </div>
                            <p className={s.price}>{pageData.price}</p>
                        </div>
                        <div className={s.description} dangerouslySetInnerHTML={{ __html: pageData.description }} />
                    </div>
                </div>
            }
            <ToastContainer />
        </div>
    )
}

export default AdDetails;