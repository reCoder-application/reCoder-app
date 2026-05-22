# BeanJournal 開発進捗とロードマップ

## 📊 プロジェクト概要

**アプリ名**: BeanJournal  
**目的**: コーヒー豆のテイスティング記録・管理アプリ  
**開発スタイル**: フレームワークなし（Vanilla JS）、個人開発の練習

---

## ✅ 完了した機能（Phase 1-3）

### Phase 1-2: 基本機能構築
**完了日**: Phase 3開始前

#### 実装済み機能
- [x] HTML/CSS/JSの基本構造
- [x] ガラスモーフィズムUIデザイン（ダークテーマ）
- [x] コーヒー記録の新規追加（Create）
- [x] LocalStorageでのデータ永続化
- [x] カード一覧表示（Read）
- [x] いいね機能（カウント増減）
- [x] 削除機能（Delete、確認ダイアログ付き）
- [x] 画面遷移（ホーム画面 ⇔ 入力画面）

#### データ構造（Phase 1-2時点）
```javascript
log = {
    id: Number,        // Date.now()で生成
    beanName: String,
    country: String,
    farm: String,
    variety: String,
    aroma: String,     // 風味・感想
    likes: Number
}
```

---

### Phase 3: 味の見える化（レーダーチャート） ✅
**完了日**: 2025/12/30（推定）

#### 実装内容

**1. 入力フォームに5段階スライダー追加**
- 酸味（Acidity）: 1-5
- 苦味（Bitterness）: 1-5
- コク（Body）: 1-5
- 甘み（Sweetness）: 1-5
- 香り（Aroma）: 1-5

**2. リアルタイム値表示**
```javascript
// forEachでスライダーをまとめて管理
const sliderIds = ['acidity', 'bitterness', 'richness', 'sweetness', 'aromaStrength'];
sliderIds.forEach(function(id) {
    const slider = document.getElementById(id);
    const valueSpan = document.getElementById(id + '-value');
    slider.addEventListener('input', function() {
        valueSpan.textContent = slider.value;
    });
});
```

**3. データ構造拡張**
```javascript
log = {
    id, beanName, country, farm, variety, aroma, likes,
    // ⭐ 追加部分
    flavor: {
        acidity: Number,        // 酸味 (1-5)
        bitterness: Number,     // 苦味 (1-5)
        richness: Number,       // コク (1-5)
        sweetness: Number,      // 甘み (1-5)
        aromaStrength: Number   // 香り (1-5)
    }
}
```

**4. Chart.jsでレーダーチャート実装**
- 5角形のフレーバープロファイル
- ゴールドカラー（#d4af37）で統一
- ダークテーマに最適化
- レスポンシブ対応（スマホ・PC両対応）

**5. 防御コード実装**
```javascript
// 古いデータ形式（flavorなし）への対応
if (!log.flavor) {
    console.warn('古いデータ形式のため、スキップします:', log);
    return;
}
```

#### 学習ポイント
- 外部ライブラリ（Chart.js）の統合
- 配列とforEachの活用
- データ構造の拡張と下位互換性
- レスポンシブチャート実装

---

## 🚧 現在作業中（Phase 3の微調整）

### 未完了の調整項目

1. **スマホ表示でカードの余白調整**
   - main.cssの`#main-content`のpadding調整

2. **生産地/農園表示の高さ差修正**
   - `.meta-info`のflex-wrap設定調整

3. **新項目追加: プロセスとドリッパー**
   - [ ] HTMLに入力欄追加（process, dripper）
   - [ ] JSでデータ取得
   - [ ] logオブジェクトに追加
   - [ ] カード表示に反映
   - [ ] 入力欄のリセット処理追加

#### 追加予定のデータ項目
```javascript
log = {
    // ... 既存の項目 ...
    process: String,   // プロセス（例：ウォッシュド、ナチュラル）
    dripper: String,   // ドリッパー（例：V60、カリタ）
    flavor: { ... }
}
```

---

## 📋 今後の実装予定（Phase 4-8）

### Phase 4: 編集機能（Update完全化）

**目標**: 既存データの修正を可能にする

#### 実装内容
- [ ] カードに編集ボタン追加（鉛筆アイコン）
- [ ] 編集ボタン押下時の処理
  - 入力画面へ遷移
  - フォームに既存データを表示
  - スライダーの値も復元
- [ ] 保存時の判定ロジック
  - グローバル変数で編集中IDを管理
  - IDがあれば「更新」、なければ「新規」
- [ ] 配列内のデータ更新処理

