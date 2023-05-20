function phaserFunction() {
  const audioContext = new AudioContext();

  const sourceNode = audioContext.createBufferSource();

  const loadBuffer = async () => {
    const audioBuffer = await fetch('./audio/AcGtr.wav')
      .then((res) => res.arrayBuffer())
      .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
    sourceNode.buffer = audioBuffer;
  };

  loadBuffer();

  const allPassFilter1 = audioContext.createBiquadFilter();
  allPassFilter1.type = 'allpass';
  allPassFilter1.frequency.value = 1000;
  const allPassFilter2 = audioContext.createBiquadFilter();
  allPassFilter2.type = 'allpass';
  allPassFilter2.frequency.value = 1000;

  const lfo = audioContext.createOscillator();
  lfo.type = 'sine';
  lfo.frequency.value = 15;

  const depth = audioContext.createGain();
  depth.gain.value = 300;

  lfo.connect(depth);
  depth.connect(allPassFilter1.frequency);
  depth.connect(allPassFilter2.frequency);

  lfo.start();

  sourceNode.connect(allPassFilter1);
  allPassFilter1.connect(allPassFilter2);
  allPassFilter2.connect(audioContext.destination);

  sourceNode.start();
}

const Phaser = () => {
  return (
    <>
      <pre>
        <code>{`const audioContext = new AudioContext();

const sourceNode = audioContext.createBufferSource();

const loadBuffer = async () => {
  const audioBuffer = await fetch('./audio/AcGtr.wav')
    .then((res) => res.arrayBuffer())
    .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
  sourceNode.buffer = audioBuffer;
};

loadBuffer();

const allPassFilter1 = audioContext.createBiquadFilter();
allPassFilter1.type = 'allpass';
allPassFilter1.frequency.value = 1000;
const allPassFilter2 = audioContext.createBiquadFilter();
allPassFilter2.type = 'allpass';
allPassFilter2.frequency.value = 1000;

const lfo = audioContext.createOscillator();
lfo.type = 'sine';
lfo.frequency.value = 15;

const depth = audioContext.createGain();
depth.gain.value = 300; 

lfo.connect(depth);
depth.connect(allPassFilter1.frequency);
depth.connect(allPassFilter2.frequency);

lfo.start();

sourceNode.connect(allPassFilter1);
allPassFilter1.connect(allPassFilter2);
allPassFilter2.connect(audioContext.destination);

sourceNode.start()`}</code>
      </pre>
      <button
        onClick={() => {
          phaserFunction();
        }}
      >
        Phaser
      </button>
    </>
  );
};

export default Phaser;
