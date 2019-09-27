const mosca = require('mosca');
const persistenceSettings = {
    factory: mosca.persistence.Redis,
    host: 'localhost',
    port: 6379,
    ttl: {
      subscriptions: 1000000,
      packets: 1000000
    }
};

const settingsServer = {
    host: 'localhost',
    port: 9883,
    persistence: persistenceSettings
};

const server = new mosca.Server(settingsServer);

server.on('ready', () => {
    console.info('MQTT server ready.');
});

server.on('clientConnected', (client) => {
    console.info('Client Connect: %s', client.id);
});

server.on('subscribed', (topic, client) => {
    console.info('Client Subscribed: %s Topic suscribe: %s', client.id, topic);
});

server.on('unsubscribed', (topic, client) => {
    console.info('Client Unsubscribed: %s Topic unsubscribed: %s', client.id, topic);
});

server.on('clientDisconnecting', (client) => {
    console.log('Client Disconnecting: %s', client.id);
});

server.on('clientDisconnected', (client) => {
    console.log('Client Disconnected:', client.id);
});

server.on('published', (packet, client) => {
    if (client !== undefined) {
        console.info('Client Publish: %s Topic publish: %s Message Id: %s', client.id, packet.topic, packet.messageId);
    }
});

server.on('clientError', (topic, client) => {
    console.info('Client Error: ', client, topic);
});
