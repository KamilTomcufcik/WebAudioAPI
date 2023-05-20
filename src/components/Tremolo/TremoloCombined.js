import * as Tone from 'tone';
import Tremolo from './Tremolo';

// tremolo
const tremolo = new Tone.Tremolo(10, 0.75).toDestination().start();

let player = new Tone.Player('./audio/AcGtr.wav').connect(tremolo);

const TremoloCombined = () => {
  return (
    <>
      <h2>Tremolo</h2>
      <section className='basicSection'>
        <pre>
          <code>
            {`const tremolo = new Tone.Tremolo(10, 0.75).toDestination().start();

let player = new Tone.Player('./audio/AcGtr.wav').connect(tremolo);

player.start();`}
          </code>
        </pre>
        <button
          onClick={() => {
            player.start();
          }}
        >
          Tone.js Tremolo
        </button>

        <Tremolo />
      </section>
    </>
  );
};

export default TremoloCombined;
