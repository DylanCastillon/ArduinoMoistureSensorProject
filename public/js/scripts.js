const socket = io()
let data = [];
let chart = Morris.Line({
    element: 'line-example',
    data,
    xkey: 'y',
    ykeys: ['a'],
    labels: ['Time'],
    parseTime: false,
    pointFillColors: ['#ffffff'],
    pointStrokeColors: ['gray'],
    lineColors: ['red']
});

let donut = Morris.Donut({
    element: 'donut-example',
    data: [
      {label: "Moisture", value: 12},
      {label: "Humidity", value: 30},
      {label: "Temperature", value: 20}
    ]
});

let area = Morris.Area({
    element: 'area-example',
    data: [
      { y: '2006', a: 100, b: 90 },
      { y: '2007', a: 75,  b: 65 },
      { y: '2008', a: 50,  b: 40 },
      { y: '2009', a: 75,  b: 65 },
      { y: '2010', a: 50,  b: 40 },
      { y: '2011', a: 75,  b: 65 },
      { y: '2012', a: 100, b: 90 }
    ],
    xkey: 'y',
    ykeys: ['a', 'b'],
    labels: ['Series A', 'Series B']
});

socket.on('sensor-data', (content) => {
    let template = "<tr><td>" + content.sensorData.moisture + "%</td>" +
        "<td>" + content.time + "</td> </tr> "
    data.push({
        y: content.time,
        a: content.sensorData.moisture
    });
    $('.table-body').append(template);
    chart.setData(data);
});
