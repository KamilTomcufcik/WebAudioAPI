const audioContext = new AudioContext();

let sourceNode = audioContext.createBufferSource();

const loadBuffer = async () => {
  const audioBuffer = await fetch('./audio/Kick_one.wav')
    .then((res) => res.arrayBuffer())
    .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
  sourceNode.buffer = audioBuffer;
};

loadBuffer();

let merger = audioContext.createChannelMerger(2);
let splitter = audioContext.createChannelSplitter(2);
let leftDelay = audioContext.createDelay();
let rightDelay = audioContext.createDelay();
let leftFeedback = audioContext.createGain();
let rightFeedback = audioContext.createGain();

sourceNode.connect(splitter);

splitter.connect(leftDelay, 0);
leftDelay.delayTime.value = 0.5;
leftDelay.connect(leftFeedback);
leftFeedback.gain.value = 0.7;
leftFeedback.connect(rightDelay);
splitter.connect(rightDelay, 1);
rightDelay.delayTime.value = 0.5;
rightFeedback.gain.value = 0.7;
rightDelay.connect(rightFeedback);
rightFeedback.connect(leftDelay);

leftFeedback.connect(merger, 0, 0);
rightFeedback.connect(merger, 0, 1);

merger.connect(audioContext.destination);

const PingPongDelay = () => {
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

let merger = audioContext.createChannelMerger(2);
let splitter = audioContext.createChannelSplitter(2);
let leftDelay = audioContext.createDelay();
let rightDelay = audioContext.createDelay();
let leftFeedback = audioContext.createGain();
let rightFeedback = audioContext.createGain();

sourceNode.connect(splitter);

splitter.connect(leftDelay, 0);
leftDelay.delayTime.value = 0.5;
leftDelay.connect(leftFeedback);
leftFeedback.gain.value = 0.7;
leftFeedback.connect(rightDelay);
splitter.connect(rightDelay, 1);
rightDelay.delayTime.value = 0.5;
rightFeedback.gain.value = 0.7;
rightDelay.connect(rightFeedback);
rightFeedback.connect(leftDelay);

leftFeedback.connect(merger, 0, 0);
rightFeedback.connect(merger, 0, 1);

merger.connect(audioContext.destination);

sourceNode.start();`}</code>
      </pre>
      <button
        onClick={() => {
          sourceNode.start();
        }}
      >
        PingPong Delay
      </button>
    </>
  );
};

export default PingPongDelay;
