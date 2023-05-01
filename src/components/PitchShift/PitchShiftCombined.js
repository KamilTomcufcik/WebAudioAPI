import * as Tone from 'tone';
import PitchShift from './PitchShift';

// pitch shift
const pitchShift = new Tone.PitchShift(6).toDestination();

let playerPitchShift = new Tone.Player('./audio/AcGtr.wav').connect(pitchShift);

const PitchShiftCombined = () => {
  return (
    <>
      <h2>Pitch Shift</h2>
      <section className='basicSection'>
        <pre>
          <code>
            {`const pitchShift = new Tone.PitchShift(6).toDestination();

let playerPitchShift = new Tone.Player('./audio/AcGtr.wav').connect(pitchShift);

playerVibrato.start();`}
          </code>
        </pre>
        <button
          onClick={() => {
            playerPitchShift.start();
          }}
        >
          Tone.js Pitch Shift
        </button>
        <PitchShift />
      </section>
    </>
  );
};

export default PitchShiftCombined;
