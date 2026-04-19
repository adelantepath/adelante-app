import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  iconOnly?: boolean
  variant?: "default" | "light"
}

export function Logo({ className, iconOnly = false, variant = "default" }: LogoProps) {
  const isLight = variant === "light"
  
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Logo Icon - Arrow pointing forward/upward representing "Adelante" (forward) */}
      <div className={cn(
        "size-9 rounded-xl flex items-center justify-center relative overflow-hidden",
        isLight ? "bg-primary-foreground" : "bg-accent"
      )}>
        {/* Stylized "A" with forward arrow motif */}
        <svg 
          viewBox="0 0 32 32" 
          fill="none" 
          className="size-6"
          aria-hidden="true"
        >
          {/* Path/road element */}
          <path 
            d="M16 4L8 28H12L16 16L20 28H24L16 4Z" 
            className={cn(
              isLight ? "fill-primary" : "fill-primary-foreground"
            )}
          />
          {/* Forward arrow accent */}
          <path 
            d="M16 8L22 14L20 16L16 12L12 16L10 14L16 8Z" 
            className="fill-accent"
          />
        </svg>
      </div>
      
      {!iconOnly && (
        <div className="flex flex-col leading-none">
          <span className={cn(
            "font-bold text-lg tracking-tight",
            isLight ? "text-primary-foreground" : "text-foreground"
          )}>
            Adelante
          </span>
          <span className={cn(
            "text-xs font-medium tracking-wide",
            isLight ? "text-primary-foreground/70" : "text-muted-foreground"
          )}>
            PATHWAYS
          </span>
        </div>
      )}
    </div>
  )
}
