import { useState } from 'react';

// Create an AudioContext
const audioContext = new AudioContext();

const source = audioContext.createBufferSource();

const loadBuffer = async () => {
  const audioBuffer = await fetch(new URL('./AcGtr.wav', import.meta.url))
    .then((res) => res.arrayBuffer())
    .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
  source.buffer = audioBuffer;
};

loadBuffer();

const inputGain = audioContext.createGain();
inputGain.gain.value = 0.2;
source.connect(inputGain);
inputGain.connect(audioContext.destination);

// Create an LFO (Low Frequency Oscillator) for modulating the tremolo gain
const lfo = audioContext.createOscillator();
lfo.type = 'sine';
lfo.frequency.value = 15; // adjust this value to change the tremolo rate
lfo.start();

// Adjust the depth and offset of the tremolo effect by setting the initial gain value and the depth of modulation
const depth = 0.75; // adjust this value to change the depth of the tremolo effect
const offset = 1 - depth;

// Create a GainNode for controlling the tremolo effect
const tremoloGainNode = audioContext.createGain();
tremoloGainNode.gain.value = offset;
tremoloGainNode.connect(audioContext.destination);

// Connect the LFO to the tremolo GainNode
// lfo.connect(tremoloGainNode.gain);
lfo.connect(tremoloGainNode.gain);

// Apply the tremolo effect to the audio by connecting the audio buffer source node to the tremolo gain node
source.connect(tremoloGainNode);
tremoloGainNode.connect(inputGain);
// source.connect(audioContext.destination);

let temp = false;

const Tremolo = () => {
  const [startButton, setStartButton] = useState(true);

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

const tremoloGainNode = audioContext.createGain();
tremoloGainNode.connect(audioContext.destination);

const lfo = audioContext.createOscillator();
lfo.type = 'sine';
lfo.frequency.value = 15; 
lfo.start();

lfo.connect(tremoloGainNode.gain);

const depth = 0.75; 
const offset = 1 - depth;
tremoloGainNode.gain.value = offset;

source.connect(tremoloGainNode);

source.start();`}</code>
      </pre>
      {startButton && (
        <button
          onClick={() => {
            if (temp === false) {
              source.start();
              // zmenaAudia();
            } else {
              audioContext.resume();
            }
            setStartButton(false);
          }}
        >
          start
        </button>
      )}
      {!startButton && (
        <button
          onClick={() => {
            audioContext.suspend();
            setStartButton(true);
            temp = true;
          }}
        >
          pause
        </button>
      )}
    </>
  );
};

export default Tremolo;
