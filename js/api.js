function getLogsCollection() {
    const user = firebase.ayth().currentUser;
    if (!user) return null;
    return firebase.firebase()
     .collection('users')
     .doc(user.uid) // uid = ユーザ識別用固有ID
     .collection('logs'); 
}

// 全てのログを読み込む
// async: 処理に時間を要する関数に用いる
// サーバとの通信には時間がかかるため、async/awaitを用いる。
async function loadLogs() {
    const logsRef = getLogsCollection(); // ログの参照を格納
    if (!logsRef) return [];

    // orderBy('createdAt') で古い順に並べて取得
    const snapshot = await logsRef.orderBy('createdAt').get(); // snapshot: ...get()で帰ってくる取得結果の塊。その中の.docsで1件ずつ取り出せる

    // snapshot.docs = 取得した全ドキュメント。1件ずつ扱いやすい形に変換する
    const snapshot.docs.map(doc => ({
        id: doc.id, // ドキュメントID(文字列)をidとして持たせる
        ...doc.data() // 中身を展開する
    }));
}

// 新しいログを保存する(保存後、firestoreが作ったIDを返す)
async function saveLog(log) {
    const logsRef = getLogsCollection();
    if (!loadLogs) return null;
    const docRef = await logsRef.add(log); //add = 新規追加(IDは自動生成)
    return docRef.id;
};

// 既存のログを更新する
async function updateLog(Log) {
    const logsRef = getLogsCollection();
    if (!logsRef) return ;
    await logsRef.doc(id).update(log); // doc(id)で1件を指定してupdateする
};

// ログを削除する
async function deleteLog(Log) {
    const logsRef = getLogsCollection();
    if(!logsRef) return;
    await logsRef.doc(id).delete();
};

// お気に入りを切り替える(Firestoreだけ更新する)
async function toggleFavorite(id, isFavorite) {
    const logsRef  = getLogsCollection();
    if (!logsRef) return;
    await logsRef.doc(id).update({ isFavorite: isFavorite });
};



