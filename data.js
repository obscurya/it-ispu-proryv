const profs = [
  'Юриспруденция',
  'Образование и педагогические науки',
  'Экономика и управление',
  'Электро- и теплоэнергетика'
];
const pt = 720;
const profsTeachers = [
  {
    uni: 'ИвГУ',
    dirs: [
      {
        title: '40.03.01 Юриспруденция',
        f: 22,
        calc: Kpot => {
          return (Kpot * 9076 + 1540 + 2786) / pt
        }
      }
    ]
  },
  {},
  {
    uni: 'ИвГПУ',
    dirs: [
      {
        title: '38.03.06 Торговое дело',
        f: 8,
        calc: Kpot => {
          return (Kpot * 1426 + 282 + 2132) / pt
        }
      },
      {
        title: '38.03.07 Товароведение',
        f: 8,
        calc: Kpot => {
          return (Kpot * 1402 + 1118 + 1318) / pt
        }
      }
    ]
  },
  {
    uni: 'ИГЭУ',
    dirs: [
      {
        title: '13.03.01 Теплоэнергетика и теплотехника',
        f: 12,
        calc: Kpot => {
          return (Kpot * 8104) / pt
        }
      },
      {
        title: '13.03.02 Электроэнергетика и электротехника',
        f: 12,
        calc: Kpot => {
          return (Kpot * 3800 + 1400 + 588) / pt
        }
      },
      {
        title: '13.03.03 Энергетическое машиностроение',
        f: 6,
        calc: Kpot => {
          return (Kpot * 8104) / pt
        }
      }
    ]
  }
];
const kp = 0.6;
const knp = 0.4;
const K = 7498;
const dKv = 0.1;
const yearBegin = 2009;
// const yearBegin = 2014;
const yearEnd = 2019;
