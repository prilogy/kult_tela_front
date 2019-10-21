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
};

const cssVars = Array.from(document.styleSheets)
  .filter(
    sheet =>
      sheet.href === null || sheet.href.startsWith(window.location.origin)
  )
  .reduce(
    (acc, sheet) =>
      (acc = [
        ...acc,
        ...Array.from(sheet.cssRules).reduce(
          (def, rule) =>
            (def =
              rule.selectorText === ':root'
                ? [
                    ...def,
                    ...Array.from(rule.style).filter(name =>
                      name.startsWith('--')
                    )
                  ]
                : def),
          []
        )
      ]),
    []
  );

const _c = name =>
  getComputedStyle(document.documentElement).getPropertyValue(name);

let colors = {};

cssVars.forEach(vname => {
  const cname = vname.slice(2).split('-');
  if (!colors[cname[0]]) colors[cname[0]] = {};
  colors[cname[0]][cname[1]] = _c(vname);
});

const ds = {
  colors,
  withOpacity(color, opacity) {
    return color + hexOpacity[opacity];
  }
};

export default ds;
