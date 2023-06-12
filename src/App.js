import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate
} from 'react-router-dom'
import './App.css'

import Layout from './components/Layout/Layout'
import UserPage from './pages/User/UserPage'
import ChooseMasterForm from './pages/User/ChooseMasterForm/ChooseMasterForm'
import Orders from './pages/Admin/Orders/Orders'
import Cities from './pages/Admin/Cities/Cities'
import Masters from './pages/Admin/Masters/Masters'
import AddMaster from './pages/Admin/Masters/AddMaster/AddMaster'
import EditMaster from './pages/Admin/Masters/EditMaster/EditMaster'
import SuccessOrder from './pages/User/SuccessOrder/SuccessOrder'
import Customers from './pages/Admin/Customers/Customers'
import EditOrder from './pages/Admin/Orders/EditOrder/EditOrder'
import LoginPage from './pages/Login/LoginPage'
import RequireAuth from './hoc/RequireAuth'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ClockLoader } from 'react-spinners'
import EditCity from './pages/Admin/Cities/EditCity/EditCity'
import ConfirmOrder from './pages/User/ConfirmOrder/ConfirmOrder'
import SignUpPage from './pages/SignUp/SignUpPage'
import SuccessSignUp from './pages/SignUp/SuccessSignUp/SuccessSignUpPage'
import AddCustomer from './pages/Admin/Customers/AddCustomer/AddCustomer'
import MasterPage from './pages/Master/MasterPage'
import CustomerPage from './pages/Customer/CustomerPage'
import UserRegistration from './pages/User/UserRegistration/UserRegistration'
import UserAuthorization from './pages/User/UserAuthorization/UserAuthorization'
import EmailConfirmedPage from './pages/User/ConfirmedEmailPage/EmailConfirmedPage'
import ConfirmEmailPage from './pages/Login/ConfirmEmail/ConfirmEmailPage'
import AwaitApprovePage from './pages/Master/AvaitApprove/AvaitApprovePage'
import ChangeNamePage from './pages/User/ChangeName/ChangeNamePage'
import { ToastProvider } from 'react-toast-notifications'
import SuccessEmailConfirmPage from './pages/User/SuccessEmailConfirm/SuccessEmailConfirmPage'
import AddCity from './pages/Admin/Cities/AddCity/AddCity'
import { checkAuthThunk } from './store/auth/thunk'
import { joyTheme, theme } from './muiTheme'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { setClientTimeZone } from './store/timezone/slice'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import PaymentCanceled from './pages/User/PaymentCanceled/PaymentCanceled'
import PaymentCompleted from './pages/User/PaymentCompleted/PaymentCompleted'
import Feedback from './pages/User/Feedback/Feedback'

import {
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID
} from '@mui/material/styles'
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles'

const App = () => {
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.preloader)
  useEffect(() => {
    dispatch(checkAuthThunk())
    dispatch(setClientTimeZone())
  }, [])

  const initialOptions = {
    'client-id': 'ATFjN893Syw_OxXmoY5FmtEwR74JLI5rtB0p71YBe95yKl-zHCTctmjcbkGrglI5Dx59e1ejLPGzwfPs',
    currency: 'USD',
    intent: 'capture',
    locale: 'en_US',
    components: 'buttons'
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route index element={<UserPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/registration' element={<SignUpPage />} />

        <Route path='/user/changeName' element={<ChangeNamePage />} />

        <Route path='/user/feedback/:feedbackToken' element={<Feedback />} />
        <Route path='/user/paymentCompleted' element={<PaymentCompleted />} />
        <Route path='/user/paymentCanceled' element={<PaymentCanceled />} />
        <Route path='/user/confirmEmail' element={<ConfirmEmailPage />} />
        <Route path='/user/successEmailConfirm' element={<SuccessEmailConfirmPage />} />
        <Route path='/user/emailConfirmed' element={<EmailConfirmedPage />} />
        <Route path='/user/chooseMaster' element={<ChooseMasterForm />} />
        <Route path='/user/confirmOrder' element={<ConfirmOrder />} />
        <Route path='/user/successOrder' element={<SuccessOrder />} />
        <Route path='/user/successSignUp' element={<SuccessSignUp />} />
        <Route path='/user/registration' element={<UserRegistration />} />
        <Route path='/user/login' element={<UserAuthorization />} />

        <Route path='/master' element={<RequireAuth role={'Master'} page={<MasterPage />} />} />
        <Route path='/master/awaitApprove' element={<AwaitApprovePage />} />
        <Route
          path='/customer'
          element={<RequireAuth role={'Customer'} page={<CustomerPage />} />}
        />

        <Route path='/admin' element={<Navigate to='/admin/orders' replace />} />
        <Route path='/admin/orders' element={<RequireAuth role='Admin' page={<Orders />} />} />
        <Route
          path='/admin/orders/:id'
          element={<RequireAuth role='Admin' page={<EditOrder />} />}
        />
        <Route path='/admin/masters' element={<RequireAuth role='Admin' page={<Masters />} />} />
        <Route
          path='/admin/masters/:id'
          element={<RequireAuth role='Admin' page={<EditMaster />} />}
        />
        <Route
          path='/admin/masters/registration'
          element={<RequireAuth role='Admin' page={<AddMaster />} />}
        />
        <Route path='/admin/cities' element={<RequireAuth role='Admin' page={<Cities />} />} />
        <Route path='/admin/cities/add' element={<RequireAuth role='Admin' page={<AddCity />} />} />
        <Route
          path='/admin/cities/:id'
          element={<RequireAuth role='Admin' page={<EditCity />} />}
        />
        <Route
          path='/admin/customers'
          element={<RequireAuth role='Admin' page={<Customers />} />}
        />
        <Route
          path='/admin/customers/registration'
          element={<RequireAuth role='Admin' page={<AddCustomer />} />}
        />

        <Route path='*' element={<Navigate to='/' replace />} />
      </Route>
    )
  )

  if (isLoading) {
    return (
      <div className='App'>
        <ClockLoader color='lightsalmon' size='150px' />
      </div>
    )
  }

  return (
    <div className='App'>
      <ToastProvider
        autoDismiss={true}
        autoDismissTimeout={2000}
        newestOnTop={true}
        placement={'bottom-right'}
        transitionDuration={200}
      >
        <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: theme }}>
          <JoyCssVarsProvider theme={joyTheme}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <PayPalScriptProvider options={initialOptions}>
                <RouterProvider router={router} />
              </PayPalScriptProvider>
            </LocalizationProvider>
          </JoyCssVarsProvider>
        </MaterialCssVarsProvider>
      </ToastProvider>
    </div>
  )
}

export default App
