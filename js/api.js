function syncStorage() {
    localStorage.setItem('coffeeLogs', JSON.stringify(coffeeLogs));
};

// async: 処理に時間を要する関数に用いる
// サーバとの通信には時間がかかるため、async/awaitを用いる。
async function loadLogs() {
    
};

async function saveLog(log) {
    
};

async function updateLog(Log) {
    
};

async function deleteLog(Log) {
    
};

// お気に入りを切り替える
async function toggleFavorite(id, isFavorite) {
    
};
