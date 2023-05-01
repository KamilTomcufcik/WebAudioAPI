import * as Tone from 'tone';
import Phaser from './Phaser';

// phaser
const phaser = new Tone.Phaser({
  frequency: 15,
  octaves: 5,
  baseFrequency: 1000,
  stages: 2,
}).toDestination();

let playerPhaser = new Tone.Player('./audio/AcGtr.wav').connect(phaser);

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

let playerPhaser = new Tone.Player('./audio/AcGtr.wav').connect(phaser);

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
