<template>
    <div>
        <div class="ChiTietLichKham">
            <h3 class="line_bottom" style="color:  black; text-align: center;">Chuẩn đoán Bệnh Nhân</h3>
            <div class="main_ChiTietLichKham">
                <div class="row">
                    <div class="col-xl-6 thongtinbenhnhan">
                        <h5 style="text-align:center">Thông Tin Bệnh Nhân</h5>
                        <div class="main_thongtinbenhnhan">
                            <div class="row row_thongtinbenhnhan">
                                <div class="col-xl-6 col_thongtinbenhnhan">
                                    <ul>
                                        <li>
                                            <label for="">Số Định Danh :</label>
                                            <input type="text" v-model="patient.madinhdanh">
                                        </li>
                                        <li>
                                            <label for="">Họ và tên :</label>
                                            <input type="text" v-model="patient.ten">
                                        </li>
                                        <li><label for="">Ngày Sinh :</label>
                                            <input type="date" v-model="patient.ngaySinh">
                                        </li>

                                    </ul>
                                </div>

                                <div class="col-xl-6 col_thongtinbenhnhan">
                                    <ul>
                                        <li>
                                            <label style="" for="">Số Điện Thoại :</label>
                                            <input type="tel" v-model="patient.soDienThoai">
                                        </li>
                                        <li><label for="">Địa chỉ :</label>
                                            <input type="text" v-model="patient.diaChi">
                                        </li>
                                        <li><label for="">Giới Tính :</label>
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
                        <h5 style="text-align:center">Thông Tin Bác Sĩ Và Lịch Khám</h5>
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
                                        <li>Trạng Thái Lịch Khám: <span>{{ appointment.trangThai }}</span></li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="col-xl-6 thongtinbenhnhan">
                        <h5 style="text-align:center">Thông Tin Chuẩn Đoán </h5>
                        <div class="main_thongtinbenhnhan">
                            <div class="row row_thongtinbenhnhan">
                                <div class="col-xl-6 col_thongtinbenhnhan">
                                    <ul>
                                        <li>
                                            <label for="">Cân Nặng :</label>
                                            <input v-model="cannang" type="text">
                                        </li>
                                        <li>
                                            <label for="">Chiều Cao :</label>
                                            <input v-model="chieucao" type="text">
                                        </li>
                                        <li><label for="">Bệnh Tình :</label>
                                            <input v-model="benhtinh" type="text">
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
                    <div class="button-submit-capnhat">
                        <router-link :to="`/them-thuoc/${appointment._id} `"><button class="capnhat btn btn-success">Thêm
                                Thuôc</button></router-link>
                    </div>
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
                this.$router.push(`/xemlichBS/${lichkhamID}`);
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

.row_thongtinbenhnhan li {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.row_thongtinbenhnhan label {
    flex: 0.8;
    margin-right: 10px;
}

.row_thongtinbenhnhan select {
    flex: 2;
    /* Điều này làm cho phần select mở rộng hơn phần label */
    padding: 5px;
}

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