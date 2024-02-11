import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  // Typing effect state variables
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const phrases = ["3D visuals", "user interfaces", "web applications"];

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
    <section className={`relative w-full h-screen mx-auto`}>
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
        </div>
      </div>

      <ComputersCanvas />

    </section>
  );
};

export default Hero;
