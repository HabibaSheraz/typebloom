export interface KeyDefinition {
  label: string;
  code: string;
  finger: string;
  width?: number;
}

export const qwertyRows: KeyDefinition[][] = [
  [
    { label: "Q", code: "KeyQ", finger: "Left pinky" },
    { label: "W", code: "KeyW", finger: "Left ring" },
    { label: "E", code: "KeyE", finger: "Left middle" },
    { label: "R", code: "KeyR", finger: "Left index" },
    { label: "T", code: "KeyT", finger: "Left index" },
    { label: "Y", code: "KeyY", finger: "Right index" },
    { label: "U", code: "KeyU", finger: "Right index" },
    { label: "I", code: "KeyI", finger: "Right middle" },
    { label: "O", code: "KeyO", finger: "Right ring" },
    { label: "P", code: "KeyP", finger: "Right pinky" }
  ],
  [
    { label: "A", code: "KeyA", finger: "Left pinky" },
    { label: "S", code: "KeyS", finger: "Left ring" },
    { label: "D", code: "KeyD", finger: "Left middle" },
    { label: "F", code: "KeyF", finger: "Left index" },
    { label: "J", code: "KeyJ", finger: "Right index" },
    { label: "K", code: "KeyK", finger: "Right middle" },
    { label: "L", code: "KeyL", finger: "Right ring" },
    { label: ";", code: "Semicolon", finger: "Right pinky" }
  ],
  [
    { label: "Z", code: "KeyZ", finger: "Left pinky" },
    { label: "X", code: "KeyX", finger: "Left ring" },
    { label: "C", code: "KeyC", finger: "Left middle" },
    { label: "V", code: "KeyV", finger: "Left index" },
    { label: "B", code: "KeyB", finger: "Left index" },
    { label: "N", code: "KeyN", finger: "Right index" },
    { label: "M", code: "KeyM", finger: "Right index" },
    { label: ",", code: "Comma", finger: "Right middle" },
    { label: ".", code: "Period", finger: "Right ring" },
    { label: "/", code: "Slash", finger: "Right pinky" }
  ],
  [{ label: "Space", code: "Space", finger: "Thumbs", width: 6 }]
];
