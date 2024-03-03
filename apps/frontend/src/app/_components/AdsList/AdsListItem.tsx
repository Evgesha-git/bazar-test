import React, { FC, } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { TItem } from "../../../types/adsType";
import s from './AdsListItem.module.scss';
import LikeButton from "../LikeButton";


type TProps = {
    item: TItem,
}

const AdsListItem: FC<TProps> = (props) => {
    const { item } = props;
    const router = useRouter();

    const changeRoute = (e: React.MouseEvent<HTMLElement>) => {
        const target = e.target as HTMLElement;
        const elem = target?.closest('.MuiButtonBase-root');
        if (elem?.classList.contains('MuiButtonBase-root')) return;
        router.push(`/ads/${item.id}`);
    }

    return (
        <Box className={s.item} onClick={changeRoute}>
            <div className={s.line}>
                <h3 className={s.title}>{item.title}</h3>
                <LikeButton id={item.id} />
            </div>
            <div className={s.line}>
                <p className={s.city}>{item.city_name}</p>
                <p className={s.price}>{item.price}</p>
            </div>
        </Box>
    )
}

export default AdsListItem;