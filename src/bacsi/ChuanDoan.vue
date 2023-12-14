<template>
    <div>
        <div class="ChiTietLichKham">
            <h3 class="line_bottom" style="color:  black; text-align: center; font-size:  40px;">Chẩn đoán bệnh</h3>
            <div class="main_ChiTietLichKham">
                <div class="row">
                    <div class="col-xl-6 thongtinbenhnhan">
                        <h5 style="text-align:center">Thông tin bệnh nhân</h5>
                        <div class="main_thongtinbenhnhan">
                            <div class="row row_thongtinbenhnhan">
                                <div class="col-xl-6 col_thongtinbenhnhan">
                                    <ul>
                                        <li>
                                            <label for="">Số định danh :</label>
                                            <input type="text" v-model="patient.madinhdanh">
                                        </li>
                                        <li>
                                            <label for="">Họ và tên :</label>
                                            <input type="text" v-model="patient.ten">
                                        </li>
                                        <li><label for="">Ngày sinh :</label>
                                            <input type="date" v-model="patient.ngaySinh">
                                        </li>

                                    </ul>
                                </div>

                                <div class="col-xl-6 col_thongtinbenhnhan">
                                    <ul>
                                        <li>
                                            <label style="" for="">Số điện thoại :</label>
                                            <input type="tel" v-model="patient.soDienThoai">
                                        </li>
                                        <li><label for="">Địa chỉ :</label>
                                            <input type="text" v-model="patient.diaChi">
                                        </li>
                                        <li><label for="">Giới tính :</label>
                                            <select v-model="patient.gioiTinh" id="gioitinh" class="form-control">
                                                <option value="Nam">Nam</option>
                                                <option value="Nữ">Nữ</option>
                                            </select>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div class="col-xl-6 thongtinBacSi">
                        <h5 style="text-align:center">Thông tin bác sĩ và lịch khám</h5>
                        <div class="main_thongtinBacSi">
                            <div class="row row_thongtinBacSi">
                                <div class="col-xl-6 col_thongtinBacSi">
                                    <ul>
                                        <li>Họ và Tên : <span>{{ doctor.tenBS }}</span></li>
                                        <li>Khoa : <span>{{ doctor.chuyenKhoa }}</span></li>
                                        <li>Ngày sinh : <span>{{ doctor.ngaySinh }}</span> </li>
                                        <li>Số điện thoại : <span>{{ doctor.soDienThoai }}</span></li>
                                    </ul>
                                </div>

                                <div class="col-xl-6 col_thongtinBacSi">
                                    <ul>
                                        <li>Ngày khám : <span v-if="appointment && appointment.ngaygioKham">{{
                                            appointment.ngaygioKham.ngay }}</span></li>
                                        <li>Buổi khám : <span v-if="appointment && appointment.ngaygioKham"> {{
                                            appointment.ngaygioKham.ca }}</span></li>
                                        <li>Trạng thái lịch khám: <span>{{ appointment.trangThai }}</span></li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="col-xl-6 thongtinbenhnhan">
                        <h5 style="text-align:center">Thông tin chẩn đoán </h5>
                        <div class="main_thongtinbenhnhan" style="text-align:center">
                            <div class="row row_thongtinbenhnhan">
                                <div class="col-xl-12 col_thongtinbenhnhan">
                                    <ul>
                                        <li>
                                            <label for="">Cân nặng :</label>
                                            <input style="height: 50px;" v-model="cannang" type="text">
                                        </li>
                                        <li>
                                            <label for="">Chiều cao :</label>
                                            <input style="height: 50px;" v-model="chieucao" type="text">
                                        </li>
                                        <li><label for="">Tình trạng bệnh :</label>
                                            <input style="height: 50px;" v-model="benhtinh" type="text">
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="button-submit-chitiet">
                    <div class="button-submit-capnhat">
                        <button @click="submitSuaThongTin" class="capnhat btn btn-success">Xác Nhận</button>
                    </div>
                    <!-- <div class="button-submit-capnhat">
                        <router-link :to="`/them-thuoc/${appointment._id} `"><button class="capnhat btn btn-success">Thêm
                                Thuôc</button></router-link>
                    </div> -->
                    <div class="button-submit-capnhat">
                        <button @click="back" class="capnhat btn btn-danger"> Trở Lại</button>
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
            appointment: {},
            doctor: {},
            patient: {},
            cannang: "",
            chieucao: "",
            benhtinh: ""
        };
    },
    created() {
        this.fetchPatientData();
    },
    methods: {
        async fetchPatientData() {
            try {
                const lichkhamID = this.$route.params.id;
                const res = await axios.get(`http://localhost:3000/api/lichkham/${lichkhamID}`)
                const appointmentDetails = res.data
                this.appointment = appointmentDetails.appointment
                console.log(this.appointment)
                this.doctor = appointmentDetails.doctor
                this.patient = appointmentDetails.patient
            } catch (error) {
                console.error(error);
            }
        },
        async submitSuaThongTin(event) {
            event.preventDefault();
            try {
                const patientId = this.patient._id
                const lichkhamID = this.appointment._id
                console.log(lichkhamID)

                await axios.put(`http://localhost:3000/api/benhNhan/lich-kham/update/${patientId}`, this.patient);
                // alert('Chỉnh Sửa Thông Tin Thành Công');
                const data = {
                    cannang: this.cannang,
                    chieucao: this.chieucao,
                    BenhTinh: this.benhtinh,
                    malichkham: lichkhamID,
                    maBN: patientId,
                }
                await axios.post("http://localhost:3000/api/chuandoan", data)
                this.$router.push(`/them-thuoc/${this.appointment._id} `);
            } catch (error) {
                console.error(error);
            }
        },
        async back(event) {
            event.preventDefault();
            try {
                this.$router.push(`/BSLichKham`);
            } catch (error) {
                console.error(error);
            }
        },
    },
}
</script>

<style scoped>
input[type="text"],
input[type="tel"],
input[type="date"],
select {
    width: 70%;
    /* Chỉnh độ rộng cho phần input và select */
}

h5 {
    font-size: 27px;
}

.thongtinbenhnhan {
    font-size: 20px;
}

.row_thongtinbenhnhan li {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.row_thongtinbenhnhan label {
    flex: 0.8;
    margin-right: 10px;
    font-size: 20px;
}

.row_thongtinbenhnhan li input {
    font-size: 20px;
}

.row_thongtinbenhnhan select {
    flex: 2;
    /* Điều này làm cho phần select mở rộng hơn phần label */
    padding: 5px;
    font-size: 20px;
}

.ChiTietLichKham h3 {
    padding: 20px;
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
    padding: 12px;
}

.col_thongtinbenhnhan ul li:not(:last-child),
.col_thongtinBacSi ul li:not(:last-child) {
    border-bottom: 1px dashed blue;

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
    font-size: 20px;
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

.col_thongtinbenhnhan ul li input {
    font-size: 20px;
}
</style>