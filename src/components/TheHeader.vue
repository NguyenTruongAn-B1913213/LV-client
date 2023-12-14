<template>
  <div>
    <div class="the-header">
      <div class="logo">
        <img src="https://bizweb.dktcdn.net/100/378/435/themes/755692/assets/logo.png?1663489820792" alt="" />
      </div>

      <div class="address" v-for="(phongkham, index) in TTPhongKham" :key="index">
        <ul>
          <div class="hotline">
            <li>
              <i class="fa fa-phone-square"></i>
              <span>HOTLINE:</span>
              <span>{{ phongkham.soDienThoai }}</span>
            </li>
            <li>
              <i class="fa fa-clock"></i>
              <span>Ngày làm việc: </span>
              <span>{{ phongkham.giolamviec }}</span>
            </li>
          </div>
          <li>
            <i class="fa fa-map-marker-alt"></i>
            <span>Địa chỉ:</span>
            <span>{{ phongkham.diaChi }}</span>
          </li>
        </ul>
      </div>
    </div>

    <nav class="navbar-header navbar-expand-lg navbar-light">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse navbarTitleHeader" id="navbarSupportedContent">
        <!-- <div class="logo">
                    <img src="https://bizweb.dktcdn.net/100/378/435/themes/755692/assets/logo.png?1663489820792" alt="" />
                </div> -->
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link ">Trang
              Chủ</router-link>
          </li>

          <!-- <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="" role="button" data-toggle="dropdown" aria-haspopup="true"
              aria-expanded="false">
              Giới Thiệu
            </a>
            <div class="dropdown-menu">

              <router-link to="/DoiNguBacSi" class="dropdown-item">Đội Ngũ Bác Sĩ</router-link>
              <router-link to="/TinTucSuKien" class="dropdown-item">Tin Tức Sự Kiện</router-link>
            </div>
          </li> -->
          <!-- <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="" role="button" data-toggle="dropdown" aria-haspopup="true"
              aria-expanded="false">
              Chuyên Khoa
            </a>
            <div class="dropdown-menu">
              <router-link to="/NoiKhoa" class="dropdown-item">Nội Khoa</router-link>
              <router-link to="#" class="dropdown-item">Ngoại Khoa</router-link>
              <router-link to="#" class="dropdown-item">Phụ Khoa</router-link>
              <router-link to="#" class="dropdown-item">Da Liễu</router-link>
            </div>
          </li> -->
          <li class="nav-item">
            <!-- <router-link to="" class="nav-link">Tin Nội Bộ</router-link> -->
            <router-link to="/CoSoVatChat" class="nav-link"> Giới Thiệu</router-link>
          </li>
          <!-- <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true"
              aria-expanded="false">
              Liên Hệ
            </a>
            <div class="dropdown-menu">
              <router-link to="/BacSiTuVan" class="dropdown-item">Bác sĩ tư vấn</router-link>
              <router-link to="/TimDuongDi" class="dropdown-item">Tìm Đường Đi</router-link>
            </div>
          </li> -->
          <li class="nav-item">
            <router-link to="/DatLichKham" class="nav-link">Đặt Lịch Khám</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/TimDuongDi" class="nav-link">Tìm Đường Đi</router-link>
          </li>
          <li class="nav-item" v-if="!token">
            <router-link to="/DangNhap" class="nav-link">Đăng Nhập</router-link>
          </li>
          <!-- <li class="nav-item dropdown" v-else>
            <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true"
              aria-expanded="false">
              Thông Tin Cá Nhân
            </a>
            <div class="dropdown-menu">
              <router-link to="/BacSiTuVan" class="dropdown-item">Xin Chào: {{ userName }} </router-link>
              <router-link to="/XemLich" class="dropdown-item">Lịch Khám</router-link>
              <router-link to="/TimDuongDi" @click="removeToken" class="dropdown-item">Đăng Xuất</router-link>
            </div>
          </li> -->

        </ul>
        <form class="form-inline my-2 my-lg-0">
          <div class="bell-notifications" v-if="token">
            <i class="fa fa-bell"></i>
            <div class="number-notifications">
              <span>{{ numberOfNotifications }}</span>
            </div>
            <div class="box-notifications">
              <ul style="margin: 0; padding: 0;" v-for="(notification, index) in notifications" :key="index"
                @click="redirectToAppointment(notification._id)">
                <li v-if="notification.trangThaiNotification">
                  <span>Lịch Khám Của Bạn Đã Được Xác Nhận</span>
                  <span>Số Thứ Tự: {{ notification.stt }}</span>
                  <span>Khám Vào Ngày: {{ notification.ngaygioKham.thu }} {{ notification.ngaygioKham.ngay }}</span>
                  <span>Ca Khám: {{ notification.ngaygioKham.thu }}</span>
                </li>
                <li v-else style="background-color: #F0F0F0;">
                  <span>Lịch Khám Của Bạn Đã Được Xác Nhận</span>
                  <span>Số Thứ Tự: {{ notification.stt }}</span>
                  <span>Khám Vào Ngày: {{ notification.ngaygioKham.thu }} {{ notification.ngaygioKham.ngay }}</span>
                  <span>Ca Khám: {{ notification.ngaygioKham.thu }}</span>
                </li>

                <!-- <li style="background-color: beige;">
                  <span>Lịch Khám Của Bạn Đã Được Xác Nhận</span>
                  <span>Số Thứ Tự: 2</span>
                  <span>Khám Vào Ngày: 23/12</span>
                  <span>Ca Khám: sáng</span>
                </li>

                <li>
                  <span>Lịch Khám Của Bạn Đã Được Xác Nhận</span>
                  <span>Số Thứ Tự: 2</span>
                  <span>Khám Vào Ngày: 23/12</span>
                  <span>Ca Khám: sáng</span>
                </li> -->
              </ul>
              <!-- <ul v-for="(notification, index) in notifications" :key="index"
                @click="redirectToAppointment(notification._id)">
                <span>Lịch Khám Của Bạn Đã Được Xác Nhận</span>
                <li>Số Thứ Tự: {{ notification.stt }}</li>
                <li>Khám Vào Ngày: {{ notification.ngaygioKham.thu }} {{ notification.ngaygioKham.ngay }}</li>
                <li>Ca Khám: {{ notification.ngaygioKham.thu }}</li>
              </ul> -->
            </div>
          </div>
          <div class="avatar-user" v-if="token">
            <div class="avatar-user-header">
              <img v-if="photo" :src="photo" alt="">
              <img v-else src="../../src/assets/TinTucSuKien/272985925_2095334303953118_2977323602357798456_n.jpg" alt="">
            </div>
            <div class="name-user">
              <span>{{ userName }}</span>
              <div class="extend-name-user animate__animated animate__zoomIn">
                <ul>
                  <li> <router-link to="/XemLich" class="dropdown-item">Lịch khám</router-link></li>
                  <li v-if="role == 'bacsi'"> <router-link to="/bacSi" class="dropdown-item">Bác sĩ</router-link></li>
                  <li v-if="role == 'admin'"> <router-link to="/admin" class="dropdown-item">Quản lý</router-link>
                  </li>
                  <li> <router-link to="/" @click="removeToken" class="dropdown-item">Đăng xuất</router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      </div>
    </nav>
  </div>
