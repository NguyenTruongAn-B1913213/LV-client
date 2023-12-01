<template>
    <div class="status-bill">
        <div class="container-fluid">
            <div class="row" style="margin-top: 0;">
                <div class="col-sm-3">
                    <TheSideBarBacSi />
                </div>
                <div class="col-sm-9">
                    <div class="header_thongke">
                        <h4>Thống Kê</h4>
                    </div>
                    <div class="d-flex" style="justify-content: space-between; margin-top: 40px;margin-left:40px;">
                        <!-- <div class="title_thongke">
                            <h3>Thống Kê Lịch Khám</h3>
                        </div> -->
                        <div class="d-flex">
                            <div>
                                <select v-model="optionTK1" class="mr-2" style="height: 38px;" @change="onOptionChange">
                                    <option value="0">Chọn Thống kê</option>
                                    <option value="1">Thống kê Phòng Khám</option>
                                    <option value="2">Thống kê Theo Bác Sĩ</option>
                                </select>
                            </div>
                            <div v-if="shouldShowBacSiField">
                                <select v-model="optionTK2" class="mr-2" style="height: 38px;" @change="onOptionChange">
                                    <option value="0">Chọn Thống kê theo bác sĩ</option>
                                    <option v-for="bs in ListBS" :key="bs.id" :value="bs._id">{{ bs.tenBS }}</option>
                                </select>
                            </div>
                            <div>
                                <select v-model="optionTK" class="mr-2" style="height: 38px;" @change="onOptionChange">
                                    <option value="0">Chọn Thống kê Theo Thời Gian</option>
                                    <option value="1">Thống kê Theo Ngày</option>
                                    <option value="2">Thống kê Theo Tháng</option>
                                    <option value="3">Thống kê Theo Năm</option>
                                </select>
                            </div>
                            <div>
                                <!-- Trường chọn ngày -->
                                <select v-model="day" class="mr-2" style="height: 38px;" :disabled="!shouldShowDayField">
                                    <option value="">Chọn ngày</option>
                                    <option v-for="n in 31" :key="n" :value="n">{{ n }}</option>
                                </select>

                                <!-- Trường chọn tháng -->
                                <select v-model="month" class="mr-2" style="height: 38px;"
                                    :disabled="!shouldShowMonthField">
                                    <option value="">Chọn tháng</option>
                                    <option v-for="n in 12" :key="n" :value="n">{{ n }}</option>
                                </select>

                                <!-- Trường chọn năm -->
                                <select v-model="year" class="mr-2" style="height: 38px;">
                                    <option value="">Chọn năm</option>
                                    <option v-for="n in 100" :key="n" :value="n + 2000">{{ n + 2000 }}</option>
                                </select>

                            </div>
                            <!-- Trường nhập ngày -->

                            <div>
                                <button class="btn btn-success" @click="fetchData" type="submit">Xác
                                    Nhận</button>
                            </div>
                        </div>
                    </div>
                    <div class="Bang-Thong_ke">
                        <div class="container">
                            <div class="row">
                                <div class="col-xl-0 content-1"></div>
                                <div class="col-xl-11 content-2" style="margin-left: 50px; margin-top: 50px;">
                                    <div>
                                        <h3 style="color: black; margin-bottom: 40px; font-size: 50px;">Bảng Thống Kê</h3>
                                    </div>
                                    <div class="Thong-tin-Bac-Si" v-if="bacsi && (bacsi.tenBS || bacsi.soDienThoai)">
                                        <h6>Thông Tin Bác Sĩ</h6>
                                        <ul>
                                            <li>Họ và Tên : <span v-if="bacsi.tenBS">{{ bacsi.tenBS }}</span></li>
                                            <li>Số Điện Thoại : <span v-if="bacsi.soDienThoai">{{ bacsi.soDienThoai
                                            }}</span></li>
                                        </ul>
                                    </div>

                                    <div class="box-date" style="text-align: center; margin-top: 50px;">
                                        <div class="container">
                                            <div class="row">
                                                <div class="col-xl-4">
                                                    <p style="font-size: 30px; color: red;"></p>
                                                    <span></span>
                                                </div>
                                                <div class="col-xl-4">
                                                    <p style="font-size: 30px; color: red;">Thời Gian</p>
                                                    <span v-if="day || month || year">{{ formattedDate }}</span>
                                                </div>
                                                <div class="col-xl-4">
                                                    <p style="font-size: 30px; color: red;"></p>
                                                    <span></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="class-Info" style="margin-top: 30px;">
                                        <table class="table-Info">
                                            <tr>
                                                <th>Stt</th>
                                                <th>Căn Cước Công Dân/CMND</th>
                                                <th>Tên Bệnh Nhân</th>
                                                <th v-if="!optionTK2">Tên Bác Sĩ</th>
                                                <th>Ngày Khám</th>
                                                <th>Trạng Thái</th>
                                            </tr>
                                            <tr v-for="(item, index) in appointment.lichKhamWithBenhNhan" :key="index">
                                                <td>{{ index + 1 }}</td>
                                                <td>{{ item.benhNhan.madinhdanh }}</td>
                                                <td>{{ item.benhNhan.ten }}</td>
                                                <td v-if="!optionTK2">{{ item.bacsi.tenBS }}</td>
                                                <td>{{ item.lichKham.ngaygioKham.ngay }}</td>
                                                <td>{{ item.lichKham.trangThai }}</td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="container">
                                        <div class="row" style="margin-top: 50px;">
                                            <!-- <div class="col-xl-8 box-notes" style="padding-top: 40px;">
                                                <h5 style="text-decoration: underline;">Notes</h5>
                                                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
                                                    consequuntur cupiditate numquam et quae quis iure ut tempore maxime
                                                    repudiandae!
                                                </span>
                                            </div> -->

                                            <div class="col-xl-4">
                                                <div class="d-flex box-notes-2"
                                                    style="justify-content: center; align-items: center;">
                                                    <ul>
                                                        <!-- <li>Tổng : <span></span></li> -->
                                                        <!-- <li>TAX RATE : <span>90%</span></li>
                                                        <li>SUBTOTAL : <span>$73.913</span></li> -->
                                                        <!-- <div class="line" style="border:1px solid black ; width: 150%;">
                                                        </div> -->

                                                        <div class="total">
                                                            <h4>Tổng : {{ total }} Lịch Khám <span></span></h4>
                                                        </div>
                                                    </ul>


                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <!-- <div class="body_thongke_1">
                            <div class="box_1">
                                <div class="so_lieu">
                                    <div class="so_lieu_ngày">
                                        <h6 style="text-align: center;">Số lượng</h6>
                                    </div>
                                    <div class="so_lieu_so">
                                        <span style="font-size: 25px; padding-left: 20px;">{{ soluongLK.soLuongLichKham
                                        }}</span>
                                    </div>
                                </div>
                            </div>
                        </div> -->


                    </div>

                    <!-- <h1 style="text-align: center; padding-top: 100px;">Sở Đồ Tháng Trong Năm</h1>
                    <div style="height: 400; margin-top: 50px;">
                        <Bar ref="chart" id="my-chart-id" :options="chartOptions" :data="chartData" />

                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import TheSideBarBacSi from "../admin/TheSideBar-admin.vue"
