<template>
    <div class="ChiTietLichKham">
        <h3 class="line_bottom">Chi Tiết Lịch Khám</h3>
        <div class="main_ChiTietLichKham">
            <div class="row">
                <div class="col-xl-6 thongtinbenhnhan">
                    <h5 style="text-align:center; font-size: 30px;">Thông Tin Bệnh Nhân</h5>
                    <div class="main_thongtinbenhnhan">
                        <div class="row row_thongtinbenhnhan">
                            <div class="col-xl-6 col_thongtinbenhnhan">
                                <ul>
                                    <li>Số Thứ tự Khám : <span>{{ appointment.stt }}</span></li>
                                    <li>Số Định Danh : <span>{{ patient.madinhdanh }}</span></li>
                                    <li>Họ và tên : <span>{{ patient.ten }}</span></li>
                                    <li>Ngày Sinh : <span>{{ patient.ngaySinh }}</span> </li>
                                </ul>
                            </div>

                            <div class="col-xl-6 col_thongtinbenhnhan">
                                <ul>
                                    <li>Số Điện Thoại : <span>{{ patient.soDienThoai }}</span></li>
                                    <li>Địa chỉ : <span>{{ patient.diaChi }}</span></li>
                                    <li>Giới Tính : <span>{{ patient.gioiTinh }}</span></li>
                                </ul>
                            </div>


                        </div>

                    </div>

                </div>



                <div class="col-xl-6 thongtinBacSi">
                    <h5 style="text-align:center; font-size: 30px;">Thông Tin Bác Sĩ Và Lịch Khám</h5>
                    <div class="main_thongtinBacSi">
                        <div class="row row_thongtinBacSi">
                            <div class="col-xl-6 col_thongtinBacSi">
                                <ul>
                                    <li>Họ và Tên : <span>{{ doctor.tenBS }}</span></li>
                                    <li>Khoa : <span>{{ doctor.chuyenKhoa }}</span></li>
                                    <li>Ngày Sinh : <span>{{ doctor.ngaySinh }}</span> </li>
                                    <li>Số Điện Thoại : <span>{{ doctor.soDienThoai }}</span></li>
                                </ul>
                            </div>

                            <div class="col-xl-6 col_thongtinBacSi">
                                <ul>
                                    <li>Ngày Khám : <span v-if="appointment && appointment.ngaygioKham">{{
                                        appointment.ngaygioKham.ngay }}</span></li>
                                    <li>Buổi Khám : <span v-if="appointment && appointment.ngaygioKham"> {{
                                        appointment.ngaygioKham.ca }}</span></li>
                                    <li>Buổi Khám : <span v-if="appointment && appointment.ngaygioKham"> {{
                                        appointment.ngaygioKham.thu }}</span></li>
                                    <li>Trạng Thái Lịch Khám: <span>{{ appointment.trangThai }}</span></li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div div class=" button-submit-chitiet">
                <div class="button-submit-capnhat">
                    <router-link :to="`/CapNhatThongTin/${appointment._id}`">
                        <button class="capnhat btn btn-success">Cập Nhật</button>
                    </router-link>
                </div>
                <div class="button-submit-capnhat">
                    <button @click="updateTrangThaiLK" class="huy btn btn-danger">Hủy</button>
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
            appointment: {},
            doctor: {},
            patient: {},
            // Ngay: "",
            // buoi: ""
        }
    },
    created() {
        this.fetchLichKham()

    },
    methods: {
        async fetchLichKham() {
            const lichkhamID = this.$route.params.id;
            const res = await axios.get(`http://localhost:3000/api/lichkham/${lichkhamID}`)
            const appointmentDetails = res.data

            this.appointment = appointmentDetails.appointment
            this.doctor = appointmentDetails.doctor
            this.patient = appointmentDetails.patient
            console.log(this.appointment)
            // this.ngay = this.appointment.ngaygioKham.ngay
            // this.buoi = this.appointment.ngaygioKham.buoi
        },
        async updateTrangThaiLK(e) {
            e.preventDefault();
            try {
                // Thực hiện gọi API để cập nhật trạng thái cuộc hẹn
                const lichkhamID = this.$route.params.id;
                await axios.put(`http://localhost:3000/api/benhnhan/lich-kham/huy/${lichkhamID}`);

                // Cập nhật trạng thái trong this.appointment
                this.appointment.trangThai = "Hủy";

                alert("Thay Đổi Trạng Thái Thành Công");


            } catch (error) {
                console.log(error)

            }

        },
    }
}
</script>

<style scoped>
.ChiTietLichKham h3 {
    padding: 20px;
    color: black;
    text-align: center;
    font-size: 50px;
}

.line_bottom::after {
    background-color: #66bde6;
    content: '';
    display: block;
    height: 4px;
    margin: 0 auto;
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

.col_thongtinbenhnhan ul li:not(:last-child),
.col_thongtinBacSi ul li:not(:last-child) {
    border-bottom: 1px dashed blue;

}

.col_thongtinbenhnhan ul li,
.col_thongtinBacSi ul li {
    font-weight: bold;
    font-size: 20px;
}

.col_thongtinbenhnhan ul li span,
.col_thongtinBacSi ul li span {
    font-weight: 300;
}

.col_thongtinbenhnhan,
.col_thongtinBacSi {
    margin-bottom: 50px;
}

/* ------------ */
.button-submit-chitiet {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 20px;
}

.button-submit-capnhat button {
    padding: 15px;
    font-size: 20px;
    width: 150px;
}
</style>