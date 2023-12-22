import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken, selectRefreshToken, selectUser } from "../../redux/selectors";
import { useRef, useState } from "react";
import { validateEmail, validatePhone } from "../../utils/helpers";
import { axiosJWT, endpoints } from "../../utils/httpRequest";
import { getUser } from "../../services/userServices";
import { toast } from "react-toastify";

const initErrorState = {
	lastName: "",
	firstName: "",
	email: "",
	phone: "",
};

export default function ProfilePage() {
	const [newAvatar, setNewAvatar] = useState(null);
	const [errors, setErrors] = useState(initErrorState);

	const currentUser = useSelector(selectUser);
	const accessToken = useSelector(selectAccessToken);
	const refreshToken = useSelector(selectRefreshToken);
	const dispatch = useDispatch();

	const inputFileRef = useRef();
	const firstNameRef = useRef();
	const lastNameRef = useRef();
	const emailRef = useRef();
	const phoneRef = useRef();

	const [phoneInput, setPhoneInput] = useState(currentUser.phone || "");

	const handleChooseFile = (e) => {
		e.preventDefault();
		inputFileRef.current.value = "";
		inputFileRef.current.click();
	};
	const handleFileChange = (e) => {
		const file = e.target.files[0];
		file.preview = URL.createObjectURL(file);
		setNewAvatar(file);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const lastName = lastNameRef.current.value;
		const firstName = firstNameRef.current.value;
		const email = emailRef.current.value;
		const phone = phoneRef.current.value;
		const errors = {};
		if (lastName === "") {
			errors.lastName = "Required!";
		}
		if (firstName === "") {
			errors.firstName = "Required!";
		}
		validateEmail(errors, email);
		validatePhone(errors, phone);
		if (Object.keys(errors).length) {
			setErrors(errors);
		} else {
			setErrors({
				...initErrorState,
			});
			await updateInforRequest();
		}
	};

	const updateInforRequest = async () => {
		const formData = new FormData();
		formData.append("last_name", lastNameRef.current.value);
		formData.append("first_name", firstNameRef.current.value);
		formData.append("email", emailRef.current.value);
		formData.append("phone", phoneRef.current.value);
		if (newAvatar) {
			formData.append("user_image", newAvatar);
		}
		const axiosInstance = axiosJWT(accessToken, refreshToken, dispatch);
		const toastId = toast.loading("Processing!");
		try {
			const res = await axiosInstance.put(endpoints.editProfile, formData, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "multipart/form-data",
				},
			});
			if (res.data.success) {
				toast.update(toastId, {
					render: res.data.message,
					type: "success",
					closeButton: true,
					autoClose: 1000,
					isLoading: false,
				});
				await getUser(accessToken, refreshToken, dispatch);
			}
		} catch (error) {
			console.log(error);
			toast.update(toastId, {
				render: "Can not updated!",
				type: "error",
				closeButton: true,
				autoClose: 1000,
				isLoading: false,
			});
		}
	};
	const handlePhoneChange = (e) => {
		const value = e.target.value;
		if (/^[0-9]*$/.test(value) || value === "") {
			if (value.length <= 11) {
				setPhoneInput(value);
			}
		}
	};
	return (
		<div className="bg-white border rounded mx-lg-5 py-md-3 ml-lg-5">
			<div className="d-flex flex-column mx-lg-5 px-2">
				<form onSubmit={handleSubmit}>
					<div className="row">
						<div className="col-7">
							<div className="d-flex flex-column">
								<div className="mb-3 row">
									<label htmlFor="" className="col-sm-4 col-form-label">
										Last name
									</label>
									<div className="col-sm-8">
										<input
											ref={lastNameRef}
											type="text"
											defaultValue={currentUser.last_name}
											className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
										/>
										<div className="invalid-feedback">{errors.lastName}</div>
									</div>
								</div>
								<div className="mb-3 row">
									<label htmlFor="" className="col-sm-4 col-form-label">
										First name
									</label>
									<div className="col-sm-8">
										<input
											ref={firstNameRef}
											type="text"
											maxLength={5}
											defaultValue={currentUser.first_name}
											className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
										/>
										<div className="invalid-feedback">{errors.firstName}</div>
									</div>
								</div>
								<div className="mb-3 row">
									<label htmlFor="" className="col-sm-4 col-form-label">
										Email
									</label>
									<div className="col-sm-8">
										<input
											ref={emailRef}
											type="email"
											defaultValue={currentUser.email}
											className={`form-control ${errors.email ? "is-invalid" : ""}`}
										/>
										<div className="invalid-feedback">{errors.email}</div>
									</div>
								</div>
								<div className="mb-3 row">
									<label htmlFor="" className="col-sm-4 col-form-label">
										Phone number
									</label>
									<div className="col-sm-8">
										<input
											ref={phoneRef}
											minLength={10}
											maxLength={11}
											type="text"
											onChange={handlePhoneChange}
											value={phoneInput}
											className={`form-control ${errors.phone ? "is-invalid" : ""}`}
										/>
										<div className="invalid-feedback">{errors.phone}</div>
									</div>
								</div>
								<div className="mb-3 row">
									<label className="col-sm-4 col-form-label"></label>
									<div className="col-sm-8">
										<button type="submit" className="btn btn-outline-primary w-100">
											Save
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className="col-5">
							<div className="d-flex flex-column align-items-center">
								<aside className="d-flex">
									<div className="border border-2 rounded-circle p-1 overflow-hidden">
										{newAvatar ? (
											<img
												className="rounded-circle"
												src={newAvatar.preview}
												// src={"/img/default-user.png"}
												alt=""
												style={{ width: 100, height: 100, objectFit: "cover" }}
												onError={(e) => {
													e.target.src = "/img/default-user.png";
												}}
											/>
										) : (
											<img
												className="rounded-circle"
												src={currentUser.image ? currentUser.image : "/img/default-user.png"}
												// src={"/img/default-user.png"}
												alt=""
												style={{ width: 100, height: 100, objectFit: "cover" }}
												onError={(e) => {
													e.target.src = "/img/default-user.png";
												}}
											/>
										)}
									</div>
								</aside>
								<div className="d-flex flex-column justify-content-center align-items-center">
									<span className="fw-bold">
										{currentUser.last_name + " " + currentUser.first_name}
									</span>
									<div>
										<a href="#" onClick={handleChooseFile} className="cursor-pointer text-primary">
											Select image
										</a>
									</div>
									<input
										ref={inputFileRef}
										onChange={handleFileChange}
										className="d-none form-control"
										type="file"
										placeholder="input"
										accept="image/*"
									/>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
