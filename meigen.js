let isMeigenLoading = false;

const getMeigen = async meigenId => {
    const meigenGASId = 'AKfycbxzxep1WU5rRIOgJ0kBt9aPz4ziXAie4oM5c2fUk3_8UtVRAbM3zi6Lmp_KPpZ0ZyIx';
    const meigenGASKey = '114-zasshibu-ikisugi-514';
    const meigenGetterUrl = `https://script.google.com/macros/s/${meigenGASId}/exec` + `?key=${meigenGASKey}`;

    const meigen = await fetch(meigenGetterUrl + `&id=${JSON.stringify([meigenId])}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        return data;
    });
    console.log(meigen);

    const meigenString = meigen.results[0];
    const meigenContentRegex = meigenString.match(/“.+”/s);
    const meigenAuthorRegex = meigenString.match(/──.+/);
    console.log(meigenContentRegex);
    console.log(meigenAuthorRegex);

    const meigenContent = meigenContentRegex[0].replace(/[“”]/g,'');
    const meigenAuthor = meigenAuthorRegex[0];

    return {
        content: meigenContent,
        author: meigenAuthor,
        isRandom: meigen.isRandom,
    }
}