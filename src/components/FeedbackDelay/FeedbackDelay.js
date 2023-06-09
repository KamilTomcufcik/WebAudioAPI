function feedbackDelayFunction() {
  const audioContext = new AudioContext();

  let sourceNode = audioContext.createBufferSource();

  const loadBuffer = async () => {
    const audioBuffer = await fetch('./audio/Kick_one.wav')
      .then((res) => res.arrayBuffer())
      .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
    sourceNode.buffer = audioBuffer;
  };

  loadBuffer();

  let delay = audioContext.createDelay();
  let delayFeedback = audioContext.createGain();

  delay.delayTime.value = 0.5;
  delayFeedback.gain.value = 0.5;

  sourceNode.connect(delay);
  delay.connect(delayFeedback);
  delayFeedback.connect(delay);
  delayFeedback.connect(audioContext.destination);

  sourceNode.connect(audioContext.destination);

  sourceNode.start();
}

const FeedbackDelay = () => {
  return (
    <>
      <pre>
        <code>{`const audioContext = new AudioContext();

let sourceNode = audioContext.createBufferSource();

const loadBuffer = async () => {
  const audioBuffer = await fetch('./audio/Kick_one.wav')
    .then((res) => res.arrayBuffer())
    .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
  sourceNode.buffer = audioBuffer;
};

loadBuffer();

let delayFeedback = audioContext.createGain();
let delay = audioContext.createDelay();

delay.delayTime.value = 0.5;
delayFeedback.gain.value = 0.5;

sourceNode.connect(delay);
delay.connect(delayFeedback);
delayFeedback.connect(delay);
delayFeedback.connect(audioContext.destination);
sourceNode.connect(audioContext.destination);

sourceNode.start();`}</code>
      </pre>
      <button
        onClick={() => {
          feedbackDelayFunction();
        }}
      >
        Feedback Delay
      </button>
    </>
  );
};

export default FeedbackDelay;
