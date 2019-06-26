let speed = 0
radio.setGroup(1)
function setMotorPins(m1: number, m2: number) {
    pins.analogWritePin(AnalogPin.P13, m1);
    pins.analogWritePin(AnalogPin.P14, m2);
}

function inverted(n: number) {
    return n * -1;
}

basic.forever(function () {
    radio.onReceivedValue(function (name: string, n: number) {
        speed = n;
        if (speed === 0) {
            setMotorPins(0, 0);
        } else if (speed < 0) {
            setMotorPins(inverted(speed), 0);
        } else {
            setMotorPins(0, speed);
        }
    });
    basic.showNumber(speed)
})
