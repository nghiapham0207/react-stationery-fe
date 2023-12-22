import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
//
import { routes } from "../../routes";
import { validateEmail, validatePassword, validateUsername } from "../../utils/helpers";
import { toast } from "react-toastify";
import { axiosPost, endpoints } from "../../utils/httpRequest";
import { getGoogleAuthUrl } from "../../services/oauthService";

const googleOAuthUrl = getGoogleAuthUrl();

const initState = {
	firstName: "",
	lastName: "",
	email: "",
	username: "",
	password: "",
	confirmPassword: "",
};

export default function SignUpPage() {
	const firstNameRef = useRef();
	const lastNameRef = useRef();
	const emailRef = useRef();
	const usernameRef = useRef();
	const passwordRef = useRef();
	const confirmPasswordRef = useRef();

	const [errors, setErrors] = useState(initState);
	const [showPw, setShowPw] = useState(false);

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		const firstName = firstNameRef.current.value;
		const lastName = lastNameRef.current.value;
		const email = emailRef.current.value;
		const username = usernameRef.current.value;
		const password = passwordRef.current.value;
		const confirmPassword = confirmPasswordRef.current.value;
		const errors = {};
		if (firstName === "") {
			errors.firstName = "firstname is required!";
		}
		if (lastName === "") {
			errors.lastName = "lastname is required!";
		}
		validateEmail(errors, email);
		validateUsername(errors, username);
		validatePassword(errors, password);
		if (confirmPassword === "") {
			errors.confirmPassword = "confirm password is required!";
		} else if (password !== confirmPassword) {
			errors.confirmPassword = "confirm password is not matched!";
		}
		if (Object.keys(errors).length) {
			setErrors(errors);
		} else {
			setErrors({
				...initState,
			});
			const signUpRequest = async () => {
				const toastId = toast.loading("processing!");
				try {
					const res = await axiosPost(endpoints.signUp, {
						first_name: firstName,
						last_name: lastName,
						username,
						email,
						password,
						permission: "1",
					});
					console.log(res);
					if (res.success) {
						toast.update(toastId, {
							render: "Sign up successfully!",
							type: "success",
							closeButton: true,
							autoClose: 1000,
							isLoading: false,
						});
						navigate(routes.signIn);
					}
				} catch (error) {
					console.log(error);
					toast.update(toastId, {
						render: error.response?.data.message || "can not sign up!",
						type: "error",
						closeButton: true,
						autoClose: 1000,
						isLoading: false,
					});
				}
			};
			signUpRequest();
		}
	};

	const handleChange = (name) => {
		setErrors({
			...errors,
			[name]: "",
		});
	};
	return (
		<>
			<div className="container-xxl bg-white d-flex p-0">
				<div className="container-fluid">
					<div className="row h-100 min-vh-100 align-items-center justify-content-center">
						<div className="col-12 col-sm-8 col-md-6 col-lg-5">
							<form
								onSubmit={handleSubmit}
								className="bg-light bg-gradient rounded p-3 p-sm-4 my-4 mx-3">
								<div className="d-flex align-items-center justify-content-center mb-3">
									<h4>Sign Up</h4>
								</div>
								<div className="row">
									<div className="col-12 col-lg-6">
										<div className="mb-2">
											<label htmlFor="first-name" className="form-label">
												First name
											</label>
											<input
												ref={firstNameRef}
												onChange={() => {
													handleChange("firstName");
												}}
												className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
												id="first-name"
											/>
											<div className="invalid-feedback">{errors.firstName}</div>
										</div>
									</div>
									<div className="col-12 col-lg-6">
										<div className="mb-2">
											<label htmlFor="last-name" className="form-label">
												Last name
											</label>
											<input
												ref={lastNameRef}
												onChange={() => {
													handleChange("lastName");
												}}
												className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
												id="last-name"
											/>
											<div className="invalid-feedback">{errors.lastName}</div>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-12 col-lg-6">
										<div className="mb-3">
											<label htmlFor="Email" className="form-label">
												Email
											</label>
											<input
												ref={emailRef}
												onChange={() => {
													handleChange("email");
												}}
												className={`form-control ${errors.email ? "is-invalid" : ""}`}
												id="Email"
												type="email"
											/>
											<div className="invalid-feedback">{errors.email}</div>
										</div>
									</div>
									<div className="col-12 col-lg-6">
										<div className="mb-3">
											<label htmlFor="Username" className="form-label">
												Username
											</label>
											<input
												ref={usernameRef}
												onChange={() => {
													handleChange("username");
												}}
												className={`form-control ${errors.username ? "is-invalid" : ""}`}
												id="Username"
												type="text"
											/>
											<div className="invalid-feedback">{errors.username}</div>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-12 col-lg-6">
										<div className="mb-4">
											<label htmlFor="Password" className="form-label">
												Password
											</label>
											<input
												ref={passwordRef}
												onChange={() => {
													handleChange("password");
												}}
												type={`${showPw ? "text" : "password"}`}
												className={`form-control ${errors.password ? "is-invalid" : ""}`}
												id="Password"
											/>
											<div className="invalid-feedback">{errors.password}</div>
										</div>
									</div>
									<div className="col-12 col-lg-6">
										<div className="mb-4">
											<label htmlFor="confirm-password" className="form-label">
												Confirm password
											</label>
											<input
												ref={confirmPasswordRef}
												onChange={() => {
													handleChange("confirmPassword");
												}}
												type={showPw ? "text" : "password"}
												className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
												id="confirm-password"
											/>
											<div className="invalid-feedback">{errors.confirmPassword}</div>
										</div>
									</div>
								</div>
								<div className="d-flex flex-column flex-md-row align-items-center justify-content-between mb-4">
									<div className="form-check">
										<input
											type="checkbox"
											id="check-password"
											className="form-check-input"
											onChange={(e) => {
												if (e.target.checked) {
													setShowPw(true);
												} else {
													setShowPw(false);
												}
											}}
										/>
										<label htmlFor="check-password" className="form-check-label">
											Check me out!
										</label>
									</div>
									<Link to={routes.forgotPassword}>Forgot password?</Link>
								</div>
								<button type="submit" className="btn btn-primary w-100 mb-4">
									Sign Up
								</button>
								<Link to={googleOAuthUrl} className="btn btn-outline-primary w-100 mb-4">
									Login with Google
								</Link>
								<p className="text-center mb-0">
									Already have an Account? <Link to={routes.signIn}>Sign In</Link>
								</p>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
