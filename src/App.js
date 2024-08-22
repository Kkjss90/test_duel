import React, {useState} from 'react';
import Canvas from './components/Canvas';
import HeroControls from './components/HeroControls';
import Counter from "./components/Counter";

const DuelGame = () => {
    const [score, setScore] = useState({ hero1: 0, hero2: 0 });
    const [hero1Settings, setHero1Settings] = useState({speed: 5, frequency: 5});
    const [hero2Settings, setHero2Settings] = useState({speed: 5, frequency: 5});

    const handleHeroClick = (heroIndex) => {
        // Обработчик кликов на герое, который откроет меню для смены цвета
        console.log(`Герой ${heroIndex + 1} был нажат`);

    };

    return (
        <div>
            <Canvas
                hero1Settings={hero1Settings}
                hero2Settings={hero2Settings}
                onHeroClick={handleHeroClick}
                setScore={setScore}
            />
            <div>
                <h3>Счет</h3>
                <Counter
                    score={score}
                />
            </div>
            <div>
                <h3>Настройки Героя 1</h3>
                <HeroControls
                    heroSettings={hero1Settings}
                    onSpeedChange={(speed) => setHero1Settings((prev) => ({...prev, speed}))}
                    onFrequencyChange={(frequency) => setHero1Settings((prev) => ({...prev, frequency}))}
                />
                <h3>Настройки Героя 2</h3>
                <HeroControls
                    heroSettings={hero2Settings}
                    onSpeedChange={(speed) => setHero2Settings((prev) => ({...prev, speed}))}
                    onFrequencyChange={(frequency) => setHero2Settings((prev) => ({...prev, frequency}))}
                />
            </div>
        </div>
    );
};

export default DuelGame;
