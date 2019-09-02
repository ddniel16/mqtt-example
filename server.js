const mosca = require('mosca');
const settings = {host: 'localhost', port: 9883};
const server = new mosca.Server(settings);

server.on('ready', () => {
    console.info('MQTT server ready.');
});

server.on('clientConnected', (client) => {
    console.info('Client connect: %s', client.id);
});

server.on('clientDisconnected', (client) => {
    console.log('Client Disconnected:', client.id);
});

server.on('subscribed', (topic, client) => {
    console.info('Client subscribed: %s Topic suscribe: %s', client.id, topic);
});

server.on('unsubscribed', (topic, client) => {
    console.info('Client unsubscribed: %s Topic unsubscribed: %s', client.id, topic);
});

server.on('clientError', (topic, client) => {
    console.info('Client clientError: ', client, topic);
});

server.on('published', (packet, client) => {
    if (client !== undefined) {
        console.info('Client Publish: %s Topic publish: %s', client.id, packet.topic);
    }
});
