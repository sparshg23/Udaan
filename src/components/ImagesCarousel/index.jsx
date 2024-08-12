import React, { useState, useEffect } from 'react';
import "./style.css"
const ImageCarousel = () => {
  const images = [
    'https://via.placeholder.com/150', // Replace with your image URLs
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length); // Decrement index to move right to left
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  const getPositionAndScale = (index) => {
    const totalImages = images.length;
    const distance = (index - activeIndex + totalImages) % totalImages;

    // Increase the multiplier to spread out the images more
    const translateX = Math.min(distance, totalImages - distance) * 200; // Changed from 150 to 200

    // Determine the scale based on the distance from the center
    const scale = 1 - 0.15 * Math.min(distance, totalImages - distance);

    if (distance === 0) {
      return {
        transform: `translateX(0) scale(1.25)`, // Center image is larger
        zIndex: 20,
        opacity: 1,
      };
    } else if (distance < totalImages / 2) {
      return {
        transform: `translateX(${-translateX}px) scale(${scale})`, // Negative translateX to move in opposite direction
        zIndex: 10 - distance, // Higher z-index for images closer to the center
        opacity: 1 - 0.2 * distance, // Decrease opacity with distance
      };
    } else {
      return {
        transform: `translateX(${translateX}px) scale(${scale})`, // TranslateX in the opposite direction
        zIndex: 10 - (totalImages - distance),
        opacity: 1 - 0.2 * (totalImages - distance),
      };
    }
  };

  return (
    <div className='gallery bg-center bg-cover'>

      <div className="text-white w-screen flex justify-center items-center">
        <h1 className='mt-4 galleryHeading'>Gallery</h1>
      </div>
      <div className="relative flex flex-col justify-center items-center w-screen h-[50vh] md:h-[75vh] overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className="absolute transition-all duration-500 ease-in-out"
            style={getPositionAndScale(index)}
          >
            <img
              src={image}
              alt={`Carousel ${index}`}
              className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
