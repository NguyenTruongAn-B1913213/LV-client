<template>
  <div class="ChiTietDangKy">
    <h3 class="line_bottom mt-5" style="text-align:center">Đăng Ký Bác Sĩ</h3>
    <div class="main_ChiTietDangKy">
      <div class="row">
        <div class="col-xl-6 thongtinkhachhang">
          <h5 style="text-align:center">Thông Tin Bác Sĩ</h5>
          <div class="main_thongtinkhachhang">
            <div class="row row_thongtinkhachhang">
              <div class="col-xl-12 col_thongtinkhachhang">
                <ul>
                  <li>
                    <label for="">Họ Và Tên (*)</label>
                    <input v-model="tenBS" type="text" placeholder="Họ Và Tên" required>
                  </li>
                  <li>
                    <label for="">Ngày Sinh (*)</label>
                    <input v-model="ngaySinh" type="date" placeholder="Xã/Thị Trấn (*)" required>
                  </li>
                  <li>
                    <label for="">Chuyên Khoa(*)</label>
                    <select v-model="chuyenKhoa" id="gioitinh" class="form-control">
                      <option value="Nội Khoa">Nội Khoa</option>
                      <option value="Ngoại Khoa">Ngoại Khoa</option>
                      <option value="Phụ Khoa">Phụ Khoa</option>
                      <option value="Da Liễu">Da Liễu</option>
                    </select>
                  </li>
                  <li>
                    <label for="">Số Điện Thoại (*)</label>
                    <input v-model="soDienThoai" type="tel" placeholder="Số Điện Thoại" required>
                  </li>
                  <li>
                    <label for="tieusu">Tiểu sử (*)</label>
                    <textarea v-model="tieusu" class="form-control" id="tieusu" name="tieusu" rows="5"
                      required></textarea>
                  </li>
                  <!-- <li>
                    <label for="">Địa Chỉ (*)</label>
                    <input v-model="diaChi" type="text" placeholder="Địa Chỉ" required>
                  </li> -->

                </ul>
              </div>
            </div>
          </div>
        </div>


        <div class="col-xl-6 thongtinDangKy">
          <h5 style="text-align:center">Thông Tin Mật Khẩu</h5>
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
                    <button type="submit" @click="submitForm">
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
      ngaySinh: "",
      tenBS: "",
      chuyenKhoa: "Nội Khoa",
      soDienThoai: "",
      tieusu: "",
    };
  },
  methods: {
    async submitForm(event) {
      event.preventDefault();
      const formData = {
        email: this.email,
        password: this.password,
        tenBS: this.tenBS,
        ngaySinh: this.ngaySinh,
        chuyenKhoa: this.chuyenKhoa,
        tieusu: this.tieusu,
        soDienThoai: this.soDienThoai,
      };
      try {
        const response = await axios.post('http://localhost:3000/api/user/register1', formData);
        console.log(response)
        this.$router.push("/")
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

.col_thongtinDangKy input,
.col_thongtinkhachhang input {
  width: 100%;
  padding: 7px;
}

.col_thongtinDangKy ul li {
  list-style: none;
  margin: 10px 40px 10px 0;
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
  background: #66bde6;
  color: white;
  border: none;
}
</style>