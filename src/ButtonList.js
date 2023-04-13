const ButtonList = (props) => {
  const createOnClickMethod = () => {
    const context = new AudioContext();
    let gain1 = context.createGain();
    gain1.gain.value = 0.5;
    const noteOscillator = context.createOscillator();
    noteOscillator.frequency.setValueAtTime(props.notes.frequency, context.currentTime);

    const attackTime = 0.1;
    const decayTime = 0.2;
    const sustainLevel = 0.7;
    const releaseTime = 0.8;

    const now = context.currentTime;
    const noteGain = context.createGain();
    noteGain.gain.setValueAtTime(0, 0);
    noteGain.gain.linearRampToValueAtTime(1, now + attackTime);
    noteGain.gain.linearRampToValueAtTime(sustainLevel, now + attackTime + decayTime);
    noteGain.gain.setValueAtTime(sustainLevel, now + 1 - releaseTime);
    noteGain.gain.linearRampToValueAtTime(0, now + 1.1);

    noteOscillator.connect(noteGain);
    noteGain.connect(gain1);
    noteOscillator.start();
    gain1.connect(context.destination);
    noteOscillator.stop(context.currentTime + 1);
    console.log(gain1.gain.value);
    console.log(noteGain.gain.value);
  };

  return (
    <>
      <pre>
        <code>
          {`const context = new AudioContext();
let gain1 = context.createGain();
gain1.gain.value = 0.5;
const noteOscillator = context.createOscillator();
const freq = 261.63;
noteOscillator.frequency.setValueAtTime(freq, context.currentTime);

const attackTime = 0.1;
const decayTime = 0.2;
const sustainLevel = 0.7;
const releaseTime = 0.8;

const now = context.currentTime;
const noteGain = context.createGain();
noteGain.gain.setValueAtTime(0, 0);
noteGain.gain.linearRampToValueAtTime(1, now + attackTime);
noteGain.gain.linearRampToValueAtTime(sustainLevel, now + attackTime + decayTime);
noteGain.gain.setValueAtTime(sustainLevel, now + 1 - releaseTime);
noteGain.gain.linearRampToValueAtTime(0, now + 1.1);

noteOscillator.connect(noteGain);
noteGain.connect(gain1);
noteOscillator.start();
gain1.connect(context.destination);
noteOscillator.stop(context.currentTime + 1);`}
        </code>
      </pre>
      <button onClick={createOnClickMethod}>{props.notes.name}</button>
    </>
  );
};

export default ButtonList;
