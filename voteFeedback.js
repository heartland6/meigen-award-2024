// ボタンごとのフィードバック

// 「+1票」アニメーションスクリプト by chatGPT
const popClickFeedback = (text,color) => {
    if (document.getElementById('meigenId').value === '') return null;

    const container = document.getElementById('vote-feedback-container');
    // 新しい「+1票」要素を作成
    const feedback = document.createElement('span');
    feedback.textContent = text;
    feedback.className = 'vote-feedback';
    feedback.style.color = color;
    // コンテナに追加
    container.appendChild(feedback);
    // アニメーション終了後に要素を削除
    feedback.addEventListener('animationend', () => {
        feedback.remove();
    });
}

const getRandomVotesNumber = () => {
    const sign = Math.random() < 0.7 ? +1 : -1;
    const rand2 = (Math.random() * Math.random()) ** 2;
    const result = sign * Math.trunc((rand2 * 1e5) + 10);
    return result;
}
const orgRound = (value, base) => Math.round(value * base) / base;

const addVotesNumber = newVotes => {
    if (document.getElementById('meigenId').value === '') return null;

    document.getElementById('votes').setAttribute('value',newVotes);

    const voteCount = document.getElementById('vote-count');
    const currentVotes = Number(voteCount.getHTML());
    voteCount.innerHTML = currentVotes + newVotes;
}

const red = '#ff5733';
const blue = '#3357ff';

// 通常の投票ボタン(+N票ボタン)
document.getElementById('one-vote-button').addEventListener('click', () => {
    popClickFeedback('+1票',red);
    addVotesNumber(1);
});
document.getElementById('ten-vote-button').addEventListener('click', () => {
    popClickFeedback('+10票',red);
    addVotesNumber(10);
});
document.getElementById('hundred-vote-button').addEventListener('click', () => {
    popClickFeedback('+100票',red);
    addVotesNumber(100);
});

// 変な投票ボタン
const plusButton = document.getElementById('plus-vote-button');
const minusButton = document.getElementById('minus-vote-button');
const randomButton = document.getElementById('random-vote-button');

const advancedButtonsStatus = {
    plusButton: false,
    minusButton: false,
    randomButton: false,
}

const showPlusButton = meigenId => {
    advancedButtonsStatus.plusButton = true;
    document.getElementById("plus-vote-button").innerHTML = '<span id="vote-button-text">水増し<br>(数%増加)</span>';

    const message = `$meigen${meigenId} を見つけてくれてありがとナス！ `+ '\n' +'【「水増し」ボタンが解放されました】';
    alert(message);
}
const showMinusButton = meigenId => {
    advancedButtonsStatus.minusButton = true;
    document.getElementById("minus-vote-button").innerHTML = '<span id="vote-button-text">ネガキャン<br>(数%減少)</span>';

    const message = `$meigen${meigenId} を見つけてくれてありがとナス！ `+ '\n' +'【「ネガキャン」ボタンが解放されました】';
    alert(message);
}
const showRandomButton = meigenId => {
    advancedButtonsStatus.randomButton = true;
    document.getElementById("random-vote-button").innerHTML = '<span id="vote-button-text">ランダム<br>(-10万〜+10万票)</span>';

    const message = `$meigen${meigenId} を見つけてくれてありがとナス！` + '\n' +'【「ランダム」ボタンが解放されました】';
    alert(message);
}

plusButton.addEventListener('click', () => {
    if (!(advancedButtonsStatus.plusButton)) return;

    const currentVotes = Number(document.getElementById('vote-count').getHTML());
    if (currentVotes === 0) return;

    const newVotesRate = orgRound(1 + Math.random() * 4, 100);
    popClickFeedback(`${newVotesRate}%増加`,red);
    const effVotes = Math.trunc(Math.abs(currentVotes) * (newVotesRate / 100));
    addVotesNumber(effVotes);
});
minusButton.addEventListener('click', () => {
    if (!(advancedButtonsStatus.minusButton)) return;

    const currentVotes = Number(document.getElementById('vote-count').getHTML());
    if (currentVotes === 0) return;

    const newVotesRate = orgRound(1 + Math.random() * 4, 100);
    popClickFeedback(`${newVotesRate}%減少`,blue);
    const effVotes = -1 * Math.trunc(Math.abs(currentVotes) * (newVotesRate / 100));
    addVotesNumber(effVotes);
});
randomButton.addEventListener('click', () => {
    if (!(advancedButtonsStatus.randomButton)) return;

    const votes = getRandomVotesNumber();
    const votesText = votes > 0 ? `+${votes}票` : `${votes}票`;
    const votesTextColor = votes > 0 ? red : blue;
    popClickFeedback(votesText,votesTextColor);
    addVotesNumber(votes);
});