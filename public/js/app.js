// see http://thecatapi.com/
const generateCatThumb = function() {
  const apiKey = '3e716ca0-8514-4bf0-bc87-4792a37c3ec0';
  const userId = 'd0x7pr';
  const apiUrl = 'https://api.thecatapi.com/v1/images/search?format=json&size=small';
  const fetchOptions = {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
  };
  return fetch(apiUrl, fetchOptions).then(response => response.json());
};


const getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const catChatPhrases = [
  '可愛いすぎる！',
  'もう可愛くてたまらない〜',
  'なでてあげずにはいられない！',
  'ネコを溺愛している症状：ネコが悪態をつくと、止めるどころか撮影を始めるって',
  '深い深い、海のように深いご縁がありましたね。',
  'いい子、いい子。',
  'にゃんすた',
];

const generateRandomCatChatPhrase = function() {
  const randomIndex = getRandomInt(0, catChatPhrases.length);
  return catChatPhrases[randomIndex];
};

const generateRobotThumb = function() {
  const apiKey = 'vdaU35425amshse8ir7sxh0qJqFzp1xAvXIjsnVRIdRQsxES8o';
  const randomText = Math.random().toString(36).substring(2);
  const apiUrl = `https://robohash.p.mashape.com/index.php?text=${randomText}`;
  const fetchOptions = {
    headers: {
      'Content-Type': 'application/json',
      'X-Mashape-Key': apiKey,
      'mode': 'cors',
    },
  };

  return fetch(apiUrl, fetchOptions).then(response => response.json());
};

const renderPost = function(robotThumbUrl, catThumbUrl, catChatPhrase) {
  const containerEl = document.querySelector('#container .chats');

  const postEl = document.createElement('DIV');
  const robotThumbEl = document.createElement('IMG');
  robotThumbEl.src = robotThumbUrl;

  const catThumbEl = document.createElement('IMG');
  catThumbEl.src = catThumbUrl;

  const catChatPhraseEl = document.createElement('P');
  catChatPhraseEl.innerHTML = catChatPhrase;

  postEl.appendChild(robotThumbEl);
  postEl.appendChild(catThumbEl);
  postEl.appendChild(catChatPhraseEl);

  containerEl.appendChild(postEl);
};

const promiseFirst = fetch('https://ranmoji.herokuapp.com/emojis/api/v.1.0/').then(response => response.json());
const promiseSecond = fetch('https://ranmoji.herokuapp.com/emojis/api/v.1.0/').then(response => response.json());
const promiseThird = fetch('https://ranmoji.herokuapp.com/emojis/api/v.1.0/').then(response => response.json());
const promiseFourth = fetch('https://ranmoji.herokuapp.com/emojis/api/v.1.0/').then(response => response.json());
const promiseFifth = fetch('https://ranmoji.herokuapp.com/emojis/api/v.1.0/').then(response => response.json());

const addPost = function() {
  Promise.all([
    generateRobotThumb(),
    generateCatThumb(),
    generateRandomCatChatPhrase(),
    promiseFirst,
    promiseSecond,
    promiseThird,
    promiseFourth,
    promiseFifth,
  ]).then((resultsArray) => {
    [robotThumb, catThumb, catChatPhrase, emojiFirst,
       emojiSecond, emojiThird, emojiFourth, emojiFifth] = resultsArray;
    const radomEmojiArray = [];
    for (let i = 3; i <= Math.floor(Math.random() * (7 - 3)) + 3; i += 1) {
      radomEmojiArray.push(resultsArray[i]);
    }
    const newCatChatPhrase = radomEmojiArray.reduce((ac, cur) => ac + cur.emoji, catChatPhrase);
    renderPost(robotThumb.imageUrl, catThumb[0].url, newCatChatPhrase);
  });
};

const initPage = function() {
  const addPostBtn = document.querySelector('#container .add-post-btn');
  addPostBtn.addEventListener('click', addPost);
};

initPage();
