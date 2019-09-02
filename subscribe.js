const mqttLocation = 'mqtt://localhost:9883';
const mqttTopic = 'example/mqtt';
const mqtt = require('mqtt');

const options = {
    clientId: 'example_suscribe' + Math.random().toString(16).substr(2, 8),
    reconnectPeriod: 1000,
    keepalive: 10
};

const client = mqtt.connect(mqttLocation, options);

client.on('connect', (packet) => {
    console.log('Connect Success');

    client.subscribe(mqttTopic, (error) => {
        console.info('Subscribe Success: ', (error === null ? 'Ok' : error));
    });

});

client.on('reconnect', () => {
    console.info('Reconnect');
});

client.on('message', (topic, message) => {
    console.log('Received form: %s message: %s', topic, message.toString());
});

client.on('error', (error) => {
    console.log('Error: ', error);
});
