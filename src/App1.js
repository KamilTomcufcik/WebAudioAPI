import * as Tone from 'tone';
import './App.css';
import ButtonList from './ButtonList';
import ChorusCombined from './components/Chorus/ChorusCombined';
import PhaserCombined from './components/Phaser/PhaserCombined';
import VibratoCombined from './components/Vibrato/VibratoCombined';
import PingPongDelayCombined from './components/PingPongDelay/PingPongDelayCombined';
import FeedbackDelayCombined from './components/FeedbackDelay/FeedbackDelayCombined';
import ConvolverReverbCombined from './components/ConvolverReverb/ConvolverReverbCombined';
import PitchShiftCombined from './components/PitchShift/PitchShiftCombined';
import GraphicEQCombined from './components/GraphicEQ/GraphicEQCombined';
import TremoloCombined from './components/Tremolo/TremoloCombined';
import ParametricEQCombined from './components/ParametricEQ/ParametricEQCombined';
import ChebyshevCombined from './components/Chebyshev/ChebyshevCombined';

// prva ukazka
const synth = new Tone.Synth().toDestination();

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
        <TremoloCombined />
        <VibratoCombined />
        <ChorusCombined />
        <PitchShiftCombined />
        <PhaserCombined />
        <PingPongDelayCombined />
        <FeedbackDelayCombined />
        <ConvolverReverbCombined />
        <GraphicEQCombined />
        <ParametricEQCombined />
        <ChebyshevCombined />
      </main>
      <footer>
        <h3>Tomcufcik Kamil</h3>
      </footer>
    </>
  );
}

export default App1;
