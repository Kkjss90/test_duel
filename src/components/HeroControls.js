import React from 'react';

const HeroControls = ({ heroSettings, onSpeedChange, onFrequencyChange }) => {
    return (
        <div>
            <label>
                Скорость передвижения:
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={heroSettings.speed}
                    onChange={(e) => onSpeedChange(Number(e.target.value))}
                />
            </label>
            <label>
                Частота стрельбы:
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={heroSettings.frequency}
                    onChange={(e) => onFrequencyChange(Number(e.target.value))}
                />
            </label>
        </div>
    );
};

export default HeroControls;
