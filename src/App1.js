import * as Tone from 'tone';
import './App.css';
import ButtonList from './ButtonList';
import PitchShift from './PitchShift';
import ChorusCombined from './ChorusCombined';
import PhaserCombined from './PhaserCombined';
import VibratoCombined from './VibratoCombined';
import PingPongDelayCombined from './PingPongDelayCombined';
import FeedbackDelayCombined from './FeedbackDelayCombined';

// prva ukazka
const synth = new Tone.Synth().toDestination();

// pitch shift
const pitchShift = new Tone.PitchShift(12).toDestination();

let playerPitchShift;
const loadBuffer2 = async () => {
  const audioContext = new AudioContext();
  const audioBuffer = await fetch(new URL('./AcGtr.wav', import.meta.url))
    .then((res) => res.arrayBuffer())
    .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
  playerPitchShift = new Tone.Player(audioBuffer).connect(pitchShift);
};

loadBuffer2();

// reverb
const reverb = new Tone.Reverb({
  decay: 15,
  wet: 0.5,
}).toDestination();

let playerReverb;
const loadBuffer5 = async () => {
  const audioContext = new AudioContext();
  const audioBuffer = await fetch(new URL('./AcGtr.wav', import.meta.url))
    .then((res) => res.arrayBuffer())
    .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
  playerReverb = new Tone.Player(audioBuffer).connect(reverb);
};

loadBuffer5();

// compressor
// const compressor = new Tone.Compressor({
//   attack: 0.3,
//   knee: 20,
//   ratio: 10,
//   release: 0.6,
//   threshold: -50,
// }).toDestination();

// let playerCompressor;
// const loadBuffer6 = async () => {
//   const audioContext = new AudioContext();
//   const audioBuffer = await fetch(new URL('./AcGtr.wav', import.meta.url))
//     .then((res) => res.arrayBuffer())
//     .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
//   // source.buffer = audioBuffer;
//   playerCompressor = new Tone.Player(audioBuffer).toDestination().connect(compressor);
// };

// loadBuffer6();

const notes = [
  { name: 'C4', frequency: 261.63 },
  // { name: 'C#', frequency: 277.18 },
  // { name: 'D', frequency: 293.66 },
  // { name: 'D#', frequency: 311.13 },
  // { name: 'E', frequency: 329.63 },
  // { name: 'F', frequency: 349.23 },
  // { name: 'F#', frequency: 369.99 },
  // { name: 'G', frequency: 392.0 },
  // { name: 'G#', frequency: 415.3 },
  // { name: 'A', frequency: 440.0 },
  // { name: 'A#', frequency: 466.16 },
  // { name: 'B', frequency: 493.88 },
  // { name: 'C5', frequency: 523.25 },
];

function App1() {
  return (
    <>
      <header className='App-header'>
        <h1>Web Audio API a Tone.js</h1>
      </header>
      <main>
        <h2>Tone.synth</h2>
        <section className='basicSection'>
          <pre>
            <code>
              {`const synth = new Tone.Synth().toDestination();
synth.triggerAttackRelease('C4', '8n');`}
            </code>
          </pre>
          <button
            id='start'
            onClick={() => {
              synth.triggerAttackRelease('C4', '1');
            }}
          >
            Tone.js C4
          </button>
          {notes.map((notes) => (
            <ButtonList key={notes.name} notes={notes} />
          ))}
        </section>

        <VibratoCombined />
        <h2>Pitch Shift</h2>
        <section className='basicSection'>
          <button
            onClick={() => {
              playerPitchShift.start();
            }}
          >
            Tone.js Pitch Shift
          </button>
          <PitchShift />
        </section>
        <ChorusCombined />
        <PhaserCombined />
        <PingPongDelayCombined />
        <FeedbackDelayCombined />
        <section className='basicSection'>
          <h2>Reverb</h2>
          <pre>
            <code></code>
          </pre>
          <button
            onClick={() => {
              playerReverb.start();
            }}
          >
            Tone.js Reverb
          </button>
        </section>
        {/* <section className='basicSection'>
          <h2>Compressor</h2>
          <pre>
            <code></code>
          </pre>
          <button
            onClick={() => {
              playerCompressor.start();
            }}
          >
            Tone.js Compressor
          </button>
        </section> */}
      </main>
      <footer>
        <h3>Tomcufcik Kamil</h3>
      </footer>
    </>
  );
}

export default App1;
