import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
//
import { selectAccessToken, selectRefreshToken, selectUser } from "../../redux/selectors";
import { axiosGet, axiosJWT, endpoints } from "../../utils/httpRequest";
import { toast } from "react-toastify";
import { getUser } from "../../services/userServices";

export default function UpdateAddress() {
	const refProvince = useRef();
	const refDistrict = useRef();
	const refWard = useRef();
	const refFirstName = useRef();
	const refLastName = useRef();
	const refPhone = useRef();
	const refEmail = useRef();
	const refAddressDesc = useRef();

	const dispatch = useDispatch();

	const accessToken = useSelector(selectAccessToken);
	const refreshToken = useSelector(selectRefreshToken);
	const currentUser = useSelector(selectUser);
	const { first_name, last_name, phone, email } = currentUser;
	let { address } = currentUser;
	if (!address) {
		address = {
			ward: {
				district: {
					province: {},
				},
			},
		};
	}
	const { ward } = address;
	const { district } = ward;
	const { province } = district;

	const [selectedProvince, setSelectedProvince] = useState(district.province_id || -1);
	const [selectedDistrict, setSelectedDistrict] = useState(ward.district_id || -1);
	const [phoneInput, setPhoneInput] = useState(phone || "");

	const provinceQuery = useQuery({
		queryKey: ["province"],
		queryFn: async () => {
			try {
				const res = await axiosGet(endpoints.provinceAll);
				return res;
			} catch (error) {
				return Promise.reject(error);
			}
		},
		staleTime: 30 * 60 * 1000,
	});
	const districtQuery = useQuery({
		queryKey: ["district", selectedProvince],
		queryFn: async () => {
			try {
				const res = await axiosGet(endpoints.districtByProvince, {
					params: {
						province_id: selectedProvince,
					},
				});
				return res;
			} catch (error) {
				return Promise.reject(error);
			}
		},
		enabled: selectedProvince !== -1,
		staleTime: 30 * 60 * 1000,
	});
	/**
	 * can use ref, similar to useEffect
	 */
	const wardState = useQuery({
		queryKey: ["ward", selectedDistrict],
		queryFn: async () => {
			try {
				const res = await axiosGet(endpoints.wardByDistrict, {
					params: {
						district_id: selectedDistrict,
					},
				});
				return res;
			} catch (error) {
				return Promise.reject(error);
			}
		},
		enabled: selectedDistrict !== -1,
		staleTime: 30 * 60 * 1000,
	});

	let provinces = [];
	if (provinceQuery.isSuccess) {
		provinces = provinceQuery.data.data;
	}
	let districts = [];
	if (districtQuery.isSuccess) {
		districts = districtQuery.data.data;
	}
	let wards = [];
	if (wardState.isSuccess) {
		wards = wardState.data.data;
	}

	const handleProvinceChange = (e) => {
		const value = e.target.value;
		if (value !== "undefined") {
			setSelectedProvince(parseInt(value));
			console.log(refDistrict);
			if (refDistrict.current) {
				refDistrict.current.disabled = false;
			}
		} else {
			refDistrict.current.disabled = true;
			refDistrict.current.value = undefined;
		}
		refWard.current.disabled = true;
		refWard.current.value = undefined;
	};
	const handleDistrictChange = (e) => {
		const value = e.target.value;
		if (value !== "undefined") {
			setSelectedDistrict(parseInt(value));
			refWard.current.disabled = false;
		} else {
			refWard.current.disabled = true;
			refWard.current.value = undefined;
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

	const handleUpdate = async (e) => {
		e.preventDefault();
		const first_name = refFirstName.current.value;
		const last_name = refLastName.current.value;
		const phone = refPhone.current.value;
		const email = refEmail.current.value;
		const address_id = address.address_id || null;
		const address_desc = refAddressDesc.current.value;
		const ward_id = refWard.current.value;
		console.log(ward_id);
		console.log(address_id);

		if (refProvince.current.value === "undefined") {
			refProvince.current.focus();
			return;
		}
		if (refDistrict.current.value === "undefined") {
			refDistrict.current.focus();
			return;
		}
		if (ward_id === "undefined") {
			refWard.current.focus();
			return;
		}
		const toastId = toast.loading("processing!");
		const jwt = axiosJWT(accessToken, refreshToken, dispatch);
		try {
			const res = await jwt.put(
				endpoints.updateDeliveryAddress,
				{
					first_name,
					last_name,
					phone,
					email,
					address_id,
					address_desc,
					ward_id,
				},
				{
					headers: {
						Authorization: "Bearer " + accessToken,
					},
				},
			);
			if (res.data.success) {
				await getUser(accessToken, refreshToken, dispatch);
				toast.update(toastId, {
					autoClose: 1200,
					type: "success",
					isLoading: false,
					closeButton: true,
					render: "update successfully!",
				});
			}
		} catch (error) {
			console.log(error);
			toast.update(toastId, {
				autoClose: 5000,
				type: "error",
				isLoading: false,
				closeButton: true,
				render: error.response?.data.message || "can not update!",
			});
		}
	};
	if (!currentUser) {
		return null;
	}
	useEffect(() => {
		if (address) {
			setTimeout(() => {
				refProvince.current.value = province.province_id;
				refDistrict.current.value = district.district_id;
				refWard.current.value = ward.ward_id;
			}, 1000);
		}
	}, []);
	return (
		<>
			<form onSubmit={handleUpdate}>
				<div className="mx-lg-5 px-5s">
					<div className="form-group">
						<label htmlFor="first_name">
							Fist Name<span className="required">*</span>
						</label>
						<input
							ref={refFirstName}
							type="text"
							className="form-control"
							required
							defaultValue={first_name}
							id="first_name"
						/>
					</div>

					<div className="form-group">
						<label htmlFor="last_name">
							Last Name<span className="required">*</span>
						</label>
						<input
							ref={refLastName}
							type="text"
							className="form-control"
							required
							defaultValue={last_name}
							id="last_name"
						/>
					</div>

					<div className="form-group">
						<label htmlFor="Phone">
							Phone<span className="required">*</span>
						</label>
						<input
							ref={refPhone}
							type="text"
							className="form-control"
							required
							minLength={10}
							maxLength={11}
							value={phoneInput}
							onChange={handlePhoneChange}
							id="Phone"
						/>
					</div>

					<div className="form-group">
						<label htmlFor="Email">
							Email<span className="required">*</span>
						</label>
						<input
							ref={refEmail}
							type="email"
							className="form-control"
							readOnly
							required
							defaultValue={email}
							id="Email"
						/>
					</div>

					<div className="form-group">
						<label htmlFor="Address">
							Address<span className="required">*</span>
						</label>
						<input
							ref={refAddressDesc}
							type="text"
							className="form-control"
							required
							defaultValue={address.specific_address}
							id="Address"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="Province">
							Province<span className="required">*</span>
						</label>
						<select
							className="form-control"
							ref={refProvince}
							defaultValue={province.province_id}
							onChange={handleProvinceChange}
							required
							id="Province">
							<option value="undefined">Chọn tỉnh/thành phố</option>
							{provinces?.map((province) => (
								<option key={province.province_id} value={province.province_id}>
									{province.province_name}
								</option>
							))}
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="District">
							District<span className="required">*</span>
						</label>
						<select
							className="form-control"
							ref={refDistrict}
							defaultValue={districts.length > 0 ? district.district_id : "undefined"}
							onChange={handleDistrictChange}
							disabled={district.district_id ? false : true}
							required
							id="District">
							<option value="undefined">Chọn quận/huyện</option>
							{districts.map((district) => (
								<option key={district.district_id} value={district.district_id}>
									{district.district_name}
								</option>
							))}
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="Homelet">
							Homelet<span className="required">*</span>
						</label>
						<select
							className="form-control"
							ref={refWard}
							defaultValue={ward.ward_id}
							disabled={ward.ward_id ? false : true}
							required
							id="Homelet">
							<option value="undefined">Chọn xã/phường</option>
							{wards?.map((ward) => (
								<option key={ward.ward_id} value={ward.ward_id}>
									{ward.ward_name}
								</option>
							))}
						</select>
					</div>
					<div className="d-flex justify-content-center my-4">
						<button type="submit" className="btn btn-outline-primary w-100">
							Update
						</button>
					</div>
					<div className="row">
						<div className="col-lg-6"></div>
						<div className="col-lg-6"></div>
					</div>
					<div className="row">
						<div className="col-lg-6"></div>
						<div className="col-lg-6"></div>
					</div>
					<div className="row">
						<div className="col-lg-6"></div>
						<div className="col-lg-6"></div>
					</div>
				</div>
			</form>
		</>
	);
}
