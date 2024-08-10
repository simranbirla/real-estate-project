import "./slider.scss";

export default function Slider({ images }: { images: string[] }) {
  return (
    <div className="slider">
      <div className="big">
        <img src={images[0]} alt="Property Main Image " />
      </div>
      <div className="small">
        {images.slice(1).map((img, key) => (
          <img src={img} alt={`Property Images ${key + 1} `} />
        ))}
      </div>
    </div>
  );
}
