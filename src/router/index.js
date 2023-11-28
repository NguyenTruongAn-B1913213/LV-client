import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home/Home.vue";
import CoSoVatChat from "../pages//GioiThieu/CoSoVatChat.vue";
import DoiNguBacSi from "../pages/GioiThieu/DoiNguBacSi.vue";
import TinTucSuKien from "../pages/GioiThieu/TinTucSuKien.vue";
import ChiTietLKBN from "../pages/DatLichKham/chitietLKBN.vue";
import BacSiTuVan from "../pages/LienHe/BacSiTuVan.vue";
import TimDuongDi from "../pages/LienHe/TimDuongDi.vue";
import DangKyND from "../pages/DangNhap/DangKiND.vue";
import DangKyBS from "../pages/DangNhap/DangKiBS.vue";
import DatLichKham from "../pages/DatLichKham/DatLichKham.vue";
import NoiKhoa from "../pages/ChuyenKhoa/NoiKhoa.vue";
import DangNhap from "../pages/DangNhap/DangNhap.vue";
import CapNhatThongTin from "../pages/DatLichKham/CapNhatThongTin";
import XemLich from "../pages/DatLichKham/XemLich";
import Bacsi from "../bacsi/bacsi.vue";
import LichLamViec from "../bacsi/LichLamViec.vue";
import createLichLamViec from "../admin/CreateLichLV.vue";
import XNLichKham from "../admin/xacnhanLick.vue";
import ChiTietLK from "../admin/chitietLK.vue";
// import ReportTemplate from "../pages/ReportTemplate/ReportTemplate.vue";
import ThemThuoc from "../bacsi/Listthuoc.vue";
import IncidentReport from "../pages/ReportTemplate/IncidentReport.vue";
import BSLichKham from "../bacsi/xemlichKham.vue";
import historyLK from "../bacsi/historyLK.vue";
import ListBS from "../admin/ListBS.vue";
import admin from "../admin/admin.vue";
import ttBS from "../admin/ttBS.vue";
import ttPK from "../admin/TTPhongKham.vue";
import xemlichBS from "../bacsi/reportBS.vue";
import thongke from "../admin/ThongKe.vue";
import chuandoan from "../bacsi/ChuanDoan.vue";
import thongke2 from "../admin/ThongKe2.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  // Giới Thiệu
  {
    path: "/CoSoVatChat",
    name: "CoSoVatChat",
    component: CoSoVatChat,
  },
  {
    path: "/bacsi",
    name: "bacsi",
    component: Bacsi,
    meta: { requiresAuth: true, requiresDoctor: true },
  },
  {
    path: "/historyLK",
    name: "historyLK",
    component: historyLK,
    meta: { requiresAuth: true, requiresDoctor: true },
  },
  {
    path: "/them-thuoc/:id",
    name: "themthuoc",
    component: ThemThuoc,
    meta: { requiresAuth: true, requiresDoctor: true },
  },
  {
    path: "/xemlichBS/:id",
    name: "xemlichBS",
    component: xemlichBS,
    meta: { requiresAuth: true, requiresDoctor: true },
  },
  {
    path: "/ChuanDoanBS/:id",
    name: "ChuanDoanBS",
    component: chuandoan,
    meta: { requiresAuth: true, requiresDoctor: true },
  },
  {
    path: "/admin",
    name: "admin",
    component: admin,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/thongke",
    name: "thongke",
    component: thongke,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/thongke2",
    name: "thongke2",
    component: thongke2,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/XNLichKham",
    name: "XNLichKham",
    component: XNLichKham,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/Thong-tin-PhongKham/:id",
    name: "ttPK",
    component: ttPK,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/ChiTietLK/:id",
    name: "ChiTietLK",
    component: ChiTietLK,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/ListBS",
    name: "ListBS",
    component: ListBS,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/Thong-tin-BS/:id",
    name: "ttBS",
    component: ttBS,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/BSLichKham",
    name: "LichKhamBS",
    component: BSLichKham,
    meta: { requiresAuth: true, requiresDoctor: true },
  },
  //------------
  // {
  //   path: "/ReportTemplate",
  //   name: "ReportTemplate",
  //   component: ReportTemplate,
  // },
  //-----------------
  {
    path: "/IncidentReport/:id",
    name: "IncidentReport",
    component: IncidentReport,
    meta: { requiresAuth: true },
  },
  {
    path: "/bacsi/LichLamViec/:id",
    name: "LichLamViec",
    component: LichLamViec,
    meta: { requiresAuth: true, requiresDoctor: true },
  },
  {
    path: "/admin/LichLamViec/:id",
    name: "createLichLamViec",
    component: createLichLamViec,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/DoiNguBacSi",
    name: "DoiNguBacSi",
    component: DoiNguBacSi,
  },

  {
    path: "/DangKiNguoiDung",
    name: "DangKiNguoiDung",
    component: DangKyND,
  },
  {
    path: "/DangKiBS",
    name: "DangKiBS",
    component: DangKyBS,
  },
  {
    path: "/TinTucSuKien",
    name: "TinTucSuKien",
    component: TinTucSuKien,
  },
  {
    path: "/CapNhatThongTin/:id",
    name: "CapNhatThongTin",
    component: CapNhatThongTin,
    meta: { requiresAuth: true },
  },
  {
    path: "/ChiTietLKBN/:id",
    name: "ChiTietLKBN",
    component: ChiTietLKBN,
    meta: { requiresAuth: true },
  },
  {
    path: "/XemLich",
    name: "XemLich",
    component: XemLich,
    meta: { requiresAuth: true },
  },

  // Liên Hệ
  {
    path: "/BacSiTuVan",
    name: "BacSiTuVan",
    component: BacSiTuVan,
    meta: { requiresAuth: true },
  },
  {
    path: "/TimDuongDi",
    name: "TimDuongDi",
    component: TimDuongDi,
  },
  {
    path: "/DatLichKham",
    name: "DatLichKham",
    component: DatLichKham,
    meta: { requiresAuth: true },
  },
  {
    path: "/NoiKhoa",
    name: "NoiKhoa",
    component: NoiKhoa,
  },
  {
    path: "/DangNhap",
    name: "DangNhap",
    component: DangNhap,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
import Cookies from "js-cookie";
router.beforeEach((to, from, next) => {
  const token = Cookies.get("token");
  const userRole = Cookies.get("role");

  if (to.meta.requiresAuth) {
    if (!token) {
      // Chưa đăng nhập, chuyển hướng đến trang đăng nhập
      next("/DangNhap");
    } else {
      // Đã đăng nhập, kiểm tra quyền
      if (to.meta.requiresAdmin && userRole !== "admin") {
        // Không có quyền admin, chuyển hướng đến trang không được phép
        next("/");
      } else if (to.meta.requiresDoctor && userRole !== "bacsi") {
        // Quyền hợp lệ, tiếp tục đến trang
        next("/");
      } else {
        next();
      }
    }
  } else {
    // Route không yêu cầu đăng nhập, tiếp tục đến trang
    next();
  }
});

// ...

export default router;
