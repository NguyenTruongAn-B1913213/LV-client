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
                            <!-- <div class="searchXemLich d-flex" style="justify-content: right; margin: 25px 30px  ;">
                                <input type="search" placeholder="Tìm kiếm Thuốc....">
                                <button class="submit" type="submit"><i class="fa fa-search"></i></button>
                            </div> -->
                        </div>
                        <table class="table table-light">
                            <thead>
                                <tr class="content-main-thead">
                                    <th scope="col">STT</th>
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
                                <tr class="content-main-tbody-admin" v-for="(item, index) in LichKhams" :key="index">
                                    <th scope="row">{{ index + 1 }}</th>
                                    <td class="title-name">
                                        {{ item.benhNhan.ten }}
                                    </td>

                                    <td class="title-price">{{ item.LichKham.ngaygioKham.ngay }}</td>
                                    <td class="title-price">{{ item.LichKham.ngaygioKham.thu }}</td>
                                    <!--  v-for="(item, index) in order.item" :key="index">
                                                    {{ item.product }} - Số Lượng {{ item.soluong }} -->
                                    <td class="title-name">{{ item.LichKham.ngaygioKham.ca }}</td>
                                    <td>{{ item.LichKham.trangThai }}</td>
                                    <td> <button type="button" class="equal-width-button  btn btn-success"
                                            @click="adminConfirmAppointment(item.LichKham._id)">Xác
                                            Nhận</button>
                                    </td>
                                    <td><router-link :to="`/ChiTietLK/${item.LichKham._id}`"> <button
                                                class="equal-width-button  btn btn-success">Chi
                                                Tiết</button></router-link>
                                    </td>

                                    <div class="mainEdit-Product">
                                        <div class="EditProduct-Button-Bill">
                                            <td>
                                                <div class="status-bill">

                                                </div>
                                            </td>
                                        </div>
                                    </div>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                    <div class="d-flex" style="justify-content: space-between;">
                        <div>
                            <nav aria-label="Page navigation example" id="pagination">
                                <ul class="pagination">
                                    <li class="page-item">
                                        <a class="page-link" href="#" aria-label="Previous" @click="previousPage">
                                            <span aria-hidden="true">&laquo;</span>
                                            <span class="sr-only">Previous</span>
                                        </a>
                                    </li>
                                    <li class="page-item" v-for="pageNumber in totalPages" :key="pageNumber"
                                        :class="{ 'active': pageNumber === page }">
                                        <a class="page-link" href="#" @click="changePage(pageNumber)">{{ pageNumber }}</a>
                                    </li>
                                    <li class="page-item">
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
import TheSideBarBacSi from '../admin/TheSideBar-admin.vue';
export default {
    components: {
        TheSideBarBacSi
    },
    data() {
        return {
            LichKhams: [],
            page: 1,
            totalPages: 0,
            pageSize: 4,
        }
    },
    computed: {
        ...mapState({
            token: (state) => state.token,
        }),
        paginatedProducts() {
            const startIndex = (this.page - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.products.slice(startIndex, endIndex);
        },

    },
    async created() {
        this.fetchLichKham()
    },
    methods: {
        async adminConfirmAppointment(appointmentId) {
            try {
                console.log(appointmentId)
                await axios.put(`http://localhost:3000/api/admin/lich-kham/xac-nhan/${appointmentId}`);
                this.fetchLichKham()
            } catch (error) {
                console.error('Error confirming appointment:', error);
            }
        },
        async fetchLichKham() {
            try {
                const res = await axios({
                    methods: "GET",
                    url: `http://localhost:3000/api/get-LichKham?page=${this.page}`,
                },)
                console.log(res)
                this.LichKhams = res.data.result
                this.totalPages = res.data.totalPages

            } catch (error) {
                this.Message = "abc"
            }
        },
        previousPage() {
            if (this.page > 1) {
                this.page--;
                this.fetchLichKham();
            }
        },
        nextPage() {
            if (this.page < this.totalPages) {
                this.page++;
                this.fetchLichKham();
            }
        },
        changePage(pageNumber) {
            if (pageNumber != this.page) {
                this.page = pageNumber
                this.fetchLichKham();
            }
        }
    },
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
