const dweetClient = require('node-dweetio');
const five = require('johnny-five');

const board = new five.Board({ port: "COM4" });
const dweetio = new dweetClient();

board.on('ready', () => {
  const temperatureSensor = new five.Sensor({
    pin: 'A0',
    threshold: 4
  });

  temperatureSensor.on('change', (value) => {
    const dweetThing = 'node-moisture-monitor';
    const MinMoistureValue = 1021;
    const MaxMoistureValue = 230;
    const MinPercentValue = 0;
    const MaxPercentValue = 100;

    const valueInPercent = ((value - MinMoistureValue) * (MaxPercentValue - MinPercentValue)
                              / (MaxMoistureValue - MinMoistureValue) + MinPercentValue);

    const tweetMessage = {
      moisture: +valueInPercent.toFixed(2)
    };

    dweetio.dweet_for(dweetThing, tweetMessage, (err, dweet) => {
      if (err) {
        console.log('[Error]: ', err);
      }
      if (dweet) {
        console.log(dweet.content);
      }
    });
  });
});