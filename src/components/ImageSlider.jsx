import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageSlider({ images = [] }) {
  const [index, setIndex] = useState(0);

  if (!images.length)
    return (
      <div className="h-56 flex items-center justify-center rounded-xl border border-dashed border-gray-300 text-gray-400 bg-gray-50">
        No Image Available
      </div>
    );

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className="relative overflow-hidden rounded-2xl group shadow-md hover:shadow-lg transition-all duration-300">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          alt={`product-${index}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="w-full h-56 object-cover rounded-2xl"
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>

          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-indigo-500 hover:text-white text-gray-700 backdrop-blur-sm p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            ‹
          </button>

          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-indigo-500 hover:text-white text-gray-700 backdrop-blur-sm p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            ›
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === index ? "bg-indigo-500 scale-110" : "bg-gray-300 hover:bg-gray-400"
                }`}
              ></button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
