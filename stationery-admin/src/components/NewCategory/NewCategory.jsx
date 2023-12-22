import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
//
import { axiosJWT, endpoints } from "../../utils/httpRequest";
import { selectAccessToken, selectRefreshToken } from "../../redux/selectors";
import { toast } from "react-toastify";
import { getFileNameFromUrl } from "../../utils/helpers";

export default function NewCategory({
	onInserted = () => {},
	isUpdate = false,
	categoryData = {},
}) {
	const accessToken = useSelector(selectAccessToken);
	const refreshToken = useSelector(selectRefreshToken);
	const dispatch = useDispatch();

	const [categoryImage, setCategoryImage] = useState();

	const inputImageRef = useRef();
	const nameRef = useRef();
	const noteRef = useRef();

	const files = categoryImage ? [...categoryImage] : [];

	const handleFileChange = (e) => {
		setCategoryImage(e.target.files);
	};

	const handleClearFiles = () => {
		setCategoryImage([]);
		inputImageRef.current.value = "";
	};

	const setFormData = (formData) => {
		formData.append("name", nameRef.current.value);
		formData.append("note", noteRef.current.value);
		for (let index = 0; index < files.length; index++) {
			const file = files[index];
			formData.append("category_image", file);
		}
	};

	const handlePost = async (e) => {
		e.preventDefault();
		const jwt = axiosJWT(accessToken, refreshToken, dispatch);
		const toastId = toast.loading("processing!");

		const formData = new FormData();
		setFormData(formData);
		try {
			const res = await jwt.post(endpoints.createCategory, formData, {
				headers: { Authorization: "Bearer " + accessToken, "Content-Type": "multipart/form-data" },
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

		const formData = new FormData();
		setFormData(formData);
		try {
			const res = await jwt.put(endpoints.updateCategory + categoryData.category_id, formData, {
				headers: { Authorization: "Bearer " + accessToken, "Content-Type": "multipart/form-data" },
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
								defaultValue={categoryData?.name}
								maxLength={100}
								type="text"
								required
								className="form-control"
							/>
						</div>
					</div>
					<div className="row mb-3">
						<label htmlFor="" className="col-sm-3 col-form-label">
							Note
						</label>
						<div className="col-sm-9">
							<input
								ref={noteRef}
								maxLength={300}
								placeholder=""
								defaultValue={categoryData?.note}
								type="text"
								required
								className="form-control"
							/>
						</div>
					</div>
					<div className="row mb-3">
						<label htmlFor="" className="col-sm-3 col-form-label">
							Image
						</label>
						<div className="col-sm-9">
							<input
								ref={inputImageRef}
								maxLength={512}
								placeholder=""
								type="file"
								onChange={handleFileChange}
								required={isUpdate ? false : true}
								accept="image/*"
								className="form-control"
							/>
						</div>
					</div>
					{isUpdate && categoryData?.image && (
						<div className="row mb-3">
							<div className="col-sm-3"></div>
							<div className="col-sm-9 ">
								{isUpdate && categoryData?.image && (
									<a className="d-inline-block" href={categoryData.image} target="_blank">
										{getFileNameFromUrl(categoryData.image)}
									</a>
								)}
							</div>
						</div>
					)}
					{files.length > 0 && (
						<div className="row mb-3 align-items-center">
							<div className="col-sm-3 d-flex justify-content-end">
								<button
									type="button"
									className="btn btn-outline-danger btn-sm"
									onClick={handleClearFiles}>
									<i className="fa-solid fa-times"></i>
								</button>
							</div>
							<div className="col-sm-9">
								<ul className="list-unstyled m-0">
									{files.map((file, i) => (
										<li key={i}>
											{file.name} - {file.type}
										</li>
									))}
								</ul>
							</div>
						</div>
					)}
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
