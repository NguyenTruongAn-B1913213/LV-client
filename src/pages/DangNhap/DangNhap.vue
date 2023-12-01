<template>
  <div class="DangNhap">
    <div class="container">
      <div class="row">
        <div class="col-xl-6 title-login">
          <h4>Bạn Đã Có Tài Khoản</h4>
          <p>Vui Lòng Đăng Nhập</p>
          <div>
            <form class="form">
              <div class="flex-column">
                <label>Tài khoản</label>
              </div>
              <div class="inputForm">
                <input v-model="email" placeholder="Enter your Email" class="input" type="text" />
              </div>

              <div class="flex-column">
                <label>Mật khẩu</label>
              </div>
              <div class="inputForm">
                <input v-model="password" placeholder="Enter your Password" class="input" type="password" />
              </div>
              <button type="submit" class="button-submit" @click="login">Đăng nhập</button>
              <p class="p">Bạn không có tài khoản? <span class="span" @click="goToSignUp">Đăng kí</span></p>

              <div class="flex-row">
                <button class="btn google" @click="loginWithGoogle">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 32 32" height="20">
                    <path
                      d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z">
                    </path>
                  </svg>
                  Google
                </button>
                <button class="btn twitter" @click="loginWithTwitter">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="-64 0 512 512" height="20">
                    <path
                      d="M336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z">
                    </path>
                    <path
                      d="M304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0">
                    </path>
                  </svg>
                  Twitter
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="login"></div>
        <div class="col-xl-6 sign_up title-login">
          <h4>Bạn Đã Chưa Có Tài Khoản</h4>
          <p>Nếu bạn chưa có tài khoản , hãy sử dụng tùy chọn này để truy cập biểu mẫu đăng ký.</p>
          <p>
            Bằng cách cung cấp thông tin chi tiết của bạn, quá trình đặt lịch khám bệnh sẽ nhanh chóng hơn!
          </p>
          <button class="button-submit" @click="goToSignUp">Đăng Kí</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import axios from 'axios'
import router from '@/router'
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, TwitterAuthProvider } from "firebase/auth";
import { mapMutations, } from 'vuex';


const firebaseConfig = {
  apiKey: "AIzaSyBb0Hlr7938oR6j3efPqPIqAoDFDDhA2G4",
  authDomain: "auth-46617.firebaseapp.com",
  projectId: "auth-46617",
  storageBucket: "auth-46617.appspot.com",
  messagingSenderId: "184227684705",
  appId: "1:184227684705:web:b6f39251661be43dd0e520",
  measurementId: "G-2K9PG2ZNSW"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)



export default {
  name: "login-page",
  data() {
    return {
      email: "",
      password: "",
      token: null,
      socket: null,
    }
  },

  created() {
    this.token = Cookies.get('token');
    // Khởi tạo kết nối Socket.io

  },
  methods: {


    ...mapMutations([
      'setToken',
      'setProfile',
      'setUserID',
      'setUserName',
      'setRole',
      'setPhoto'
    ]),
    async goToSignUp() {
      router.push("/DangKiNguoiDung"); // Chuyển hướng đến trang đăng ký
    },
    async login(e) {
      e.preventDefault();
      try {
        const res = await axios.post("http://localhost:3000/api/user/login", {
          email: this.email,
          password: this.password
        })
        this.token = res.data.token
        this.setToken(this.token);
        const headers = {
          Authorization: `Bearer ${this.token}`,
        };


        const response = await axios({
          methods: "GET",
          url: "http://localhost:3000/api/user/profile",
          headers
        },)
        const proFile = response.data.doctor
        const userRole = response.data.userRole
        console.log(1)
        this.setProfile(proFile);
        this.setRole(userRole)
        const userID = proFile._id;
        if (proFile.tenBS) {
          const userName = proFile.tenBS
          this.setUserName(userName)
        } else {
          const userName = proFile.ten
          this.setUserName(userName)
        }
        this.setUserID(userID);
        if (userRole == "" || userRole == "userRole") {
          router.push("/")
        } else if (userRole == "bacsi") {
          router.push("/bacSi")
        } else {
          router.push("/admin")
        }

      } catch (error) {
        console.log()
        if (error.response) {
          // Nếu có phản hồi từ máy chủ
          if (error.response.status === 400) {
            alert(error.response.data.message)
          } else {
            // Xử lý các lỗi khác ở đây
            alert(error.response.data.message)
          }
        }
        else {
          alert("Vui Lòng Điền Tài Khoản Và Mật Khẩu")
        }

      }
    },
    async loginWithGoogle(e) {
      e.preventDefault();
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider)
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        const userID = result.user.uid
        const userName = result.user.displayName
        const photo = result.user.photoURL;
        this.setPhoto(photo)
        this.setUserName(userName)
        this.setToken(token);
        this.setProfile(user);
        this.setUserID(userID);
        router.push("/")

      } catch (error) {
        console.log(error)

      }

    },
    async loginWithTwitter(e) {
      e.preventDefault();
      try {
        const provider = new TwitterAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const credential = TwitterAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        const userID = result.user.uid
        const photo = result.user.photoURL
        this.setPhoto(photo)
        this.setToken(token);
        this.setProfile(user);
        this.setUserID(userID);
        const userName = result.user.displayName
        this.setUserName(userName)
        router.push("/")

      } catch (error) {
        console.log(error)

      }


    }
  }
}
</script>

<style scoped>
h4 {
  color: rgb(30, 4, 4);
  font-size: 25px;
}

p {
  font-size: 20px;
}

.login {
  position: absolute;
  width: 2px;
  opacity: 0.2;
  height: 70%;
  background-color: #000;
  /* Màu sắc của đường đứng */
  left: 50%;
  transform: translateX(-50%);
  /* top: 50%; */
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #ffffff;
  padding: 30px;
  width: 100%;
  border-radius: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

::placeholder {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.form button {
  align-self: flex-end;
}

.flex-column>label {
  color: #151717;
  font-weight: 600;
}

.inputForm {
  border: 1.5px solid #ecedec;
  border-radius: 10px;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  transition: 0.2s ease-in-out;
}

.input {
  margin-left: 10px;
  border-radius: 10px;
  border: none;
  width: 100%;
  height: 100%;
}

.input:focus {
  outline: none;
}

.inputForm:focus-within {
  border: 1.5px solid #2d79f3;
}

.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
}

.flex-row>div>label {
  font-size: 14px;
  color: black;
  font-weight: 400;
}

.span {
  font-size: 14px;
  margin-left: 5px;
  color: #2d79f3;
  font-weight: 500;
  cursor: pointer;
}

.button-submit {
  margin: 20px 0 10px 0;
  background-color: #66bde6;
  border: none;
  color: white;
  font-size: 15px;
  font-weight: 500;
  border-radius: 10px;
  height: 50px;
  width: 100%;
  cursor: pointer;
}

.p {
  text-align: center;
  color: black;
  font-size: 14px;
  margin: 5px 0;
}

.btn {
  margin-top: 10px;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  gap: 10px;
  border: 1px solid #ededef;
  background-color: white;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.btn:hover {
  border: 1px solid #2d79f3;
}

.sign_up {
  padding: 0 40px;
}

.title-login h4 {
  text-align: center;

}

.title-login p {
  text-align: center;
}

.DangNhap {
  margin-top: 20px;
}
</style>
