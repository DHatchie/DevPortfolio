import React, { useState } from 'react';
import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'

import { styles } from '../styles'
import { services } from '../constants'
import { fadeIn, textVariant } from '../utils/motion'
import { SectionWrapper } from '../hoc'

const ServiceCard = ({ index, title, icon }) => {
  const [isActive, setIsActive] = useState(true);

  const handleCardClick = () => {
    setIsActive(!isActive);
  };

  return (
    <Tilt
      className='xs:w-[250px] w-1/2 md:w-0/4'
      style={{ order: isActive ? 1 : index + 2 }}
    >
      <motion.div
        variants={fadeIn('right', 'spring', 0.5 * index, 0.75)}
        className={`w-full celestial-gradient p-[2px] rounded-[20px] shadow-card ${
          isActive ? 'active' : ''
        }`}
        onClick={handleCardClick}
      >
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
        >
          <img src={icon} alt={title} className='w-16 h-16 object-contain' />
          <h3 className='text-white text-[20px] font-bold text-center'>{title}</h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[15px] max-w-5xl leading-[30px]'
      >
        I'm a passionate, results-driven software developer and Computer Science major with a specialization in Cyber Security from 
        Tennessee Technological University. Proficient in cloud technologies, full-stack development, DevOps, containerization, 
        distributed systems, and more. I am driven to create innovative solutions and embrace emerging technologies. 
        Aspiring to excel in the software industry, I am currently interning and soon transitioning to a full-time position at SAIC, 
        where I have gained invaluable experience and expertise. With a commitment to excellence and a desire to contribute 
        meaningfully to the field of technology, I constantly connect, collaborate, and explore new opportunities. 
      </motion.p>

      <div className='mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 flex-wrap gap-8'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index = {index} {...service} />
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(About, "about")