import * as Yup from "yup";

export const registerFormSchema = Yup.object({
	email: Yup.string().email().required("Email is mandatory"),
	firstName: Yup.string().required("First Name should be mandatory"),
	lastName: Yup.string().required("Last Name should be mandatory"),
	address1: Yup.string().required("Address Line 1 is mandatory"),
	address2: Yup.string().notRequired(),
	location: Yup.string().required("State is mandatory"),
	country: Yup.string().required("Country is mandatory"),
	password: Yup.string()
		.required("Password is mandatory")
		.min(6, "Password must be at 6 characters long"),
	confirmPassword: Yup.string()
		.required("Password is mandatory")
		.oneOf([Yup.ref("password")], "Passwords does not match"),
	role: Yup.string().notRequired(),
});