import * as Tone from 'tone';
import ConvolverReverb from './ConvolverReverb';

// reverb
const reverb = new Tone.Reverb({
  decay: 4,
  wet: 0.5,
}).toDestination();

const impulseResponse = new Tone.ToneAudioBuffer('/audio/impulse_belgium.wav');
reverb.generate().then(() => {}, impulseResponse);

let playerReverb = new Tone.Player('./audio/AcGtr.wav').connect(reverb);

const ConvolverReverbCombined = () => {
  return (
    <>
      <section className='basicSection'>
        <h2>Reverb</h2>
        <pre>
          <code>{`const reverb = new Tone.Reverb({
  decay: 4,
  wet: 0.5,
}).toDestination();

const impulseResponse = new Tone.ToneAudioBuffer('/audio/impulse_belgium.wav');
reverb.generate().then(() => {}, impulseResponse);

let playerReverb = new Tone.Player('./audio/AcGtr.wav').connect(reverb);

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
