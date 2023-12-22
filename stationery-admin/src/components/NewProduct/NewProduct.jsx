import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
//
import { axiosJWT, endpoints } from "../../utils/httpRequest";
import { selectAccessToken, selectRefreshToken } from "../../redux/selectors";
import { toast } from "react-toastify";
import { getCategories } from "../../services/categoryService";
import { getBrands } from "../../services/brandService";
import { getFileNameFromUrl } from "../../utils/helpers";

export default function NewProduct({ onInserted = () => {}, isUpdate = false, productData = {} }) {
	const accessToken = useSelector(selectAccessToken);
	const refreshToken = useSelector(selectRefreshToken);
	const dispatch = useDispatch();

	const [productImages, setProductImages] = useState();

	const refInputImages = useRef();
	const nameRef = useRef();
	const descriptionRef = useRef();
	const priceRef = useRef();
	const specificationRef = useRef();
	const calculationUnitRef = useRef();
	const discountRef = useRef();
	const quantityRef = useRef();
	const categoryIdRef = useRef();
	const brandIdRef = useRef();
	const statusRef = useRef();

	const categoriesState = useQuery({
		queryKey: ["categories"],
		queryFn: getCategories,
		staleTime: 3 * 60 * 1000,
	});
	let categories = [];
	if (categoriesState.isSuccess) {
		categories = categoriesState.data.data;
	}

	const brandsState = useQuery({
		queryKey: ["brands"],
		queryFn: getBrands,
		staleTime: 3 * 60 * 1000,
	});
	let brands = [];
	if (brandsState.isSuccess) {
		brands = brandsState.data.data;
	}
	const files = productImages ? [...productImages] : [];

	const handleFileChange = (e) => {
		setProductImages(e.target.files);
	};

	const handleClearFiles = () => {
		setProductImages([]);
		refInputImages.current.value = "";
	};

	const setFormData = (formData) => {
		formData.append("name", nameRef.current.value);
		formData.append("description", descriptionRef.current.value);
		for (let index = 0; index < files.length; index++) {
			const file = files[index];
			formData.append("product_images", file);
		}
		formData.append("price", priceRef.current.value);
		formData.append("specification", specificationRef.current.value);
		formData.append("calculation_unit", calculationUnitRef.current.value);
		formData.append("discount", discountRef.current.value);
		formData.append("quantity", quantityRef.current.value);
		formData.append("category_id", categoryIdRef.current.value);
		formData.append("brand_id", brandIdRef.current.value);
	};

	const handlePost = async (e) => {
		e.preventDefault();
		const jwt = axiosJWT(accessToken, refreshToken, dispatch);
		const toastId = toast.loading("processing!");

		const formData = new FormData();
		setFormData(formData);
		try {
			const res = await jwt.post(endpoints.createProduct, formData, {
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
		formData.append("status", statusRef.current.checked);
		try {
			const res = await jwt.put(endpoints.updateProduct + productData.product_id, formData, {
				headers: { Authorization: "Bearer " + accessToken, "Content-Type": "multipart/form-data" },
			});
			console.log(res);
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
			console.log(statusRef.current.checked);
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
								defaultValue={productData?.name}
								maxLength={200}
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
							<input
								ref={descriptionRef}
								maxLength={1000}
								placeholder=""
								defaultValue={productData?.description}
								type="text"
								required
								className="form-control"
							/>
						</div>
					</div>
					<div className="row mb-3">
						<label htmlFor="" className="col-sm-3 col-form-label">
							Images
						</label>
						<div className="col-sm-9">
							<input
								ref={refInputImages}
								maxLength={512}
								placeholder=""
								type="file"
								onChange={handleFileChange}
								multiple
								required={isUpdate ? false : true}
								accept="image/*"
								className="form-control"
							/>
						</div>
					</div>
					{isUpdate && productData?.images?.length > 0 && (
						<div className="row mb-3">
							<div className="col-sm-3"></div>
							<div className="col-sm-9 ">
								{isUpdate &&
									productData?.images.length > 0 &&
									productData?.images?.map((image) => (
										<a
											className="d-inline-block"
											key={image?.image_id}
											href={image.image}
											target="_blank">
											{getFileNameFromUrl(image.image)}
										</a>
									))}
							</div>
						</div>
					)}

					{files.length > 0 && (
						<div className="row mb-3">
							<div className="col-sm-3">
								<button
									type="button"
									className="btn btn-outline-primary btn-sm"
									onClick={handleClearFiles}>
									Clear
								</button>
							</div>
							<div className="col-sm-9">
								<ul>
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
						<label htmlFor="" className="col-sm-3 col-form-label">
							Price
						</label>
						<div className="col-sm-9">
							<input
								ref={priceRef}
								maxLength={18}
								defaultValue={productData?.price}
								placeholder=""
								type="number"
								min={0}
								required
								className="form-control"
							/>
						</div>
					</div>
					<div className="row mb-3">
						<label htmlFor="" className="col-sm-3 col-form-label">
							Specification
						</label>
						<div className="col-sm-9">
							<input
								maxLength={50}
								ref={specificationRef}
								defaultValue={productData?.specification}
								placeholder=""
								type="text"
								required
								className="form-control"
							/>
						</div>
					</div>
					<div className="row mb-3">
						<label htmlFor="" className="col-sm-3 col-form-label">
							Calculation unit
						</label>
						<div className="col-sm-9">
							<input
								maxLength={15}
								ref={calculationUnitRef}
								defaultValue={productData?.calculation_unit}
								placeholder=""
								type="text"
								required
								className="form-control"
							/>
						</div>
					</div>
					<div className="row mb-3">
						<label htmlFor="" className="col-sm-3 col-form-label">
							Discount
						</label>
						<div className="col-sm-9">
							<input
								ref={discountRef}
								defaultValue={isUpdate ? productData?.discount : 0}
								placeholder=""
								type="number"
								min={0}
								maxLength={100}
								required
								className="form-control"
							/>
						</div>
					</div>
					<div className="row mb-3">
						<label htmlFor="" className="col-sm-3 col-form-label">
							Quantity
						</label>
						<div className="col-sm-9">
							<input
								ref={quantityRef}
								defaultValue={productData?.quantity}
								placeholder=""
								type="number"
								min={0}
								required
								className="form-control"
							/>
						</div>
					</div>
					<div className="row mb-3">
						<label htmlFor="" className="col-sm-3 col-form-label">
							Category
						</label>
						<div className="col-sm-9">
							<select
								ref={categoryIdRef}
								defaultValue={productData?.category_id}
								className="form-select"
								aria-label="Default select example">
								{categories.map((category) => (
									<option key={category.category_id} value={category.category_id}>
										{category.name}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="row mb-3">
						<label htmlFor="" className="col-sm-3 col-form-label">
							Brand
						</label>
						<div className="col-sm-9">
							<select
								ref={brandIdRef}
								defaultValue={productData?.brand_id}
								className="form-select"
								aria-label="Default select example">
								{brands.map((brand) => (
									<option key={brand.brand_id} value={brand.brand_id}>
										{brand.name}
									</option>
								))}
							</select>
						</div>
					</div>
					{isUpdate && (
						<div className="row mb-3">
							<div className="col-sm-3">Status</div>
							<div className="col-sm-9">
								<div className="form-check">
									<input
										ref={statusRef}
										className="form-check-input"
										type="checkbox"
										defaultChecked={productData?.status}
										id="statusCheck"
									/>
									<label className="form-check-label" htmlFor="statusCheck">
										Active
									</label>
								</div>
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
