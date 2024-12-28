interface Position {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

export const generateRandomPosition = (): Position => {
  const unit = Math.random() > 0.5 ? 'vh' : '%';
  const pos: Position = {};
  
  if (Math.random() > 0.5) {
    pos.left = `${Math.random() * 100}${unit === '%' ? '%' : 'vw'}`;
  } else {
    pos.right = `${Math.random() * 100}${unit === '%' ? '%' : 'vw'}`;
  }
  
  if (Math.random() > 0.5) {
    pos.top = `${Math.random() * 100}${unit}`;
  } else {
    pos.bottom = `${Math.random() * 100}${unit}`;
  }
  
  return pos;
};

// Increased opacity range to 70-90
export const generateRandomOpacity = (): number => {
  return Math.floor(Math.random() * (90 - 70) + 70);
};

// Slightly faster typing speed for more dynamic effect
export const generateRandomSpeed = (): number => {
  return Math.floor(Math.random() * (50 - 20) + 20);
};