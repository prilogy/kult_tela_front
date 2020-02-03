const hexOpacity = {
  100: 'FF',
  95: 'F2',
  90: 'E6',
  85: 'D9',
  80: 'CC',
  75: 'BF',
  70: 'B3',
  65: 'A6',
  60: '99',
  55: 'C',
  50: '80',
  45: '73',
  40: '66',
  35: '59',
  30: '4D',
  25: '40',
  20: '33',
  15: '26',
  10: '1A',
  5: '0D',
  0: '00'
}

const clrs = {
  withOpacity(color, opacity) {
    return color + hexOpacity[opacity]
  },
  getHexOpacity(value) {
    return hexOpacity[value]
  }
}

export default clrs
