const sleep = async msec => new Promise(resolve => setTimeout(resolve, msec));

const showMeigen = async () => {
    document.getElementById('loadMeigen').innerHTML = '読み込み中...';

    const inputMeigenId = document.getElementById('meigenId').value;
    if (inputMeigenId == '') {
        document.getElementById('loadMeigen').innerHTML = '見つかりません';
        await sleep(2000);
    }

    const meigenId = Number(inputMeigenId);
    const meigen = await getMeigenInfo(meigenId);
    if (meigen.isOutOfRange) {
        document.getElementById('loadMeigen').innerHTML = '見つかりません';
        await sleep(2000);
    } else {
        document.getElementById('current-votes').innerHTML = `$meigen${meigenId}の得票数:`;
        document.getElementById('meigenContent').innerHTML = `${meigen.content}`;
        document.getElementById('meigenAuthor').innerHTML = `──${meigen.author} | 名言#${meigenId}`;
        document.getElementById('vote-count').innerHTML = meigen.votes;
    }

    document.getElementById('loadMeigen').innerHTML = '$meigenを表示';
    
    // ねとらぼ
    const netoraboMeigenIds = [345,346];
    if (netoraboMeigenIds.includes(meigenId)) showPlusButton(meigenId);
    // 栗田穣崇
    const kuritaMeigenIds = [280,281,339];
    if (kuritaMeigenIds.includes(meigenId)) showMinusButton(meigenId);
    // バオバブ系
    const baobabMeigenIds = [106,128,243,321,372,506,532];
    if (baobabMeigenIds.includes(meigenId)) showRandomButton(meigenId);
}