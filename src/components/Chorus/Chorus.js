// Create an AudioContext
const audioContext = new AudioContext();

// Create audio buffer source
const sourceNode = audioContext.createBufferSource();

// Load audio file into audio buffer source
const loadBuffer = async () => {
  const audioBuffer = await fetch('./audio/singing-female.wav')
    .then((res) => res.arrayBuffer())
    .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
  sourceNode.buffer = audioBuffer;
};

loadBuffer();

// Create chorus effect
const delayNode = audioContext.createDelay();
const oscillatorNode = audioContext.createOscillator();
const oscillatorGainNode = audioContext.createGain(); // Added oscillator gain node
const dryGainNode = audioContext.createGain();
const wetGainNode = audioContext.createGain();

// Set chorus parameters
const delayTime = 0.0025; // Delay time in seconds
const depth = 0.001; // Depth of modulation (0-1)
const frequency = 4; // Frequency of modulation (0-1)
const wetMix = 0.3; // Wet mix (0-1)
const dryMix = 1.0 - wetMix; // Dry mix (0-1)

// Set initial values
delayNode.delayTime.value = delayTime;

// Set up oscillator gain
oscillatorGainNode.gain.value = depth; // Set depth of modulation

// Set up oscillator for modulation
oscillatorNode.type = 'sine';
oscillatorNode.frequency.value = frequency;
oscillatorNode.start();

// Connect oscillator to chorus delay time
oscillatorNode.connect(oscillatorGainNode); // Connect oscillator to oscillator gain node
oscillatorGainNode.connect(delayNode.delayTime); // Connect oscillator gain node to chorus delay time

// Connect nodes
sourceNode.connect(dryGainNode);
dryGainNode.connect(audioContext.destination);

sourceNode.connect(delayNode);
delayNode.connect(wetGainNode);
wetGainNode.connect(audioContext.destination);

// Set up dry and wet mix gains
dryGainNode.gain.value = dryMix;
wetGainNode.gain.value = wetMix;

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

const delayNode = audioContext.createDelay();
const oscillatorNode = audioContext.createOscillator();
const oscillatorGainNode = audioContext.createGain();
const dryGainNode = audioContext.createGain();
const wetGainNode = audioContext.createGain();

const delayTime = 0.0025;
const depth = 0.001;
const frequency = 4;
const wetMix = 0.3;
const dryMix = 1.0 - wetMix;

delayNode.delayTime.value = delayTime;

oscillatorGainNode.gain.value = depth;

oscillatorNode.type = 'sine';
oscillatorNode.frequency.value = frequency;
oscillatorNode.start();

oscillatorNode.connect(oscillatorGainNode);
oscillatorGainNode.connect(delayNode.delayTime);

sourceNode.connect(dryGainNode);
dryGainNode.connect(audioContext.destination);

sourceNode.connect(delayNode);
delayNode.connect(wetGainNode);
wetGainNode.connect(audioContext.destination);

dryGainNode.gain.value = dryMix;
wetGainNode.gain.value = wetMix;

sourceNode.start()`}</code>
      </pre>
      <button
        onClick={() => {
          sourceNode.start();
        }}
      >
        Chorus
      </button>
    </>
  );
};

export default Chorus;
