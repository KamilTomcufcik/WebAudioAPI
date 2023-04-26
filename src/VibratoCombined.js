import * as Tone from 'tone';
import Vibrato from './Vibrato';

// vibrato
const vibrato = new Tone.Vibrato(5, 0.85).toDestination();

let playerVibrato;

const loadBuffer1 = async () => {
  const audioContext = new AudioContext();
  const audioBuffer = await fetch(new URL('./AcGtr.wav', import.meta.url))
    .then((res) => res.arrayBuffer())
    .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
  playerVibrato = new Tone.Player(audioBuffer).toDestination();
  playerVibrato.connect(vibrato);
};

loadBuffer1();

const VibratoCombined = () => {
  return (
    <>
      <h2>Vibrato</h2>
      <section className='basicSection'>
        <pre>
          <code>
            {`const vibrato = new Tone.Vibrato(5, 0.85).toDestination();

let playerVibrato;

const loadBuffer1 = async () => {
  const audioContext = new AudioContext();
  const audioBuffer = await fetch(new URL('./AcGtr.wav', import.meta.url))
    .then((res) => res.arrayBuffer())
    .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
  playerVibrato = new Tone.Player(audioBuffer).toDestination();
  playerVibrato.connect(vibrato);
};

loadBuffer1();

playerVibrato.start();`}
          </code>
        </pre>
        <button
          onClick={() => {
            playerVibrato.start();
          }}
        >
          Tone.js Vibrato
        </button>
        <Vibrato />
      </section>
    </>
  );
};

export default VibratoCombined;