// import { Bar } from 'vue-chartjs'
// import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import axios from "axios"
// ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default {
    // name: 'BarChart',
    components: {
        TheSideBarBacSi,
        // Bar
    },
    watch: {
        optionTK: function () {
            this.day = '';
            this.month = '';
            this.year = '';
        },
        optionTK1: function () {
            this.optionTK2 = 0
        },
    },
    data() {
        return {
            ListBS: [],
            bacsi: {},
            day: '',
            month: '',
            year: '',
            formattedDate: "",
            appointment: [],
            total: 0,
            optionTK: 0,
            optionTK1: 0,
            soluongLK: 0,
            optionTK2: 0,
            shouldShowDayField: false,
            shouldShowMonthField: false,
            shouldShowBacSiField: false,
        };
    },

    created() {
        this.fetchDataBS();

    },
    methods: {
        onOptionChange() {
            if (this.optionTK === '1') {
                this.shouldShowDayField = true;
                this.shouldShowMonthField = true;
            } else if (this.optionTK === '2') {
                this.shouldShowDayField = false;
                this.shouldShowMonthField = true;
            } else if (this.optionTK === '3') {
                this.shouldShowDayField = false;
                this.shouldShowMonthField = false;
            } else {
                this.shouldShowDayField = false;
                this.shouldShowMonthField = false;
            }
            if (this.optionTK1 === '0') {
                this.shouldShowBacSiField = false;
            } else if (this.optionTK1 === '1') {
                this.shouldShowBacSiField = false;
            }
            else {
                this.shouldShowBacSiField = true;
            }
        },
        async fetchData() {
            try {
                this.bacsi = {};
                this.formattedDate = ""
                let formattedDate;
                if (this.optionTK2) {
                    if (this.day && this.month && this.year) {
                        const res = await axios.get(`http://localhost:3000/api/get-Thongke/BS/report?day=${this.day}&month=${this.month}&year=${this.year}&idBacSi=${this.optionTK2}`);
                        const soluong = res.data;
                        this.appointment = soluong;
                        console.log(this.appointment)
                        this.bacsi = soluong.bsID;
                        const formattedDay = this.day < 10 ? `0${this.day}` : `${this.day}`;
                        const formattedMonth = this.month < 10 ? `0${this.month}` : `${this.month}`;
                        formattedDate = `${formattedDay}/${formattedMonth}/${this.year}`;
                    }

                    if (!this.day && this.month && this.year) {
                        const res = await axios.get(`http://localhost:3000/api/get-Thongke/BS/report?month=${this.month}&year=${this.year}&idBacSi=${this.optionTK2}`);
                        const soluong = res.data;
                        this.appointment = soluong;
                        console.log(this.appointment)
                        this.bacsi = soluong.bsID;
                        const formattedMonth = this.month < 10 ? `0${this.month}` : `${this.month}`;
                        formattedDate = `${formattedMonth}/${this.year}`;
                    }
                    if (!this.day && !this.month && this.year) {
                        const res = await axios.get(`http://localhost:3000/api/get-Thongke/BS/report?year=${this.year}&idBacSi=${this.optionTK2}`);
                        const soluong = res.data;
                        this.appointment = soluong;
                        console.log(this.appointment)
                        this.bacsi = soluong.bsID;
                        formattedDate = `${this.year}`;
                    }
                } else {
                    if (this.day && this.month && this.year) {
                        const res = await axios.get(`http://localhost:3000/api/get-Thongke/report?day=${this.day}&month=${this.month}&year=${this.year}`);
                        const soluong = res.data;
                        this.appointment = soluong;
                        console.log(this.appointment)
                        const formattedDay = this.day < 10 ? `0${this.day}` : `${this.day}`;
                        const formattedMonth = this.month < 10 ? `0${this.month}` : `${this.month}`;
                        formattedDate = `${formattedDay}/${formattedMonth}/${this.year}`;
                    }

                    if (!this.day && this.month && this.year) {
                        const res = await axios.get(`http://localhost:3000/api/get-Thongke/report?month=${this.month}&year=${this.year}`);
                        const soluong = res.data;
                        this.appointment = soluong;
                        console.log(this.appointment)
                        const formattedMonth = this.month < 10 ? `0${this.month}` : `${this.month}`;
                        formattedDate = `${formattedMonth}/${this.year}`;
                    }
                    if (!this.day && !this.month && this.year) {
                        const res = await axios.get(`http://localhost:3000/api/get-Thongke/report?year=${this.year}`);
                        const soluong = res.data;
                        this.appointment = soluong;
                        console.log(this.appointment)
                        formattedDate = `${this.year}`;
                    }
                }

                // Sử dụng giá trị của formattedDate trong logic của bạn
                this.formattedDate = formattedDate
                console.log(this.appointment)
                this.total = this.appointment.lichKhamWithBenhNhan.length
                console.log(this.total)

            } catch (error) {
                console.error(error);
            }
        },

        async fetchDataBS() {
            try {
                const response = await axios.get("http://localhost:3000/api/get-bacsi");
                this.ListBS = response.data
            } catch (error) {
                console.log(error)
            }
        },
        async fetchDataIDBS() {
            try {
                const response = await axios.get(`http://localhost:3000/api/getID-bacsi/${this.optionTK2}`);
                this.bacsi = response.data
                console.log(this.bacsi)
            } catch (error) {
                console.log(error)
            }
        }
    },
}
</script>
<style lang="css" scoped>
.header_thongke {
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    margin-top: 10px;
}

