import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// home pages  & dashboard
//import Dashboard from "./pages/dashboard";
const Dashboard = lazy(() => import("./pages/dashboard"));
const Ecommerce = lazy(() => import("./pages/dashboard/ecommerce"));
const CrmPage = lazy(() => import("./pages/dashboard/crm"));
const ProjectPage = lazy(() => import("./pages/dashboard/project"));
const BankingPage = lazy(() => import("./pages/dashboard/banking"));

const Login = lazy(() => import("./pages/auth/login"));
const Login2 = lazy(() => import("./pages/auth/login2"));
const Login3 = lazy(() => import("./pages/auth/login3"));
const Register = lazy(() => import("./pages/auth/register"));
const Register2 = lazy(() => import("./pages/auth/register2"));
const Register3 = lazy(() => import("./pages/auth/register3"));
const ForgotPass = lazy(() => import("./pages/auth/forgot-password"));
const ForgotPass2 = lazy(() => import("./pages/auth/forgot-password2"));
const ForgotPass3 = lazy(() => import("./pages/auth/forgot-password3"));
const LockScreen = lazy(() => import("./pages/auth/lock-screen"));
const LockScreen2 = lazy(() => import("./pages/auth/lock-screen2"));
const LockScreen3 = lazy(() => import("./pages/auth/lock-screen3"));
const Error = lazy(() => import("./pages/404"));

import Layout from "./layout/Layout";

// components pages
const Button = lazy(() => import("./pages/components/button"));
const Dropdown = lazy(() => import("./pages/components/dropdown"));
const Badges = lazy(() => import("./pages/components/badges"));
const Colors = lazy(() => import("./pages/components/colors"));
const Typography = lazy(() => import("./pages/components/typography"));
const Alert = lazy(() => import("./pages/components/alert"));
const Progressbar = lazy(() => import("./pages/components/progress-bar"));
const Card = lazy(() => import("./pages/components/card"));
const Image = lazy(() => import("./pages/components/image"));
const Placeholder = lazy(() => import("./pages/components/placeholder"));
const Tooltip = lazy(() => import("./pages/components/tooltip-popover"));
const Modal = lazy(() => import("./pages/components/modal"));
const Carousel = lazy(() => import("./pages/components/carousel"));
const Pagination = lazy(() => import("./pages/components/pagination"));
const TabsAc = lazy(() => import("./pages/components/tab-accordion"));
const Video = lazy(() => import("./pages/components/video"));

// forms components
const InputPage = lazy(() => import("./pages/forms/input"));
const TextareaPage = lazy(() => import("./pages/forms/textarea"));
const CheckboxPage = lazy(() => import("./pages/forms/checkbox"));
const RadioPage = lazy(() => import("./pages/forms/radio-button"));
const SwitchPage = lazy(() => import("./pages/forms/switch"));
const InputGroupPage = lazy(() => import("./pages/forms/input-group"));
const InputlayoutPage = lazy(() => import("./pages/forms/input-layout"));
const InputMask = lazy(() => import("./pages/forms/input-mask"));
const FormValidation = lazy(() => import("./pages/forms/form-validation"));
const FileInput = lazy(() => import("./pages/forms/file-input"));
const FormRepeater = lazy(() => import("./pages/forms/form-repeater"));
const FormWizard = lazy(() => import("./pages/forms/form-wizard"));
const SelectPage = lazy(() => import("./pages/forms/select"));
const Flatpicker = lazy(() => import("./pages/forms/date-time-picker"));

// chart page
const AppexChartPage = lazy(() => import("./pages/chart/appex-chart"));
const ChartJs = lazy(() => import("./pages/chart/chartjs"));
const Recharts = lazy(() => import("./pages/chart/recharts"));

// map page
const MapPage = lazy(() => import("./pages/map"));

// table pages
const BasicTablePage = lazy(() => import("./pages/table/table-basic"));
const TanstackTable = lazy(() => import("./pages/table/react-table"));

// utility pages
const InvoicePage = lazy(() => import("./pages/utility/invoice"));
const InvoiceAddPage = lazy(() => import("./pages/utility/invoice-add"));
const InvoicePreviewPage = lazy(() =>
  import("./pages/utility/invoice-preview")
);
const InvoiceEditPage = lazy(() => import("./pages/utility/invoice-edit"));
const PricingPage = lazy(() => import("./pages/utility/pricing"));
const BlankPage = lazy(() => import("./pages/utility/blank-page"));
const ComingSoonPage = lazy(() => import("./pages/utility/coming-soon"));
const UnderConstructionPage = lazy(() =>
  import("./pages/utility/under-construction")
);
const BlogPage = lazy(() => import("./pages/utility/blog"));
const BlogDetailsPage = lazy(() => import("./pages/utility/blog/blog-details"));
const FaqPage = lazy(() => import("./pages/utility/faq"));
const Settings = lazy(() => import("./pages/utility/settings"));
const Profile = lazy(() => import("./pages/utility/profile"));
const IconPage = lazy(() => import("./pages/icons"));
const NotificationPage = lazy(() => import("./pages/utility/notifications"));
const ChangelogPage = lazy(() => import("./pages/changelog"));

