import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import SwitchSafe from "@/components/ui/SwitchSafe";
import { ReactComponent as ArrowLeftIcon } from "@/assets/icons/Arrow-Left.svg";
import { ReactComponent as DotIcon } from "@/assets/icons/Dot.svg";
import { useNavigate } from "react-router-dom";

const headerVariants = cva(
  "fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-sm md:max-w-md lg:max-w-lg h-14 flex items-center justify-between px-4 bg-phone shadow-md z-50",
  {
    variants: {
      variant: {
        default: "",
        withText: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface HeaderProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof headerVariants> {
  isSwitchOn?: boolean;
  title?: string;
  onBack?: () => void;
  onMenu?: () => void;
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  (
    {
      className,
      variant = "default",
      title,
      isSwitchOn = true,
      onBack,
      onMenu,
      ...props
    },
    ref
  ) => {
    const navigate = useNavigate();

    const handleBack = () => {
      if (onBack) {
        onBack();
      } else {
        navigate(-1);
      }
    };

    const handleMenu = () => {
      if (onMenu) {
        onMenu();
      }
    };

    if (variant === "withText") {
      return (
        <nav
          ref={ref}
          className={cn(headerVariants({ variant }), className)}
          {...props}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              className="w-8 h-8 flex items-center justify-center"
            >
              <ArrowLeftIcon className="w-6 h-6 text-white" />
            </button>

            {title && (
              <span className="text-White-Font font-semibold text-lg">
                {title}
              </span>
            )}
          </div>

          <button
            onClick={handleMenu}
            className="w-8 h-8 flex items-center justify-center"
          >
            <DotIcon className="w-6 h-6 text-white" />
          </button>
        </nav>
      );
    }

    return (
      <nav
        ref={ref}
        className={cn(headerVariants({ variant }), className)}
        {...props}
      >
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/image/logo.svg"
            alt="logo"
            className="h-[1.125rem] w-auto"
          />
        </div>

        <div className="flex items-center">
          <SwitchSafe isSwitchOn={isSwitchOn} />
        </div>
      </nav>
    );
  }
);

Header.displayName = "Header";

export default Header;
