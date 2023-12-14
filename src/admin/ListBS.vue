<template>
    <div class="status-bill">
        <div class="container-fluid">
            <div class="row" style="margin-top: 0;">
                <div class="col-sm-3">
                    <TheSideBarBacSi />
                </div>
                <div class="col-sm-9">
                    <form class="main-add-product-admin">
                        <div class="d-flex" style="justify-content: space-between; text-align: center;">
                            <div>
                                <h3 class="title-bill-status">Danh sách bác sĩ</h3>
                            </div>
                            <!-- <div class="searchXemLich d-flex" style="justify-content: right; margin: 25px 30px  ;">
                                <input type="search" placeholder="Tìm kiếm Thuốc....">
                                <button class="submit" type="submit"><i class="fa fa-search"></i></button>
                            </div> -->
                        </div>
                        <table class="table table-light">
                            <thead>
                                <tr class="content-main-thead">
                                    <th style=" font-size: 20px;" scope="col">STT</th>
                                    <th style=" font-size: 20px;" scope="col">Tên Bác Sĩ</th>
                                    <th style=" font-size: 20px;" scope="col">Chuyên Khoa</th>
                                    <th style=" font-size: 20px;" scope="col">Ngày Sinh</th>
                                    <th style=" font-size: 20px;" scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- v-for="(order, index) in delivery"
                                                :key="index" -->
                                <tr class="content-main-tbody-admin" v-for="(item, index) in ListBS" :key="index">
                                    <th style=" font-size: 20px;" scope="row">{{ index + 1 }}</th>
                                    <td style=" font-size: 20px;" class="title-name">
                                        {{ item.tenBS }}
                                    </td>

                                    <td style=" font-size: 20px;" class="title-price">{{ item.chuyenKhoa }}</td>
                                    <td style=" font-size: 20px;" class="title-price">{{ item.ngaySinh }}</td>
                                    <!--  v-for="(item, index) in order.item" :key="index">
                                                    {{ item.product }} - Số Lượng {{ item.soluong }} -->
                                    <!-- <td> <button type="button" class="equal-width-button  btn btn-success">Cập Nhật Thông
                                            Tin</button>
                                    </td>
                                    <td> <button type="button" class="equal-width-button  btn btn-success">Lịch Làm
                                            Việc</button>
                                    </td> -->

                                    <td><router-link :to="`/Thong-tin-BS/${item._id}`"> <button style=" font-size: 20px;"
                                                class="equal-width-button  btn btn-success">Cập Nhật
                                                Thông
                                                Tin</button></router-link>
                                    </td>
                                    <td><router-link :to="`/admin/LichLamViec/${item._id}`"> <button
                                                class="equal-width-button  btn btn-success" style=" font-size: 20px;">Lịch
                                                Làm
                                                Việc</button></router-link>
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
                    <!-- <div class="d-flex" style="justify-content: space-between;">
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
                    </div> -->
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
            ListBS: [],
        }
    },
    computed: {
        ...mapState({
            token: (state) => state.token,
        }),

    },
    async created() {
        this.fetchListBS()
    },
    methods: {
        async fetchListBS() {
            try {
                const res = await axios({
                    methods: "GET",
                    url: `http://localhost:3000/api/get-bacsi`,
                },)
                this.ListBS = res.data
                console.log(this.ListBS)
            } catch (error) {
                this.Message = "abc"
            }
        },
    },
}
</script>
<style lang="css" scoped>
.title-bill-status {
    font-size: 40px;
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
    /* Đảm bảo rằng button có chiều rộng bằng với cột */
}

.badge-light {
    width: 100%;
    padding: 10px 20px;
    background: greenyellow;
    color: black;
    font-size: 20px;
}

.status-bill {
    color: black;
    text-align: center;
}

.status-bill i {
    font-size: 26px;
}
</style>
