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
                                <h3 class="title-bill-status"> Lịch Khám</h3>
                            </div>
                            <div class="searchXemLich d-flex" style="justify-content: right; margin: 25px 30px  ;">
                                <select v-model="searchOption" style="width: 250px; margin-right: 20px; font-size: 20px;">
                                    <option value="ten">Tên</option>
                                    <option value="soCMT">Số CMT</option>
                                </select>
                                <input type="search" placeholder="Tìm kiếm...." v-model="searchKeyword">
                                <!-- <button class="submit" type="submit"><i class="fa fa-search"></i></button> -->
                            </div>
                        </div>
                        <table class="table table-light">
                            <thead>
                                <tr class="content-main-thead">
                                    <th scope="col">STT</th>
                                    <th scope="col">Mã CCCD</th>
                                    <th scope="col">Tên Bệnh Nhân</th>
                                    <th scope="col">Ngày Khám</th>
                                    <th scope="col">Thứ</th>
                                    <th scope="col">Giờ Khám</th>
                                    <th scope="col">Trạng Thái</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- v-for="(order, index) in delivery"
                                                :key="index" -->
                                <tr class="content-main-tbody-admin" v-for="(item, index) in filteredLichKham" :key="index">
                                    <th scope="row">{{ index + 1 }}</th>
                                    <td class="title-name">
                                        {{ item.benhNhan.madinhdanh }}
                                    </td>
                                    <td class="title-name">
                                        {{ item.benhNhan.ten }}
                                    </td>

                                    <td class="title-price">{{ item.lichKham.ngaygioKham.ngay }}</td>
                                    <td class="title-price">{{ item.lichKham.ngaygioKham.thu }}</td>
                                    <!--  v-for="(item, index) in order.item" :key="index">
                                                    {{ item.product }} - Số Lượng {{ item.soluong }} -->
                                    <td class="title-name">{{ item.lichKham.ngaygioKham.ca }}</td>
                                    <td>{{ item.lichKham.trangThai }}</td>
                                    <td><router-link :to="`/ChuanDoanBS/${item.lichKham._id} `"> <button
                                                class="equal-width-button  btn btn-success">Chẩn
                                                Đoán</button></router-link>
                                    </td>

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
            searchOption: "ten",
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
            const filteredData = this.LichKhams.filter((lichKham) => {


                if (this.searchOption === "ten") {
                    const tenBenhNhan = lichKham.benhNhan.ten.toLowerCase();
                    return tenBenhNhan.includes(this.searchKeyword.toLowerCase());
                } else {
                    const soCCCD = lichKham.benhNhan.madinhdanh.toLowerCase()
                    return soCCCD.includes(this.searchKeyword.toLowerCase());
                }

            });
            return filteredData.slice(startIndex, endIndex);
        },


    },
    async created() {
        this.fetchLichKham()
    },
    methods: {
        async fetchLichKham() {
            try {

                const headers = {
                    userID: `${this.userID}`,
                };

                const res = await axios({
                    methods: "GET",
                    url: "http://localhost:3000/api/bacsi/lich-kham",
                    headers
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
h3 {
    font-size: 40px;
}

.table {
    font-size: 20px;
}

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
    font-size: 20px;
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

