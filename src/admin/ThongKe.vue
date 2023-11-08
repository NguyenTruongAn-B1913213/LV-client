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
                    <div style=" display: flex;  justify-content: center;">
                        <!-- <div class="body_thongke_1">
                            <div class="box_1">
                                <div class="so_lieu">
                                    <div class="so_lieu_ngày">
                                        <h6 style="text-align: center;">Ngày</h6>
                                    </div>
                                    <div class="so_lieu_so">
                                        <span style="font-size: 25px;">1,313</span>
                                    </div>
                                    <div class="so_lieu_phan_tram">
                                        <span style="color: red;margin-left: 15px;">3.4%</span>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                        <div class="body_thongke_1">
                            <div class="box_1">
                                <div class="so_lieu">
                                    <div class="so_lieu_ngày">
                                        <h6 style="text-align: center;">Số lượng</h6>
                                    </div>
                                    <div class="so_lieu_so">
                                        <span style="font-size: 25px; padding-left: 20px;">{{ soluongLK.soLuongLichKham
                                        }}</span>
                                    </div>
                                    <!-- <div class="so_lieu_phan_tram">
                                        <span style="color: red;margin-left: 15px;">3.4%</span>
                                    </div> -->
                                </div>
                            </div>
                        </div>
                        <!-- <div class="body_thongke_1">
                            <div class="box_1">
                                <div class="so_lieu">
                                    <div class="so_lieu_ngày">
                                        <h6 style="text-align: center;">Ngày</h6>
                                    </div>
                                    <div class="so_lieu_so">
                                        <span style="font-size: 25px;">1,313</span>
                                    </div>
                                    <div class="so_lieu_phan_tram">
                                        <span style="color: red;margin-left: 15px;">3.4%</span>
                                    </div>
                                </div>
                            </div>
                        </div> -->

                    </div>


                    <div style="height: 400; margin-top: 50px;">
                        <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import TheSideBarBacSi from "../admin/TheSideBar-admin.vue"
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import axios from "axios"
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default {
    name: 'BarChart',
    components: {
        TheSideBarBacSi,
        Bar
    },
    data() {
        return {
            ListBS: [],
            day: '',
            month: '',
            year: '',
            optionTK: 0,
            optionTK1: 0,
            soluongLK: 0,
            optionTK2: 0,
            shouldShowDayField: false,
            shouldShowMonthField: false,
            shouldShowBacSiField: false,
            chartData: {
                labels: Array.from({ length: 31 }, (_, i) => (i + 1).toString()), // Tạo mảng 31 ngày
                datasets: [
                    {
                        label: 'Doanh số',
                        backgroundColor: '#41B883',
                        data: [50, 60, 70, 65, 80, 75, 60, 70, 85, 90, 80, 95, 80, 75, 60, 70, 85, 90, 100, 95, 80, 75, 60, 70, 85, 90, 100, 95, 80, 75, 60],
                    },
                ],
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
            },
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
                console.log(this.day)
                console.log(this.month)
                console.log(this.year)
                // Tạo URL API với tham số ngày, tháng, và năm
                const apiUrl = `http://localhost:3000/api/get-Thongke?day=${this.day}&month=${this.month}&year=${this.year}`;
                const response = await axios.get(apiUrl);
                this.soluongLK = response.data
                console.log(this.soluongLK)
                // Cập nhật dữ liệu biểu đồ sau khi có kết quả từ API
            } catch (error) {
                console.error(error);
            }
        },
        async fetchDataBS() {
            try {
                const response = await axios.get("http://localhost:3000/api/get-bacsi");
                this.ListBS = response.data
                console.log(this.ListBS)
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
</style>
