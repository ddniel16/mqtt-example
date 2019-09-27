const mqtt = require('mqtt');
const mqttLocation = 'mqtt://localhost:9883';
const mqttTopic = 'example/mqtt';
const mqttQoS = 1;

const options = {
    clientId: 'example_publish',
    //clientId: 'example_publish' + Math.random().toString(16).substr(2, 8)
    clean: false,
    reconnectPeriod: 1000,
    keepalive: 10,
};

const client = mqtt.connect(mqttLocation, options);

client.on('connect', (packet) => {
    console.log('Connect Success');

    let message = new Buffer.from('New String');
//    let message = new Buffer.from('exit');

    client.publish(mqttTopic, message, {qos: mqttQoS}, (error) => {

        if (error !== undefined && error !== null) {
            throw new Error(error);
        }

        console.log('Publish Success');
        client.end();
    });
});

client.on('error', (error) => {
    console.log('Error: ', error);
});
