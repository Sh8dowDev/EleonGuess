/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, useMemo, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, 
  Droplets, 
  Zap, 
  Wind, 
  Mountain, 
  Skull, 
  Ghost, 
  Sun, 
  Moon, 
  Snowflake,
  RotateCcw,
  Play,
  Trophy,
  Timer as ClockIcon,
  Volume2,
  VolumeX
} from 'lucide-react';

interface Eleon {
  id: string;
  name: string;
  icon?: any;
  image?: string;
  color: string;
  description: string;
}

const ELEONS: Eleon[] = [
  { 
    id: '0', 
    name: 'SQUIPUP', 
    image: 'https://cdn.discordapp.com/attachments/1443295104537460787/1443296309833371780/Squipup.png?ex=69f2ec2f&is=69f19aaf&hm=d2e04ea9558e8647cb3d89c30220f948b96f9787d6c9ee5b9c9e182babb30238&', 
    color: '#60a5fa', 
    description: 'The Water Squip' 
  },
  { 
    id: '1', 
    name: 'LILIBUD', 
    image: 'https://cdn.discordapp.com/attachments/1443295104537460787/1443296973112475749/Lilibud.png?ex=69f2eccd&is=69f19b4d&hm=87e540f86cb3d1332606657d5634cb6f3d8757d55d3945775278926fc9bbbd8d&', 
    color: '#4ade80', 
    description: 'The Nature Bud' 
  },
  { 
    id: '2', 
    name: 'TIMPEL', 
    image: 'https://cdn.discordapp.com/attachments/1443295104537460787/1443297077961556019/Timpel.png?ex=69f2ece6&is=69f19b66&hm=fa974668508ae01762ce0b5db91b5c507aec6b72c9aebf3fd328303d8d34636a&', 
    color: '#fbbf24', 
    description: 'The Time Pel' 
  },
  { 
    id: '3', 
    name: 'FREEVER', 
    image: 'https://cdn.discordapp.com/attachments/1443295104537460787/1443297273781157908/Freever.png?ex=69f2ed15&is=69f19b95&hm=b27500fedb0566a46c8338282633719822adc39b4ffd5737e6cbb1b456d9348b&', 
    color: '#93c5fd', 
    description: 'The Cold Freeze' 
  },
  { 
    id: '4', 
    name: 'MORFUR', 
    image: 'https://cdn.discordapp.com/attachments/1443295104537460787/1443297464525389966/Morfur.png?ex=69f2ed42&is=69f19bc2&hm=72892d585ec7f76c17809560d306974285d9f2ac4611c63ff8bda9628adca278&', 
    color: '#a78bfa', 
    description: 'The Mystic Morph' 
  },
  { 
    id: '5', 
    name: 'JESTIGATOR', 
    image: 'https://cdn.discordapp.com/attachments/1443295104537460787/1443297617537794220/Jestigator.png?ex=69f2ed67&is=69f19be7&hm=c4ac63db8a19879f497631e4b9fe3375a8b9b7415c519ff93c5538788d036e50&', 
    color: '#f472b6', 
    description: 'The Prank Master' 
  },
  { 
    id: '6', 
    name: 'PYRURNACE', 
    image: 'https://cdn.discordapp.com/attachments/1443295104537460787/1443297773037293808/Pyrurnace.png?ex=69f2ed8c&is=69f19c0c&hm=d2a3af9732433222b0300288034109db644f30337a02e658d3d5cc7d5a125543&', 
    color: '#f87171', 
    description: 'The Raging Fire' 
  },
  { 
    id: '7', 
    name: 'HEIRITE', 
    image: 'https://cdn.discordapp.com/attachments/1443295104537460787/1443297903417229354/Heirite.png?ex=69f2edab&is=69f19c2b&hm=1c74470e39959ba622559963edcb9a645552b6a36d4c3bdee4b3e6af0414276a&', 
    color: '#e0e7ff', 
    description: 'The Crystal Heir' 
  },
  { 
    id: '8', 
    name: 'BASTOLITH', 
    image: 'https://cdn.discordapp.com/attachments/1443295104537460787/1443298138721878239/Bastolith.png?ex=69f2ede3&is=69f19c63&hm=3a5df92e540ccc5fbd4602a67f5b047494e6d9e88abc42821703d28434b16387&', 
    color: '#78350f', 
    description: 'The Ancient Stone' 
  },
  { 
    id: '9', 
    name: 'BOOGIHOP', 
    image: 'https://cdn.discordapp.com/attachments/1443295104537460787/1443298234301681685/Boogihop.png?ex=69f2edfa&is=69f19c7a&hm=8f094d376193f3bbb3668a76e2c2fd56145fea63f4855af0c6aaebd7ac6faa8f&', 
    color: '#f472b6', 
    description: 'The Spooky Bunny' 
  },
  { 
    id: '10', 
    name: 'SYRINFLY', 
    image: 'https://cdn.discordapp.com/attachments/1443295104537460787/1443299721312469052/Syrinfly.png?ex=69f2ef5c&is=69f19ddc&hm=e05a5d85dbc38ce1b5a126cae5a5af5a8e3f26a057f0cb7648decbd8cf0d7176&', 
    color: '#4ade80', 
    description: 'The Nature Flier' 
  },
  { 
    id: '11', 
    name: 'IGNIRAM', 
    image: 'https://cdn.discordapp.com/attachments/1443295104537460787/1443299793085530142/Igniram.png?ex=69f2ef6d&is=69f19ded&hm=0e088efc1059d6f2c89f238819437676d9663b947daee94834714414b0469134&', 
    color: '#f87171', 
    description: 'The Fire Ram' 
  },
  { 
    id: '12', 
    name: 'LUNALIS', 
    image: 'https://cdn.discordapp.com/attachments/1443295104537460787/1443299849671020655/Lunalis.png?ex=69f2ef7b&is=69f19dfb&hm=9cad13c1d08c8e0dca6fc0137d57e0bf2c2149d1ec47295c07fd467eec04b942&', 
    color: '#93c5fd', 
    description: 'The Moon Spirit' 
  },
  { 
    id: '13', 
    name: 'LURMAW', 
    image: 'https://cdn.discordapp.com/attachments/1443295104537460787/1443299893195182264/Lurmaw.png?ex=69f2ef85&is=69f19e05&hm=1209ddcc80b0ffb24032a629b73252242742b106b5ff60fc3c8a685ba3871491&', 
    color: '#334155', 
    description: 'The Deep Shadows' 
  },
  { 
    id: '14', 
    name: 'ROOTITAN', 
    image: 'https://cdn.discordapp.com/attachments/1443295104537460787/1443300300839714816/Rootitan.png?ex=69f2efe6&is=69f19e66&hm=d5eacf6e42dbe9456d4da4d50552848a861b14666c7b2e83a47350c0db308b23&', 
    color: '#166534', 
    description: 'The Forest Guardian' 
  },
  { 
    id: '15', 
    name: 'VICTRIOUS', 
    image: 'https://cdn.discordapp.com/attachments/1443295104537460787/1443300525410877541/Victrious.png?ex=69f2f01c&is=69f19e9c&hm=a8ea38056c659350e3be33e80eada482c2d70394e8b063fae1d006e26040a3b9&', 
    color: '#fbbf24', 
    description: 'The Triumphant' 
  },
  { 
    id: '16', 
    name: 'PYRAGLYPH', 
    image: 'https://cdn.discordapp.com/attachments/1443295104537460787/1443300628674642060/Pyraglyph.png?ex=69f2f035&is=69f19eb5&hm=0caa097d322a643f218fafe3b626c4c5ce190f1db41a4b75440ae0d4e5f8f47b&', 
    color: '#dc2626', 
    description: 'The Ancient Flame' 
  },
  { 
    id: '17', 
    name: 'NINARK', 
    image: 'https://cdn.discordapp.com/attachments/1443295104537460787/1443300771620851915/Ninark.png?ex=69f2f057&is=69f19ed7&hm=49ca789cea62b899c05102ef5a166b2f16065ed85aaab71923811c6f0e67c744&', 
    color: '#1e293b', 
    description: 'The Silent Shadow' 
  },
  { 
    id: '18', 
    name: 'RHIRON', 
    image: 'https://cdn.discordapp.com/attachments/1443295104537460787/1443300816449437736/Rhiron.png?ex=69f2f061&is=69f19ee1&hm=ded1d981c2017be9859bd5bf9b9c9e328162b6044facfe4d440f21bbe53075d2&', 
    color: '#475569', 
    description: 'The Iron Horn' 
  },
  { 
    id: '19', 
    name: 'ROPYRUS', 
    image: 'https://cdn.discordapp.com/attachments/1443295104537460787/1443300954672861285/Ropyrus.png?ex=69f2f082&is=69f19f02&hm=3d9a25a00c357d01d873e76d16671a8a0eb4f80645298268810caf6044fce3dd&', 
    color: '#f87171', 
    description: 'The Burning Coil' 
  }
];

