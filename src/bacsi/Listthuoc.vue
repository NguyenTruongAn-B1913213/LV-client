<template>
    <div class="listThuoc">
        <div class="bg-avatar"></div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-3">
                    <TheSideBarBacSi />
                </div>
                <div class="col-sm-9 ThemThuoc">
                    <div class="search d-flex" style="justify-content: right; margin: 20px 0;">
                        <input type="search" placeholder="Tìm kiếm Thuốc...." v-model="searchKeyword">
                        <button class="submit" type="submit"><i class="fa fa-search"></i></button>
                    </div>
                    <div class="main_list_thuoc">
                        <div>
                            <h4>Danh Sách Thuốc </h4>
                        </div>
                        <table class="table">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Tên Thuốc</th>
                                    <!-- <th scope="col">Giá Thành</th> -->
                                    <th scope="col">Hướng Dẫn</th>
                                    <th scope="col">Trạng Thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style="text-align: center; border-bottom: 1px solid black;"
                                    v-for="(thuoc, index) in filteredThuoc" :key="index">
                                    <th scope="row">{{ index + 1 + (currentPage - 1) * itemsPerPage }}</th>
                                    <td>{{ thuoc.tenThuoc }}</td>
                                    <!-- <td>13.000đ</td> -->
                                    <td>{{ thuoc.huongDanSuDung }} </td>
                                    <td><button type="submit" class="btn btn-success" @click="addThuoc(thuoc)"><i
                                                class="fa fa-plus-circle"></i></button></td>
                                </tr>
                                <!-- <tr style="border-bottom: 1px solid black">
                                    <th scope="row">2</th>
                                    <td>Paraxetamol</td>
                                    <td>14.000đ</td>
                                    <td><button type="submit" class="btn btn-success"><i
                                                class="fa fa-plus-circle"></i></button></td>
                                </tr> -->
                            </tbody>
                        </table>

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
                        <div>
                            <h4>Danh Sách Thuốc Đã Thêm </h4>
                        </div>
                        <table class="table">
                            <thead class="thead-light">
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Tên Thuốc</th>
                                    <!-- <th scope="col">Giá Thành</th> -->
                                    <th scope="col">Hướng Dẫn</th>
                                    <th scope="col">Số Lượng</th>
                                    <th scope="col">Trạng Thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style="border-bottom: 1px solid black; text-align: center;"
                                    v-for="(thuoc, index) in CreatedThuoc" :key="index">
                                    <th scope="row">{{ index + 1 }}</th>
                                    <td>{{ thuoc.tenThuoc }}</td>
                                    <td>{{ thuoc.huongDanSuDung }}</td>
                                    <td>{{ thuoc.soluong }}</td>
                                    <td>
                                        <!-- <button type="submit" class="btn btn-success" style="margin-right: 10px;"><i
                                                class="fa fa-check-circle"></i></button> -->
                                        <button type="submit" class="btn btn-danger" @click="openCancelModal"><i
                                                class="fa fa-times"></i></button>
                                    </td>
                                </tr>
                                <!-- <tr style="border-bottom: 1px solid black">
                                    <th scope="row">2</th>
                                    <td>Paraxetamol</td>
                                    <td>14.000đ</td>
                                    <td><button type="submit" class="btn btn-success" style="margin-right: 10px;"><i
                                                class="fa fa-check-circle"></i></button>
                                        <button type="submit" class="btn btn-danger" @click="openCancelModal"><i
                                                class="fa fa-times"></i></button>
                                    </td>
                                </tr> -->
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <div class="btn btn-success" @click="CreatedToaThuoc">Cập Nhật Tên Thuốc</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Huy -->
        <TheModal :show-modal="showCancelModal" :message="confirmMessage" :confirm-text="confirmButtonText"
            @close="closeCancelModal" @confirm="confirmCancel" :removeFunction="removeThuoc"></TheModal>
    </div>
</template>

<script>
import TheSideBarBacSi from '../bacsi/TheSideBar-BacSi.vue'
import TheModal from '../Themodal/Modal.vue';
import axios from 'axios';
import { mapState } from 'vuex';
export default {
    name: 'main-themthuoc',
    components: {
        TheSideBarBacSi,
        TheModal
    },
    data() {
        return {
            showCancelModal: false,
            confirmMessage: "Bạn có chắc chắn muốn hủy?",
            confirmButtonText: "Xác nhận hủy",
            page: 1,
            totalPages: 0,
            Thuoc: [],
            CreatedThuoc: [],
            searchKeyword: "",
            itemsPerPage: 4, // Số mục trên mỗi trang
            currentPage: 1,
        };
    },
    computed: {
        ...mapState({
            userID: (state) => state.userID
        }),
        filteredThuoc() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            const filteredData = this.Thuoc.filter(thuoc =>
                thuoc.tenThuoc.toLowerCase().includes(this.searchKeyword.toLowerCase())
            );
            return filteredData.slice(startIndex, endIndex)
        },

    },
    async created() {
        this.getThuoc();
    },
    methods: {
        openCancelModal() {
            this.showCancelModal = true;
        },
        closeCancelModal() {
            this.showCancelModal = false;
        },
        confirmCancel() {
            // Xử lý logic hủy ở đây
            this.closeCancelModal();
        },
        async getThuoc() {
            const response = await axios.get(`http://localhost:3000/api/thuoc`)
            this.Thuoc = response.data.allThuoc
            this.totalPages = Math.ceil(this.Thuoc.length / this.itemsPerPage);
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
        addThuoc(thuoc) {
            const existingTh = this.CreatedThuoc.find(created => created._id === thuoc._id)
            if (existingTh) {
                existingTh.soluong += 1;
            }
            else {
                thuoc.soluong = 1;
                this.CreatedThuoc.unshift(thuoc)
            }
        },
        removeThuoc(index) {
            this.CreatedThuoc.splice(index, 1);
            this.closeCancelModal();
        },
        async CreatedToaThuoc(event) {
            event.preventDefault();
            try {
                const now = new Date()
                const day = String(now.getDate()).padStart(2, '0');
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const year = now.getFullYear();
                const formattedDate = `${day}/${month}/${year}`;
                const lichkhamID = this.$route.params.id;
                const res = await axios.get(`http://localhost:3000/api/lichkham/${lichkhamID}`)
                const appointmentDetails = res.data
                const headers = {
                    userID: `${this.userID}`,
                };
                const idBN = appointmentDetails.patient._id
                const formData = {
                    maBenhNhan: idBN,
                    ngayKeToa: formattedDate,
                    danhSachThuoc: this.CreatedThuoc
                };
                await axios.post('http://localhost:3000/api/create-prescription', formData, { headers });
                this.$router.push(`/xemlichBS/${lichkhamID}`);
            } catch (error) {
                alert("Lịch Khám Đã Có Toa Thuốc")

            }
        }

    },
}
</script>

<style scoped>
.listThuoc {
    position: relative;
}

.modal-custom {
    /* position: absolute; */
    position: fixed;
    top: 55%;
    left: 0;
    z-index: 3;
    width: 100%;
    transform: translate(-50%, -50%);
    transform: translateY(-100%);
    transition: transform 0.5s ease;
}

.modal-show {
    transform: translateY(0);
}
</style>