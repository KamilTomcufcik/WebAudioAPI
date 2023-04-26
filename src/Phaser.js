// Create an AudioContext
const audioContext = new AudioContext();

// Create a GainNode to control the volume of the output
const outputGain = audioContext.createGain();
outputGain.connect(audioContext.destination);

// Create audio buffer source
const sourceNode = audioContext.createBufferSource();

// Load audio file into audio buffer source
const loadBuffer = async () => {
  const audioBuffer = await fetch(new URL('./AcGtr.wav', import.meta.url))
    .then((res) => res.arrayBuffer())
    .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
  sourceNode.buffer = audioBuffer;
};

loadBuffer();

// Create two AllPassFilterNodes for the two delayed copies
const allPassFilter1 = audioContext.createBiquadFilter();
allPassFilter1.type = 'allpass';
// allPassFilter1.frequency.value
const allPassFilter2 = audioContext.createBiquadFilter();
allPassFilter2.type = 'allpass';

// Connect the input source to the first AllPassFilterNode
sourceNode.connect(allPassFilter1);

// Connect the first AllPassFilterNode to the second AllPassFilterNode
allPassFilter1.connect(allPassFilter2);

// Connect the second AllPassFilterNode to the output GainNode
allPassFilter2.connect(outputGain);

// Create two OscillatorNodes for the LFOs
const lfo1 = audioContext.createOscillator();
const lfo2 = audioContext.createOscillator();

// Set the type and frequency of the LFOs
lfo1.type = 'sine'; // Set LFO1 waveform to sine wave
lfo1.frequency.value = 15; //0.2; // Set LFO1 frequency to control rate of modulation
lfo2.type = 'sine'; // Set LFO2 waveform to sine wave
lfo2.frequency.value = 15; //0.1; // Set LFO2 frequency to control rate of modulation

// Create two GainNodes to control the depth of modulation
const depth1 = audioContext.createGain();
const depth2 = audioContext.createGain();

// Connect the LFOs to the modulation depth GainNodes
lfo1.connect(depth1);
lfo2.connect(depth2);

// Set the gain values for the modulation depth
depth1.gain.value = 300; //100; // adjust to control depth of modulation for LFO1
depth2.gain.value = 300; //200; // adjust to control depth of modulation for LFO2

// Connect the modulation depth GainNodes to the frequency parameters of the AllPassFilterNodes
depth1.connect(allPassFilter1.frequency);
depth2.connect(allPassFilter2.frequency);

// Start the LFOs
lfo1.start();
lfo2.start();

const Phaser = () => {
  return (
    <>
      <pre>
        <code>{`const audioContext = new AudioContext();

const outputGain = audioContext.createGain();
outputGain.connect(audioContext.destination);

const sourceNode = audioContext.createBufferSource();

const loadBuffer = async () => {
  const audioBuffer = await fetch(new URL('./AcGtr.wav', import.meta.url))
    .then((res) => res.arrayBuffer())
    .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
  sourceNode.buffer = audioBuffer;
};
loadBuffer();

const allPassFilter1 = audioContext.createBiquadFilter();
allPassFilter1.type = 'allpass';
const allPassFilter2 = audioContext.createBiquadFilter();
allPassFilter2.type = 'allpass';

sourceNode.connect(allPassFilter1);
allPassFilter1.connect(allPassFilter2);
allPassFilter2.connect(outputGain);

const lfo1 = audioContext.createOscillator();
const lfo2 = audioContext.createOscillator();

lfo1.type = 'sine';
lfo1.frequency.value = 15;
lfo2.type = 'sine';
lfo2.frequency.value = 15;

const depth1 = audioContext.createGain();
const depth2 = audioContext.createGain();

lfo1.connect(depth1);
lfo2.connect(depth2);

depth1.gain.value = 300;
depth2.gain.value = 300;

depth1.connect(allPassFilter1.frequency);
depth2.connect(allPassFilter2.frequency);

lfo1.start();
lfo2.start();

sourceNode.start()`}</code>
      </pre>
      <button
        onClick={() => {
          sourceNode.start();
        }}
      >
        Phaser
      </button>
    </>
  );
};

export default Phaser;
