function reverbFunction() {
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

  const loadBuffer = async () => {
    const audioBuffer = await fetch('./audio/AcGtr.wav')
      .then((res) => res.arrayBuffer())
      .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
    sourceNode.buffer = audioBuffer;
  };

  loadBuffer();

  sourceNode.connect(convolver);
  convolver.connect(audioContext.destination);

  sourceNode.start();
}

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

const loadBuffer = async () => {
  const audioBuffer = await fetch('./audio/AcGtr.wav')
    .then((res) => res.arrayBuffer())
    .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
  sourceNode.buffer = audioBuffer;
};

loadBuffer();

sourceNode.connect(convolver);
convolver.connect(audioContext.destination);

sourceNode.start();`}</code>
      </pre>
      <button
        onClick={() => {
          reverbFunction();
        }}
      >
        Convolver Reverb
      </button>
    </>
  );
};

export default ConvolverReverb;
