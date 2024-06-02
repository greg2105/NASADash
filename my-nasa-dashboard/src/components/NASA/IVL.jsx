import React, { useState, useEffect } from 'react';
import { searchImages, getAssetManifest, getAssetMetadata, getVideoCaptions } from '../../services/IVLService';

const ImageRepositorySection = () => {
  const [searchResults, setSearchResults] = useState(null);
  const [assetManifest, setAssetManifest] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchQuery = 'moon';
        const searchData = await searchImages(searchQuery);
        setSearchResults(searchData.collection.items);

        if (searchData.collection.items.length > 0) {
          const { links, data } = searchData.collection.items[0];
          setAssetManifest({
            links: links.map((link) => ({
              href: link.href,
              rel: link.rel,
            })),
            data,
          });
        }
      } catch (error) {
        console.error('Error fetching image repository data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {assetManifest && assetManifest.data ? (
        <div>
          <h2>{assetManifest.data[0].title}</h2>
          <p>{assetManifest.data[0].description}</p>
          {assetManifest.links.map((link, index) => (
            <div key={index}>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.rel}
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ImageRepositorySection;