<template>
  <div class="ChiTietDangKy">
    <h3 class="line_bottom mt-5" style="text-align:center; color: black; font-size: 40px;">Đăng Ký</h3>
    <div class="main_ChiTietDangKy">
      <div class="row">
        <div class="col-xl-6 thongtinkhachhang">
          <h5 style="text-align:center; font-size: 30px;">Thông Tin Khách Hàng</h5>
          <div class="main_thongtinkhachhang">
            <div class="row row_thongtinkhachhang">
              <div class="col-xl-12 col_thongtinkhachhang">
                <ul>
                  <li>
                    <label for="">Họ Và Tên (*)</label>
                    <input v-model="ten" type="text" placeholder="Họ Và Tên" required>
                  </li>
                  <li>
                    <label for="">Giới Tính(*)</label>
                    <select style="font-size: 20px;" v-model="gioiTinh" id="gioitinh" class="form-control">
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                  </li>
                  <li>
                    <label for="">Số Điện Thoại (*)</label>
                    <input v-model="soDienThoai" type="tel" placeholder="Số Điện Thoại" required>
                  </li>
                  <li>
                    <label for="">Ngày Sinh (*)</label>
                    <input v-model="ngaySinh" type="date" placeholder="Xã/Thị Trấn (*)" required>
                  </li>
                  <li>
                    <label for="">Địa Chỉ (*)</label>
                    <input v-model="diaChi" type="text" placeholder="Địa Chỉ" required>
                  </li>

                </ul>
              </div>
            </div>
          </div>
        </div>


        <div class="col-xl-6 thongtinDangKy">
          <h5 style="text-align:center; font-size: 30px;">Thông Tin Mật Khẩu</h5>
          <div class="main_thongtinDangKy">
            <div class="row row_thongtinDangKy">
              <div class="col-xl-12 col_thongtinDangKy">
                <ul>
                  <label for="">Tài Khoản (*)</label>
                  <li>
                    <input v-model="email" type="text" placeholder="Tài Khoản" required>
                  </li>
                  <label for="">Mật Khẩu (*)</label>
                  <li>
                    <input v-model="password" type="password" placeholder="Vui lòng Mật Khẩu Của Bạn...." required>
                  </li>
                  <div class="button_DangKy">
                    <button style="font-size: 20px;" type="submit" @click="submitForm">
                      Đăng Ký
                    </button>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      email: '',
      password: '',
      ten: '',
      ngaySinh: '',
      gioiTinh: 'Nam',
      diaChi: '',
      soDienThoai: '',
    };
  },
  methods: {
    async submitForm(event) {
      event.preventDefault();
      const formData = {
        email: this.email,
        password: this.password,
        ten: this.ten,
        ngaySinh: this.ngaySinh,
        gioiTinh: this.gioiTinh,
        diaChi: this.diaChi,
        soDienThoai: this.soDienThoai,
      };
      try {
        await axios.post('http://localhost:3000/api/user/register', formData);
        this.$router.push("/DangNhap")
      } catch (error) {
        if (error.response) {
          // Nếu có phản hồi từ máy chủ
          if (error.response.status === 400) {
            alert(error.response.data.message)
          } else {
            alert(error.response.data.message)
          }
        }

      }
    },

  }

}
</script>

<style scoped>
.ChiTietLichKham h3 {
  padding: 20px;

}

.main_thongtinkhachhang {
  margin-bottom: 50px;
}

.line_bottom::after {
  background-color: #66bde6;
  content: '';
  display: block;
  height: 4px;
  margin: auto;
  position: relative;
  top: 9px;
  width: 100px;
  border-radius: 20px;
  margin-bottom: 50px;
}

.col_thongtinkhachhang ul li {
  list-style: none;
  padding: 10px;
}

.col_thongtinkhachhang ul li label {
  font-size: 20px;
}

.col_thongtinDangKy input,
.col_thongtinkhachhang input {
  width: 100%;
  padding: 7px;
  font-size: 20px;
}

.col_thongtinDangKy ul li {
  list-style: none;
  margin: 10px 40px 10px 0;
}

.col_thongtinDangKy ul label {
  font-size: 20px;
}



.col_thongtinbenhnhan ul li,
.col_thongtinBacSi ul li {
  font-weight: bold;
}

.col_thongtinbenhnhan ul li span,
.col_thongtinBacSi ul li span {
  font-weight: 300;
}

.col_thongtinbenhnhan,
.col_thongtinBacSi {
  margin-bottom: 50px;
}

.button_DangKy {
  margin: 20px 40px 10px 0;
}

.button_DangKy button {
  width: 100%;
  padding: 10px 0;
  background: #039ae3;
  color: white;
  border: none;
}
</style>