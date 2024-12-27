const getFingerprint = async () => {
    const rawFingerprint = {
        deviceInfo: getDeviceInfo(),
        ipInfo: await getIpInfo(),
    };
    const result = sha256(JSON.stringify(rawFingerprint));
    // alert(await result);
    return result;
}

const sha256 = async text => {
    const uint8  = new TextEncoder().encode(text);
    const digest = await crypto.subtle.digest('SHA-256', uint8);
    return Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2,'0')).join('');
}

const getDeviceInfo = () => {
    const userAgent = window.navigator.userAgent;
    const windowSize = `${window.screen.width}x${window.screen.height}`;
    const result = {userAgent, windowSize};
    console.log(result)
    return result;
}

const getIpInfo = async () => {
    return fetch('https://ipinfo.io?callback')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        return data;
    });
}