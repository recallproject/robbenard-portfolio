import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

type Props = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
};

export default function Reveal({ children, delay = 0, className, ...rest }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ y: 22, opacity: 0, filter: "blur(12px)" }}
      whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.8, delay, ease }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function WordLine({
  text,
  className,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p";
}) {
  return (
    <Tag className={className}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="word-clip"
          initial={{ y: "110%", opacity: 0, filter: "blur(10px)" }}
          whileInView={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.72, delay: i * 0.045, ease }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
