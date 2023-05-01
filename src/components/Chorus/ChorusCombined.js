import * as Tone from 'tone';
import Chorus from './Chorus';

// chorus
const chorus = new Tone.Chorus(4, 1.5, 0.5).toDestination().start();

let playerChorus = new Tone.Player('./audio/singing-female.wav').connect(chorus);

const ChorusCombined = () => {
  return (
    <>
      <h2>Chorus</h2>
      <section className='basicSection'>
        <pre>
          <code>
            {`const chorus = new Tone.Chorus(4, 1.5, 0.5).toDestination().start();

let playerChorus = new Tone.Player('./audio/singing-female.wav').connect(chorus);

playerChorus.start();`}
          </code>
        </pre>
        <button
          onClick={() => {
            playerChorus.start();
          }}
        >
          Tone.js Chorus
        </button>
        <Chorus />
      </section>
    </>
  );
};

export default ChorusCombined;
