var switches = require('../checkSwitch');

test('Switch off with no maintenance should be red', () => {
    // make sure no maintenance
    expect(switches(0).toBe('#DE141E')
});

test('Switch on with no maintenance should be green', () => {
    // make sure no maintenance 
    expect(switches(1).toBe('#1FE30E'))
});

test('Switch on with planned maintenance should be red', () => {
    // make sure planned maintenance
    expect(switches(1).toBe('#DE141E')
});

test('Switch off with planned maintenance should be green', () => {
    // make sure planned maintenance 
    expect(switches(0).toBe('#1FE30E'))
});