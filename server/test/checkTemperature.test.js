var temp = require('../checkTemperature');

test('Passes 67 to get green', () => {
    expect(temp(67)).toBe('#1FE30E')
});

test('Passes 68 to get red and send an alert', () => {
    expect(temp(68)).toBe('#DE141E')
});

