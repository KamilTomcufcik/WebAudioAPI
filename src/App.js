import './App.css';
import ChorusCombined from './components/Chorus/ChorusCombined';
import PhaserCombined from './components/Phaser/PhaserCombined';
import VibratoCombined from './components/Vibrato/VibratoCombined';
import PingPongDelayCombined from './components/PingPongDelay/PingPongDelayCombined';
import FeedbackDelayCombined from './components/FeedbackDelay/FeedbackDelayCombined';
import ConvolverReverbCombined from './components/ConvolverReverb/ConvolverReverbCombined';
import GraphicEQCombined from './components/GraphicEQ/GraphicEQCombined';
import TremoloCombined from './components/Tremolo/TremoloCombined';
import ParametricEQCombined from './components/ParametricEQ/ParametricEQCombined';
import ChebyshevCombined from './components/Chebyshev/ChebyshevCombined';

function App() {
  return (
    <>
      <header className='App-header'>
        <h1>Web Audio API a Tone.js</h1>
      </header>
      <main>
        <TremoloCombined />
        <VibratoCombined />
        <ChorusCombined />
        <PhaserCombined />
        <PingPongDelayCombined />
        <FeedbackDelayCombined />
        <ConvolverReverbCombined />
        <GraphicEQCombined />
        <ParametricEQCombined />
        <ChebyshevCombined />
      </main>
      <footer>
        <h3>Tomcufcik Kamil</h3>
      </footer>
    </>
  );
}

export default App;
