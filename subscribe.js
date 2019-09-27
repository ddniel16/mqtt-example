const mqtt = require('mqtt');
const mqttLocation = 'mqtt://localhost:9883';
const mqttTopic = 'example/mqtt';
const mqttQoS = 2;

const options = {
    clientId: 'example_suscribe',
    //clientId: 'example_suscribe' + Math.random().toString(16).substr(2, 8),
    clean: false,
    reconnectPeriod: 1000,
    keepalive: 10,
};

const client = mqtt.connect(mqttLocation, options);

client.on('connect', (packet) => {
    console.log('Connect Success');
    console.log('Subscribe id: %s', options.clientId);
    client.subscribe(mqttTopic, {qos: mqttQoS}, (error) => {
        console.info('Subscribe Success: %s', (error === null ? 'Ok' : error));
    });
});

client.on('message', (topic, message) => {
    const string = message.toString();
    if (string === 'exit') {
        client.unsubscribe(topic);
        client.end();
    }

    console.log('Received form: %s ', topic);
    console.log('Received message: %s', message.toString());
    console.log('-----------------');
});

client.on('error', (error) => {
    console.log('Error: %s', error);
});

client.on('reconnect', () => {
    console.info('Client Suscribe Reconnect');
});
