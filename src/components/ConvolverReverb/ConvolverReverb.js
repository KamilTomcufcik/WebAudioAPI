const audioContext = new AudioContext();

let convolver = audioContext.createConvolver();

const loadImpulseResponseBuffer = async () => {
  const buffer = await fetch('./audio/impulse_belgium.wav')
    .then((res) => res.arrayBuffer())
    .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
  convolver.buffer = buffer;
};

loadImpulseResponseBuffer();

let sourceNode = audioContext.createBufferSource();
let gain = audioContext.createGain();
gain.gain.value = 1.75;

const loadBuffer = async () => {
  const audioBuffer = await fetch('./audio/AcGtr.wav')
    .then((res) => res.arrayBuffer())
    .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
  sourceNode.buffer = audioBuffer;
};

loadBuffer();

sourceNode.connect(convolver);
convolver.connect(gain);
gain.connect(audioContext.destination);
// sourceNode.connect(audioContext.destination);

const ConvolverReverb = () => {
  return (
    <>
      <pre>
        <code>{`const audioContext = new AudioContext();

let convolver = audioContext.createConvolver();

const loadImpulseResponseBuffer = async () => {
  const buffer = await fetch('./audio/impulse_belgium.wav')
    .then((res) => res.arrayBuffer())
    .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
  convolver.buffer = buffer;
};

loadImpulseResponseBuffer();

let sourceNode = audioContext.createBufferSource();
let gain = audioContext.createGain();
gain.gain.value = 1.75;

const loadBuffer = async () => {
  const audioBuffer = await fetch('./audio/AcGtr.wav')
    .then((res) => res.arrayBuffer())
    .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
  sourceNode.buffer = audioBuffer;
};

loadBuffer();

sourceNode.connect(convolver);
convolver.connect(gain);
gain.connect(audioContext.destination);

sourceNode.start();`}</code>
      </pre>
      <button
        onClick={() => {
          sourceNode.start();
        }}
      >
        Convolver Reverb
      </button>
    </>
  );
};

export default ConvolverReverb;
