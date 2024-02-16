import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaFile } from 'react-icons/fa'; // Import icons from react-icons
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  // Typing effect state variables
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const phrases = ["mobile applications", "user interfaces", "web applications"];

  useEffect(() => {
    let ticker;

    if (text === phrases[loopNum] && !isDeleting) {
      ticker = setTimeout(() => {
        setIsDeleting(true);
        setTypingSpeed(60);
      }, 2000);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setLoopNum((prevLoopNum) => (prevLoopNum + 1) % phrases.length);
      setTypingSpeed(150);
    } else {
      ticker = setTimeout(() => {
        setText((prevText) => {
          const updateText = phrases[loopNum].substring(0, prevText.length + (isDeleting ? -1 : 1));
          return updateText;
        });
      }, typingSpeed);
    }

    return () => clearTimeout(ticker);
  }, [text, isDeleting, loopNum, phrases, typingSpeed]);

  return (
    <section className={`relative w-full h-[55vh] mx-auto`}>
      <div className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}>
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className='blue-gradient_text drop-shadow'>Chau Pham</span>
          </h1>
          <motion.p
            className={`${styles.heroSubText} mt-2 text-white-100`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            I develop {text}
            <motion.span
              animate={{ opacity: [0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
            >
              |
            </motion.span>
          </motion.p>
        {/* Social Icons */}
        <div className='flex mt-4' >

            <a href="https://www.linkedin.com/in/chau-pham-458051212/" target="_blank" rel="noopener noreferrer" className='text-white text-6xl mx-2'> 
              <FaLinkedin />
            </a>
            <a href="https://github.com/Lepre-CHAU-n" target="_blank" rel="noopener noreferrer" className='text-white text-6xl mx-2'>
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/chau-pham-458051212/overlay/1706424071499/single-media-viewer/?profileId=ACoAADXBfkQBdoDYmXB779OqWbzinngrp9lgCYg" target="_blank" rel="noopener noreferrer" className='text-white text-6xl mx-2'>
              <FaFile />
            </a>
          </div>
        </div>
      </div>
    
        {/* <ComputersCanvas  /> */}
   
    </section>
  );
};

export default Hero;