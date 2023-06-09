import Login from "../screens/Login";
import Onbording from "../screens/Onboarding";
import OtpVerify from "../screens/OtpVerify";
import Plp from "../screens/Plp";
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
	}
}