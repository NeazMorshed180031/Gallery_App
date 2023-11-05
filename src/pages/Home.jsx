import Galary from "../components/Galary";
import image1 from "../assets/image-1.webp";
import image2 from "../assets/image-2.webp";
import image3 from "../assets/image-3.webp";
import image4 from "../assets/image-4.webp";
import image5 from "../assets/image-5.webp";
import image6 from "../assets/image-6.webp";
import image7 from "../assets/image-7.webp";
import image8 from "../assets/image-8.webp";
import image9 from "../assets/image-9.webp";
import image10 from "../assets/image-10.jpeg";
import image11 from "../assets/image-11.jpeg";

export default function Test1() {
  const galleryImages = [
    {
      id: 0,
      todo: image1,
    },
    {
      id: 1,
      todo: image2,
    },
    {
      id: 2,
      todo: image3,
    },
    {
      id: 3,
      todo: image4,
    },
    {
      id: 4,
      todo: image5,
    },
    {
      id: 5,
      todo: image6,
    },
    {
      id: 6,
      todo: image7,
    },
    {
      id: 7,
      todo: image8,
    },
    {
      id: 8,
      todo: image9,
    },
    {
      id: 9,
      todo: image10,
    },
    {
      id: 10,
      todo: image11,
    },
  ];

  return (
    <div>
      <Galary galleryImages={galleryImages} />
    </div>
  );
}
