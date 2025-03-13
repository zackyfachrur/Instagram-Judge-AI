"use client";
import Image from "next/image";
import CircleImg from "../../../public/Circle-Bullet.png";
import { motion } from "framer-motion";

const CircleBullet = () => {
  return (
    <motion.div
      animate={{ rotate: [0, 360] }}
      transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      className="right-0 top-0 absolute -z-[0] max-[900px]:w-[400px]"
    >
      <Image
        src={CircleImg}
        width={1000}
        className="w-[100%] opacity-50"
        height={1000}
        alt="Circle Images"
      />
    </motion.div>
  );
};

export default CircleBullet;
