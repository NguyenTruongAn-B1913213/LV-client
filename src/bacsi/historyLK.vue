<template>
    <div class="status-bill">
        <div class="container-fluid">
            <div class="row" style="margin-top: 0;">
                <div class="col-sm-3">
                    <TheSideBarBacSi />
                </div>
                <div class="col-sm-9">
                    <form class="main-add-product-admin">
                        <div class="d-flex" style="justify-content: space-between;">
                            <div>
                                <h3 class="title-bill-status"> Lịch sử Khám </h3>
                            </div>
                            <div class="d-flex" style="justify-content: space-between; margin-top: 40px;margin-left:40px;">
                                <!-- <div class="title_thongke">
                            <h3>Thống Kê Lịch Khám</h3>
                        </div> -->
                            </div>
                            <div class="searchXemLich d-flex" style="justify-content: right; margin: 25px 30px  ;">
                                <input type="search" placeholder="Tìm kiếm Tên Bệnh Nhân...." v-model="searchKeyword">
                                <button class="submit" type="submit"><i class="fa fa-search"></i></button>
                            </div>
                        </div>
                        <div class="d-flex" style="margin: 20px 0;">
                            <!-- <div>
                                <select v-model="optionTK1" class="mr-2" style="height: 38px;" @change="onOptionChange">
                                    <option value="0">Chọn Thống kê</option>
                                    <option value="1">Thống kê Phòng Khám</option>
                                    <option value="2">Thống kê Theo Bác Sĩ</option>
                                </select>
                            </div> -->
                            <!-- <div v-if="shouldShowBacSiField">
                                <select v-model="optionTK2" class="mr-2" style="height: 38px;" @change="onOptionChange">
                                    <option value="0">Chọn Thống kê theo bác sĩ</option>
                                    <option v-for="bs in ListBS" :key="bs.id" :value="bs._id">{{ bs.tenBS }}
                                    </option>
                                </select>
                            </div> -->
                            <!-- <div>
                                <select v-model="optionTK" class="mr-2" style="height: 38px;" @change="onOptionChange">
                                    <option value="0">Chọn Thống kê Theo Thời Gian</option>
                                    <option value="1">Thống kê Theo Ngày</option>
                                    <option value="2">Thống kê Theo Tháng</option>
                                    <option value="3">Thống kê Theo Năm</option>
                                </select>
                            </div> -->
                            <div>
                                <!-- Trường chọn ngày -->
                                <select v-model="day" class="mr-2" style="height: 38px;">
                                    <option value="">Chọn ngày</option>
                                    <option v-for="n in 31" :key="n" :value="n">{{ n }}</option>
                                </select>

                                <!-- Trường chọn tháng -->
                                <select v-model="month" class="mr-2" style="height: 38px;">
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
                                <button class="btn btn-success" @click="fetchLichKhamWithTime" type="submit">Xác
                                    Nhận</button>
                            </div>
                        </div>
                        <table class="table table-light">
                            <thead>
                                <tr class="content-main-thead">
                                    <th scope="col">STT</th>
                                    <th scope="col">Tên bệnh nhân</th>
                                    <th scope="col">Ngày khám</th>
                                    <th scope="col"></th>
                                    <th scope="col">Giờ khám</th>
                                    <th scope="col">Bệnh lý</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- v-for="(order, index) in delivery"
                                                :key="index" -->
                                <tr class="content-main-tbody-admin" v-for="(item, index) in filteredLichKham" :key="index">
                                    <th scope="row">{{ index + 1 }}</th>
                                    <td class="title-name">
                                        {{ item.benhNhan.ten }}
                                    </td>

                                    <td class="title-price">{{ item.lichKham.ngaygioKham.ngay }}</td>
                                    <td class="title-price">{{ item.lichKham.ngaygioKham.thu }}</td>
                                    <!--  v-for="(item, index) in order.item" :key="index">
                                                    {{ item.product }} - Số Lượng {{ item.soluong }} -->
                                    <td class="title-name">{{ item.lichKham.ngaygioKham.ca }}</td>
                                    <td>{{ item.lichKham.trangThai }}</td>
                                    <!-- <td><router-link :to="`/ChuanDoanBS/${item.lichKham._id} `"> <button
                                                class="equal-width-button  btn btn-success">Chuẩn
                                                Đoán</button></router-link>
                                    </td> -->

                                    <td><router-link :to="`/xemlichBS/${item.lichKham._id}`"> <button
                                                class="equal-width-button  btn btn-success">Chi
                                                Tiết</button></router-link>
                                    </td>

                                    <!-- <div class="mainEdit-Product">
                                        <div class="EditProduct-Button-Bill">
                                            <td>
                                                <div class="status-bill">

                                                </div>
                                            </td>
                                        </div>
                                    </div> -->
                                </tr>
                            </tbody>
                        </table>
                    </form>
                    <div class="d-flex" style="justify-content: space-between;">
                        <div>
                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                                        <a class="page-link" href="#" aria-label="Previous" @click="previousPage">
                                            <span aria-hidden="true">&laquo;</span>
                                            <span class="sr-only">Previous</span>
                                        </a>
                                    </li>
                                    <li class="page-item" v-for="pageNumber in totalPages" :key="pageNumber"
                                        :class="{ active: pageNumber === currentPage }">
                                        <a class="page-link" href="#" @click="changePage(pageNumber)">{{ pageNumber
                                        }}</a>
                                    </li>
                                    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                                        <a class="page-link" href="#" aria-label="Next" @click="nextPage">
                                            <span aria-hidden="true">&raquo;</span>
                                            <span class="sr-only">Next</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { mapState } from 'vuex';