.header_thongke h4 {
    text-align: center;
    padding: 15px;
}

.body_thongke_1 {
    background: white;
    display: flex;
}

.box_1 {
    background: white;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    width: 200px;
    height: 150px;
    position: relative;
    border-radius: 25px;
    margin-left: 40px;
    margin-top: 20px;
}

.box_1 .so_lieu {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

/* Sửa thêm */

.Bang-Thong_ke {
    margin: 40px 0;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.content-1 {
    background: red;
    width: 15px;
    height: 100vh;
}

.Thong-tin-Bac-Si h6 {
    color: red;
}

.Thong-tin-Bac-Si ul {
    padding: 0;
}

.Thong-tin-Bac-Si ul li {
    list-style: none;
}

.box-date {
    border: 1px solid black;
    height: 100px;

}

.table-Info {
    border-collapse: collapse;
    width: 100%;
}

th,
td {
    border: 1px solid black;
    padding: 8px;
    text-align: center;
}

/* Loại bỏ màu nền cho cả bảng */
.table-Info,
th,
td {
    background-color: transparent;
}

.table-Info tr th {
    background: red;
    color: white;
}

.table-Info tr:nth-child(2) {
    background: #FCDAD5;
}

/* ----------------- */
.box-notes {
    border: 1px solid black;
    width: 100%;
    height: 200px;
}

.box-notes-2 {
    margin-top: 40px;
}

.box-notes-2 ul li {
    list-style: none;
    margin-bottom: 10px;
}
</style>
