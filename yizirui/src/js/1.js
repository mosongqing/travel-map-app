function showPage(id) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
    page.style.display = 'none';
  });

  const targetPage = document.getElementById(id);
  targetPage.classList.add('active');
  targetPage.style.display = 'block';

  // // ✅ 控制地图视图显隐
  // const viewDiv = document.getElementById('viewDiv');
  // if (id === 'map') {
  //   viewDiv.style.display = 'block';
  
  //   // ✅ 地图容器显示之后强制 resize
  //   setTimeout(() => {
  //     if (view) view.resize();
  //   }, 100);
  // } else {
  //   viewDiv.style.display = 'none';
  // }
  
  
}




function login() {
  // alert('这里可以跳转到登录页或弹出登录框！');
  // window.location.href = 'login.html'; // 如果你有登录页
}

const toggleNavBtn = document.getElementById('toggleNavBtn');
const navbar = document.querySelector('.navbar'); // ✅ 只定义一次

// 点击按钮控制导航栏显示/隐藏
toggleNavBtn.addEventListener('click', () => {
  if (navbar.style.top === '-80px') {
    navbar.style.top = '0';
  } else {
    navbar.style.top = '-80px';
  }
});

// 页面滚动控制导航栏显示/隐藏
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > 80) {
    // 向下滚动，隐藏导航栏
    navbar.style.top = '-80px';
  } else {
    // 向上滚动，显示导航栏
    navbar.style.top = '0';
  }

  lastScroll = currentScroll;
});















let uploadedAvatar = "";
let uploadedRegisterAvatar = "";

// ===================== 登录 / 注册 弹窗控制 =====================
function openLogin() {
  document.getElementById("loginModal").style.display = "block";
  document.getElementById("loginOverlay").style.display = "block";
}

function closeLogin() {
  document.getElementById("loginModal").style.display = "none";
  document.getElementById("loginOverlay").style.display = "none";
}

function showRegister() {
  closeLogin();
  document.getElementById("registerModal").style.display = "block";
  document.getElementById("registerOverlay").style.display = "block";
}

function closeRegister() {
  document.getElementById("registerModal").style.display = "none";
  document.getElementById("registerOverlay").style.display = "none";
}

function showLogin() {
  closeRegister();
  openLogin();
}

// ===================== 头像上传预览 =====================
function previewAvatar() {
  const file = document.getElementById("avatarUpload").files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      uploadedAvatar = e.target.result;
      const preview = document.getElementById("avatarPreview");
      preview.src = uploadedAvatar;
      preview.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
}

function previewRegisterAvatar() {
  const file = document.getElementById("registerAvatarUpload").files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      uploadedRegisterAvatar = e.target.result;
      const preview = document.getElementById("registerAvatarPreview");
      preview.src = uploadedRegisterAvatar;
      preview.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
}

// ===================== 注册逻辑 =====================
function register() {
  const username = document.getElementById("registerUsername").value.trim();
  const password = document.getElementById("registerPassword").value.trim();

  if (!username || !password) {
    alert("请输入用户名和密码！");
    return;
  }

  const userList = JSON.parse(localStorage.getItem("userList")) || {};

  if (userList[username]) {
    alert("用户名已存在！");
    return;
  }

  userList[username] = {
    username,
    password,
    avatar: uploadedRegisterAvatar || "https://unpkg.com/outeres@0.0.10/demo/avatar/1.jpg"
  };

  localStorage.setItem("userList", JSON.stringify(userList));
  alert("注册成功，请登录！");
  showLogin();
}

// ===================== 登录逻辑 =====================
function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const userList = JSON.parse(localStorage.getItem("userList")) || {};

  const user = userList[username];
  if (!user || user.password !== password) {
    alert("用户名或密码错误！");
    return;
  }

  const userArea = document.getElementById("user-area");
  userArea.innerHTML = `
    <img src="${uploadedAvatar || user.avatar}" class="avatar" />
    <span style="margin-left:8px;color:white;">${user.username}</span>
  `;
  userArea.onclick = toggleUserMenu;

  document.getElementById("user-nickname").textContent = user.username;
  localStorage.setItem("user", JSON.stringify(user));
  closeLogin();
}

// ===================== 用户菜单、退出 =====================
function toggleUserMenu() {
  const menu = document.getElementById("user-menu");
  if (menu) {
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
  }
}

function logout() {
  localStorage.removeItem("user");
  const userArea = document.getElementById("user-area");
  userArea.innerHTML = `
    <img id="user-avatar" src="https://unpkg.com/outeres@0.0.10/demo/avatar/1.jpg" class="avatar" alt="头像" />
  `;
  userArea.onclick = openLogin;
  document.getElementById("user-menu").style.display = "none";
}

// ===================== 页面加载恢复状态 =====================
window.addEventListener("DOMContentLoaded", () => {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  if (savedUser) {
    const userArea = document.getElementById("user-area");
    userArea.innerHTML = `
      <img src="${savedUser.avatar}" class="avatar" />
      <span style="margin-left:8px;color:white;">${savedUser.username}</span>
    `;
    userArea.onclick = toggleUserMenu;
    document.getElementById("user-nickname").textContent = savedUser.username;
  }
});





// 首页js逻辑
const slides = document.querySelectorAll('.slide');
let index = 0;

function showNextSlide() {
  slides[index].classList.remove('active');
  index = (index + 1) % slides.length;
  slides[index].classList.add('active');
}

setInterval(showNextSlide, 4000); // 每4秒轮播

function toggleExpand(card) {
card.classList.toggle("expanded");
}







//地图页js