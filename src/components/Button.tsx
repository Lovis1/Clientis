// IMPORT PACKAGES
import Link from "next/link";
import clsx from "clsx";

// DATA
const baseStyles: any = {
  solid: "inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold outline-2 outline-offset-2 transition-colors", // prettier-ignore
  outline: "inline-flex justify-center rounded-lg border py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm outline-2 outline-offset-2 transition-colors", // prettier-ignore
};

const variantStyles: any = {
  solid: {
    cyan: "relative overflow-hidden bg-cyan-500 text-white before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-cyan-600 active:text-white/80 before:transition-colors",
    white:
      "bg-white text-cyan-900 hover:bg-white/90 active:bg-white/90 active:text-cyan-900/70",
    gray: "bg-gray-800 text-white hover:bg-gray-900 active:bg-gray-800 active:text-white/80",
  },
  outline: {
    gray: "border-gray-300 text-gray-700 hover:border-gray-400 active:bg-gray-100 active:text-gray-700/80",
  },
};

// TYPES
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline";
  color?: "cyan" | "white" | "gray";
  className?: string;
  href?: string;
  children: React.ReactNode;
};

// *****************************************************
// BUTTON COMPONENT
// *****************************************************
export const Button = (props: Props) =>
  //   props: Props
  {
    // PROPS
    const variant = props.variant || "solid";
    const color = props.color || "grey";
    const className = props.className || "";
    const href = props.href || "";
    const children = props.children || "";

    // CLASSES
    const cls = clsx(
      baseStyles[variant],
      variantStyles[variant][color],
      className
    );

    // *****************************************************

    // RENDER
    return href ? (
      <Link href={href} className={cls}>
        {children}
      </Link>
    ) : (
      <button className={cls} {...props}>
        {children}
      </button>
    );
  };
