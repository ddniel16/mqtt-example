const mosca = require('mosca');

const settingsServer = {
    host: 'localhost',
    port: 9883,
    persistence: {
      factory: mosca.persistence.Redis,
      host: 'localhost',
      port: 6379,
      ttl: {
        subscriptions: 1000000,
        packets: 1000000
      }
    }
};

const server = new mosca.Server(settingsServer);

server.on('ready', () => {
    console.info('MQTT server ready.');
});

server.on('clientConnected', (client) => {
    console.info('Client connect: %s', client.id);
});

server.on('clientDisconnecting', (client) => {
    console.log('Client Disconnecting : ', client.id);
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
