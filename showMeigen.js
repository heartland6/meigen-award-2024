const sleep = async msec => new Promise(resolve => setTimeout(resolve, msec));

const showMeigen = async () => {
    document.getElementById('loadMeigen').innerHTML = '読み込み中...';

    const inputMeigenId = document.getElementById('meigenId').value;
    if (inputMeigenId == '') {
        document.getElementById('loadMeigen').innerHTML = '見つかりません';
        await sleep(2000);
    }

    const meigen = await getMeigenInfo(Number(inputMeigenId));
    if (meigen.isOutOfRange) {
        document.getElementById('loadMeigen').innerHTML = '見つかりません';
        await sleep(2000);
    } else {
        document.getElementById('current-votes').innerHTML = `$meigen${inputMeigenId}の得票数:`;
        document.getElementById('meigenContent').innerHTML = `${meigen.content}`;
        document.getElementById('meigenAuthor').innerHTML = `──${meigen.author} | 名言#${inputMeigenId}`;
        document.getElementById('vote-count').innerHTML = meigen.votes;
    }

    document.getElementById('loadMeigen').innerHTML = '$meigenを表示';
}