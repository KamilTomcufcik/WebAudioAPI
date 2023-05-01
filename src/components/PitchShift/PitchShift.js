function pitchShift() {
  // Create an AudioContext instance
  const audioContext = new AudioContext();

  // Create audio buffer source
  const source = audioContext.createBufferSource();

  // Load audio file into audio buffer source
  const loadBuffer = async () => {
    const audioBuffer = await fetch('./audio/AcGtr.wav')
      .then((res) => res.arrayBuffer())
      .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));
    source.buffer = audioBuffer;
  };

  loadBuffer();

  const delayTime = 0.03;
  const maxDelay = 1;
  const minLFOFreq = 0;
  const maxLFOFreq = 0.1;
  const lfoType = 'sawtooth';
  const feedbackDelay = audioContext.createDelay(maxDelay);
  feedbackDelay.delayTime.value = delayTime;

  const lfoA = audioContext.createOscillator();
  lfoA.type = lfoType;
  lfoA.frequency.value = minLFOFreq;
  lfoA.start();

  const lfoB = audioContext.createOscillator();
  lfoB.type = lfoType;
  lfoB.frequency.value = minLFOFreq;

  const fftSize = 4096;
  const periodicWaveSize = fftSize / 2;

  const real = new Float32Array(periodicWaveSize);
  const imag = new Float32Array(periodicWaveSize);

  const phase = 180;

  for (let n = 1; n < periodicWaveSize; ++n) {
    const piFactor = 2 / (n * Math.PI);
    const b = piFactor * (n & 1 ? 1 : -1);
    real[n] = -b * Math.sin(phase * n);
    imag[n] = b * Math.cos(phase * n);
  }

  const customWave = audioContext.createPeriodicWave(real, imag);
  lfoB.setPeriodicWave(customWave);
  lfoB.start();

  const delayA = audioContext.createDelay(maxDelay);
  const delayB = audioContext.createDelay(maxDelay);

  const input = audioContext.createGain();
  const output = audioContext.createGain();

  input.connect(delayA);
  input.connect(delayB);

  delayA.connect(output);
  delayB.connect(output);

  lfoA.connect(delayA.delayTime);
  lfoB.connect(delayB.delayTime);

  const setPitchShift = (pitchShift) => {
    const cents = Math.log2(pitchShift) * 1200;
    lfoA.frequency.value = Math.abs(cents / 12000) * maxLFOFreq;
    lfoB.frequency.value = Math.abs(cents / 12000) * maxLFOFreq;
  };

  const setWindowSize = (windowSize) => {
    feedbackDelay.delayTime.value = delayTime + windowSize;
  };

  feedbackDelay.connect(output); // Connect feedbackDelay to the output gain node

  const pitchShiftNode = {
    input,
    output,
    setPitchShift,
    setWindowSize,
  };

  pitchShiftNode.setPitchShift(3);
  pitchShiftNode.setWindowSize(0.1);

  input.connect(output);

  source.connect(pitchShiftNode.input);
  pitchShiftNode.output.connect(audioContext.destination);

  source.start();
}
// 
// function pitchshift2() {
//   const audioCtx = new AudioContext();

//   const source = audioCtx.createBufferSource();

//   // Load audio file into audio buffer source
//   const loadBuffer = async () => {
//     const audioBuffer = await fetch(new URL('./AcGtr.wav', import.meta.url))
//       .then((res) => res.arrayBuffer())
//       .then((ArrayBuffer) => audioCtx.decodeAudioData(ArrayBuffer));
//     source.buffer = audioBuffer;
//   };

//   loadBuffer();

//   const volumeNode = audioCtx.createGain();
//   const delayNode = audioCtx.createDelay();
//   const oscillatorNode = audioCtx.createOscillator();

//   volumeNode.gain.value = 1.0; // Set the initial volume to full
//   delayNode.delayTime.value = 0.05; // delayTime is the amount of delay to introduce
//   oscillatorNode.type = 'sawtooth';
//   oscillatorNode.frequency.value = 0.03; // pitchShiftAmount is the amount of pitch shift to apply

//   source.connect(delayNode);
//   delayNode.connect(volumeNode);
//   volumeNode.connect(audioCtx.destination);
//   oscillatorNode.connect(delayNode.delayTime);
//   oscillatorNode.start();

//   source.start();

//   // To control the pitch shift amount in real-time:
// }

const PitchShift = () => {
  return (
    <button
      onClick={() => {
        pitchShift();
        // pitchshift2();
      }}
    >
      Pitch Shift
    </button>
  );
};

export default PitchShift;
