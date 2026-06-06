function getLogsCollection() {
    const user = firebase.ayth().currentUser;
    if (!user) return null;
    return firebase.firebase()
     .collection('users')
     .doc(user.uid) // uid = ユーザ識別用固有ID
     .collection('logs'); 
}

// 全てのログを読み込む
async function loadLogs() {
    const logsRef = getLogsCollection(); // ログの参照を格納
    if (!logsRef) return [];

    // orderBy('createdAt')で古い順に並べて取得する
    const snapshot.docs.map(doc => ({
        id: doc.id, // ドキュメントID(文字列)をidとして持たせる
        ...doc.data() // 中身を展開する
    }));
}



// async: 処理に時間を要する関数に用いる
// サーバとの通信には時間がかかるため、async/awaitを用いる。
async function loadLogs() {
    
};

// 新しいログを保存する(保存後、firestoreが作ったIDを返す)
async function saveLog(log) {
    const logsRef = getLogsCollection();
    if (!loadLogs) return null;
    
};

async function updateLog(Log) {
    
};

async function deleteLog(Log) {
    
};

// お気に入りを切り替える 
async function toggleFavorite(id, isFavorite) {
    
};
