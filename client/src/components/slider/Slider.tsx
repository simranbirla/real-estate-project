import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "./slider.scss";
import { useState } from "react";
import { RiCloseLargeFill } from "react-icons/ri";

export default function Slider({ images }: { images: string[] }) {
  const [image, setImage] = useState<number>(-1);

  const handleImageClickNext = () => {
    if (image === images.length - 1) {
      setImage(0);
    } else {
      setImage((prev) => prev + 1);
    }
  };

  const handleImageClickPrev = () => {
    if (image === 0) {
      setImage(images.length - 1);
    } else {
      setImage((prev) => prev - 1);
    }
  };

  return (
    <div className="slider">
      {image !== -1 && (
        <div className={`fullSlider`}>
          <div className="arrow" onClick={handleImageClickPrev}>
            <IoIosArrowBack />
          </div>
          <div className="imgContainer">
            <img src={images[image]} alt={`Property Image ${image + 1}`} />
          </div>
          <div className="arrow" onClick={handleImageClickNext}>
            <IoIosArrowForward />
          </div>
          <div className="close" onClick={() => setImage(-1)}>
            <RiCloseLargeFill />
          </div>
        </div>
      )}
      <div className="big" onClick={() => setImage(0)}>
        <img src={images[0]} alt="Property Main Image " />
      </div>
      <div className="small">
        {images.slice(1).map((img, key) => (
          <img
            src={img}
            alt={`Property Images ${key + 1} `}
            onClick={() => setImage(key + 1)}
          />
        ))}
      </div>
    </div>
  );
}
