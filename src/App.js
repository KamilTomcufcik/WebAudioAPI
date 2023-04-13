import { useState } from 'react';
import './App.css';
import CustomInput from './components/CustomInput';

const context = new AudioContext();

// white noise
const noiseDuration = 4;
const bufferSize = context.sampleRate * noiseDuration;
const noiseBuffer = new AudioBuffer({
  length: bufferSize,
  sampleRate: context.sampleRate,
});

const data = noiseBuffer.getChannelData(0);
for (let i = 0; i < bufferSize; i++) {
  data[i] = Math.random() * 2 - 1;
}

const noise = new AudioBufferSourceNode(context, {
  buffer: noiseBuffer,
});

// vytvaranie vsetkych modulov + nad tymto je noise

const source = context.createBufferSource();
let gain1 = context.createGain();
let gainOSC = context.createGain();
let osc1 = context.createOscillator();
let osc2 = context.createOscillator();
let panner1 = context.createStereoPanner();
panner1.pan.value = 0;
gain1.gain.value = 0.1;
osc1.type = 'sine';
osc2.type = 'triangle';
osc1.frequency.value = 250;
osc2.frequency.value = 50;
gainOSC.gain.value = 0.01;

// prepajanie vsetkych modulov
// source.connect(gain1);

noise.connect(gain1);
source.connect(gain1);
osc1.connect(gainOSC);
osc2.connect(gainOSC);
gain1.connect(panner1);
gainOSC.connect(panner1);
panner1.connect(context.destination);

// const pannerValues = {};

// '/src/audio-basics_outfoxing.mp3'
// '/src/Vindata - All I Really Need (feat. Kenzie May).mp3'
// '/src/cello-double-2.wav'

const myUrl = [
  new URL('./audio-basics_outfoxing.mp3', import.meta.url),
  new URL('./AcousticGuitarSQT01.wav', import.meta.url),
];

function App() {
  const [osc1Freq, setOsc1Freq] = useState(osc1.frequency.value);
  const [osc1Type, setOsc1Type] = useState(osc1.type);
  const [gain1Value, setGain1Value] = useState(gain1.gain.value);
  const [panner1Value, setPanner1Value] = useState(panner1.pan.value);

  const [myUrlIndex, setMyUrlIndex] = useState(0);

  const audioPlay = async () => {
    const audioBuffer = await fetch(myUrl[myUrlIndex])
      .then((res) => res.arrayBuffer())
      .then((ArrayBuffer) => context.decodeAudioData(ArrayBuffer));
    source.buffer = audioBuffer;

    const audioSource = document.getElementById('audioElement');
    console.log(audioSource);
    const sourceMediaElement = context.createMediaElementSource(audioSource);
    sourceMediaElement.connect(gain1);

    audioSource.play();

    source.start();
    osc1.start();
    // osc2.start();
    // noise.start();
    //gain1.gain.exponentialRampToValueAtTime(0.5, context.currentTime + 1);
  };

  const changeFreq = (freq) => {
    let { value } = freq.target;
    console.log(value);
    setOsc1Freq(value);
    osc1.frequency.value = value;
    if (value > 200) osc2.frequency.value = value - 200;

    // console.log(osc1.type);
    // console.log(osc2.type);
  };

  const changeGain = (g) => {
    let { value } = g.target;
    setGain1Value(value);
    gain1.gain.value = value;
  };

  const changePanner = (p) => {
    let { value } = p.target;
    if (value >= 1) {
      value = 1;
    } else if (value <= -1) {
      value = -1;
    }
    setPanner1Value(value);
    console.log(panner1.pan.value);
    console.log(panner1Value);
    panner1.pan.value = value;
  };

  const changeType = (t) => {
    let { id } = t.target;
    setOsc1Type(id);
    osc1.type = id;
  };

  const linkSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <header className='App-header'>
        <h1>Web Audio API</h1>
      </header>
      <section className='section1'>
        <h2>h2 nadpis</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dictum.
        </p>
        {/*  */}
        <button id='start' onClick={audioPlay}>
          play sound
        </button>
        <button
          id='stop'
          onClick={() => {
            osc1.stop();
            // osc2.stop();
            source.stop();
            noise.stop();
          }}
        >
          stop playing
        </button>
        <p>zmena frekvencie oscilatora</p>
        <input
          type='range'
          id='freq-slider'
          max='5000'
          // step='5'
          onChange={changeFreq}
          value={osc1Freq}
        />
        <p>
          oscillator 1 {osc1Freq} ({osc1Type})
        </p>
        <p>oscillator 2 {osc1Freq - 200 > 0 ? osc1Freq - 200 : 0} (triangle)</p>
        <div className='changeButtons'>
          <button id='sine' onClick={changeType}>
            sine
          </button>
          <button id='triangle' onClick={changeType}>
            triangle
          </button>
          <button id='square' onClick={changeType}>
            square
          </button>
        </div>
        <select
          className='audioSelect'
          value={myUrlIndex}
          onChange={(e) => {
            setMyUrlIndex(e.target.value);
          }}
        >
          <option value={0}>basics_outfoxing</option>
          <option value={1}>AcousticGuitarSQT01</option>
        </select>
        <input
          placeholder='placeholder'
          className='classicInput'
          onSubmit={linkSubmit}
        />
        <p>zmena hlasitosti skladby a sumu</p>
        <input
          type='range'
          id='volume-slider'
          onChange={changeGain}
          value={gain1Value}
          min='0'
          max='1'
          step='0.01'
        />
        <p>zmena pannera</p>

        <CustomInput
          changeValue={changePanner}
          value={panner1Value}
          min='-1.01'
          max='1.01'
          step='0.01'
        />
        <p>{panner1Value}</p>
        <button
          onClick={() => {
            setPanner1Value(0);
            panner1.pan.value = 0;
          }}
        >
          reset pannera
        </button>
        <audio
          controls
          id='audioElement'
          src='https://soundcloud.com/night_lovell/alone'
        ></audio>
      </section>
      <footer>
        <h3>Tomcufcik Kamil</h3>
      </footer>
    </>
  );
}

export default App;
