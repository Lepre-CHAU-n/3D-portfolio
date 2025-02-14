import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  return (
    <Tilt className='sm:w-[calc(33.333%_-_2rem)] w-full'>
      <motion.div

        variants={fadeIn("right", "spring", index * 0.5, 0.75)}
        className='w-full green-pink-gradient p-[3px] rounded-[20px]'
      >
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className='bg-tertiary rounded-[20px] p-5 flex justify-evenly items-center flex-col'
        >
          <div className='relative w-full h-[30px]'>
            {/* <img
              src={image}
              alt='project_image'
              className='w-full h-full object-cover rounded-2xl'
            /> */}

            <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
              <div
                onClick={() => window.open(source_code_link, "_blank")}
                className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
              >
                <img
                  src={github}
                  alt='source code'
                  className='w-1/2 h-1/2 object-contain'
                />
              </div>
            </div>
          </div>

          <h3 className='text-white text-[20px] font-bold text-center'>
            {name}
          </h3>
          <p className='text-secondary text-[14px] text-center'>{description}</p>

          <div className='mt-4 flex flex-wrap gap-2'>
            {tags.map((tag) => (
              <p
                key={`${name}-${tag.name}`}
                className={`text-[14px] ${tag.color}`}
              >
                #{tag.name}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </Tilt>
  );
};

const Works = () => {
    // The parent container must allow wrapping and space distribution between the items
    const containerClass = "mt-20 flex flex-wrap justify-center gap-10";
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          These showcased projects serve as tangible demonstrations of my skills and expertise. Each project is concisely described and accompanied by links to its code repository and live demo on Github. This portfolio not only highlights my proficiency in solving intricate problems but also showcases my versatility in working with diverse technologies as well.
        </motion.p>
      </div>

      <div className={containerClass}>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};


export default SectionWrapper(Works, "");
