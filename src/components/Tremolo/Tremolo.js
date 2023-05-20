function tremoloFunction() {
  const audioContext = new AudioContext();

  const source = audioContext.createBufferSource();

  const loadBuffer = async () => {
    const audioBuffer = await fetch('./audio/AcGtr.wav')
      .then((res) => res.arrayBuffer())
      .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
    source.buffer = audioBuffer;
  };

  loadBuffer();

  const lfo = audioContext.createOscillator();
  lfo.type = 'sine';
  lfo.frequency.value = 10;

  const depth = 0.75;
  const offset = 1 - depth;

  const tremoloGain = audioContext.createGain();
  tremoloGain.gain.value = offset;

  lfo.connect(tremoloGain.gain);
  lfo.start();

  source.connect(tremoloGain);
  tremoloGain.connect(audioContext.destination);

  source.start();
}

const Tremolo = () => {
  return (
    <>
      <pre>
        <code>{`const audioContext = new AudioContext();

const source = audioContext.createBufferSource();

const loadBuffer = async () => {
  const audioBuffer = await fetch('./audio/AcGtr.wav')
    .then((res) => res.arrayBuffer())
    .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
  source.buffer = audioBuffer;
};

loadBuffer();

const lfo = audioContext.createOscillator();
lfo.type = 'sine';
lfo.frequency.value = 10;

const depth = 0.75;
const offset = 1 - depth;

const tremoloGain = audioContext.createGain();
tremoloGain.gain.value = offset;

lfo.connect(tremoloGain.gain);
lfo.start();

source.connect(tremoloGain);
tremoloGain.connect(audioContext.destination);

source.start();`}</code>
      </pre>
      <button
        onClick={() => {
          tremoloFunction();
        }}
      >
        Tremolo
      </button>
    </>
  );
};

export default Tremolo;
