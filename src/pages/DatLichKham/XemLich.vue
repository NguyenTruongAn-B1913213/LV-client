<template>
    <div class="status-bill">
        <div class="container-fluid">
            <div class="row" style="margin-top: -90px;">
                <!-- <div class="col-sm-3">
                    <TheSideBarAdmin />
                </div> -->
                <div class="col-sm-12 Add-admin-product">
                    <!-- <div class="header-sm-9">
                        <span>Overview</span>
                    </div> -->
                    <div class="container-fluid container1">
                        <div class="row">
                            <div class="col-sm-12">
                                <form class="main-add-product-admin">
                                    <h3 class="title-bill-status"> Lịch Khám</h3>
                                    <table class="table table-light">
                                        <thead class="thead-light">
                                            <tr class="content-main-thead">
                                                <th scope="col">STT</th>
                                                <th scope="col">Tên Bệnh Nhân</th>
                                                <th scope="col">Ngày Khám</th>
                                                <th scope="col">Giờ Khám</th>
                                                <th scope="col">Trạng Thái</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <!-- v-for="(order, index) in delivery"
                                                :key="index" -->
                                            <tr class="content-main-tbody-admin" v-for="(item, index) in LichKhams"
                                                :key="index">
                                                <th scope="row">{{ index + 1 }}</th>
                                                <td class="title-name">
                                                    {{ item.benhNhan.ten }}
                                                </td>

                                                <td class="title-price">{{ item.LichKham.ngaygioKham.ngay }}</td>
                                                <!--  v-for="(item, index) in order.item" :key="index">
                                                    {{ item.product }} - Số Lượng {{ item.soluong }} -->
                                                <td class="title-name">{{ item.LichKham.ngaygioKham.ca }}</td>
                                                <td>{{ item.LichKham.trangThai }}</td>
                                                <td><router-link :to="`/ChiTietLKBN/${item.LichKham._id}`"> <button
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

                            </div>
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
import io from "socket.io-client";
export default {
    data() {
        return {
            LichKhams: []
        }
    },
    computed: {
        ...mapState({
            token: (state) => state.token,
            userID: (state) => state.userID
        }),

    },
    async created() {
        this.fetchLichKham()
        this.socket = io('http://localhost:3000');
        this.socket.on('xacNhanLichKham', async (data) => {
            if (this.userID === data.tkid) {
                this.fetchLichKham()
            }
        });
    },
    methods: {
        async fetchLichKham() {
            try {

                const headers = {
                    userID: `${this.userID}`,
                };
                const res = await axios({
                    methods: "GET",
                    url: "http://localhost:3000/api/benhnhan/lich-kham",
                    headers
                },)
                this.LichKhams = res.data

            } catch (error) {
                this.Message = "abc"
            }
        },
    }
}
</script>
<style lang="css" scoped>
.title-bill-status {
    font-size: 40px;
}

.Add-admin-product {
    background: white;
}

.title-bill-status {
    color: black;
    margin: 25px 0;
    text-align: left;
}

.main-add-product-admin {
    margin: 0 150px;
    margin-bottom: 20px;
}

.table {
    font-size: 20px;
}

.equal-width-table {
    display: table;
    width: 100%;
    /* Đảm bảo bảng chiếm toàn bộ chiều rộng của container */
    table-layout: fixed;
    /* Để làm cho các cột có chiều rộng bằng nhau */
}

.col-sm-12 {
    padding-bottom: 40px;
}

.thead-light th {
    color: #1c1e20;
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
