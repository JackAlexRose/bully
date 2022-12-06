export const colorPalette = [
  0xb04860, 0xff7481, 0xffaea3, 0x3bb0bf, 0x446b70, 0x020314, 0x5932e6,
  0x8632e6, 0xb332e6, 0xe032e6,
];
export const randomColor = () =>
  colorPalette[Math.floor(Math.random() * colorPalette.length)];
