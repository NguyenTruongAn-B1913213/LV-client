<template>
    <div class="datlichkham">
        <!-- <div class="datlichkhambacsi_component1" style="text-align: center; color: black;">
            <h3 class="title_datlichkhambacsi_component1">Đặt Lịch Khám Bác Sĩ
            </h3>
        </div> -->

        <div class="datlichkhambacsi_component2">
            <div class="container-fulid container1">
                <h3>ĐẶT LỊCH KHÁM</h3>
                <div class="form_dangkykhambenh">
                    <form>
                        <div class="row row_infor">
                            <div class="col col_infor">
                                <label>Mã Định Danh<span>*</span></label>
                                <input v-model="patientId" type="text" class="form-control" placeholder="Mã Định Danh...">
                            </div>
                            <div class="col col_infor ">
                                <label>Tên Bệnh Nhân <span>*</span></label>
                                <input v-model="patientName" type="text" class="form-control" placeholder="Tên">
                            </div>
                            <div class="col col_infor ">
                                <label>Ngày Sinh <span>*</span></label>
                                <input v-model="patientDob" type="date" class="form-control" placeholder="Last name">
                            </div>
                        </div>
                        <div class="row row_infor">
                            <div class="col col_infor">
                                <label>Giới Tính <span>*</span></label>
                                <select v-model="patientGender" id="gioitinh" class="form-control">
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                    <!-- Thêm các tùy chọn cho tên bác sĩ tại đây -->
                                </select>
                            </div>
                            <div class="col col_infor ">
                                <label> Địa Chỉ<span>*</span></label>
                                <input v-model="patientAddress" type="text" class="form-control" placeholder="Địa chỉ">
                            </div>
                            <div class="col col_infor ">
                                <label>Số Điện Thoại<span>*</span></label>
                                <input v-model="patientPhone" type="tel" class="form-control" placeholder="SĐT">
                            </div>
                        </div>

                        <div class="row row_infor">
                            <div class="col col_infor">
                                <label for="bacSi">Tên Bác Sĩ <span>*</span></label>
                                <select v-model="selectedDoctorId" id="bacSi" class="form-control"
                                    @change="fetchDoctorSchedule">
                                    <option value="">Chọn Bác Sĩ</option>
                                    <option v-for="bacSi in bacSiList" :key="bacSi.id" :value="bacSi._id">{{ bacSi.tenBS }}
                                    </option>
                                    <!-- Thêm các tùy chọn cho tên bác sĩ tại đây -->
                                </select>
                            </div>
                            <div class="col col_infor ">
                                <label>Ngày Khám <span>*</span></label>
                                <select v-model="selectedDate" id="ngayKham" class="form-control">
                                    <option value="">Chọn Ngày Khám</option>
                                    <option v-for="(date, index) in Datework" :key="index" :value="date">{{
                                        date }}
                                    </option>
                                    <!-- Thêm các tùy chọn cho tên bác sĩ tại đây -->
                                </select>

                            </div>
                            <div class="col col_infor">
                                <label>Buổi Khám <span>*</span></label>
                                <select v-model="buoi" id="ngayKham" class="form-control">
                                    <option value="">Chọn Buổi khám</option>
                                    <option v-for="(shift, index) in uniqueShifts" :key="index" :value="shift">{{
                                        shift }}</option>
                                    <!-- Thêm các tùy chọn cho tên bác sĩ tại đây -->
                                </select>
                            </div>
                        </div>
                        <div class="row row_infor">
                            <div class="col col_infor  a  ">
                                <label>Triệu Chứng </label>
                                <input v-model="symptoms" type="" class="form-control" placeholder="Triệu Chứng">
                                <!-- <textarea rows="4" cols="30" name="text" placeholder="Enter text"></textarea> -->
                            </div>
                        </div>
                    </form>

                </div>
                <div class="buttonSend ">
                    <button @click="submitForm">
                        <div class="svg-wrapper-1">
                            <div class="svg-wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path fill="currentColor"
                                        d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z">
                                    </path>
                                </svg>
                            </div>
                        </div>
                        <span>Gửi</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex';
