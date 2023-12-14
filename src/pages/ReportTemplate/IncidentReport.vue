<template>
    <div class="templateReport">
        <div class="container" style="margin-bottom: 40px;">
            <div style="text-align: center;">
                <h4 style="color: black; font-size: 40px;">Chi tiết lịch khám</h4>
                <!-- <h3>BASELINE DATA</h3> -->
            </div>
            <div class="row row_two" style="margin: 0 100px;">
                <!-- Thông Tin Bệnh Bác -->
                <div class="title_Info_BenhNhan">
                    <h6 style="margin-left: 30px;">Thông tin bệnh nhân:</h6>
                </div>
                <div class=" col-12 d-flex">
                    <div class="col-xl-6 d-flex" style="height: 50px;  width: 200px; align-items:center; ">
                        <h6 style="color: black;">- Số thứ tự khám : {{ appointment.stt }}</h6>
                    </div>
                    <div class="col-xl-6 d-flex" style="height: 50px; align-items:center;margin-left: 120px;">
                        <h6 style="color: black;">- Số định danh : {{ patient.madinhdanh }} </h6>
                    </div>
                </div>

                <div class="col-12 d-flex">
                    <div class="col-xl-6 d-flex" style="height: 50px;  align-items:center;">
                        <h6 style="color: black;">- Họ và Tên : {{ patient.ten }}</h6>
                    </div>
                    <div class="col-xl-6 d-flex" style="height: 50px; align-items:center;margin-left: 120px;">
                        <h6 style="color: black;">- Ngày sinh : {{ patient.ngaySinh }}</h6>
                    </div>
                </div>


                <div class="col-12 d-flex">
                    <div class="col-xl-6 d-flex" style="height: 50px; ; align-items:center; ">
                        <h6 style="color: black;">- Số điện thoại : {{ patient.soDienThoai }}</h6>
                    </div>
                    <div class="col-xl-6 d-flex" style="height: 50px; align-items:center; margin-left: 120px;">
                        <h6 style="color: black;">- Địa chỉ : {{ patient.diaChi }}</h6>
                    </div>
                </div>

                <div class="col-12 d-flex">
                    <div class="col-xl-6 d-flex" style="height: 50px; align-items:center;">
                        <h6 style="color: black;">- Giới tính : {{ patient.gioiTinh }}</h6>
                    </div>
                </div>

                <!-- Thông Tin Bác Sĩ -->
                <div class="title_Info_BenhNhan">
                    <h6 style="margin-left: 30px;">Thông tin bác sĩ:</h6>
                </div>
                <div class="col-12 d-flex">
                    <div class="col-xl-6 d-flex" style="height: 50px; ;align-items: center;">
                        <h6 style="color: black">- Họ và Tên : {{ doctor.tenBS
                        }}</h6>
                    </div>
                    <div class="col-xl-6 d-flex" style="height: 50px; align-items:center;margin-left: 120px;">
                        <h6 style="color: black;">- Khoa : {{ doctor.chuyenKhoa }}</h6>
                    </div>
                </div>

                <div class="col-12 d-flex">
                    <div class="col-xl-6 d-flex" style="height: 50px; align-items:center;">
                        <h6 style="color: black;">- Ngày sinh : {{ doctor.ngaySinh }}</h6>
                    </div>
                    <div class="col-xl-6 d-flex" style="height: 50px; align-items:center;margin-left: 120px;">
                        <h6 style="color: black;">- Số điện thoại : {{ doctor.soDienThoai }}</h6>
                    </div>
                </div>



                <!-- Lịch Khám -->
                <div class="title_Info_BenhNhan">
                    <h6 style="margin-left: 30px;">Lịch khám:</h6>
                </div>
                <div class=" col-12 d-flex">
                    <div class="col-xl-6 d-flex" style="height: 50px; align-items:center;">
                        <h6 style="color: black;" v-if="appointment && appointment.ngaygioKham">- Ngày khám : {{
                            appointment.ngaygioKham.ngay }}</h6>
                    </div>
                    <div class="col-xl-6 d-flex" style="height: 50px; align-items:center;margin-left: 120px;">
                        <h6 style="color: black;" v-if="appointment && appointment.ngaygioKham">- Buổi khám :
                            {{ appointment.ngaygioKham.ca }}</h6>
                    </div>
                </div>

                <div class="col-12 d-flex">
                    <div class="col-xl-6 d-flex" style="height: 50px; align-items:center;">
                        <h6 style="color: black;" v-if="appointment && appointment.ngaygioKham">- Thứ khám :
                            {{ appointment.ngaygioKham.thu }}</h6>
                    </div>
                    <div class="col-xl-6 d-flex" style="height: 50px; align-items:center;margin-left:120px;">
                        <h6 style="color: black;">- Trạng thái lịch khám : {{ appointment.trangThai }}</h6>
                    </div>
                </div>

                <!-- Toa Thuốc -->

            </div>

            <!-- <div class="row row_three" style="margin: 0; padding: 0 100px;">
                <div class="title_Info_BenhNhan">
                    <h6>Toa Thuốc</h6>
                </div>
                <div class="col-12 d-flex" style="padding: 0;">
                    <div class="col-xl-6" style="height: 100; border: 1px solid black ; background-color: #d4d4d4;">
                        <h6 style="color: black;">Thuốc</h6>
                    </div>
                    <div class="col-xl-6" style="height: 100; border: 1px solid black ; background-color: #d4d4d4;">
                        <h6 style="color: black;">Giá Thành </h6>
                    </div>
                </div>


                <div class="col-12 d-flex" style="margin: 0;padding: 0;">
                    <div class="col-xl-6" style="padding: 0;margin: 0;height: 100; border: 1px solid black">
                        <h6 style="color: black;">Asulin</h6>
                    </div>
                    <div class="col-xl-6" style="padding: 0;margin: 0;height: 100; border: 1px solid black">
                        <h6 style="color: black;">13.000đ</h6>
                    </div>
                </div>
            </div> -->
        </div>
        <div div class=" button-submit-chitiet" style="text-align: center; height: 100px;">
            <div class="button-submit-capnhat">
                <button class="capnhat btn btn-success" style="height: 70px; width: 200px; font-size: 22px; "
                    @click="exportToPDF">Xuất
                    PDF</button>
            </div>
            <!-- <div class="button-submit-capnhat">
                <button @click="updateTrangThaiLK" class="huy btn btn-danger">Hủy</button>
            </div> -->
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import html2pdf from 'html2pdf.js';
export default {
    data() {
        return {
            appointment: {},
            doctor: {},
            patient: {},

        }


    },
    watch: {
        '$route.params.id': 'fetchLichKham',
    },
    async created() {
        await this.fetchLichKham()
    },

    methods: {
        async fetchLichKham() {
            const lichkhamID = this.$route.params.id;
            const res = await axios.get(`http://localhost:3000/api/check-notification/${lichkhamID}`)
            const appointmentDetails = res.data
            this.appointment = appointmentDetails.appointment
            this.doctor = appointmentDetails.doctor
            this.patient = appointmentDetails.patient
        },
        async exportToPDF() {
            try {
                const element = document.querySelector('.container');
                const opt = {
                    margin: 0,
                    filename: 'myfile.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
                };
                html2pdf().from(element).set(opt).save();
                html2pdf(element, opt);
            } catch (error) {
                console.error('Error exporting to PDF:', error);
                // Handle errors as needed
            }
        },


    },

}
</script>

<style>
.col-xl-6 h6 {
    margin-top: 6px;
}

h6 {
    font-size: 25px;
}

.row_one {
    width: 350;
    height: 30;
    border: 1px solid black;
    margin: 20px auto;
}

.row_two {

    gap: 2px;
    /* Đặt khoảng cách giữa các div */
}

.row_ul,
.row_two_ul,
.row_two_ul_of_birth {
    display: flex;

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