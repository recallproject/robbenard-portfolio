import { useRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { useCoarsePointer, usePrefersReducedMotion } from "../hooks/useMedia";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  strength?: number;
};

export default function Magnetic({
  children,
  className,
  strength = 18,
  ...props
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const coarse = useCoarsePointer();
  const reduced = usePrefersReducedMotion();

  return (
    <a
      {...props}
      ref={ref}
      className={className}
      onPointerMove={(e) => {
        props.onPointerMove?.(e);
        if (coarse || reduced || !ref.current) return;
        const box = ref.current.getBoundingClientRect();
        const x = e.clientX - box.left - box.width / 2;
        const y = e.clientY - box.top - box.height / 2;
        ref.current.style.transform = `translate3d(${(x / box.width) * strength}px, ${(y / box.height) * strength}px, 0)`;
      }}
      onPointerLeave={(e) => {
        props.onPointerLeave?.(e);
        if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
      }}
    >
      {children}
    </a>
  );
}
