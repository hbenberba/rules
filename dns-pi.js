if ($network?.v4?.primaryRouter === '192.168.31.1' && $domain === 'l475v.dayelaiwan.com') {
    $done({ addresses: '192.168.31.148', ttl: 10 });
} else {
    $done({});
}
