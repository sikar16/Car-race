import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrophy, FaRedo, FaListUl, FaStar } from 'react-icons/fa';
import { CgEnter } from 'react-icons/cg';

const GAME_WIDTH = 900;
const GAME_HEIGHT = 600;
const CAR_WIDTH = 50;
const CAR_HEIGHT = 75;
const OPPONENT_WIDTH = 50;
const OPPONENT_HEIGHT = 75;
const ROAD_LINE_WIDTH = 10;
const ROAD_LINE_HEIGHT = 100;
const ROAD_LINE_COUNT = 5;
const OPPONENT_COUNT = 4;

const CAR_EMOJIS = ['🚗', '🚙', '🚕', '🚓', '🏎️', '🚚', '🚛', '🚐', '🚒', '🚘'];
function getRandomCarEmoji() {
    return CAR_EMOJIS[Math.floor(Math.random() * CAR_EMOJIS.length)];
}




const StartGame = () => {
    const navigate = useNavigate();
    const [player, setPlayer] = useState({
        x: GAME_WIDTH / 2 - CAR_WIDTH / 2,
        y: GAME_HEIGHT - CAR_HEIGHT - 10,
        speed: 5,
        score: 0,
        highScore: 0,
        isStart: false,
        

    });


   

    const [keys, setKeys] = useState({
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false,
    });
    const [roadLines, setRoadLines] = useState([]);
    const [opponents, setOpponents] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const collectedStarIds = useRef(new Set());
    const lastCollisionTime = useRef(0);

    

    const gameAreaRef = useRef();

    const playerRef = useRef(player);
    const opponentsRef = useRef(opponents);
const [starsCollected, setStarCount] = useState(0);
  const [lives, setLives] = useState(3);
  
    const [stars, setStars] = useState([
  { id: 1, x: 300, y: 200 },
  { id: 2, x: 600, y: 350 },
  { id: 3, x: 900, y: 150 },
]); 


    useEffect(() => { playerRef.current = player; }, [player]);
    useEffect(() => { opponentsRef.current = opponents; }, [opponents]);

    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        if (!player.isStart) return;
        setRoadLines(
            Array.from({ length: ROAD_LINE_COUNT }, (_, i) => ({
                y: i * 140,
            }))
        );
        setOpponents(
            Array.from({ length: OPPONENT_COUNT }, (_, i) => ({
                y: i * -300,
                x: Math.floor(Math.random() * (GAME_WIDTH - OPPONENT_WIDTH)),
                carEmoji: getRandomCarEmoji(),
            }))
        );
    }, [player.isStart]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key in keys) setKeys((k) => ({ ...k, [e.key]: true }));
        };
        const handleKeyUp = (e) => {
            if (e.key in keys) setKeys((k) => ({ ...k, [e.key]: false }));
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useEffect(() => {
        if (!player.isStart || gameOver) return;
        let animationId;
        const loop = () => {
            setPlayer((prev) => {
                let newX = prev.x;
                let newY = prev.y;
                let newSpeed = prev.speed;
                if (keys.ArrowUp && newY > 70) newY -= newSpeed;
                if (keys.ArrowDown && newY < GAME_HEIGHT - CAR_HEIGHT - 10) newY += newSpeed;
                if (keys.ArrowLeft && newX > 0) newX -= newSpeed;
                if (keys.ArrowRight && newX < GAME_WIDTH - CAR_WIDTH) newX += newSpeed;
                return { ...prev, x: newX, y: newY };
            });
            setRoadLines((lines) =>
                lines.map((line) => {
                    let y = line.y + playerRef.current.speed;
                    if (y >= GAME_HEIGHT) y -= GAME_HEIGHT + ROAD_LINE_HEIGHT;
                    return { ...line, y };
                })
            );
            setOpponents((ops) => {
                const updated = ops.map((op) => {
                    let y = op.y + playerRef.current.speed;
                    let x = op.x;
                    let carEmoji = op.carEmoji;
                    if (y > GAME_HEIGHT + 50) {
                        y = -OPPONENT_HEIGHT;
                        x = Math.floor(Math.random() * (GAME_WIDTH - OPPONENT_WIDTH));
                        carEmoji = getRandomCarEmoji();
                    }
                    return { ...op, y, x, carEmoji };
                });
               const now = Date.now();
const p = playerRef.current;

for (let op of updated) {
  if (
    now - lastCollisionTime.current > 1000 && 
    p.x < op.x + OPPONENT_WIDTH &&
    p.x + CAR_WIDTH > op.x &&
    p.y < op.y + OPPONENT_HEIGHT &&
    p.y + CAR_HEIGHT > op.y
  ) {
    lastCollisionTime.current = now; 

    setGameOver(true);
    setPlayer((p) => ({ ...p, isStart: false, speed: 5 }));

    break; 
  }
}

                return updated;
            });
 
            

setStars((prevStars) => {
  const updated = prevStars
    .map((star) => ({
      ...star,
      y: star.y + playerRef.current.speed,
    }))
    .filter((star) => star.y < GAME_HEIGHT + 50);

  const newlyCollected = [];
  const remaining = [];

  for (const star of updated) {
    const alreadyCollected = collectedStarIds.current.has(star.id);
    if (isColliding(playerRef.current, star) && !alreadyCollected) {
      collectedStarIds.current.add(star.id); 
      newlyCollected.push(star);
    } else {
      remaining.push(star);
    }
  }

  if (newlyCollected.length > 0) {
    setPlayer((prev) => {
      const newScore = prev.score + newlyCollected.length * 10;
      const newHigh = Math.max(prev.highScore, newScore);
      return {
        ...prev,
        score: newScore,
        highScore: newHigh,
      };
    });

    setStarCount((prev) => prev + newlyCollected.length);
  }

  return remaining;
});


 setPlayer((prev) => {
                let newScore = prev.score + 1;
                let newHigh = prev.highScore;
                if (newScore > prev.highScore) newHigh = newScore;
                return { ...prev, score: newScore, highScore: newHigh, speed: prev.speed + 0.01 };
            });
            animationId = requestAnimationFrame(loop);
        };
        animationId = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(animationId);
    }, [player.isStart, gameOver, keys]);

  useEffect(() => {
    if (gameOver && player.score > 0) {
      

        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        const scores = JSON.parse(localStorage.getItem('scores') || '[]');
        scores.push({ email: user.email || 'Guest', score: player.score });
        localStorage.setItem('scores', JSON.stringify(scores));
    } 
}, [gameOver, player.score]);
const isColliding = (player, star) => {
  return (
    player.x < star.x + 24 &&
    player.x + CAR_WIDTH > star.x &&
    player.y < star.y + 24 &&
    player.y + CAR_HEIGHT > star.y
  );
};





   const startGame = () => {
  if (lives <= 0) return; // Don't start if no lives left

  setPlayer({
    x: GAME_WIDTH / 2 - CAR_WIDTH / 2,
    y: GAME_HEIGHT - CAR_HEIGHT - 10,
    speed: 5,
    score: 0,
    highScore: player.highScore,
    isStart: true,
  });

  setGameOver(false);
  setLives((prev) => prev - 1); // ✅ Reduce life on restart
  collectedStarIds.current.clear(); // ✅ Reset star ID tracking only
};

   
    

useEffect(() => {
  const interval = setInterval(() => {
    setStars(prev => [
      ...prev,
      {
        id: Date.now(),
        x: Math.random() * (GAME_WIDTH - 24),
        y: -Math.random() * 300 - 50,
      },
    ]);
  }, 5000); 

  return () => clearInterval(interval);
}, []);


    return (
        <div style={{
            minHeight: '100vh',
            width: '100vw',
            background: 'linear-gradient(180deg, #222 60%, #444 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <h1 style={{ fontSize: 40, fontWeight: 700, marginBottom: 24, letterSpacing: 1, color: '#fff', textShadow: '0 2px 8px #0008', zIndex: 10 }}>
                Car Race Game
            </h1>
            <div style={{
  position: 'absolute',
  top: 10,
  right: 20,
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: 'red',
  display: player.isStart && !gameOver ? 'flex' : 'none',
  alignItems: 'center',
  gap: '8px',
  zIndex: 999
}}>
  ❤️ × {lives}
</div>

            <div style={{ display: 'flex', gap: 16, marginBottom: 16, zIndex: 10 }}>
                <div style={{ background: '#fff', boxShadow: '0 2px 12px #0001', borderRadius: 12, padding: '8px 24px', display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: 20 }}>
                    <FaListUl style={{ marginRight: 8, color: '#6366f1' }} />
                    <span>Score: {player.score}</span>
                </div>
                <div style={{ background: '#fff', boxShadow: '0 2px 12px #0001', borderRadius: 12, padding: '8px 24px', display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: 20 }}>
                    <FaTrophy style={{ marginRight: 8, color: '#facc15' }} />
                    <span>High: {player.highScore}</span>
                </div>
            </div>
            <div
  style={{
    position: 'absolute',
    top: 10,
    left: 20,
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'gold',
    display: player.isStart && !gameOver ? 'flex' : 'none',
    alignItems: 'center',
    gap: '8px',
    zIndex: 999
  }}
>
  <span>⭐</span> <span>{starsCollected}</span>
</div>

            <div style={{
                position: 'relative',
                width: GAME_WIDTH,
                height: GAME_HEIGHT,
                margin: '0 auto',
                background: 'linear-gradient(180deg, #222 60%, #444 100%)',
                borderLeft: '8px dashed #fff',
                borderRight: '8px dashed #fff',
                borderRadius: 24,
                boxShadow: '0 8px 32px #6366f155',
                overflow: 'hidden',
                zIndex: 2,
            }}>
                <div
                    ref={gameAreaRef}
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    {roadLines.map((line, i) => (
                        <div
                            key={i}
                            style={{
                                height: ROAD_LINE_HEIGHT,
                                width: ROAD_LINE_WIDTH,
                                background: 'white',
                                position: 'absolute',
                                left: GAME_WIDTH / 2 - ROAD_LINE_WIDTH / 2,
                                top: line.y,
                                borderRadius: 6,
                                opacity: 0.7,
                                zIndex: 1,
                            }}
                        />
                    ))}
                    {opponents.map((op, i) => (
                        <div
                            key={i}
                            style={{
                                height: OPPONENT_HEIGHT,
                                width: OPPONENT_WIDTH,
                                position: 'absolute',
                                top: op.y,
                                left: op.x,
                                border: '2px solid #fff',
                                borderRadius: 16,
                                boxShadow: '0 4px 16px #0003',
                                zIndex: 5,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 44,
                                background: 'rgba(255,255,255,0.95)',
                                transition: 'box-shadow 0.2s',
                            }}
                        >
                            {op.carEmoji}
                        </div>
                        

                    ))}
                    {stars.map(star => (
                  <FaStar
                key={star.id}
    style={{
      position: 'absolute',
      top: `${star.y}px`,
      left: `${star.x}px`,
      color: 'yellow',
      fontSize: '24px',
      zIndex: 10,
    }}
  />
))}

                    {player.isStart && !gameOver && (
                        <div
                            style={{
                                height: CAR_HEIGHT,
                                width: CAR_WIDTH,
                                position: 'absolute',
                                top: player.y,
                                left: player.x,
                                border: '3px solid #facc15',
                                borderRadius: 16,
                                boxShadow: '0 4px 24px #6366f1aa',
                                zIndex: 10,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 48,
                                background: 'rgba(255,255,255,0.98)',
                                transition: 'box-shadow 0.2s',
                            }}
                        >
                            🚗
                        </div>
                    )}
                    {gameOver && (
                        <div style={{
                            position: 'absolute',
                            top: '40%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            minWidth: 320,
                            background: 'rgba(255,255,255,0.85)',
                            boxShadow: '0 8px 32px #0004',
                            borderRadius: 24,
                            padding: 32,
                            textAlign: 'center',
                            color: '#222',
                            fontSize: 32,
                            fontWeight: 700,
                            backdropFilter: 'blur(8px)',
                            zIndex: 20,
                        }}>
                            <div style={{ marginBottom: 16 }}>
                                Game Over! 
   
    <p style={{ display: 'flex',alignItems: 'center',justifyContent:'center', margin:'auto'}}><FaTrophy style={{  color: 'gold' }} />&nbsp;Your score: <strong>{player.score} </strong><span>&nbsp;&nbsp;⭐</span> <span>{starsCollected}</span></p>
                               </div>
                         
{lives > 0 ? (
  <button
    onClick={startGame}
    style={{
      margin:'auto',     
       padding: '12px 32px',
      fontSize: 22,
      borderRadius: 12,
      border: 'none',
      background: '#6366f1',
      color: 'white',
      fontWeight: 600,
      cursor: 'pointer',
      boxShadow: '0 2px 8px #6366f188',
      transition: 'background 0.2s',
      display: 'inline-flex',
      alignItems: 'center',
      width: '300px',
    }}
  >
    
    Continue (Lives left: {lives})
  </button>
) : (
  <div style={{ color: 'red', fontSize: 18, marginTop: 16 }}>
    No lives remaining. 
  </div>
)}




  <button
    onClick={() => window.location.reload()}
    style={{
       margin:'15px auto',     
       padding: '12px 32px',
      fontSize: 22,
      borderRadius: 12,
      border: 'none',
      background: '#6366f1',
      color: 'white',
      fontWeight: 600,
      cursor: 'pointer',
      boxShadow: '0 2px 8px #6366f188',
      transition: 'background 0.2s',
      display: 'inline-flex',
      alignItems: 'center',
      width: '300px',
    }}
  >
    <FaRedo style={{ marginRight: 8 }} /> Start New Game
  </button>


                           
                            <button
                                onClick={() => navigate('/scorelist')}
                                style={{
                                    marginTop: 8,
                                    padding: '12px 32px',
                                    fontSize: 22,
                                    borderRadius: 12,
                                    border: 'none',
                                    background: '#facc15',
                                    color: '#222',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    boxShadow: '0 2px 8px #facc1588',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    width: '300px',
                                }}
                            >
                                <FaListUl style={{ marginRight: 8 }} />View Score List
                          </button>
                        </div>
                    )}
                    {!player.isStart && !gameOver && (
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            minWidth: 320,
                            background: 'rgba(255,255,255,0.85)',
                            boxShadow: '0 8px 32px #0004',
                            borderRadius: 24,
                            padding: 32,
                            textAlign: 'center',
                            color: '#222',
                            fontSize: 28,
                            fontWeight: 700,
                            backdropFilter: 'blur(8px)',
                            zIndex: 20,
                        }}>
                            <div style={{ marginBottom: 16 }}>Welcome to Car Race Game</div>
                            <button
                                onClick={startGame}
                                style={{
                                    marginTop: 8,
                                    padding: '12px 32px',
                                    fontSize: 22,
                                    borderRadius: 12,
                                    border: 'none',
                                    background: '#6366f1',
                                    color: 'white',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    boxShadow: '0 2px 8px #6366f188',
                                    transition: 'background 0.2s',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                }}
                            >
                                <FaRedo style={{ marginRight: 8 }} />Start Game
                            </button>
                            <div style={{ fontSize: 16, fontWeight: 400, marginTop: 24, color: '#444' }}>
                                Use <b>Arrow keys</b> to move the car.<br />If you hit any car, the game will end.
                            </div>
                        </div>
                    )}
                </div>
            </div>




        </div>
    );
};

export default StartGame; 