export const generateRandomColor = (): string => {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
};

export const generateOptions = (correctColor: string, count = 4) => {
  const options: string[] = Array.from({ length: count });
  options[0] = correctColor;
  for (let i = 1; i <= count - 1; i += 1) {
    const nextColor = generateRandomColor();
    options[i] = nextColor
  }
  options.sort(() => Math.random() - 0.5)
  return options;
}

export const generateColors = () => {
  const target = generateRandomColor();
  const options = generateOptions(target, 4);
  return { target, options }
}