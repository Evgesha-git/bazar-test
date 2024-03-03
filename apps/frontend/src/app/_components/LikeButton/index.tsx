import React, { FC, useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

type TProps = {
    id: number
}

const LikeButton: FC<TProps> = (props) => {
    const { id } = props;
    const [like, setLike] = useState<boolean>(false);

    const likeHandler = () => {
        if (localStorage.getItem('likes')) {
            const local = localStorage.getItem('likes')
            let likes: number[] = local ? JSON.parse(local) : null;
            const isLiked = likes?.some((num: number) => num === id);
            if (isLiked) {
                likes = likes.filter((num: number) => num !== id);
                setLike(false);
            } else {
                likes.push(id);
                setLike(true);
            }
            localStorage.setItem('likes', JSON.stringify(likes));
        } else {
            localStorage.setItem('likes', JSON.stringify([id]));
            setLike(true);

        }
    }

    useEffect(() => {
        if (localStorage.getItem('likes')) {
            const local = localStorage.getItem('likes')
            const likes: number[] = local ? JSON.parse(local) : null;
            const isLike = likes?.some((num: number) => num === id);
            setLike(isLike);
        }
    }, [id]);

    return (
        <IconButton onClick={likeHandler}>
            {!like && <FavoriteBorderIcon />}
            {like && <FavoriteIcon />}
        </IconButton>
    )
}

export default LikeButton;