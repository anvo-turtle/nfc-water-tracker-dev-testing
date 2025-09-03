self.addEventListener('install', event => {
    console.log('Service Worker installed');
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    const interval = event.notification.data.interval;
    if (interval) {
        const nextTimestamp = Date.now() + interval;
        self.registration.showNotification('Time to Drink Water!', {
            body: 'Stay hydrated! Increment your intake.',
            showTrigger: new TimestampTrigger(nextTimestamp),
            data: { interval: interval }
        });
    }
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(clients => {
            if (clients.length) {
                clients[0].focus();
            } else {
                clients.openWindow('/');
            }
        })
    );
});

self.addEventListener('notificationclose', event => {
    // Optionally reschedule on close as well, if you want to remind even if ignored
    // For now, only rescheduling on click to avoid spamming
});