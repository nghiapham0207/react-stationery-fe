import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { routes } from "../../routes";
import { useRef, useState } from "react";
import { validatePassword } from "../../utils/helpers";
import { axiosPatch, endpoints } from "../../utils/httpRequest";
import { toast } from "react-toastify";

const initErrorState = {
	pw: "",
	confirmPw: "",
};

export default function ResetPasswordPage() {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const tokenStr = searchParams.get("token");
	const token = tokenStr;
	const navigate = useNavigate();

	const passwordRef = useRef();
	const confirmPwRef = useRef();

	const [showPw, setShowPw] = useState(false);
	const [showConfirmPw, setShowConfirmPw] = useState(false);

	const [errors, setErrors] = useState(initErrorState);
	const handleSubmit = (e) => {
		e.preventDefault();
		const password = passwordRef.current.value;
		const confirmPw = confirmPwRef.current.value;

		const errors = {};

		validatePassword(errors, password, "pw");
		validatePassword(errors, confirmPw, "confirmPw");
		if (confirmPw !== password) {
			errors.confirmPw = "confirm password not match!";
		}

		if (Object.keys(errors).length) {
			setErrors(errors);
		} else {
			setErrors({
				...initErrorState,
			});
			resetPasswordReq(token, password);
		}
	};
	/**
	 * Send token and new password to server in order to handle
	 * @param {string} token
	 * @param {string} password
	 */
	const resetPasswordReq = async (token, password) => {
		const toastId = toast.loading("processing!");
		try {
			const res = await axiosPatch(endpoints.resetPassword, {
				forgot_password_token: token,
				password: password,
			});
			if (res.success) {
				navigate("/");
				toast.update(toastId, {
					render: res.message,
					type: "success",
					closeButton: true,
					autoClose: 2000,
					isLoading: false,
				});
			}
		} catch (error) {
			console.log(error);
			toast.update(toastId, {
				render: "can not reset password, reset password token is not right!",
				type: "error",
				closeButton: true,
				autoClose: 2000,
				isLoading: false,
			});
		}
	};
	const handleChange = (name) => {
		setErrors({
			...errors,
			[name]: "",
		});
	};
	if (!token) {
		return <Navigate to={routes.home} />;
	}
	return (
		<div className="container-xxl bg-white d-flex p-0 mt-3">
			<div className="container-fluid">
				<div className="row h-100 align-items-center justify-content-center">
					<div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
						<form
							onSubmit={handleSubmit}
							className="bg-light bg-gradient rounded p-3 p-sm-4 my-4 mx-3">
							<div className="d-flex align-items-center justify-content-center mb-3">
								<h4>Reset password</h4>
							</div>
							<div className="mb-3">
								<label htmlFor="Username" className="form-label">
									New password
								</label>
								<div className="position-relative">
									<input
										ref={passwordRef}
										onChange={() => {
											handleChange("pw");
										}}
										className={`form-control ${errors.pw ? "is-invalid" : ""}`}
										id="Username"
										type={`${showPw ? "text" : "password"}`}
									/>
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
									<div className="invalid-feedback">{errors.pw}</div>
								</div>
							</div>
							<div className="mb-4">
								<label htmlFor="Password" className="form-label">
									Confirm password
								</label>
								<div className="position-relative">
									<input
										ref={confirmPwRef}
										onChange={() => {
											handleChange("confirmPw");
										}}
										type={`${showConfirmPw ? "text" : "password"}`}
										className={`form-control ${errors.confirmPw ? "is-invalid" : ""}`}
										id="Password"
									/>
									<div className="form-check">
										<input
											type="checkbox"
											id="check-confirm-password"
											className="form-check-input"
											onChange={(e) => {
												if (e.target.checked) {
													setShowConfirmPw(true);
												} else {
													setShowConfirmPw(false);
												}
											}}
										/>
										<label htmlFor="check-confirm-password" className="form-check-label">
											Check me out!
										</label>
									</div>
									<div className="invalid-feedback">{errors.confirmPw}</div>
								</div>
							</div>
							<button type="submit" className="btn btn-primary w-100">
								Xác nhận
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