#### 実装のポイント
```javascript
// 編集中IDを保持するグローバル変数
let editingId = null;

// 編集ボタン押下時
function editCard(logId) {
    editingId = logId;
    const log = coffeeLogs.find(log => log.id === logId);
    // フォームにデータを入れる
    document.getElementById('bean-name').value = log.beanName;
    // ... 他の項目も同様
}

// 保存時
if (editingId) {
    // 更新処理
    const index = coffeeLogs.findIndex(log => log.id === editingId);
    coffeeLogs[index] = log;
    editingId = null;
} else {
    // 新規追加
    coffeeLogs.push(log);
}
```

#### 学習ポイント
- データの再利用
- findとfindIndexの使い分け
- 状態管理（editingId）
- CRUD操作の完成

---

### Phase 5: 検索・並び替え機能

**目標**: データが増えた時の利便性向上

#### 実装内容
- [ ] 検索バーの追加
  - ホーム画面上部に配置
  - 豆の名前でリアルタイム検索
  - 国名、農園名でも検索可能に
- [ ] フィルタリング機能
  - `filter()`メソッドの応用
  - 検索結果をリアルタイム表示
- [ ] ソート機能のUI
  - ドロップダウンメニュー
  - 新しい順 / 古い順
  - いいね数順
  - 豆の名前順（ABC順）
- [ ] ソート処理の実装
  - `sort()`メソッドの活用

#### 実装例
```javascript
// 検索処理
function searchCoffee(keyword) {
    return coffeeLogs.filter(log => {
        return log.beanName.includes(keyword) ||
               log.country.includes(keyword) ||
               log.farm.includes(keyword);
    });
}

// ソート処理
function sortLogs(criteria) {
    switch(criteria) {
        case 'newest':
            return coffeeLogs.sort((a, b) => b.id - a.id);
        case 'oldest':
            return coffeeLogs.sort((a, b) => a.id - b.id);
        case 'likes':
            return coffeeLogs.sort((a, b) => b.likes - a.likes);
    }
}
```

#### 学習ポイント
- 高度な配列操作（filter, sort）
- リアルタイム検索の実装
- ソートアルゴリズムの基礎

---

### Phase 6: UI/UXの仕上げ

**目標**: プロフェッショナルな見た目と使い心地

#### 実装内容
- [ ] アニメーション追加
  - カード表示時のフェードイン
  - ボタンホバーエフェクト
  - 画面遷移のスムーズ化
- [ ] モーダルウィンドウの自作
  - `window.confirm()`を置き換え
  - カスタムデザインの確認ダイアログ
  - 削除確認、保存確認に使用
- [ ] トースト通知
  - 保存完了メッセージ
  - 削除完了メッセージ
  - 右上から出現して自動で消える
- [ ] レスポンシブ対応の強化
  - タブレット表示の最適化
  - スマホ横向き対応

#### CSS例
```css
/* フェードインアニメーション */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.glass-card {
    animation: fadeIn 0.3s ease;
}

/* トースト通知 */
.toast {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--primary);
    padding: 16px 24px;
    border-radius: 8px;
    animation: slideIn 0.3s ease;
}
```

#### 学習ポイント
- CSSアニメーション（@keyframes）
- トランジション
- カスタムモーダルの実装
- UX設計の基礎

---

### Phase 7: クラウド化（Firebase）

**目標**: LocalStorageからクラウドへ移行

#### 実装内容
- [ ] Firebase プロジェクト作成
- [ ] Firestore データベース設定
- [ ] 認証機能の実装
  - 匿名ログイン（登録不要、お試し用）
  - メール/パスワード認証（本名不要）
  - ログイン/ログアウトUI
- [ ] データ読み書きの移行
  - LocalStorage → Firestore
  - リアルタイム同期
- [ ] セキュリティルールの設定
  - 自分のデータだけ読み書き可能に

#### Firestore データ構造例
```javascript
// users/{userId}/coffees/{coffeeId}
{
    id: Number,
    beanName: String,
    country: String,
    farm: String,
    variety: String,
    aroma: String,
    process: String,
    dripper: String,
    likes: Number,
    flavor: {
        acidity: Number,
        bitterness: Number,
        richness: Number,
        sweetness: Number,
        aromaStrength: Number
    },
    createdAt: Timestamp,
    updatedAt: Timestamp
}
```

#### 実装例
```javascript
// Firestoreへの保存
async function saveCoffeeLog(log) {
    await db.collection('users')
            .doc(userId)
            .collection('coffees')
            .doc(log.id.toString())
            .set(log);
}

// Firestoreから取得
async function loadCoffeeLogs() {
    const snapshot = await db.collection('users')
                             .doc(userId)
                             .collection('coffees')
                             .get();
    return snapshot.docs.map(doc => doc.data());
}
```

