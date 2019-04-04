export const RECEIVE_DIMENSIONS = 'RECEIVE_DIMENSIONS';
export const receiveDimensions = (width, height) => ({
  type: RECEIVE_DIMENSIONS,
  height, width
});
