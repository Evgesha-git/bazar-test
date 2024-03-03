import React, { FC, useState } from "react";
import Image from "next/image";
import { Box, IconButton } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { TImages } from "../../../types/adsType";
import s from './AdDetailsSlider.module.scss';


type TProps = {
    images: TImages[];
}

const AdDetailsSlider: FC<TProps> = (props) => {
    const { images } = props;
    const [slide, setSlide] = useState<number>(0);

    const nextSlide = () => {
        if (slide < images.length - 1) {
            setSlide(slide + 1);
        } else {
            setSlide(0);
        }
    }

    const prevSlide = () => {
        if (slide > 0) {
            setSlide(slide - 1);
        } else {
            setSlide(images.length - 1);
        }
    }

    return (
        <div className={s.slider}>
            <Box className={s.sliderWrapper} style={{ transform: `translateX(-${slide * 100}%)` }}>
                {images.map((img: TImages) => <div key={img.id.toString()} className={s.slide}>
                    <Image
                        fill
                        src={img.thumbnail}
                        alt="img"
                        sizes="100vw"
                    />
                </div>)}
            </Box>
            <div className={s.pagination}>
                {images.map((img: TImages, i: number) => <span
                    role="presentation"
                    key={img.id}
                    className={s.bullet}
                    style={{ opacity: i === slide ? .8 : .4 }}
                    onClick={() => setSlide(i)}
                />)}
            </div>
            <div className={s.buttons}>
                <IconButton className={s.buttonPrev} onClick={prevSlide}>
                    <ArrowBackIosIcon />
                </IconButton>
                <IconButton className={s.buttonNext} onClick={nextSlide}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default AdDetailsSlider;