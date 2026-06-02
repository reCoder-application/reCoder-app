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


// 現在のユーザのモード（ログイン or 新規登録）
let isLoginMode = true; 

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

        }
    } catch{

    }
})

