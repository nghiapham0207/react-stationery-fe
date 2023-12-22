import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
//
import { axiosJWT, endpoints } from "../../utils/httpRequest";
import { selectAccessToken, selectRefreshToken } from "../../redux/selectors";
import { toast } from "react-toastify";

export default function NewBrand({ onInserted = () => {}, isUpdate = false, brandData = {} }) {
	const accessToken = useSelector(selectAccessToken);
	const refreshToken = useSelector(selectRefreshToken);
	const dispatch = useDispatch();

	const nameRef = useRef();
	const descriptionRef = useRef();

	const setFormData = (formData) => {
		formData.name = nameRef.current.value;
		formData.description = descriptionRef.current.value;
	};

	const handlePost = async (e) => {
		e.preventDefault();
		const jwt = axiosJWT(accessToken, refreshToken, dispatch);
		const toastId = toast.loading("processing!");

		const formData = {};
		setFormData(formData);
		try {
			const res = await jwt.post(endpoints.createBrand, formData, {
				headers: { Authorization: "Bearer " + accessToken },
			});
			if (res.data.success) {
				onInserted();
				e.target.reset();
				toast.update(toastId, {
					render: res.data.message,
					type: "success",
					closeButton: true,
					autoClose: 1000,
					isLoading: false,
				});
			}
		} catch (error) {
			console.log(error);
			toast.update(toastId, {
				render: error.response?.data.message || "can not insert!",
				type: "error",
				closeButton: true,
				autoClose: 1000,
				isLoading: false,
			});
		}
	};
	const handleUpdate = async (e) => {
		e.preventDefault();
		const jwt = axiosJWT(accessToken, refreshToken, dispatch);
		const toastId = toast.loading("processing!");

		const formData = {};
		setFormData(formData);
		try {
			const res = await jwt.put(endpoints.brandParam + brandData.brand_id, formData, {
				headers: { Authorization: "Bearer " + accessToken },
			});
			if (res.data.success) {
				onInserted();
				toast.update(toastId, {
					render: res.data.message,
					type: "success",
					closeButton: true,
					autoClose: 1000,
					isLoading: false,
				});
			}
		} catch (error) {
			console.log(error);
			toast.update(toastId, {
				render: error.response?.data.message || "can not update!",
				type: "error",
				closeButton: true,
				autoClose: 1000,
				isLoading: false,
			});
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (isUpdate) {
			handleUpdate(e);
		} else {
			handlePost(e);
		}
	};
	return (
		<>
			<div className="bg-light rounded h-100 px-2">
				<form onSubmit={handleSubmit}>
					<div className="row mb-3">
						<label htmlFor="" className="col-sm-3 col-form-label">
							Name
						</label>
						<div className="col-sm-9">
							<input
								ref={nameRef}
								placeholder=""
								autoComplete="off"
								defaultValue={brandData?.name}
								maxLength={100}
								type="text"
								required
								className="form-control"
							/>
						</div>
					</div>
					<div className="row mb-3">
						<label htmlFor="" className="col-sm-3 col-form-label">
							Description
						</label>
						<div className="col-sm-9">
							<textarea
								ref={descriptionRef}
								maxLength={200}
								rows={3}
								placeholder=""
								defaultValue={brandData?.description}
								type="text"
								required
								className="form-control"
							/>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-sm-3"></div>
						<div className="col-sm-9 d-flex justify-content-end">
							<button type="reset" className="btn btn-outline-danger w-25 me-2">
								Cancel
							</button>
							<button type="submit" className="btn btn-outline-primary w-25">
								Save
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
}
