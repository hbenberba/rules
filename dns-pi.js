if ($network?.v4?.primaryRouter === '192.168.31.1') {
    $done({ address: '192.168.31.148', ttl: 10 });
} else {
    $done({});
}
