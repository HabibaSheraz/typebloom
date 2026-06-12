export const designTokens = {
  color: {
    background: "#100716",
    plum: "#180B24",
    surface: "#241032",
    primary: "#8B5CF6",
    violet: "#A855F7",
    pink: "#EC4899",
    rose: "#F472B6",
    lavender: "#C4B5FD",
    blush: "#FBCFE8",
    text: "#FDF4FF",
    textSecondary: "#D8B4FE",
    muted: "#A78BFA",
    disabled: "#6B5A78",
    correct: "#34D399",
    incorrect: "#FB7185",
    warning: "#FBBF24",
    info: "#60A5FA"
  },
  radius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px"
  },
  shadow: {
    panel: "0 20px 70px rgba(236, 72, 153, 0.18)",
    focus: "0 0 0 3px rgba(244, 114, 182, 0.32)"
  },
  motion: {
    fast: "150ms",
    base: "220ms",
    slow: "300ms"
  }
} as const;
