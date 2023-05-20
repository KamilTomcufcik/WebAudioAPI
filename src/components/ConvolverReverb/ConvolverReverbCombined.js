import * as Tone from 'tone';
import ConvolverReverb from './ConvolverReverb';

const convolver = new Tone.Convolver("./audio/impulse_belgium.wav").toDestination();

let playerReverb = new Tone.Player('./audio/AcGtr.wav').connect(convolver);

const ConvolverReverbCombined = () => {
  return (
    <>
      <section className='basicSection'>
        <h2>Reverb</h2>
        <pre>
          <code>{`const convolver = new Tone.Convolver("./audio/impulse_belgium.wav").toDestination();

let playerReverb = new Tone.Player('./audio/AcGtr.wav').connect(convolver);

playerReverb.start();`}</code>
        </pre>
        <button
          onClick={() => {
            playerReverb.start();
          }}
        >
          Tone.js Reverb
        </button>
        <ConvolverReverb />
      </section>
    </>
  );
};

export default ConvolverReverbCombined;
