

import React, { useState, useEffect, useTransition } from 'react';

const ImageList=()=> {
  const [images, setImages] = useState([]);
  const [isPending, startTransition] = useTransition({ timeoutMs: 10000 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    startTransition(() => {
      fetch('https://jsonplaceholder.typicode.com/photos')
        .then(response => response.json())
        .then(data => setImages(data));
    });
  }, [startTransition]);

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Hide Images' : 'Show Images'}
      </button>
      {isPending ? (
        <p>Loading images...</p>
      ) : isVisible ? (
        <ul>
          {images.map(image => (
            <li key={image.id}>
              <img src={image.thumbnailUrl} alt={image.title} />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default ImageList;