type GameStatus = 'MENU' | 'PLAYING' | 'FINISHED';

export default function App() {
  const [status, setStatus] = useState<GameStatus>('MENU');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guess, setGuess] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentEleon = ELEONS[currentIndex];

  const startGame = () => {
    setStatus('PLAYING');
    setCurrentIndex(0);
    setGuess('');
    setStartTime(Date.now());
    setIsRevealed(false);
    setIsShaking(false);
    setErrorCount(0);
    
    // Play the OST
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log("Audio playback failed:", e));
    }
  };

  const elapsedSeconds = useMemo(() => {
    if (status === 'FINISHED') {
      if (audioRef.current) audioRef.current.pause();
      return ((endTime - startTime) / 1000).toFixed(2);
    }
    return 0;
  }, [status, startTime, endTime]);

  const handleGuess = (e: FormEvent) => {
    e.preventDefault();
    if (guess.toLowerCase().trim() === currentEleon.name.toLowerCase()) {
      nextEleon();
    } else {
      setErrorCount(prev => prev + 1);
      setGuess('');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);
    }
  };

  const nextEleon = () => {
    setIsRevealed(true);
    setTimeout(() => {
      if (currentIndex < ELEONS.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setGuess('');
        setIsRevealed(false);
      } else {
        setEndTime(Date.now());
        setStatus('FINISHED');
      }
    }, 1000);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : 0.45;
    }
  }, [isMuted]);

  useEffect(() => {
    if (status === 'PLAYING' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [status, currentIndex]);

  // Framer motion variants for "stepping" animation (24fps feel)
  const stepVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.2, 
        ease: "linear"
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 1.05,
      transition: { 
        duration: 0.1 
      } 
    }
  };

  return (
    <div className="min-h-screen bg-blue-500 flex flex-col p-6 md:p-12 selection:bg-yellow-400 selection:text-blue-900 relative overflow-hidden">
      {/* Subtle Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:32px_32px] z-0"></div>
      
      <div className="relative z-10 flex-1 flex flex-col max-w-6xl mx-auto w-full">
        <header className="mb-8 border-b-8 border-white pb-8 flex flex-col items-center">
          <div className="flex flex-col md:flex-row items-center justify-between w-full space-y-6 md:space-y-0">
            <div className="flex items-center space-x-6">
              <img src="/logo.png" alt="Eleon Logo" className="h-20 md:h-28 w-auto object-contain drop-shadow-2xl" />
              <div className="flex flex-col">
                <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight text-white drop-shadow-[0_6px_0_rgba(30,58,138,1)]">Guess</h1>
                <span className="bg-yellow-400 text-blue-900 inline-block self-start text-[14px] px-4 py-1 font-black rounded-full shadow-lg transform -rotate-2 mt-1">UNOFFICIAL</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-8">
              <div className="text-right">
                <p className="text-sm text-blue-100 font-black uppercase mb-1 drop-shadow-sm opacity-60">Version 2.0.60</p>
                {status === 'PLAYING' && (
                  <div className="bg-white/20 px-6 py-2 rounded-2xl border-4 border-white">
                    <div className="text-xs uppercase font-black text-white/80">Progress</div>
                    <div className="text-4xl leading-none font-black text-yellow-300 drop-shadow-md">{currentIndex + 1} / {ELEONS.length}</div>
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="bg-white p-4 rounded-3xl hover:bg-yellow-400 transition-all hover:scale-110 active:scale-95 text-blue-900 shadow-[0_8px_0_rgba(0,0,0,0.1)] border-4 border-white"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={32} /> : <Volume2 size={32} />}
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center py-8">
          <AnimatePresence mode="wait">
            {status === 'MENU' && (
              <motion.div 
                key="menu"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-12"
              >
                <div className="flex justify-center space-x-6">
                  {ELEONS.slice(0, 5).map((e, i) => (
                    <div key={i} className="w-16 h-16 md:w-20 md:h-20 bg-blue-400/30 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center border-4 border-white/20 overflow-hidden p-2 shadow-inner">
                      {e.icon ? (
                        <e.icon size={40} className="text-white/40" />
                      ) : (
                        <img src={e.image} className="w-full h-full object-contain opacity-40 grayscale" alt="" />
                      )}
                    </div>
                  ))}
                </div>
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-black uppercase text-white drop-shadow-lg">Guess the Eleons!</h2>
                    <p className="text-lg text-blue-100 font-bold max-w-sm mx-auto">Can you identify all the species by their silhouettes?</p>
                  </div>
                  <button 
                    onClick={startGame}
                    className="pixel-button scale-125 px-12 py-5"
                  >
                    <div className="flex items-center space-x-3">
                      <Play size={24} className="fill-current" />
                      <span>Start Game</span>
                    </div>
                  </button>
                </div>
              </motion.div>
            )}

            {status === 'PLAYING' && currentEleon && (
              <motion.div 
                key={currentEleon.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className={`w-full flex flex-col items-center space-y-12 ${isShaking ? 'animate-shake' : ''}`}
              >
                {/* Silhouette Container */}
                <div className="w-80 h-80 md:w-[32rem] md:h-[32rem] border-8 border-white flex items-center justify-center relative bg-blue-600 rounded-[4rem] md:rounded-[6rem] shadow-2xl group overflow-hidden">
                   <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
                   
                   <motion.div
                    animate={{ 
                      filter: isRevealed ? 'none' : 'brightness(0) contrast(0)',
                      scale: isRevealed ? 1.1 : 1,
                    }}
                    className="z-10 animate-float flex items-center justify-center drop-shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
                   >
                     {currentEleon.icon ? (
                       <currentEleon.icon 
                        size={300} 
                        strokeWidth={2}
                        color={isRevealed ? currentEleon.color : 'white'}
                        className="w-48 h-48 md:w-80 md:h-80"
                       />
                     ) : (
                       <img 
                        src={currentEleon.image} 
                        alt=""
                        className="w-56 h-56 md:w-96 md:h-96 object-contain"
                        style={{
                          filter: isRevealed ? 'none' : 'brightness(0) invert(1)'
                        }}
                       />
                     )}
                   </motion.div>
                   
                   {/* Reveal Overlay */}
                   <AnimatePresence>
                    {isRevealed && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                          animate={{ opacity: 1, scale: 1, rotate: -3 }}
                          className="absolute bottom-8 left-0 right-0 flex justify-center z-20"
                        >
                          <div className="bg-yellow-400 text-blue-900 border-4 border-white px-8 py-3 text-xl font-black uppercase rounded-full shadow-2xl">
                            It's {currentEleon.name}!
                          </div>
                        </motion.div>
                    )}
                   </AnimatePresence>
                </div>

                <div className="w-full max-w-lg space-y-6">
                  <form onSubmit={handleGuess} className="flex flex-col space-y-6">
                    <input
                      ref={inputRef}
                      type="text"
                      value={guess}
                      onChange={(e) => setGuess(e.target.value)}
                      placeholder="Who is this?"
                      className="pixel-input text-center text-3xl md:text-4xl w-full shadow-2xl rounded-3xl uppercase py-8"
                      disabled={isRevealed}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    <button 
                      type="submit"
                      className="pixel-button w-full rounded-3xl py-8 text-2xl"
                      disabled={isRevealed}
                    >
                      Check Species!
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

            {status === 'FINISHED' && (
              <motion.div 
                key="finished"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="text-center space-y-12"
              >
                <div className="relative inline-block">
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1.2, rotate: 0 }}
                    className="w-32 h-32 border-8 border-white mx-auto flex items-center justify-center bg-yellow-400 rounded-full shadow-2xl"
                  >
                    <Trophy size={64} className="text-white drop-shadow-md" />
                  </motion.div>
                </div>
                
                <div className="space-y-6">
                  <h2 className="text-5xl font-black uppercase text-white drop-shadow-lg">Perfect Score!</h2>
                  <div className="bg-white/20 p-8 rounded-[2rem] border-4 border-white inline-block shadow-lg">
                    <div className="flex items-center justify-center space-x-3 text-4xl font-black text-yellow-300 drop-shadow-md">
                      <ClockIcon size={36} />
                      <span>{elapsedSeconds}s</span>
                    </div>
                    <p className="text-[12px] font-black uppercase text-blue-100 mt-4 tracking-widest">Completion Time</p>
                  </div>
                </div>

                <div className="pt-8">
                   <button 
                    onClick={startGame}
                    className="pixel-button flex items-center space-x-3 mx-auto"
                   >
                     <RotateCcw size={24} />
                     <span>Play Again</span>
                   </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="mt-8 pt-8 border-t-8 border-white flex flex-col md:flex-row justify-between items-center text-white/50 font-black tracking-widest text-[10px] uppercase">
          <div>2026 ELEON FAN PROJECT</div>
          <div className="hidden md:block">Interactive Experience v2.0</div>
        </footer>
      </div>

      {/* Decorative Accents */}
      <div className="fixed top-12 left-12 w-12 h-12 bg-blue-500/10 rounded-full hidden lg:block"></div>
      <div className="fixed top-36 left-24 w-6 h-6 bg-blue-500/5 rounded-full hidden lg:block"></div>
      <div className="fixed bottom-24 right-12 w-20 h-20 bg-blue-500/10 rounded-full hidden lg:block"></div>
      <div className="fixed bottom-48 right-32 w-10 h-10 bg-blue-500/5 rounded-full hidden lg:block"></div>

      <audio ref={audioRef} src="/Eleons_OST_idkthename.mp3" loop />
    </div>
  );
}
