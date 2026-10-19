"use client";
import React from "react";
import { motion } from "motion/react";

export type Testimonial = {
  text: string;
  name: string;
  role: string;
  rating?: number;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, name, role }, i) => (
              <div
                className="p-7 rounded-sm max-w-xs w-full"
                style={{ backgroundColor: "#FFF7E8", border: "1px solid rgba(212, 154, 42, 0.2)" }}
                key={i}
              >
                <p
                  className="italic leading-relaxed"
                  style={{ color: "rgba(36, 19, 10, 0.88)", fontSize: "1rem" }}
                >
                  &ldquo;{text}&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-5">
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                    style={{ backgroundColor: "#A83216", color: "#FFF7E8" }}
                  >
                    {name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <div className="font-bold text-[15px] tracking-tight leading-5" style={{ color: "#24130A" }}>
                      {name}
                    </div>
                    <div className="leading-5 text-[14px]" style={{ color: "rgba(36, 19, 10, 0.65)" }}>
                      {role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))]}
      </motion.div>
    </div>
  );
};