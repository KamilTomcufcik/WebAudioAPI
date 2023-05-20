function chorusFunction() {
  const audioContext = new AudioContext();

  const sourceNode = audioContext.createBufferSource();

  const loadBuffer = async () => {
    const audioBuffer = await fetch('./audio/singing-female.wav')
      .then((res) => res.arrayBuffer())
      .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
    sourceNode.buffer = audioBuffer;
  };

  loadBuffer();

  const delay = audioContext.createDelay();
  const lfo = audioContext.createOscillator();
  const lfoGain = audioContext.createGain();
  const dryGain = audioContext.createGain();
  const wetGain = audioContext.createGain();

  const delayTime = 0.0025;
  const depth = 0.001;
  const frequency = 4;
  const wetMix = 0.3;
  const dryMix = 1.0 - wetMix;

  delay.delayTime.value = delayTime;
  lfoGain.gain.value = depth;

  lfo.type = 'sine';
  lfo.frequency.value = frequency;
  lfo.start();

  lfo.connect(lfoGain);
  lfoGain.connect(delay.delayTime);

  dryGain.gain.value = dryMix;
  wetGain.gain.value = wetMix;

  sourceNode.connect(dryGain);
  dryGain.connect(audioContext.destination);

  sourceNode.connect(delay);
  delay.connect(wetGain);
  wetGain.connect(audioContext.destination);
  
  sourceNode.start();
}

const Chorus = () => {
  return (
    <>
      <pre>
        <code>{`const audioContext = new AudioContext();

const sourceNode = audioContext.createBufferSource();

const loadBuffer = async () => {
  const audioBuffer = await fetch('./audio/singing-female.wav')
    .then((res) => res.arrayBuffer())
    .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
  sourceNode.buffer = audioBuffer;
};

loadBuffer();

const delay = audioContext.createDelay();
const lfo = audioContext.createOscillator();
const lfoGain = audioContext.createGain();
const dryGain = audioContext.createGain();
const wetGain = audioContext.createGain();

const delayTime = 0.0025;
const depth = 0.001;
const frequency = 4;
const wetMix = 0.3;
const dryMix = 1.0 - wetMix;

delay.delayTime.value = delayTime;

lfoGain.gain.value = depth;

lfo.type = 'sine';
lfo.frequency.value = frequency;
lfo.start();

lfo.connect(lfoGain);
lfoGain.connect(delay.delayTime);

sourceNode.connect(dryGain);
dryGain.connect(audioContext.destination);

sourceNode.connect(delay);
delay.connect(wetGain);
wetGain.connect(audioContext.destination);

dryGain.gain.value = dryMix;
wetGain.gain.value = wetMix;

sourceNode.start()`}</code>
      </pre>
      <button
        onClick={() => {
          chorusFunction();
        }}
      >
        Chorus
      </button>
    </>
  );
};

export default Chorus;