// widget pages
const BasicWidget = lazy(() => import("./pages/widget/basic-widget"));
const StatisticWidget = lazy(() => import("./pages/widget/statistic-widget"));

// app page
const TodoPage = lazy(() => import("./pages/app/todo"));
const EmailPage = lazy(() => import("./pages/app/email"));
const ChatPage = lazy(() => import("./pages/app/chat"));
const ProjectPostPage = lazy(() => import("./pages/app/projects"));
const ProjectDetailsPage = lazy(() =>
  import("./pages/app/projects/project-details")
);
const KanbanPage = lazy(() => import("./pages/app/kanban"));
const CalenderPage = lazy(() => import("./pages/app/calender"));
import Loading from "@/components/Loading";
import AddAgriInputProduct from "./pages/forms/add-agri-input-product";
import AddCompanyPartner from "./pages/forms/add-company-partner";
import CreateChannel from "./pages/forms/create-channe";
import AllProducts from "./pages/table/react-tables/all-products";
import PartnerDetails from "./pages/table/react-tables/partner-details";
import KPIS from "./pages/table/react-tables/kpis";
import Channels from "./pages/table/react-tables/channels";
import AddFarmer from "./pages/forms/add-farmer";
import InputOrder from "./pages/forms/input-order";
import DistributorsLists from "./pages/table/react-tables/distributors-lists";
import Managers from "./pages/table/react-tables/managers";
import Companies from "./pages/table/react-tables/companies";
import InputCategory from "./pages/forms/input-category";
import MyOrders from "./pages/table/react-tables/my-orders";
import AllPayments from "./pages/table/react-tables/all-payments";
import AllTransactions from "./pages/table/react-tables/all-transactions";
import CashInRequests from "./pages/table/react-tables/cash-in-requests";
import SetKpi from "./pages/forms/set-kpi";
import UpdateDistributorInfo from "./pages/forms/update-distributor-info";
import Distributors from "./pages/table/react-tables/distributors";
import DistributorDetails from "./pages/table/react-tables/distributor-details";
import OrdersFromDistributor from "./pages/table/react-tables/orders-from-drstributor";
import OrdersFromFarmers from "./pages/table/react-tables/orders-from-farmers";
import AddDistributor from "./pages/forms/add-distributor";
import AddCompany from "./pages/forms/add-company";
import UpdateMicroEntrepreneurInfo from "./pages/forms/update-micro-entrepreneur-info";
import AddMicroEntrepreneur from "./pages/forms/add-micro-entrepreneur";
import AddChannels from "./pages/forms/add-channels";
import AddCategory from "./pages/forms/add-category";
import AllCategories from "./pages/table/react-tables/all-categories";

import AssignMicroEntrepreneurs from "./pages/table/react-tables/assign-micro-entreprenures";
import ChannelDetails from "./pages/table/react-tables/channel-details";
import CompanyProducts from "./pages/table/react-tables/company-products";
import CompanyDetails from "./pages/table/react-tables/company-details";
import ProductDetails from "./pages/table/react-tables/product-details";
import ProductDetailsPage from "./pages/table/react-tables/product-details";
import AddProduct from "./pages/forms/add-product";
import SingleOrder from "./components/order/order-details";
import Demo from "./pages/table/react-tables/_demo_";
import CashOutRequests from "./pages/table/react-tables/cash-out-requests";
import AddManager from "./pages/forms/add-manager";
import AssignChannel from "./pages/table/react-tables/assign-channel";
// import AllFarms from "./pages/table/react-tables/all-farms";
import AllFarmers from "./pages/table/farmers/all-farmers";
import FarmerGroups from "./pages/table/farmers/farmer-groups";
import GroupDetails from "./pages/table/farmers/farmer-group-details";
import FarmerDetails from "./pages/table/farmers/farmer-details";
import AllFarms from "./pages/table/farmers/all-farms";
import TestShare from "../__test__/__test__";
import AllOrders from "./pages/table/orders/all-orders";
import OrderDetails from "./pages/table/orders/order-details";
import AllMicroEntrepreneurs from "./pages/table/micro-entrepreneurs/all-micro-entrepreneurs";
import MEDetails from "./pages/table/micro-entrepreneurs/me-details";
import MeDetails from "./pages/table/micro-entrepreneurs/me-details";

