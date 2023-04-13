// Create an AudioContext instance
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

const pitchFactor = 2;
source.playbackRate.value = pitchFactor;

// Connect the nodes
source.connect(audioContext.destination);

const PitchShift = () => {
  return (
    <button
      onClick={() => {
        source.start();
      }}
    >
      Pitch Shift
    </button>
  );
};

export default PitchShift;
