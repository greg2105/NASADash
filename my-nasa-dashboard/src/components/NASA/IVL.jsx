// ImageRepositorySection.jsx
import React, { useState, useEffect } from 'react';
import { searchImages, getAssetManifest, getAssetMetadata, getVideoCaptions } from '../../services/IVLService';

const ImageRepositorySection = () => {
  const [searchResults, setSearchResults] = useState(null);
  const [assetManifest, setAssetManifest] = useState(null);
  const [assetMetadata, setAssetMetadata] = useState(null);
  const [videoCaptions, setVideoCaptions] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Perform a search for images
        const searchQuery = 'moon';
        const searchData = await searchImages(searchQuery);
        setSearchResults(searchData.collection.items);

        // Fetch the manifest for the first search result
        if (searchData.collection.items.length > 0) {
          const nasaId = searchData.collection.items[0].data[0].nasa_id;
          const manifestData = await getAssetManifest(nasaId);
          setAssetManifest(manifestData);

          // Fetch the metadata location for the first search result
          const metadataData = await getAssetMetadata(nasaId);
          setAssetMetadata(metadataData);

          // Fetch the captions location for the first search result (if it's a video)
          if (searchData.collection.items[0].data[0].media_type === 'video') {
            const captionsData = await getVideoCaptions(nasaId);
            setVideoCaptions(captionsData);
          }
        }
      } catch (error) {
        console.error('Error fetching image repository data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {searchResults ? (
        <div>
          <h2>Search Results</h2>
          {/* Render search results here */}
          {/* You can access the search results using searchResults */}
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {assetManifest ? (
        <div>
          <h2>Asset Manifest</h2>
          {/* Render asset manifest here */}
          {/* You can access the asset manifest using assetManifest */}
        </div>
      ) : (
        <p>No asset manifest available</p>
      )}

      {assetMetadata ? (
        <div>
          <h2>Asset Metadata</h2>
          {/* Render asset metadata here */}
          {/* You can access the asset metadata using assetMetadata */}
        </div>
      ) : (
        <p>No asset metadata available</p>
      )}

      {videoCaptions ? (
        <div>
          <h2>Video Captions</h2>
          {/* Render video captions here */}
          {/* You can access the video captions using videoCaptions */}
        </div>
      ) : (
        <p>No video captions available</p>
      )}
    </div>
  );
};

export default ImageRepositorySection;