function App() {
  return (
    <main className="App  relative">
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/login2"
          element={
            <Suspense fallback={<Loading />}>
              <Login2 />
            </Suspense>
          }
        />
        <Route
          path="/login3"
          element={
            <Suspense fallback={<Loading />}>
              <Login3 />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={<Loading />}>
              <Register />
            </Suspense>
          }
        />
        <Route
          path="/register2"
          element={
            <Suspense fallback={<Loading />}>
              <Register2 />
            </Suspense>
          }
        />
        <Route
          path="/register3"
          element={
            <Suspense fallback={<Loading />}>
              <Register3 />
            </Suspense>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <Suspense fallback={<Loading />}>
              <ForgotPass />
            </Suspense>
          }
        />
        <Route
          path="/forgot-password2"
          element={
            <Suspense fallback={<Loading />}>
              <ForgotPass2 />
            </Suspense>
          }
        />
        <Route
          path="/forgot-password3"
          element={
            <Suspense fallback={<Loading />}>
              <ForgotPass3 />
            </Suspense>
          }
        />
        <Route
          path="/lock-screen"
          element={
            <Suspense fallback={<Loading />}>
              <LockScreen />
            </Suspense>
          }
        />
        <Route
          path="/lock-screen2"
          element={
            <Suspense fallback={<Loading />}>
              <LockScreen2 />
            </Suspense>
          }
        />
        <Route
          path="/lock-screen3"
          element={
            <Suspense fallback={<Loading />}>
              <LockScreen3 />
            </Suspense>
          }
        />
        <Route path="/*" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="ecommerce" element={<Ecommerce />} />
          <Route path="crm" element={<CrmPage />} />
          <Route path="project" element={<ProjectPage />} />
          <Route path="banking" element={<BankingPage />} />
          <Route path="test-share" element={<TestShare />} />
          {/* App pages */}
          <Route path="todo" element={<TodoPage />} />
          <Route path="email" element={<EmailPage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="projects" element={<ProjectPostPage />} />
          <Route path={"projects/:id"} element={<ProjectDetailsPage />} />
          <Route path="project-details" element={<ProjectDetailsPage />} />
          <Route path="kanban" element={<KanbanPage />} />
          <Route path="calender" element={<CalenderPage />} />
          {/* Components pages */}
          <Route path="button" element={<Button />} />
          <Route path="dropdown" element={<Dropdown />} />
          <Route path="badges" element={<Badges />} />
          <Route path="colors" element={<Colors />} />
          <Route path="typography" element={<Typography />} />
          <Route path="alert" element={<Alert />} />
          <Route path="progress-bar" element={<Progressbar />} />
          <Route path="card" element={<Card />} />
          <Route path="image" element={<Image />} />
          <Route path="Placeholder" element={<Placeholder />} />
          <Route path="tooltip-popover" element={<Tooltip />} />
          <Route path="modal" element={<Modal />} />
          <Route path="carousel" element={<Carousel />} />
          <Route path="Paginations" element={<Pagination />} />
          <Route path="tab-accordion" element={<TabsAc />} />
          <Route path="video" element={<Video />} />
          <Route path="input" element={<InputPage />} />
          <Route path="add-agri-input" element={<AddAgriInputProduct />} />
          <Route path="add-company-partner" element={<AddCompanyPartner />} />
          <Route path="add-farmer" element={<AddFarmer />} />
          <Route
            path="update-micro-entrepreneur-info/:id"
            element={<UpdateMicroEntrepreneurInfo />}
          />
          <Route
            path="update-distributors-info/:id"
            element={<UpdateDistributorInfo />}
          />
          <Route path="distributors" element={<Distributors />} />
          <Route path="add-distributors" element={<AddDistributor />} />

          <Route
            path="add-micro-entrepreneurs"
            element={<AddMicroEntrepreneur />}
          />
          <Route path="add-channels" element={<AddChannels />} />
          <Route path="add-category" element={<AddCategory />} />
          <Route path="add-companies" element={<AddCompany />} />
          <Route path="add-manager" element={<AddManager />} />
          <Route path="set-kpi" element={<SetKpi />} />
          <Route path="input-order" element={<InputOrder />} />
          <Route path="input-category" element={<InputCategory />} />
          <Route path="create-channel" element={<CreateChannel />} />
          <Route path="textarea" element={<TextareaPage />} />
          <Route path="checkbox" element={<CheckboxPage />} />
          <Route path="radio-button" element={<RadioPage />} />
          <Route path="switch" element={<SwitchPage />} />
          <Route path="input-group" element={<InputGroupPage />} />
          <Route path="input-layout" element={<InputlayoutPage />} />
          <Route path="input-mask" element={<InputMask />} />
          <Route path="form-validation" element={<FormValidation />} />
          <Route path="file-input" element={<FileInput />} />
          <Route path="form-repeater" element={<FormRepeater />} />
          <Route path="form-wizard" element={<FormWizard />} />
          <Route path="select" element={<SelectPage />} />
          <Route path="date-time-picker" element={<Flatpicker />} />
          <Route path="appex-chart" element={<AppexChartPage />} />
          <Route path="chartjs" element={<ChartJs />} />
          <Route path="recharts" element={<Recharts />} />
          <Route path="map" element={<MapPage />} />
          <Route path="channels" element={<Channels />} />
          <Route path="all-farmers" element={<AllFarmers />} />
          <Route path="all-farms" element={<AllFarms />} />
          <Route path="farmer-groups" element={<FarmerGroups />} />
          <Route path="farmer-groups-details/:id" element={<GroupDetails />} />
          <Route path="distributors-lists" element={<DistributorsLists />} />
          <Route
            path="micro-entrepreneurs"
            element={<AllMicroEntrepreneurs />}
          />
          <Route path="managers" element={<Managers />} />
          <Route path="companies" element={<Companies />} />
          <Route path="all-products" element={<AllProducts />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="partner-details" element={<PartnerDetails />} />
          <Route path="kpi" element={<KPIS />} />
          <Route path="my-orders" element={<MyOrders />} />
          <Route path="all-orders" element={<AllOrders />} />
          <Route path="order/:id" element={<SingleOrder />} />
          <Route path="all-payments" element={<AllPayments />} />
          <Route path="all-transactions" element={<AllTransactions />} />
          <Route path="cash-in-requests" element={<CashInRequests />} />
          <Route path="cash-out-requests" element={<CashOutRequests />} />
          <Route
            path="orders-from-distributors"
            element={<OrdersFromDistributor />}
          />
          <Route path="orders-from-farmers" element={<OrdersFromFarmers />} />
          <Route path="all-categories" element={<AllCategories />} />
          <Route path="table-basic" element={<BasicTablePage />} />
          <Route path="react-table" element={<TanstackTable />} />
          <Route path="invoice" element={<InvoicePage />} />
          <Route path="invoice-add" element={<InvoiceAddPage />} />
          <Route path="invoice-preview" element={<InvoicePreviewPage />} />
          <Route path="invoice-edit" element={<InvoiceEditPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="blank-page" element={<BlankPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog-details" element={<BlogDetailsPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="basic" element={<BasicWidget />} />
          <Route path="statistic" element={<StatisticWidget />} />
          <Route path="icons" element={<IconPage />} />
          <Route path="notifications" element={<NotificationPage />} />
          <Route path="changelog" element={<ChangelogPage />} />
          <Route path="channel-details/:id" element={<ChannelDetails />} />
          <Route path="company-details/:id" element={<CompanyDetails />} />
          <Route
            path="farmer-details/:id"
            element={
              <Suspense fallback={<Loading />}>
                <FarmerDetails />
              </Suspense>
            }
          />
          <Route
            path="order_details/:id"
            element={
              <Suspense fallback={<Loading />}>
                <OrderDetails />
              </Suspense>
            }
          />
          <Route
            path="distributor/:id"
            element={
              <Suspense fallback={<Loading />}>
                <DistributorDetails />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/404" />} />
          <Route
            path="assign-micro-entreprenures/:id"
            element={
              <Suspense fallback={<Loading />}>
                <AssignMicroEntrepreneurs />
              </Suspense>
            }
          />
          <Route
            path="assign-channel/:id"
            element={
              <Suspense fallback={<Loading />}>
                <AssignChannel />
              </Suspense>
            }
          />
          <Route
            path="me-details/:id"
            element={
              <Suspense fallback={<Loading />}>
                <MeDetails />
              </Suspense>
            }
          />
          <Route
            path="product/:id"
            element={
              <Suspense fallback={<Loading />}>
                <ProductDetailsPage />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="/404"
          element={
            <Suspense fallback={<Loading />}>
              <Error />
            </Suspense>
          }
        />
        <Route path="demo" element={<Demo />} />
        <Route
          path="/coming-soon"
          element={
            <Suspense fallback={<Loading />}>
              <ComingSoonPage />
            </Suspense>
          }
        />
        <Route
          path="/under-construction"
          element={
            <Suspense fallback={<Loading />}>
              <UnderConstructionPage />
            </Suspense>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
