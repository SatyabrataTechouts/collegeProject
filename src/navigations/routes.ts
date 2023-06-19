import Address from "../screens/AdressPage";
import Login from "../screens/Login";
import Onbording from "../screens/Onboarding";
import OrderPage from "../screens/OrderPage";

import OtpVerify from "../screens/OtpVerify";
import ProductDescription from "../screens/Pdp";
import Plp from "../screens/Plp";
import SignUp from "../screens/SignUP";
import BottomNavigation from "./BottomNavigation";

export const ROUTES:any={
	ONBOARDING:{
		component:Onbording
	},
	LOGIN:{
		component:Login
	},
	BOTTOMTAB:{
		component:BottomNavigation
	},
	OTPVERIFY:{
		component:OtpVerify
	},
	PLP:{
		component:Plp
	},
	SIGNUP:{
		component:SignUp
	},
	ORDER:{
		component:OrderPage
	},
	ADDRESS:{
		component:Address
	},
	PDP:{
		component:ProductDescription
	}
}