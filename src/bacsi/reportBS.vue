<template>
    <div class="templateReport">
        <div class="container-fluid" style="margin-bottom: 40px;">
            <div style="text-align: center;">
                <h4>Chi Tiết Lịch Khám</h4>
                <!-- <h3>BASELINE DATA</h3> -->
            </div>
            <div class="row row_two" style="padding: 0 100px;">
                <!-- Thông Tin Bệnh Bác -->
                <div class="title_Info_BenhNhan">
                    <h6>Thông Tin Bệnh Nhân</h6>
                </div>
                <div class="col-12 d-flex">
                    <div class="col-xl-6 d-flex" style="height: 50px; border: 1px solid black; align-items:center">
                        <h6 style="color: black;">Số Thứ tự Khám : {{ appointment.stt }}</h6>
                    </div>
                    <div class="col-xl-6 d-flex" style="height: 50px; border: 1px solid black; align-items:center">
                        <h6 style="color: black;">Số Định Danh : {{ patient.madinhdanh }} </h6>
                    </div>
                </div>

                <div class="col-12 d-flex">
                    <div class="col-xl-6 d-flex" style="height: 50px; border: 1px solid black; align-items:center">
                        <h6 style="color: black;">Họ và Tên : {{ patient.ten }}</h6>
                    </div>
                    <div class="col-xl-6 d-flex" style="height: 50px; border: 1px solid black; align-items:center">
                        <h6 style="color: black;">Ngày Sinh : {{ patient.ngaySinh }}</h6>
                    </div>
                </div>


                <div class="col-12 d-flex">
                    <div class="col-xl-6 d-flex" style="height: 50px; border: 1px solid black; align-items:center">
                        <h6 style="color: black;">Số Điện Thoại : {{ patient.soDienThoai }}</h6>
                    </div>
                    <div class="col-xl-6 d-flex" style="height: 50px; border: 1px solid black; align-items:center">
                        <h6 style="color: black;">Địa chỉ : {{ patient.diaChi }}</h6>
                    </div>
                </div>

                <div class="col-12 d-flex">
                    <div class="col-xl-6 d-flex" style="height: 50px; border: 1px solid black; align-items:center">
                        <h6 style="color: black;">Giới Tính : {{ patient.gioiTinh }}</h6>
                    </div>
                </div>

                <!-- Thông Tin Bác Sĩ -->
                <div class="title_Info_BenhNhan">
                    <h6>Thông Tin Bác Sĩ</h6>
                </div>
                <div class="col-12 d-flex">
                    <div class="col-xl-6 d-flex" style="height: 50px; border: 1px solid black;align-items: center; ">
                        <h6 style="color: black">Họ và Tên : {{ doctor.tenBS
                        }}</h6>
                    </div>
                    <div class="col-xl-6 d-flex" style="height: 50px; border: 1px solid black; align-items:center">
                        <h6 style="color: black;">Khoa : {{ doctor.chuyenKhoa }}</h6>
                    </div>
                </div>

                <div class="col-12 d-flex">
                    <div class="col-xl-6 d-flex" style="height: 50px; border: 1px solid black; align-items:center">
                        <h6 style="color: black;">Ngày Sinh : {{ doctor.ngaySinh }}</h6>
                    </div>
                    <div class="col-xl-6 d-flex" style="height: 50px; border: 1px solid black; align-items:center">
                        <h6 style="color: black;">Số Điện Thoại : {{ doctor.ngaySinh }}</h6>
                    </div>
                </div>



                <!-- Lịch Khám -->
                <div class="title_Info_BenhNhan">
                    <h6>Lịch Khám</h6>
                </div>
                <div class="col-12 d-flex">
                    <div class="col-xl-6 d-flex" style="height: 50px; border: 1px solid black; align-items:center">
                        <h6 style="color: black;" v-if="appointment && appointment.ngaygioKham">Ngày Khám : {{
                            appointment.ngaygioKham.ngay }}</h6>
                    </div>
                    <div class="col-xl-6 d-flex" style="height: 50px; border: 1px solid black; align-items:center">
                        <h6 style="color: black;" v-if="appointment && appointment.ngaygioKham">Buổi Khám :
                            {{ appointment.ngaygioKham.ca }}</h6>
                    </div>
                </div>

                <div class="col-12 d-flex">
                    <div class="col-xl-6 d-flex" style="height: 50px; border: 1px solid black; align-items:center">
                        <h6 style="color: black;" v-if="appointment && appointment.ngaygioKham">Thứ :
                            {{ appointment.ngaygioKham.thu }}</h6>
                    </div>
                    <div class="col-xl-6 d-flex" style="height: 50px; border: 1px solid black; align-items:center">
                        <h6 style="color: black;">Trạng Thái Lịch Khám : {{ appointment.trangThai }}</h6>
                    </div>
                </div>
                <div class="title_Info_BenhNhan" v-if="chuandoan">
                    <h6>Chuẩn đoán</h6>
                </div>
                <div class="col-12 d-flex">
                    <div v-if="chuandoan" class="col-xl-6 d-flex"
                        style="height: 50px; border: 1px solid black; align-items:center">
                        <h6 style="color: black;" v-if="chuandoan.cannang">Cân Nặng : {{
                            chuandoan.cannang }}</h6>
                    </div>
                    <div v-if="chuandoan" class="col-xl-6 d-flex"
                        style="height: 50px; border: 1px solid black; align-items:center">
                        <h6 style="color: black;" v-if="chuandoan.chieucao">Chiều cao :
                            {{ chuandoan.chieucao }}</h6>
                    </div>
                </div>

                <div v-if="chuandoan" class="col-12 d-flex">
                    <div class="col-xl-6 d-flex" style="height: 50px; border: 1px solid black; align-items:center">
                        <h6 style="color: black;" v-if="chuandoan.chuandoanbenh">Bệnh Tình :
                            {{ chuandoan.chuandoanbenh }}</h6>
                    </div>
                </div>
                <!-- Toa Thuốc -->
            </div>


            <div class="row row_three" style="margin: 0; padding: 0 100px;">
                <div class="title_Info_BenhNhan">
                    <h6>Toa Thuốc</h6>
                </div>
                <div class="col-12 d-flex" style="padding: 0;">
                    <div class="col-xl-6" style="height: 100; border: 1px solid black ; background-color: #d4d4d4;">
                        <h6 style="color: black;">Thuốc</h6>
                    </div>
                    <div class="col-xl-6" style="height: 100; border: 1px solid black ; background-color: #d4d4d4;">
                        <h6 style="color: black;">Hướng Dẫn Sử Dụng </h6>
                    </div>
                </div>


                <div class="col-12 d-flex" style="margin: 0;padding: 0;" v-for="(item, index) in ToaThuoc" :key="index">
                    <div class="col-xl-6" style="padding: 0;margin: 0;height: 100; border: 1px solid black">
                        <h6 style="color: black;">{{ item.tenThuoc }}</h6>
                    </div>
                    <div class="col-xl-6" style="padding: 0;margin: 0;height: 100; border: 1px solid black">
                        <h6 style="color: black;">{{ item.huongDanSuDung }}</h6>
                    </div>
                </div>
            </div>
        </div>
        <div class="button-submit-chitiet" style="display: flex; justify-content: center; height: 100px;">
            <div class="button-submit-capnhat">
                <button class="capnhat btn btn-success"
                    style="height: 70px; width: 200px; font-size: 22px; margin-right: 10px;" @click="exportToPDF">Xuất
                    PDF</button>
            </div>
            <div class="button-submit-capnhat">
                <button class="huy btn btn-success" style="height: 70px; width: 200px; font-size: 22px; " @click="Back">Trở
                    Lại</button>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import router from '@/router';