#### 学習ポイント
- 非同期処理（async/await）
- Promise の理解
- BaaS（Backend as a Service）の活用
- 認証フローの実装
- クラウドデータベースの基礎

---

### Phase 8: 世界へ公開

**目標**: インターネット上で誰でもアクセス可能に

#### 実装内容
- [ ] デプロイ先の選定
  - Vercel（推奨、無料枠あり）
  - または Netlify
- [ ] ビルド設定
- [ ] 環境変数の設定（Firebase設定等）
- [ ] カスタムドメイン設定（オプション）
- [ ] PWA化
  - Service Worker の実装
  - manifest.json の作成
  - アイコン画像の準備
  - オフライン対応
- [ ] OGP設定
  - SNSシェア時の見栄え向上
  - meta タグの設定

#### PWA manifest.json 例
```json
{
  "name": "BeanJournal",
  "short_name": "BeanJournal",
  "description": "コーヒー豆のテイスティング記録アプリ",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#121212",
  "theme_color": "#d4af37",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

#### 学習ポイント
- デプロイの流れ
- PWA技術（Service Worker, Manifest）
- ホーム画面への追加機能
- オフライン対応
- 運用とメンテナンス

---

## 🛠️ 技術スタック

### 現在使用中
- **HTML5**: セマンティックHTML
- **CSS3**: 
  - カスタムプロパティ（CSS変数）
  - Flexbox
  - ガラスモーフィズム
  - レスポンシブデザイン
- **JavaScript ES6+**:
  - アロー関数
  - テンプレートリテラル
  - 分割代入
  - forEach, filter, find, map
  - addEventListener
  - LocalStorage API
- **外部ライブラリ**:
  - Chart.js（レーダーチャート）
  - Lucide Icons（アイコン）
  - Google Fonts（Outfit）

### 今後導入予定
- **Firebase**:
  - Firestore（データベース）
  - Authentication（認証）
- **PWA技術**:
  - Service Worker
  - Web App Manifest
- **デプロイ**:
  - Vercel または Netlify

---

## 📈 学習の進捗

### 習得済みスキル ✅
- DOM操作（getElementById, querySelector, closest等）
- イベント処理（addEventListener、イベント委譲）
- データ永続化（LocalStorage）
- 配列操作（forEach, filter, find, push）
- オブジェクト指向的なデータ管理
- 外部ライブラリの統合
- レスポンシブデザインの基礎
- デバッグとエラー対応
- 防御的プログラミング

### 次に学ぶスキル 📚
- CRUD操作の完全実装（Update）
- 高度な配列操作（sort, map, reduce）
- CSSアニメーション
- モーダル/トースト実装
- 非同期処理（async/await, Promise）
- Firebase連携
- PWA実装
- デプロイとCI/CD

---

## 🎯 開発の目標

### 短期目標（Phase 4まで）
- CRUD操作の完全実装
- 実用的な編集・削除機能の完成
- 基本的なWebアプリの完成形

### 中期目標（Phase 6まで）
- プロフェッショナルなUI/UX
- 検索・ソート機能の実装
- 実務レベルのフロントエンド技術習得

### 長期目標（Phase 8まで）
- Firebase連携によるクラウド化
- 認証機能の実装
- 本番環境へのデプロイ
- PWA化によるアプリ体験の向上

---

## 📝 メモ・気づき

### Phase 3で学んだこと
- **forEachの活用**: 繰り返し処理をまとめることでコードがDRY（Don't Repeat Yourself）になる
- **防御的プログラミング**: データ構造が変わった時のエラー対応の重要性
- **Chart.jsの設定**: optionsの構造が深い（scales.r.ticks...）ので、公式ドキュメントを見ながら調整
- **レスポンシブチャート**: canvasの親要素でサイズを制御するのがコツ

### つまずいたポイントと解決策
1. **スライダーの値が固定されていた**
   → 保存ボタン押下時に改めて値を取得する必要があった

2. **ページリロード時にエラー**
   → 古いデータ形式が残っていたため、防御コードで対応

3. **レーダーチャートが縦に伸びる**
   → `.chart-container`で高さを固定し、canvasを100%にする

4. **ID名の不一致（typo）**
   → aromaStrength vs aroma-strength の統一が必要だった

---

## 📅 開発履歴

- **Phase 1-2完了**: 基本CRUD機能（Create, Read, Delete）
- **Phase 3開始**: 2025/12/30（推定）
- **Phase 3完了**: 2025/12/30（推定）
- **現在**: Phase 3の微調整中

---

## 🔗 参考リソース

- [Chart.js 公式ドキュメント](https://www.chartjs.org/)
- [Lucide Icons](https://lucide.dev/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Firebase 公式ドキュメント](https://firebase.google.com/docs)

---

**最終更新**: 2025/12/30

