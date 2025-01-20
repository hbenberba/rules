// network:
// {
//   "wifi": {
//     "bssid": "xxx",
//     "ssid": "xxx"
//   },
//   "v4": {
//     "primaryAddress": "xxx",
//     "primaryRouter": "xxx",
//     "primaryInterface": "en0"
//   },
//   "dns": [
//     "xxx"
//   ],
//   "v6": {
//     "primaryAddress": "xxx",
//     "primaryInterface": "en0"
//   }
// }

if ($network?.wifi?.bssid === '3c:cd:57:fa:c7:0d') {
    $done({ address: '192.168.31.150', ttl: 10 });
} else {
    $done({});
}
