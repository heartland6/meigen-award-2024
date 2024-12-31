const meigenGASKey = '114-zasshibu-ikisugi-514';
// const meigenGASId = 'AKfycbxzxep1WU5rRIOgJ0kBt9aPz4ziXAie4oM5c2fUk3_8UtVRAbM3zi6Lmp_KPpZ0ZyIx';
const rankGASId = "AKfycbytIe4kinJGQKg8wm8exHELxS-D4Vy5y_a2dHfTGnMVEyeBYaZLXQPyZzjf48t4oRVA";

const gasGet = async (gasId, params) => {
    const gasUrl = `https://script.google.com/macros/s/${gasId}/exec` + `?key=${meigenGASKey}`;
    const paramString = Object.entries(params).map(param => {
        console.log(param);
        return `&${param[0]}=${JSON.stringify(param[1])}`;
    }).join('');
    console.log(paramString);

    return await fetch(gasUrl + paramString)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        return data;
    });
}

const getMeigenInfo = async meigenId => {
    const result = await gasGet(rankGASId, {id: meigenId});
    console.log(result);
    return result;
}

const getTotalVotes = async () => {
    const result = await gasGet(rankGASId, {mode: 2});
    console.log(result);
    return result;
}