// import Cookies from 'js-cookie'
export default {
    data() {
        return {

            uniqueDatesTemp: '',
            uniqueShifts: '',
            Datework: [],
            doctorSchedule: [],
            bacSiList: [],
            selectedDoctorId: '', // ID của bác sĩ đã chọn
            selectedDate: '', // Ngày khám
            buoi: '', // Giờ bắt đầu
            patientId: '', // Mã định danh
            patientName: '', // Tên bệnh nhân
            patientDob: '', // Ngày sinh
            patientGender: 'Nam', // Giới tính mặc định là Nam
            patientAddress: '', // Địa chỉ
            patientPhone: '', // Số điện thoại
            symptoms: '', // Triệu chứng
            message: '',
            ngayLamviec: '',
        };
    },
    computed: {
        ...mapState({
            token: (state) => state.token,
            userID: (state) => state.userID
        }),
    },
    created() {
        this.getDoctor();
        this.getDayWork();
    },
    watch: {
        selectedDate: 'fetchUniqueShifts',
        selectedDoctorId: 'onSelectedDoctorIdChange',
    },
    methods: {
        async onSelectedDoctorIdChange(newDoctorId, oldDoctorId) {
            // Kiểm tra xem selectedDoctorId đã thay đổi từ bác sĩ trước đó hay không
            if (newDoctorId !== oldDoctorId) {
                this.selectedDate = ''; // Đặt lại giá trị mặc định cho "Ngày Khám"
                this.buoi = ''; // Đặt lại giá trị mặc định cho "Buổi Khám"
                this.Datework = ''
            }
        },
        async fetchDoctorSchedule(event) {
            event.preventDefault();
            try {
                if (!this.selectedDoctorId) {
                    this.uniqueDatesTemp = [];
                    this.selectedDate = ''; // Đặt lại giá trị mặc định cho "Ngày Khám"
                    this.buoi = '';
                    return;
                }
                const selectedDoctor = this.bacSiList.find((bs) => bs._id === this.selectedDoctorId);
                if (selectedDoctor) {
                    const ngayLamViecIds = selectedDoctor.ngayLamViec;
                    if (!ngayLamViecIds) {
                        return
                    } else {
                        this.doctorSchedule = this.ngayLamviec.filter((ngay) => ngayLamViecIds.includes(ngay._id));
                        const uniqueDaysSet = new Set(this.doctorSchedule.map(ngay => ngay.thu));
                        this.Datework = Array.from(uniqueDaysSet)
                    }

                } else {
                    this.doctorSchedule = [];
                }
            } catch (error) {
                console.log()

            }

        },
        async fetchUniqueShifts(newDate, oldDate) {
            try {
                if (newDate !== oldDate) {
                    this.buoi = '';
                    this.uniqueShifts = ''// Đặt lại giá trị mặc định cho "Buổi Khám"
                }
                if (!this.selectedDate || !this.selectedDoctorId) {
                    this.uniqueDatesTemp = [];
                    this.buoi = '';
                    return;
                }
                const shiftsForSelectedDate = this.doctorSchedule
                    .filter(date => date.thu === this.selectedDate)
                    .flatMap(date => date.ca);
                this.uniqueShifts = [...new Set(shiftsForSelectedDate)];
            } catch (error) {
                this.uniqueShifts = [];
            }
        },
        async getDoctor() {
            try {
                const response = await axios.get("http://localhost:3000/api/get-bacsi");
                this.bacSiList = response.data;

            } catch (error) {
                console.log(error)
            }
        },
        async getDayWork() {
            try {
                const response = await axios.get("http://localhost:3000/api/get-datework");
                this.ngayLamviec = response.data;
            } catch (error) {
                console.log(error)
            }
        },

        async submitForm(event) {
            event.preventDefault();

            const formData = {
                idBS: this.selectedDoctorId, // Lấy giá trị id của bác sĩ từ form
                ngaygioKham: {
                    thu: this.selectedDate,
                    ca: this.buoi
                },
                madinhdanh: this.patientId,
                ten: this.patientName,
                ngaySinh: this.patientDob,
                gioiTinh: this.patientGender,
                diaChi: this.patientAddress,
                soDienThoai: this.patientPhone,
                trieuchung: this.symptoms,
            };

            const headers = {
                userID: `${this.userID}`,
            };
            console.log(formData)
            try {
                const response = await axios.post('http://localhost:3000/api/lichkham', formData, { headers });
                this.$router.push(`/ChiTietLKBN/${response.data._id}`);

            } catch (error) {
                if (error.response) {
                    // Nếu có phản hồi từ máy chủ
                    if (error.response.status === 400) {
                        console.log("Lỗi khác:", error.response.data);
                        alert(error.response.data.message)
                    } else {
                        // Xử lý các lỗi khác ở đây
                        alert(error.response.data.error)
                    }
                }
            }
        },

    }

}
</script>

<style scoped>
.a label {
    margin-left: 50px;

}

.container1 {
    margin: 0 140px;
}

.form-control {
    width: 80%;
    height: 55px;
    margin: auto;
}

.datlichkhambacsi_component1 h3 {
    text-align: center;
    font-size: 40px;
    font-weight: 300;
    padding: 30px 0;
    color: black;
}

label span {
    color: red;
    /* Màu đỏ thể hiện trường bắt buộc */
}

.title_datlichkhambacsi_component1::after {
    background-color: #66bde6;
    content: '';
    display: block;
    height: 3px;
    margin: auto;
    position: relative;
    top: 9px;
    width: 80px;
    margin-bottom: 50px;
}

/* --------------- */
.datlichkhambacsi_component2 {
    background: #f1f1f1;
    margin-bottom: 50px;
}

.datlichkhambacsi_component2 h3 {
    text-align: center;
    padding: 50px 0;
    font-weight: 500;
    color: black;
    font-size: 40px;
}

.row_infor {
    margin-bottom: 30px;
}

.col_infor input {
    width: 80%;
    height: 55px;
    margin: auto;
    font-size: 20px;
}

.col_infor label {
    font-size: 20px;
}

.col_infor select {
    width: 80%;
    height: 55px;
    margin: auto;
    font-size: 20px;
}

/* ------ */
.buttonSend {
    display: flex;
    justify-content: center;
    text-align: center;
    padding: 20px 0;
}

button {
    font-family: inherit;
    font-size: 18px;
    background: linear-gradient(to bottom, #4dc7d9 0%, #66a6ff 100%);
    color: white;
    padding: 0.8em 1.2em;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    /* box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2); */
    transition: all 0.3s;
}

button:hover {
    transform: translateY(-3px);
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
}

button:active {
    transform: scale(0.95);
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

button span {
    display: block;
    margin-left: 0.4em;
    transition: all 0.3s;
}

button svg {
    width: 18px;
    height: 18px;
    fill: white;
    transition: all 0.3s;
}

button .svg-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 30px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.2);
    margin-right: 0.5em;
    transition: all 0.3s;
}

button:hover .svg-wrapper {
    background-color: rgba(255, 255, 255, 0.5);
}

button:hover svg {
    transform: rotate(45deg);
}
</style>


