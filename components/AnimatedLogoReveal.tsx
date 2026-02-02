import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const AnimatedLogoReveal: React.FC = () => {
    const [isRevealed, setIsRevealed] = useState(false);
    const controls = useAnimation();

    useEffect(() => {
        const sequence = async () => {
            // Initial delay
            await new Promise(resolve => setTimeout(resolve, 500));

            // Start the reveal animation
            await controls.start({
                scale: [0.5, 1.2, 1],
                rotate: [0, 360, 360],
                opacity: [0, 1, 1],
                transition: {
                    duration: 2,
                    ease: [0.43, 0.13, 0.23, 0.96],
                    times: [0, 0.6, 1]
                }
            });

            setIsRevealed(true);
        };

        sequence();
    }, [controls]);

    return (
        <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-20">
            {/* Animated background particles */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-[#D4AF37] rounded-full"
                        initial={{
                            x: '50%',
                            y: '50%',
                            scale: 0,
                            opacity: 0
                        }}
                        animate={{
                            x: `${Math.random() * 100}%`,
                            y: `${Math.random() * 80}%`,
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 2,
                            delay: i * 0.1,
                            repeat: Infinity,
                            repeatDelay: 3
                        }}
                    />
                ))}
            </div>

            {/* Main logo container - Centered */}
            <motion.div
                animate={controls}
                className="relative z-10 flex flex-col items-center justify-center"
            >
                {/* Glow effect behind logo */}
                <motion.div
                    className="absolute inset-0 blur-3xl bg-[#D4AF37]/30 rounded-full"
                    animate={{
                        scale: isRevealed ? [1, 1.5, 1] : 1,
                        opacity: isRevealed ? [0.3, 0.6, 0.3] : 0
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Logo image with reveal animation */}
                <motion.div className="relative flex items-center justify-center">
                    {/* Circular reveal mask */}
                    <motion.div
                        className="absolute inset-0 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: isRevealed ? 0 : 20 }}
                        transition={{ duration: 1, delay: 2 }}
                        style={{
                            background: 'radial-gradient(circle, transparent 30%, #050505 70%)',
                            mixBlendMode: 'multiply'
                        }}
                    />

                    {/* The actual logo - centered */}
                    <motion.img
                        src="/Logobgblack-removebg-preview.png"
                        alt="Apex Skill Technologies"
                        className="w-96 h-96 md:w-[600px] md:h-[600px] object-contain relative z-10 mx-auto"
                        initial={{ filter: 'brightness(0)' }}
                        animate={{
                            filter: isRevealed ? 'brightness(1)' : 'brightness(0)'
                        }}
                        transition={{ duration: 1, delay: 2 }}
                    />

                    {/* Light rays emanating from logo */}
                    {isRevealed && (
                        <>
                            {[...Array(8)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute top-1/2 left-1/2 w-1 bg-gradient-to-t from-[#D4AF37]/0 via-[#D4AF37]/50 to-[#D4AF37]/0"
                                    style={{
                                        height: '250px',
                                        transformOrigin: 'bottom center',
                                        transform: `rotate(${i * 45}deg) translateX(-50%)`
                                    }}
                                    initial={{ scaleY: 0, opacity: 0 }}
                                    animate={{
                                        scaleY: [0, 1, 0],
                                        opacity: [0, 0.8, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        delay: 2.5 + i * 0.1,
                                        ease: "easeOut"
                                    }}
                                />
                            ))}
                        </>
                    )}
                </motion.div>

                {/* Tagline and scroll indicator - centered below logo */}
                <motion.div
                    className="text-center mt-6 space-y-6 w-full flex flex-col items-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                        opacity: isRevealed ? 1 : 0,
                        y: isRevealed ? 0 : 30
                    }}
                    transition={{ duration: 1, delay: 3 }}
                >
                    {/* Animated tagline */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 3.5 }}
                    >
                        <motion.div
                            className="inline-block px-10 py-4 border border-[#D4AF37]/30 rounded-sm"
                            animate={{
                                borderColor: ['rgba(212, 175, 55, 0.3)', 'rgba(212, 175, 55, 0.8)', 'rgba(212, 175, 55, 0.3)']
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <p className="text-sm md:text-base font-black text-[#D4AF37] tracking-[0.4em] uppercase">
                                Building Industry-Ready Talent
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        className="pt-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 4 }}
                    >
                        <motion.div
                            className="flex flex-col items-center space-y-3"
                            animate={{ y: [0, 10, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <p className="text-xs text-white/40 font-black tracking-[0.3em] uppercase">
                                Scroll to Explore
                            </p>
                            <svg
                                className="w-6 h-6 text-[#D4AF37]"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                            </svg>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Particle burst effect */}
            {isRevealed && (
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(30)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-[#D4AF37] rounded-full"
                            style={{
                                left: '50%',
                                top: '50%'
                            }}
                            initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                            animate={{
                                scale: [0, 1, 0],
                                x: Math.cos((i / 30) * Math.PI * 2) * 350,
                                y: Math.sin((i / 30) * Math.PI * 2) * 350,
                                opacity: [1, 1, 0]
                            }}
                            transition={{
                                duration: 2,
                                delay: 2.5,
                                ease: "easeOut"
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AnimatedLogoReveal;
