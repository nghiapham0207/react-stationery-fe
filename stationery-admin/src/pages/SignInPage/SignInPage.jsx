import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
//
import { routes } from "../../routes/routes";
import { toast } from "react-toastify";
import { axiosPost, endpoints } from "../../utils/httpRequest";
import { selectUser } from "../../redux/selectors";
import { getUser } from "../../services/userServices";
import { validateEmail, validatePassword } from "../../utils/helpers";
import { loginSuccess } from "../../redux/authSlice";

const initState = {
	username: "",
	password: "",
};

export default function SignInPage() {
	const usernameRef = useRef();
	const passwordRef = useRef();

	const currentUser = useSelector(selectUser);

	const [showPw, setShowPw] = useState(false);
	const [errors, setErrors] = useState(initState);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const next = searchParams.get("next");

	if (currentUser) {
		return <Navigate to={routes.order} />;
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		const username = usernameRef.current.value;
		const password = passwordRef.current.value;
		const errors = {};
		validateEmail(errors, username);
		validatePassword(errors, password);
		if (Object.keys(errors).length) {
			setErrors(errors);
		} else {
			setErrors({
				...initState,
			});
			const signInRequest = async () => {
				const toastId = toast.loading("Đang xử lý!");
				try {
					const res = await axiosPost(endpoints.signIn, {
						username: username,
						password,
					});
					const userRes = await getUser(res.data.accessToken, res.data.refreshToken, dispatch);
					if (userRes.success) {
						toast.update(toastId, {
							render: "login successfully!",
							type: "success",
							closeButton: true,
							autoClose: 1000,
							isLoading: false,
						});
						dispatch(
							loginSuccess({
								accessToken: res.data.accessToken,
								refreshToken: res.data.refreshToken,
							}),
						);
						if (next) {
							navigate(next, {
								replace: true,
							});
						} else {
							navigate(routes.order);
						}
					} else {
						toast.update(toastId, {
							render: "you are not allowed!",
							type: "error",
							closeButton: true,
							autoClose: 1000,
							isLoading: false,
						});
					}
				} catch (error) {
					console.log(error);
					toast.update(toastId, {
						render: "wrong username or password!",
						type: "error",
						closeButton: true,
						autoClose: 1000,
						isLoading: false,
					});
				}
			};
			signInRequest();
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
						<div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
							<form
								onSubmit={handleSubmit}
								className="bg-light bg-gradient rounded p-3 p-sm-4 my-4 mx-3">
								<div className="d-flex align-items-center justify-content-between mb-3">
									<Link to={routes.home}>
										<h4 className="text-primary text-uppercase">Home</h4>
									</Link>
									<h4>Sign In</h4>
								</div>
								<div className="mb-3">
									<label htmlFor="Username" className="form-label">
										Username
									</label>
									<input
										ref={usernameRef}
										defaultValue="admin"
										onChange={() => {
											handleChange("username");
										}}
										className={`form-control ${errors.username ? "is-invalid" : ""}`}
										id="Username"
										type="text"
									/>
									<div className="invalid-feedback">{errors.username}</div>
								</div>
								<div className="mb-4">
									<label htmlFor="Password" className="form-label">
										Password
									</label>
									<input
										ref={passwordRef}
										defaultValue="123123Nn."
										onChange={() => {
											handleChange("password");
										}}
										type={`${showPw ? "text" : "password"}`}
										className={`form-control ${errors.password ? "is-invalid" : ""}`}
										id="Password"
									/>
									<div className="invalid-feedback">{errors.password}</div>
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
								<button type="submit" className="btn btn-primary w-100 py-3s mb-4">
									Sign In
								</button>
								<p className="text-center mb-0">
									{"Don't have an Account? "}
									<Link to={routes.signUp}>Sign Up</Link>
								</p>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
