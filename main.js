/*

       ,
       \`-._           __
        \\  `-..____,.'  `.
         :`.         /    \`.
         :  )       :      : \
          ;'        '   ;  |  :
          )..      .. .:.`.;  :
         /::...  .:::...   ` ;
         ; _ '    __        /:\
         `:o>   /\o_>      ;:. `.
        `-`.__ ;   __..--- /:.   \
        === \_/   ;=====_.':.     ;
         ,/'`--'...`--....        ;
              ;                    ;
            .'       ИТ ИГЭУ        ;
          .'                        ;
        .'     ..     ,      .       ;
       :       ::..  /      ;::.     |
      /      `.;::.  |       ;:..    ;
     :         |:.   :       ;:.    ;
     :         ::     ;:..   |.    ;
      :       :;      :::....|     |
      /\     ,/ \      ;:::::;     ;
    .:. \:..|    :     ; '.--|     ;
   ::.  :''  `-.,,;     ;'   ;     ;
.-'. _.'\      / `;      \,__:      \
`---'    `----'   ;      /    \,.,,,/
                   `----`


Kpr - кол-во выпускников, устроившихся по специальности в регионе
Kpnr - ... не в регионе
Tp - кол-во выпускников, устроившихся по специальности
Tnp - ... не по специальности
Kv - количество рабочих мест

*/


let random = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

let calcKpr = (p, y) => {
  switch (p) {
    case 0: return 147.2 * y - 296363;
    case 1: return 49.47 * y - 99406;
    case 2: return 513.51 * y - 1032845.69;
    case 3: return 494.24 * y - 994504.01;
    default: return 0;
  }
}

let calcKpnr = (p, y) => {
  switch (p) {
    case 0: return -33.554 * y + 68462;
    case 1: return -159.08 * y + 321093;
    case 2: return -985.65 * y + 1987814.63;
    case 3: return -26.14 * y + 53099.78;
    default: return 0;
  }
}

let calcR = (Tp, Tnp) => {
  return (kp * Tp + knp * Tnp) / K;
}

let calcA = Kv => {
  return Kv + Kv * dKv;
}

let calcKv5 = (R, Kpr, Kpnr) => {
  return 689.0859843 + 342.8583234 * R + 0.283865251 * Kpr + (-0.032037046 * Kpnr);
}

let profsData = [];

for (let p = 0; p < profs.length; p++) {
  profsData[p] = { prof: p, years: [] };
}

for (let y = yearBegin; y <= yearEnd; y++) {
  for (let p = 0; p < profsData.length; p++) {
    let kk = K / 4;
    let Tp = random(kk / 2, kk);
    let Tnp = kk - Tp;
    let Kv = Tp - random(Tp / 4, Tp / 2);

    profsData[p].years[y] = {
      Tp,
      Tnp,
      Kv
    };
  }
}

for (let y = yearBegin; y <= yearEnd; y++) {
  for (let p = 0; p < profsData.length; p++) {
    let pp = profsData[p];
    let py = pp.years[y];
    let R = calcR(py.Tp, py.Tnp, py.V, py.M, py.D);
    let Kpr = calcKpr(pp.prof, y);
    let Kpnr = calcKpnr(pp.prof, y);
    let Kv5 = calcKv5(R, Kpr, Kpnr);
    let A = calcA(Kv5);

    pp.years[y] = {
      ...py,
      R,
      Kpr,
      Kpnr,
      Kv5,
      A
    };
  }
}

let profList = document.querySelector('.prof-list');
let html = '';

for (let p = 0; p < profsData.length; p++) {
  html += `<div class="prof"><div class="prof-title">${profs[p]}</div><table class="prof-table"><tr><td><p>Количество педагогов в образовательных организациях</p>`;

  if (profsTeachers[p].uni) {
    for (let d = 0; d < profsTeachers[p].dirs.length; d++) {
      html += `<div class="prof-teachers-stat"><div class="prof-teachers-stat-0"><p>${profsTeachers[p].uni}</p><p>${profsTeachers[p].dirs[d].title}</p></div><div class="prof-teachers-stat-1">`;

      let Kpot = Math.floor(profsData[p].years[2019].A / 4 / 125 + 1);
      let need = Math.floor(profsTeachers[p].dirs[d].calc(Kpot) + 1);

      if (profsTeachers[p].dirs[d].f < need) {
        html += `<span class="prof-teachers bad">${profsTeachers[p].dirs[d].f}</span> &rarr; <span class="prof-teachers good">${need}</span>`;
      } else {
        html += `<span class="prof-teachers good">${profsTeachers[p].dirs[d].f}</span>`;
      }

      html += `</div></div>`;
    }
  } else {
    html += `<div class="prof-teachers-stat-none">Данные не доступны</div>`;
  }

  html += `</td><td><p>Прогнозируемое количество выпускников на 2024 год</p><div id="chart-${p}" style="height: 300px; width: 100%;"></div></td></tr></table></div>`;
}

profList.innerHTML = html;

for (let p = 0; p < profsData.length; p++) {
  let chart = new CanvasJS.Chart(`chart-${p}`, {
    animationEnabled: true,
    axisX:{
      interval: 1
    },
    axisY2:{
      interlacedColor: 'rgba(1,77,101,.2)',
      gridColor: 'rgba(1,77,101,.1)',
    },
    data: [{
      type: 'bar',
      name: 'students',
      axisYType: 'secondary',
      color: '#014D65',
      dataPoints: [
        { y: Math.floor(profsData[p].years[2019].Kv5), label: 'Выпускники' },
        { y: Math.floor(profsData[p].years[2019].A), label: 'Абитуриенты' }
      ]
    }]
  });

  chart.render();
}