</template>
    

<script>
import { mapMutations, mapState } from 'vuex';
import Cookies from 'js-cookie'
import axios from 'axios';
import io from "socket.io-client";
export default {
  name: "header-page",
  data() {
    return {
      user: {},
      socket: null, // Đối tượng socket
      messages: [], // Lưu trữ tin nhắn
      newMessage: '', // Tin nhắn mới
      notifications: [],
      TTPhongKham: [],
      extendUserVisible: false,
      hideTimer: null
    }


  },
  computed: {

    ...mapState({
      token: (state) => state.token,
      proFile: (state) => state.proFile,
      userName: (state) => state.userName,
      userID: (state) => state.userID,
      role: (state) => state.role,
      photo: (state) => state.photo
    }),
    numberOfNotifications: function () {
      let quantityNotification = 0; // Khai báo và khởi tạo biến quantityNotification
      for (const element of this.notifications) {
        if (element.trangThaiNotification == false) {
          quantityNotification++;
        }
      }
      return quantityNotification;
    }

  },
  mounted() {
  },
  async created() {
    this.fetchPhongKham()
    const token = Cookies.get("token")
    const proFile = Cookies.get("proFile");
    const UserID = Cookies.get("UserID")
    const userName = Cookies.get("userName")
    let role = Cookies.get("role")
    const photo = Cookies.get("photo")
    if (token) {
      this.setToken(token)
      this.setUserID(UserID)
      this.setUserName(userName)
      this.setPhoto(photo)
      this.setRole(role)
      if (proFile) {
        this.setProfile(JSON.parse(proFile))
      }

    }
    this.socket = io('http://localhost:3000');
    this.socket.on('xacNhanLichKham', async (data) => {
      if (this.userID === data.tkid) {
        this.notifications.unshift(data);
      }
    })


  },
  watch: {
    userID(newUserID) {
      // Khi this.userID thay đổi, gửi yêu cầu lấy thông báo
      if (newUserID) {
        this.GetNotification();
      }
      if (newUserID === "") {
        this.notifications = []
      }
    }
  },

  methods: {

    ...mapMutations(['setToken', 'removeToken', 'setProfile', 'setUserID', 'setUserName', 'setPhoto', 'setRole']),

    async fetchProfile() {
      try {
        const headers = {
          Authorization: `Bearer ${this.token}`,
        };
        const res = await axios({
          methods: "GET",
          url: "http://localhost:3000/api/user/profile",
          headers
        },)
        this.user = res.data

      } catch (error) {
        this.Message = "abc"

      }

    },

    async GetNotification() {
      try {
        const headers = {
          userID: `${this.userID}`,
        };
        const res = await axios({
          methods: "GET",
          url: "http://localhost:3000/api/get-notification",
          headers
        },)
        this.notifications = res.data
        this.notifications.sort((a, b) => {
          const dateA = new Date(a.createAt);
          const dateB = new Date(b.createAt);
          return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
        });
        console.log(this.notifications)
      } catch (error) {
        console.log(error)

      }
    },

    async redirectToAppointment(appointmentId) {
      try {
        await axios.get(`http://localhost:3000/api//check-notification/${appointmentId}`);
        this.GetNotification()
        this.$router.push(`/IncidentReport/${appointmentId}`);
      } catch (error) {
        console.log(error)
      }
    },
    async fetchPhongKham() {
      try {
        const response = await axios.get(`http://localhost:3000/api/phongkham`)
        this.TTPhongKham = response.data

      } catch (error) {
        console.log(error)
      }
    },

    showExtendUser() {
      this.extendUserVisible = true;
    },
    hideExtendUser() {
      this.hideTimer = setTimeout(() => {
        this.extendUserVisible = false;
      }, 5000); // 5 giây
    },
    cancelHideTimer() {
      clearTimeout(this.hideTimer);
    },

  }

};