export default {
    data() {
        return {
            appointment: {},
            doctor: {},
            patient: {},
            ToaThuoc: {},
            chuandoan: {},

        }


    },
    computed: {
    },
    async created() {
        await this.fetchLichKham()
    },

    methods: {
        async fetchLichKham() {
            const lichkhamID = this.$route.params.id;
            const res = await axios.get(`http://localhost:3000/api/check-toathuoc/${lichkhamID}`)
            const resChuanDoan = await axios.get(`http://localhost:3000/api/chuandoanLK/${lichkhamID}`)
            this.chuandoan = resChuanDoan.data
            console.log(this.chuandoan)
            const appointmentDetails = res.data
            if (appointmentDetails.toaThuoc) {
                this.appointment = appointmentDetails.appointment
                this.doctor = appointmentDetails.doctor
                this.patient = appointmentDetails.patient
                this.ToaThuoc = appointmentDetails.toaThuoc.danhSachThuoc
            }
            else {
                this.appointment = appointmentDetails.appointment
                this.doctor = appointmentDetails.doctor
                this.patient = appointmentDetails.patient
            }

            console.log(this.ToaThuoc)

        },
        async exportToPDF() {
            const element = document.querySelector('.container-fluid');
            html2pdf(element)

        },
        Back() {
            router.push("/BSLichKham");
        }


    },

}
</script>

<style>
.col-xl-6 h6 {
    margin-top: 6px;
}

.row_one {
    width: 350;
    height: 30;
    border: 1px solid black;
    margin: 20px auto;
}

.row_two div {
    margin-bottom: 5px;
}


.row_ul,
.row_two_ul,
.row_two_ul_of_birth {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
}

.row_ul li,
.row_two_ul li,
.row_two_ul_of_birth li {
    list-style: none;
}

.row_ul li input {
    width: 20;
    height: 20;
    border: 1px solid black;
    margin-right: 5px;
}

.row_two_ul input {
    width: 40px;
    margin-top: 10px;
}

.row_two_ul_of_birth input {
    width: 30px;
    margin-top: 10px;
}
</style>