import TheSideBarBacSi from '../bacsi/TheSideBar-BacSi.vue';
export default {
    components: {
        TheSideBarBacSi
    },
    data() {
        return {
            LichKhams: [],
            itemsPerPage: 4, // Số mục trên mỗi trang
            currentPage: 1,
            searchKeyword: "",
            totalPages: 0,
            optionTK: 0,
            optionTK1: 0,
            soluongLK: 0,
            optionTK2: 0,
            day: '',
            month: '',
            year: '',
        }
    },
    computed: {
        ...mapState({
            token: (state) => state.token,
            userID: (state) => state.userID
        }),

        filteredLichKham() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            console.log(startIndex)
            console.log(endIndex)
            const filteredData = this.LichKhams.filter((lichKham) => {
                // Lọc theo tên bệnh nhân
                console.log(lichKham)
                const tenBenhNhan = lichKham.benhNhan.ten.toLowerCase();
                return tenBenhNhan.includes(this.searchKeyword.toLowerCase());
            });
            return filteredData.slice(startIndex, endIndex);
        },


    },
    async created() {
        this.fetchLichKham()
    },
    methods: {
        // onOptionChange() {
        //     if (this.optionTK === '1') {
        //         this.shouldShowDayField = true;
        //         this.shouldShowMonthField = true;
        //     } else if (this.optionTK === '2') {
        //         this.shouldShowDayField = false;
        //         this.shouldShowMonthField = true;
        //     } else if (this.optionTK === '3') {
        //         this.shouldShowDayField = false;
        //         this.shouldShowMonthField = false;
        //     } else {
        //         this.shouldShowDayField = false;
        //         this.shouldShowMonthField = false;
        //     }
        //     if (this.optionTK1 === '0') {
        //         this.shouldShowBacSiField = false;
        //     } else if (this.optionTK1 === '1') {
        //         this.shouldShowBacSiField = false;
        //     }
        //     else {
        //         this.shouldShowBacSiField = true;
        //     }
        // },
        async fetchLichKham() {
            try {
                console.log(this.userID)
                const res = await axios({
                    methods: "GET",
                    url: `http://localhost:3000/api/History/${this.userID}`,
                },)
                console.log(res.data)
                this.LichKhams = res.data
                this.totalPages = Math.ceil(this.LichKhams.length / this.itemsPerPage);
                console.log(this.totalPages)
            } catch (error) {
                this.Message = "abc"
            }
        },
        async fetchLichKhamWithTime(e) {
            e.preventDefault()
            try {
                const res = await axios({
                    methods: "GET",
                    url: `http://localhost:3000/api/chuandoanLKTime/${this.userID}?day=${this.day}&month=${this.month}&year=${this.year}`,
                },)
                console.log(res.data)
                this.LichKhams = res.data
                this.totalPages = Math.ceil(this.LichKhams.length / this.itemsPerPage);
                console.log(this.totalPages)
            } catch (error) {
                this.Message = "abc"
            }
        },
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        changePage(pageNumber) {
            this.currentPage = pageNumber;
        },
        search() {
            this.currentPage = 1; // Reset to the first page when performing a search
        },
    }
}
</script>
<style lang="css" scoped>
.title-bill-status {
    color: black;
    margin: 25px 0;
    text-align: left;
}

.equal-width-table {
    display: table;
    width: 100%;
    /* Đảm bảo bảng chiếm toàn bộ chiều rộng của container */
    table-layout: fixed;
    /* Để làm cho các cột có chiều rộng bằng nhau */
}

.equal-width-table th,
.equal-width-table td {
    display: table-cell;
    width: auto;
    /* Đặt chiều rộng của các cột thành tự động */
    padding: 8px;
    /* Cải thiện khoảng cách giữa nội dung và viền */
    border: 1px solid #ccc;
    /* Định dạng viền */
    text-align: center;
    /* Căn giữa nội dung của mỗi ô */
}

.equal-width-button {
    width: 100%;
    /* Đảm bảo rằng button có chiều rộng bằng với cột */
}

.badge-light {
    width: 100%;
    padding: 10px 20px;
    background: greenyellow;
    color: black;
    font-size: 14px;
}

.status-bill {
    color: black;
    text-align: center;
}

.status-bill i {
    font-size: 26px;
}
</style>

