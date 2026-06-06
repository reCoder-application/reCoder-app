const authPage = document.getElementById('auth-page');
const homePage = document.getElementById('home-page');
const addBtn = document.getElementById('add-btn'); // 右下の追加ボタン
const logoutBtn = document.getElementById('logout-btn')

const authTitle = document.getElementById('auth-title');
const authEmail = document.getElementById('auth-email');
const authPassword = document.getElementById('auth-password');
const authSubmitBtn = document.getElementById('auth-submit-btn');
const authSwitchText = document.getElementById('auth-switch-text');
const authSwitchLink = document.getElementById('auth-switch-link');
const authError = document.getElementById('auth-error');


// 現在のユーザのモード（ログイン ⇔ 新規登録）
let isLoginMode = true; // 

authSwitchLink.addEventListener('click', () => {
    isLoginMode = !isLoginMode; 
    authError.style.display = 'none'; // エラーを消す

    if (isLoginMode){
        authSubmitBtn.textContent = 'ログイン';
        authSwitchText.textContent = 'アカウントをお持ちでないですか?';
        authSwitchLink.textContent = '新規登録'
    } else {
        authSubmitBtn.textContent = '登録して始める';
        authSwitchText.textContent = 'すでにアカウントをお持ちですか?';
        authSwitchLink.textContent = 'ログイン';
    }
});

//  ログイン / 新規登録ボタンを押したときの処理
authSubmitBtn.addEventListener('click', async () => {
    const email = authEmail.value;
    const password = authPassword.value;

    if (!email || !password){
        showError('メールアドレスとパスワードを入力してください。');
        return;
    }

    try {
        if(isLoginMode){
            // ログイン処理
            await firebase.auth().signInWithEmailAndPassword(email, password);
        } else {
            // 新規登録処理
            await firebase.auth().createUserWithEmailAndPassword(email, password);
        }

        // 成功したら入力欄を空にする
        authEmail.value = '';
        authPassword.value = '';
        authError.style.display = 'none';
    } catch (error) {
        console.error(error);
        // firebaseのエラーメッセージを日本語に変換して表示する
        if(error.code === 'auth/invalid-email') showError('メールアドレスが正しくありません。');
        else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') showError('メールアドレスかパスワードが間違っています。');
        else if (error.code === 'auth/email-already-in-use') showError('このメールアドレスは既に登録されています。');
        else if (error.code === 'auth/weak-password') showError('パスワードは6文字以上で入力してください。');
        else showError('エラーが発生しました。もう一度お試しください。');
    }
});

// ログアウトボタンを押したときの処理
logoutBtn.addEventListener('click', () => {
    firebase.auth().signOut();
});


// 各種エラーメッセージを表示する関数
function showError(message) {
    authError.textContent = message;
    authError.style.display = 'block';
}

// ログイン状態の監視(firebaseが自動で呼び出してくれる)
firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        // ログインしている時
        console.log('ログインしました:', user.email);
        authPage.classList.add('hidden');
        homePage.classList.remove('hidden');
        addBtn.classList.remove('hidden');
        logoutBtn.style.display = 'block';
        // 各ページのclassListの変更は正しくできているが、addBtnを押しても画面遷移しない
        initApp();
    } else {
        // ログアウトしている状態
        console.log('ログアウトしています');
        authPage.classList.remove('hidden');
        homePage.classList.add('hidden');
        addBtn.classList.add('hidden');
        logoutBtn.style.display = 'none';

        // 前のユーザーのカードが残らないように消す
        coffeeLogs = [];
        cardArea.innerHTML = '';

        // 追加画面がもし開かれたままだったら、隠す
        document.getElementById('add-page').classList.add('hidden');
    }
});