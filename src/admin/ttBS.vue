<template>
    <div class="ChiTietLichKham">
        <div class="main_ChiTietLichKham">
            <div class="row">
                <div class="col-xl-12 thongtinBacSi">
                    <h5 style="text-align:center">Thông Tin Bác Sĩ</h5>
                    <div class="main_thongtinBacSi" style="display: flex; justify-content: center;">
                        <div class="row row_thongtinBacSi">
                            <div class="col-xl-12 col_thongtinBacSi">
                                <ul>
                                    <li><span>Họ và Tên :</span><input style="margin-left: 30px;" type="text"
                                            v-model="doctor.tenBS"></li>
                                    <li><span>Khoa :</span> <input style="margin-left: 55px;" type="text"
                                            v-model="doctor.chuyenKhoa"></li>
                                    <li><span>Ngày Sinh :</span><input style="margin-left: 25px;" type="text"
                                            v-model="doctor.ngaySinh"> </li>
                                    <li><span>Số Điện Thoại :</span><input type="text" v-model="doctor.soDienThoai"></li>
                                    <li><span>Tiểu Sử :</span></li>
                                    <li><textarea name="message" rows="10" cols="62"
                                            v-model="doctor.tieusu">The cat was playing in the garden.</textarea></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div div class=" button-submit-chitiet">
                <div class="button-submit-capnhat">
                    <button class="capnhat btn btn-success" @click="updateDoctor">Cập Nhật</button>
                </div>
                <div class="button-submit-capnhat">
                    <button class="huy btn btn-success" @click="Back">Trở Lại</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import router from '@/router'
export default {
    data() {
        return {
            doctor: {},
        }
    },
    created() {
        this.fetchdoctor()

    },
    methods: {
        async fetchdoctor() {
            try {
                const id = this.$route.params.id;
                const response = await axios.get(`http://localhost:3000/api/getID-bacsi/${id}`)
                this.doctor = response.data
                console.log(this.doctor)

            } catch (error) {
                console.log(error)
            }
        },
        async updateDoctor() {
            try {
                const updatedData = {
                    tenBS: this.doctor.tenBS,
                    chuyenKhoa: this.doctor.chuyenKhoa,
                    ngaySinh: this.doctor.ngaySinh,
                    soDienThoai: this.doctor.soDienThoai,
                    tieusu: this.doctor.tieusu
                };
                const id = this.$route.params.id;
                const response = await axios.put(`http://localhost:3000/api/admin/inforBS/${id}`, updatedData)
                this.doctor = response.data
                alert('Cập Nhật Thông Tin Bác Sĩ Thành Công')

            } catch (error) {
                console.log(error)

            }
        },
        Back() {
            router.push("/ListBS");
        }

    }
}
</script>

<style scoped>
.ChiTietLichKham h3 {
    padding: 20px;
}

.line_bottom::after {
    background-color: #66bde6;
    content: '';
    display: block;
    height: 4px;
    margin: 0;
    position: relative;
    top: 9px;
    width: 100px;
    border-radius: 20px;
    margin-bottom: 50px;
}

.col_thongtinbenhnhan ul li,
.col_thongtinBacSi ul li {
    list-style: none;
    padding: 20px;
}

.col_thongtinBacSi ul li input {
    width: 350px;
}

/* .col_thongtinbenhnhan ul li:not(:last-child),
.col_thongtinBacSi ul li:not(:last-child) {
    border-bottom: 1px dashed blue;

} */

.col_thongtinbenhnhan ul li,
.col_thongtinBacSi ul li {
    font-weight: bold;
}

.col_thongtinbenhnhan ul li span,
.col_thongtinBacSi ul li span {
    font-weight: 300;
    margin-right: 20px;
}

.col_thongtinbenhnhan,
.col_thongtinBacSi {
    margin-bottom: 30px;
}

/* ------------ */
.button-submit-chitiet {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-left: 40px;
}

.button-submit-capnhat button {
    padding: 15px;
    font-size: 20px;
    width: 150px;
}
</style>