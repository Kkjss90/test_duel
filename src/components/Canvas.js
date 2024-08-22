import React, {useRef, useEffect, useState} from 'react';
import Menu from "./Menu";

const Canvas = ({hero1Settings, hero2Settings, onHeroClick, setScore}) => {
    const canvasRef = useRef(null);

    const heroesRef = useRef([
        {x: 50, y: 100, radius: 20, color: 'blue', spellColor: 'blue' ,dy: hero1Settings.speed},
        {x: 450, y: 100, radius: 20, color: 'red', spellColor: 'red' ,dy: hero2Settings.speed}
    ]);

    const spellsRef = useRef([]);

    const mousePosition = useRef({x: 0, y: 0});

    const [selectedHeroIndex, setSelectedHeroIndex] = useState(null);
    const [menuPosition, setMenuPosition] = useState({x: 0, y: 0});


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');


        const update = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            heroesRef.current.forEach((hero) => {
                hero.y += hero.dy;
                if (hero.y < hero.radius || hero.y > canvas.height - hero.radius) {
                    hero.dy *= -1;
                }
                const distToMouse = Math.sqrt(
                    (mousePosition.current.x - hero.x) ** 2 +
                    (mousePosition.current.y - hero.y) ** 2
                );
                if (distToMouse < hero.radius) {
                    hero.dy *= -1;
                }

                hero.y += hero.dy;
                if (hero.y < hero.radius || hero.y > canvas.height - hero.radius) {
                    hero.dy *= -1;
                }
            });

            spellsRef.current = spellsRef.current
                .filter(spell => spell.x > 0 && spell.x < canvas.width)
                .map(spell => {
                    spell.x += spell.dx;
                    return spell;
                });

            spellsRef.current = spellsRef.current.filter(spell => {
                const opponentIndex = spell.dx > 0 ? 1 : 0;
                const opponent = heroesRef.current[opponentIndex];

                const distToOpponent = Math.sqrt(
                    (spell.x - opponent.x) ** 2 + (spell.y - opponent.y) ** 2
                );

                if (distToOpponent < opponent.radius) {
                    if (opponentIndex === 1) {
                        setScore(prevScore => ({...prevScore, hero1: prevScore.hero1 + 1}));
                        console.log('hero1');
                    } else {
                        setScore(prevScore => ({...prevScore, hero2: prevScore.hero2 + 1}));
                        console.log('hero2');
                    }
                    return false;
                }

                spell.x += spell.dx;
                return spell.x > 0 && spell.x < canvas.width;
            });


            heroesRef.current.forEach((hero) => {
                ctx.beginPath();
                ctx.arc(hero.x, hero.y, hero.radius, 0, Math.PI * 2);
                ctx.fillStyle = hero.color;
                ctx.fill();
                ctx.closePath();
            });

            spellsRef.current.forEach((spell) => {
                ctx.beginPath();
                ctx.arc(spell.x, spell.y, spell.radius, 0, Math.PI * 2);
                ctx.fillStyle = spell.color;
                ctx.fill();
                ctx.closePath();
            });

            requestAnimationFrame(update);
        };

        update();
    }, []);

    useEffect(() => {
        heroesRef.current[0].dy = hero1Settings.speed;
        heroesRef.current[1].dy = hero2Settings.speed;
    }, [hero1Settings.speed, hero2Settings.speed]);

    useEffect(() => {
        const spawnSpell = (hero, direction) => {
            spellsRef.current.push({
                x: hero.x + (direction === 'right' ? hero.radius : -hero.radius),
                y: hero.y,
                dx: direction === 'right' ? 2 : -2,
                radius: 5,
                color: hero.spellColor
            });
        };

        const hero1Interval = setInterval(() => {
            spawnSpell(heroesRef.current[0], 'right');
        }, 1000 / hero1Settings.frequency);

        const hero2Interval = setInterval(() => {
            spawnSpell(heroesRef.current[1], 'left');
        }, 1000 / hero2Settings.frequency);

        return () => {
            clearInterval(hero1Interval);
            clearInterval(hero2Interval);
        };
    }, [hero1Settings.frequency, hero2Settings.frequency]);

    const handleCanvasClick = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        heroesRef.current.forEach((hero, index) => {
            const distance = Math.sqrt((mouseX - hero.x) ** 2 + (mouseY - hero.y) ** 2);
            if (distance < hero.radius) {
                setSelectedHeroIndex(index);
                setMenuPosition({ x: mouseX + rect.left, y: mouseY + rect.top });
                onHeroClick(index);
            }
        });
    };

    const handleMouseMove = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        mousePosition.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        }
    }

    const handleColorChange = (color) => {
        if (selectedHeroIndex !== null) {
            heroesRef.current[selectedHeroIndex].spellColor = color;
        }
    };

    const handleCloseMenu = () => {
        setSelectedHeroIndex(null);
    };

    return (
        <>
            <canvas
                ref={canvasRef}
                width={500}
                height={400}
                onClick={handleCanvasClick}
                onMouseMove={handleMouseMove}
                style={{ border: '1px solid black' }}
            />
            {selectedHeroIndex !== null && (
                <Menu
                    position={menuPosition}
                    currentColor={heroesRef.current[selectedHeroIndex].spellColor}
                    onClose={handleCloseMenu}
                    onColorChange={handleColorChange}
                />
            )}
        </>
    );
};
export default Canvas;
