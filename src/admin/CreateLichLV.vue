<template>
    <div class="addproduct-page">
        <div class="bg-avatar"></div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-3">
                    <TheSideBarBacSi />
                </div>
                <div class="col-sm-9 Add-admin-product">
                    <form class="main-add-content">
                        <table class="table table-dark">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Thứ</th>
                                    <th scope="col">Ca Khám</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in ngayLamviec" :index="index" :key="item._id">
                                    <th scope="row">{{ index + 1 }}</th>
                                    <td>{{ item.thu }}</td>
                                    <td>{{ item.ca }}</td>
                                    <td>
                                        <input type="checkbox" :id="`checkbox-${index}`" :value="item._id"
                                            v-model="selectedNgayLamViec" :checked="isWorkingDayChecked(item.id)" />
                                        <label :for="`checkbox-${index}`"></label>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                    <div div class=" button-submit-chitiet">
                        <div class="button-submit-capnhat">
                            <router-link :to="``">
                                <button class="capnhat btn btn-success" @click="updateWorkingDays">Cập Nhật</button>
                            </router-link>
                        </div>
                        <div class="button-submit-capnhat">
                            <button class="huy btn btn-success" @click="back">Trở Lại</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import TheSideBarBacSi from '../admin/TheSideBar-admin.vue';
import router from '@/router'
// import { mapState } from 'vuex';
export default {
    components: {
        TheSideBarBacSi
    },
    data() {
        return {
            LichLamViecID: [],
            ngayLamviec: '',
            selectedNgayLamViec: []
        };
    },
    computed: {
        doctorWorkingDayIds() {
            return this.LichLamViecID.ngayLamViec.map(item => item.id);
        }
    },
    created() {
        this.getDoctor();
        this.getDayWork();
        console.log(this.selectedNgayLamViec)
    },
    methods: {
        async getDoctor() {
            try {
                const id = this.$route.params.id
                // console.log(id)
                const response = await axios.get(`http://localhost:3000/api/getID-bacsi/${id}`)
                this.LichLamViecID = response.data;
            } catch (error) {
                console.log(error)
            }
        },
        async getDayWork() {
            try {
                const response = await axios.get("http://localhost:3000/api/get-datework");
                let ngayLamviec = response.data;

                const dayOrder = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'];
                ngayLamviec.sort((b, a) => {
                    const dayComparison = dayOrder.indexOf(b.thu) - dayOrder.indexOf(a.thu);
                    if (dayComparison === 0) {
                        return a.ca.localeCompare(b.ca);
                    }
                    return dayComparison;
                });
                this.ngayLamviec = ngayLamviec;
                this.selectedNgayLamViec = this.LichLamViecID.ngayLamViec.map(item => item);
                this.ngayLamviec.forEach((day) => {
                    if (!this.LichLamViecID.ngayLamViec.map(item => item).includes(day._id)) {
                        this.selectedNgayLamViec = this.selectedNgayLamViec.filter(id => id !== day.id);
                    }

                });

            } catch (error) {
                console.log(error)
            }
        },

        isWorkingDayChecked(dayId) {
            // Check if the working day with the given ID is selected
            return this.selectedNgayLamViec.includes(dayId);
        },
        async updateWorkingDays() {
            try {
                // Chuẩn bị dữ liệu cần gửi lên máy chủ, trong trường hợp này, là this.selectedNgayLamViec
                const data = {
                    idLamViec: this.selectedNgayLamViec
                };

                const id = this.$route.params.id;
                const response = await axios.post(`http://localhost:3000/api/them-lich-lam-viec/${id}`, data);
                if (response.data.message) {
                    alert(response.data.message);
                } else {
                    alert("Cập nhật không thành công. Không có thông báo từ máy chủ.");
                }
            } catch (error) {
                console.error(error);

            }
        },
        back() {
            router.push("/ListBS")
        }
    }
};

</script>
  
<style scoped>
.content-main-tbody-admin {
    margin: 0;
}

.buoiLamViec ul li {
    text-align: center;
    list-style: none;
}

.dateLamViec {
    text-align: center;
    border-top: 10px solid red;
}

.mainEdit-Product {
    display: flex;
    justify-content: center;
}

.EditProduct {
    background: rgb(145, 235, 11);
    border-radius: 10px;
    color: white;
    width: 40px;
    height: 40px;
    text-align: center;
    margin-top: 30px;
}

.delete {
    background: red;
    color: white;
    border-radius: 10px;
    width: 40px;
    height: 40px;
    margin-top: 18px;
    text-align: center;
    padding: 10px;
}

.img-product-page-admin {
    width: 70px;
}

.content-main-tbody td,
th {
    text-align: center;
    padding-top: 20px;
}

.title-product-admin {
    justify-content: center;
}

.table td,
.table th {
    vertical-align: middle;
    border-top: 1px solid black;
}

.Add-admin-product {
    margin-top: 0px;
}

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