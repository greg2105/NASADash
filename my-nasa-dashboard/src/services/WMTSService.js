const API_URL = 'https://moontrek.jpl.nasa.gov/trektiles/Moon';

export const getTileURL = (tileMatrixSet, tileMatrix, tileRow, tileCol) => {
  const style = 'default';
  const extension = 'jpg';
  const tileURL = `${API_URL}/${tileMatrixSet}/1.0.0/${style}/${tileMatrix}/${tileRow}/${tileCol}.${extension}`;
  return tileURL;
};