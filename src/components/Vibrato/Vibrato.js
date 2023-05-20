function vibratoFunction() {
  const audioContext = new AudioContext();

  const source = audioContext.createBufferSource();

  const loadBuffer = async () => {
    const audioBuffer = await fetch('./audio/AcGtr.wav')
      .then((res) => res.arrayBuffer())
      .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
    source.buffer = audioBuffer;
  };

  loadBuffer();

  const delay = audioContext.createDelay(5);
  delay.delayTime.value = 0.85;

  const gain = audioContext.createGain();
  gain.gain.value = 0.005;

  const lfo = audioContext.createOscillator();
  lfo.frequency.value = 5;

  lfo.connect(gain).connect(delay.delayTime);
  lfo.start();

  source.connect(delay);
  delay.connect(audioContext.destination);

  source.start();
}

const Vibrato = () => {
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

const delay = audioContext.createDelay(5);
delay.delayTime.value = 0.85;

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
          vibratoFunction();
        }}
      >
        Vibrato
      </button>
    </>
  );
};

export default Vibrato;