</script>

<style>
.navbar-light .nav-link:hover {
  color: lightcyan;
}

/* .inforPhongKham {
    display: flex;
    justify-content: space-between;
} */
.avatar-user {
  display: flex;
}

.avatar-user .avatar-user-header img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.avatar-user .name-user span {
  font-size: 26px;
  padding: 20px;
  color: white;
  text-transform: uppercase
}

.avatar-user .name-user {
  position: relative;
}

/* Thời gian trễ khi hover vào */
.avatar-user .name-user:hover .extend-name-user {
  display: block;
  opacity: 1;
  transition-delay: 0.7s;

}

/* Khi hover vào .extend-name-user, giữ hiển thị trong khoảng thời gian */
.avatar-user .name-user .extend-name-user:hover {
  opacity: 1;
  transition-delay: 5s;
  /* Giữ hiển thị trong 5 giây sau khi rê chuột ra khỏi phần tử */
}

/* Ẩn phần tử khi không hover */
.avatar-user .name-user:not(:hover) .extend-name-user {
  opacity: 0;
}

.extend-name-user::before {
  content: '';
  position: absolute;
  top: -20px;
  /* Điều chỉnh vị trí mũi tên đối với phần trên của khung */
  left: 70%;
  transform: translateX(-50%);
  border: 10px solid transparent;
  border-bottom-color: white;
  /* Màu của mũi tên */
}

