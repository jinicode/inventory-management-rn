import React from "react";

const colors = {
  appBlue: '#1177f3',
  bgGrey: '#f1f1f1',
  lightGrey: '#CEDCCE',
  darkGrey: '#A9A9A9',
  goldenStar: '#fddc68',
  acceptGreen: '#4bd35f',
  rejectRed: '#f7392e'
}
export const darkPallet = {
  extraDarkBlue: '#20222f',
  darkGrey: '#2b2d37',
  darkBlue: '#2b2e41',
  lightBlue: '#384053',
  extraLightBlue: '#63687b',
  greyBlue: '#686e80',
  hotPink: '#ea8380',
  hotOrange:'#ff7f50',
  hotOrangeFaded:'#a6503a',
  brightGreen:'#63d872',
  skyBlue: '#829da8',
  orangeGradient: ['#f86676', '#fbb287'],
  pink: '#DD3180',
  gradients: {
    pink: ['#ff4760', '#f4007f'],
    blue: ['#8400e4', '#7c00d3'],
    purple: ['#b300eb', '#8a00d3'],
    grey: ['#696969', '#9E9E9E']
  }
}

export const bluePallet = {
  background: '#2e244c',
  darkBackground: '#292145',
  content: '#362a5c',
  gradient: ['#292044', '#2d234c']
}

export const getRandomGradient = () => {
  const gradients = Object.keys(darkPallet.gradients);
  const gradientCount = gradients.length;
  const index = Math.floor(Math.random() * gradientCount);
  return darkPallet.gradients[gradients[index]];
}

const purplePalette = {
  light: '#4b5d67',
  dark: '#322f3d',
  primary: '#59405c',
  secondary: '#87556f'
}
const pinkPalette = {
  light: '#162447',
  dark: '#1f4068',
  primary: '#1b1b2f',
  secondary: '#e43f5a'
}
const orangePalette = {
  light: '#202040',
  dark: '#543864',
  primary: '#ff6363',
  secondary: '#ffbd69'
}

const shinyBlue = {
  light: '#202040',
  dark: '#543864',
  primary: '#ff6363',
  secondary: '#ffbd69'
};


const appMainColors={
  blue:"#4796BD",
  statusBar:"#247096",
  greyBackground:'#f3f9fb',
  paleBlue:'#122E40',
  darkGrey:'#E0E0E0',
  borderGray:'#858585',
  labelColor:'#828282',
  tableHeaderBackground:'#e7eff2',
}

export const appTheme = {
  borderGrey:appMainColors.borderGray,
  darkGrey:appMainColors.darkGrey,
  paleBlue:appMainColors.paleBlue,
  appgreyBackground:appMainColors.greyBackground,
  appBlue:appMainColors.blue,
  textPrimary:'white',
  statusBar:appMainColors.statusBar,
  labelColor:appMainColors.labelColor,
  tableHeader:appMainColors.tableHeaderBackground
}

export const bmiColors = {
  blue:'#4da9e7',
  lightBlue:'#00e6cf',
  yellow:'#d0bb1f',
  red:'#e91457',
  redFaded:'#e9145788'
}

export default colors;