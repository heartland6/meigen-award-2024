// ボタンごとのフィードバック

// 「+1票」アニメーションスクリプト by chatGPT
const popVoteFeedback = (votes, feedbackContainerName) => {
    if (document.getElementById('meigenId').value === '') return null;

    const container = document.getElementById(feedbackContainerName);

    // 新しい「+1票」要素を作成
    const feedback = document.createElement('span');
    feedback.textContent = `+${votes}票`;
    feedback.className = 'vote-feedback';

    // コンテナに追加
    container.appendChild(feedback);

    // アニメーション終了後に要素を削除
    feedback.addEventListener('animationend', () => {
        feedback.remove();
    });
}

const changeVotesNumber = newVotes => {
    const voteCount = document.getElementById('vote-count');
    const currentVotes = Number(voteCount.getHTML());
    voteCount.innerHTML = currentVotes + newVotes;
}

document.getElementById('one-vote-button').addEventListener('click', () => {
    document.getElementById('votes').setAttribute('value',1);
    popVoteFeedback(1, 'one-vote-feedback-container');
    changeVotesNumber(1);
});
document.getElementById('ten-vote-button').addEventListener('click', () => {
    document.getElementById('votes').setAttribute('value',10);
    popVoteFeedback(10, 'ten-vote-feedback-container');
    changeVotesNumber(10);
});
document.getElementById('hundred-vote-button').addEventListener('click', () => {
    document.getElementById('votes').setAttribute('value',100);
    popVoteFeedback(100, 'hundred-vote-feedback-container');
    changeVotesNumber(100);
});


// ボタン全体のクリック数に基づくフィードバック
const tenVoteButton = document.getElementById('ten-vote');
const hundredVoteButton = document.getElementById('hundred-vote');
tenVoteButton.style.display = 'none';
hundredVoteButton.style.display = 'none';

const state = {totalClicks: 0};
const voteButtons = document.querySelectorAll('.vote-button');
voteButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (document.getElementById('meigenId').value === '') return null;
        
        state.totalClicks++;

        if (state.totalClicks >= 10) {
            tenVoteButton.style.display = 'block';
        }
        if (state.totalClicks >= 30) {
            hundredVoteButton.style.display = 'block';
        }
    });
});