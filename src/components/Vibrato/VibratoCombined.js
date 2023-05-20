import * as Tone from 'tone';
import Vibrato from './Vibrato';

// vibrato
const vibrato = new Tone.Vibrato(5, 0.85).toDestination();

let playerVibrato = new Tone.Player('./audio/AcGtr.wav').connect(vibrato);

const VibratoCombined = () => {
  return (
    <>
      <h2>Vibrato</h2>
      <section className='basicSection'>
        <pre>
          <code>
            {`const vibrato = new Tone.Vibrato(5, 0.85).toDestination();

let playerVibrato = new Tone.Player('./audio/AcGtr.wav').connect(vibrato);

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
