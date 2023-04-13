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

// Create a GainNode for controlling the tremolo effect
const tremoloGainNode = audioContext.createGain();
tremoloGainNode.connect(audioContext.destination);

// Create an LFO (Low Frequency Oscillator) for modulating the tremolo gain
const lfo = audioContext.createOscillator();
lfo.type = 'sine';
lfo.frequency.value = 15; // adjust this value to change the tremolo rate
lfo.start();

// Connect the LFO to the tremolo GainNode
lfo.connect(tremoloGainNode.gain);

// Adjust the depth and offset of the tremolo effect by setting the initial gain value and the depth of modulation
const depth = 0.75; // adjust this value to change the depth of the tremolo effect
const offset = 1 - depth;
tremoloGainNode.gain.value = offset;

// Apply the tremolo effect to the audio by connecting the audio buffer source node to the tremolo gain node
source.connect(tremoloGainNode);
// source.connect(audioContext.destination);

// Adjust the depth and offset of the tremolo effect over time by updating the gain value of the tremolo gain node
// setInterval(function () {
//   const depthValue = depth / 2; // adjust this value to change the shape of the tremolo effect
//   tremoloGainNode.gain.setValueAtTime(offset + depthValue, audioContext.currentTime);
//   tremoloGainNode.gain.setValueAtTime(offset - depthValue, audioContext.currentTime + (1 / lfo.frequency.value / 2));
// }, 0);

// const zmenaAudia = () => {
//   source.start();
//   const now = audioContext.currentTime;
//   const depthValue = depth / 2; // adjust this value to change the shape of the tremolo effect
//   tremoloGainNode.gain.setValueAtTime(offset + depthValue, now);
//   console.log(tremoloGainNode.gain.value);
//   tremoloGainNode.gain.linearRampToValueAtTime(offset - depthValue, now + 1 / lfo.frequency.value / 2);
//   console.log(tremoloGainNode.gain.value);
//   tremoloGainNode.gain.setValueAtTime(offset - depthValue, now + 1 / lfo.frequency.value);
//   console.log(tremoloGainNode.gain.value);
//   tremoloGainNode.gain.linearRampToValueAtTime(offset + depthValue, now + 1 / lfo.frequency.value + 1 / lfo.frequency.value / 2);
//   console.log(tremoloGainNode.gain.value);
//   tremoloGainNode.gain.setValueAtTime(offset + depthValue, now + 2 / lfo.frequency.value);
//   console.log(tremoloGainNode.gain.value);
//   tremoloGainNode.gain.linearRampToValueAtTime(offset - depthValue, now + 2 / lfo.frequency.value + 1 / lfo.frequency.value / 2);
//   console.log(tremoloGainNode.gain.value);
//   tremoloGainNode.gain.setValueAtTime(offset - depthValue, now + 3 / lfo.frequency.value);
//   console.log(tremoloGainNode.gain.value);
//   tremoloGainNode.gain.linearRampToValueAtTime(offset + depthValue, now + 3 / lfo.frequency.value + 1 / lfo.frequency.value / 2);

//   console.log(tremoloGainNode.gain.value);
// };

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
