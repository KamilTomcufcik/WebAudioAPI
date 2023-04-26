// Create audio context
const audioContext = new AudioContext();

// Create audio buffer source
const source = audioContext.createBufferSource();

// Load audio file into audio buffer source
const loadBuffer = async () => {
  const audioBuffer = await fetch(new URL('./AcGtr.wav', import.meta.url))
    .then((res) => res.arrayBuffer())
    .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
  source.buffer = audioBuffer;
};

loadBuffer();

// Create vibrato effect
const delay = audioContext.createDelay(5);
delay.delayTime.value = 0.85;

const gain = audioContext.createGain();
gain.gain.value = 0.005; //0.005;

const lfo = audioContext.createOscillator();
lfo.frequency.value = 5;

// Connect LFO to delay time
lfo.connect(gain).connect(delay.delayTime);

// Start LFO
lfo.start();

// Connect audio buffer source to vibrato effect
source.connect(delay);

// Connect vibrato effect to audio context destination
delay.connect(audioContext.destination);

const Vibrato = () => {
  return (
    <>
      <pre>
        <code>{`const audioContext = new AudioContext();

const source = audioContext.createBufferSource();

const loadBuffer = async () => {
  const audioBuffer = await fetch(new URL('./AcGtr.wav', import.meta.url))
    .then((res) => res.arrayBuffer())
    .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
  source.buffer = audioBuffer;
};

loadBuffer();

const delay = audioContext.createDelay(10);
delay.delayTime.value = 1;

const gain = audioContext.createGain();
gain.gain.value = 0.005;

const lfo = audioContext.createOscillator();
lfo.frequency.value = 5;

lfo.connect(gain).connect(delay.delayTime);
lfo.start();

source.connect(delay);
delay.connect(audioContext.destination);

source.start()`}</code>
      </pre>
      <button
        onClick={() => {
          source.start();
        }}
      >
        Vibrato
      </button>
    </>
  );
};

export default Vibrato;
