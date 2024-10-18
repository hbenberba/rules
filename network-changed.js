// network-changed = script-path=network-changed.js,type=event,event-name=network-changed

const logEvent = () => {
    console.log(`network-changed
event:
${JSON.stringify($event, null, 2)}
network:
${JSON.stringify($network, null, 2)}`);
};

const httpAPIAsync = (method, path, body) => {
    return new Promise((resolve, reject) => {
        $httpAPI(method, path, body, resolve);
    });
};

const changeIPV6Status = async (toEnable) => {
    const moduleKey = 'disable_ipv6';
    const { enabled, available } = await httpAPIAsync("GET", '/v1/modules', null);
    console.log(`modules: ${JSON.stringify({ enabled, available }, null, 2)}`);

    const isEnable = enabled.includes(moduleKey);
    const isAvailable = available.includes(moduleKey);

    if ((toEnable && isAvailable && !isEnable) || (!toEnable && isEnable)) {
        const respSet = await httpAPIAsync("POST", '/v1/modules', {
            [moduleKey]: toEnable
        });
        console.log(`set ${moduleKey} to ${toEnable} result: ${JSON.stringify(respSet), null, 2}`);
        $notification.post(`make ${moduleKey} module isEnable To ${toEnable}`, '', `${JSON.stringify($network, null, 2)}`);
    } else {
        console.log(`${moduleKey} is already ${toEnable ? 'enabled' : 'disabled'}`);
    }
};

const main = async () => {
    logEvent();

    if ($event.name === 'network-changed') {
        const hasIPv6 = $network.v6 && $network.v6.primaryInterface;
        await changeIPV6Status(!hasIPv6);
    }

    $done();
};

main().catch(error => {
    console.error('An error occurred:', error);
    $done();
});