.avatar-user .name-user .extend-name-user {
  background-color: white;
  width: 240px;
  height: auto;
  position: absolute;
  right: 10px;
  top: 50px;
  display: none;
  opacity: 0;
  /* Ẩn ban đầu và thiết lập độ mờ là 0 */
  transition: opacity .3s ease-in-out;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.avatar-user .name-user .extend-name-user ul li {
  color: black;
  list-style: none;
  font-size: 30px;
}


.bell-notifications {
  position: relative;
  margin-right: 20px;
  font-size: 20px;
  color: white;
}

.the-header {
  display: flex;
  justify-content: space-between;
}

.number-notifications {
  background: red;
  position: absolute;
  top: -15px;
  left: 10px;
  width: 20;
  height: 20;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
}

.box-notifications {
  cursor: pointer;
  position: absolute;
  background: white;
  width: 400px;
  left: -200px;
  top: 34px;
  border-radius: 10px;
  visibility: hidden;
  transition: all .3s ease;
  overflow-x: hidden;
  overflow-y: auto;
  height: 200px;
  /* border: 1px solid black; */
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.bell-notifications:hover .box-notifications {
  visibility: visible;
}

.box-notifications ul {
  color: black;
}

.box-notifications ul li span {
  font-size: 15px;
  padding: 0 30;
  display: flex;
}

.box-notifications ul li {
  list-style: none;
  border-bottom: 1px solid black;

}

.box-notifications::after {
  content: '';
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 15px solid white;
  position: absolute;
  top: -11px;
  left: 195px;
  z-index: -99;
}

.number-notifications span {

  color: white;
  text-align: center;
}


/* .addressLienHe ul li {
    list-style: none;
    margin-right: 50px;
} */
.hotline {
  display: flex;
}

.address {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.address ul li {
  list-style: none;
  margin-right: 20px;
  line-height: 35px;
}

.address ul li i:first-of-type {
  color: #039ae3;
  margin-right: 10px;
  font-weight: bold;
  font-size: 25px;
}

.address ul li span:first-of-type {
  color: #039ae3;
  margin-right: 10px;
  font-weight: bold;
  font-size: 25px;
}

.address ul li span:last-of-type {
  font-size: 25px;
}

.address ul li:last-of-type {
  float: right;
}

.logo img {
  width: 200px;
  margin: 10px 50px;
}

.navbar-header {
  position: -webkit-sticky;
  position: sticky;
  background: #039ae3;
  top: 0;
  z-index: 100;
  padding: 10px 0;
}

.navbarTitleHeader {
  margin-left: 40px;
}

.navbar-light .navbar-nav .nav-link {
  color: white;
  font-size: 18pt;
  font-weight: inherit;
  cursor: pointer;
  margin: 0 5px;

}

.navbar-light .navbar-nav {
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18pt;
  font-weight: inherit;
  cursor: pointer;
  margin: 0 5px;

}

.navbar-light .navbar-nav .nav-link:hover {
  color: #E8E8E8;
  font-size: 18pt;
  font-weight: 450;
  cursor: pointer;
  margin: 0 5px;
}

.navbar-light .navbar-nav .nav-link:focus {
  color: white;
  font-size: 18pt;
  font-weight: 450;
  cursor: pointer;
  margin: 0 5px;

}


.buttonSearch {
  border: none;
  width: 50px;
  height: 37px;
  border-radius: 10%;
  margin-right: 20px;
}
</style>
