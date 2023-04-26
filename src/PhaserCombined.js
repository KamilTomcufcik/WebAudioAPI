import * as Tone from 'tone';
import Phaser from './Phaser';

// phaser
const phaser = new Tone.Phaser({
  frequency: 15,
  octaves: 5,
  baseFrequency: 1000,
  stages: 2,
}).toDestination();

let playerPhaser;

const loadBuffer4 = async () => {
  const audioContext = new AudioContext();
  const audioBuffer = await fetch(new URL('./AcGtr.wav', import.meta.url))
    .then((res) => res.arrayBuffer())
    .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
  playerPhaser = new Tone.Player(audioBuffer).connect(phaser);
};

loadBuffer4();

const PhaserCombined = () => {
  return (
    <>
      <h2>Phaser</h2>
      <section className='basicSection'>
        <pre>
          <code>
            {`const phaser = new Tone.Phaser({
  frequency: 15,
  octaves: 5,
  baseFrequency: 1000,
  stages: 2,
}).toDestination();

let playerPhaser;

const loadBuffer4 = async () => {
  const audioContext = new AudioContext();
  const audioBuffer = await fetch(new URL('./AcGtr.wav', import.meta.url))
    .then((res) => res.arrayBuffer())
    .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
  playerPhaser = new Tone.Player(audioBuffer).connect(phaser);
};

loadBuffer4();

playerPhaser.start();`}
          </code>
        </pre>
        <button
          onClick={() => {
            playerPhaser.start();
          }}
        >
          Tone.js Phaser
        </button>
        <Phaser />
      </section>
    </>
  );
};

export default PhaserCombined;
