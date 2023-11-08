<template>
    <div class="ChiTietLichKham">
        <div class="main_ChiTietLichKham">
            <div class="row">
                <div class="col-xl-12 thongtinBacSi">
                    <h5 style="text-align:center">Thông Tin Phòng Khám</h5>
                    <div class="main_thongtinBacSi" style="display: flex; justify-content: center;">
                        <div class="row row_thongtinBacSi">
                            <div class="col-xl-12 col_thongtinBacSi">
                                <ul>
                                    <li><span>Tên Phòng Khám :</span><input v-model="TTPhongKham.tenPhongKham"
                                            style="margin-left: 30px;" type="text"></li>
                                    <li><span>Địa Chỉ :</span> <input v-model="TTPhongKham.diaChi"
                                            style="margin-left: 55px;" type="text"></li>
                                    <li><span>Số Điện Thoại :</span><input v-model="TTPhongKham.soDienThoai"
                                            style="margin-left: 25px;" type="text"> </li>
                                    <li><span>Ngày Làm Việc :</span><input v-model="TTPhongKham.giolamviec" type="text">
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div div class=" button-submit-chitiet">
                <div class="button-submit-capnhat">
                    <button class="capnhat btn btn-success" type="button" @click="updatePhongKham">Cập Nhật</button>
                </div>
                <div class="button-submit-capnhat">
                    <button class="huy btn btn-success" @click="Back">Trở Lại</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import router from '@/router';
export default {
    data() {
        return {
            TTPhongKham: {},
        }
    },
    created() {
        this.fetchPhongKham()

    },
    methods: {
        async fetchPhongKham() {
            try {
                console.log(1)
                const id = this.$route.params.id;
                const response = await axios.get(`http://localhost:3000/api/get-phongkham/${id}`)
                this.TTPhongKham = response.data

            } catch (error) {
                console.log(error)
            }
        },
        async updatePhongKham() {
            try {
                const updatedData = {
                    tenPhongKham: this.TTPhongKham.tenPhongKham,
                    diaChi: this.TTPhongKham.diaChi,
                    soDienThoai: this.TTPhongKham.soDienThoai,
                    giolamviec: this.TTPhongKham.giolamviec,
                };
                console.log(updatedData)
                const id = this.$route.params.id;
                const response = await axios.put(`http://localhost:3000/api/phongkham/update/${id}`, updatedData)
                this.doctor = response.data
                alert('Cập Nhật Thông Tin Phòng Khám Thành Công')

            } catch (error) {
                console.log(error)

            }
        },
        Back() {
            router.push("/admin");
        }


    },

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