export const RECEIVE_DIMENSIONS = 'RECEIVE_DIMENSIONS';
export const receiveDimensions = (width, height) => ({
  type: RECEIVE_DIMENSIONS,
  height, width
});

export const CONSUME_TUTORIAL_SESSION = 'CONSUME_TUTORIAL_SESSION';
export const consumeTutorialSession = () => ({
  type: CONSUME_TUTORIAL_SESSION
})
