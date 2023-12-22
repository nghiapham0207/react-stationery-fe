import { useQuery } from "@tanstack/react-query";
import { axiosJWT, endpoints } from "../../utils/httpRequest";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken, selectRefreshToken, selectUser } from "../../redux/selectors";
import { toast } from "react-toastify";
import { useState } from "react";
import { Pagination } from "../../components/Pagination";
import NewProduct from "../../components/NewProduct";
import ListProduct from "./ListProduct";

export default function ProductPage() {
	const [currentPage, setCurrentPage] = useState(1);
	const [productData, setProductData] = useState(null);

	const currentUser = useSelector(selectUser);
	const accessToken = useSelector(selectAccessToken);
	const refreshToken = useSelector(selectRefreshToken);
	const dispatch = useDispatch();
	const productsState = useQuery({
		queryKey: ["products", currentUser.user_id, currentPage],
		queryFn: async () => {
			const jwt = axiosJWT(accessToken, refreshToken, dispatch);
			try {
				const res = await jwt.get(endpoints.products, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					params: {
						page: currentPage - 1,
						size: 10,
					},
				});
				return res.data;
			} catch (error) {
				console.log(error);
				return Promise.reject(error);
			}
		},
		// staleTime: 3 * 60 * 1000,
	});

	let products = [];
	let totalPage = 0;
	if (productsState.isSuccess && productsState.data.success) {
		products = productsState.data.data.items;
		totalPage = productsState.data.data.totalPages;
	}

	// modal handlers
	const openModal = (product) => {
		setProductData(product);
	};

	const closeModal = () => {
		setProductData(null);
	};

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};
	const handleInserted = () => {
		productsState.refetch();
	};
	const handleDelete = async (id) => {
		if (confirm("Do you want tot delete?") == true) {
			const toastId = toast.loading("processing!");
			const jwt = axiosJWT(accessToken, refreshToken, dispatch);
			try {
				const res = await jwt.delete(endpoints.deleteProduct + id, {
					headers: {
						Authorization: "Bearer " + accessToken,
					},
				});
				if (res.data.success) {
					productsState.refetch();
					toast.update(toastId, {
						render: "delete successfully!",
						type: "success",
						closeButton: true,
						autoClose: 1000,
						isLoading: false,
					});
				}
			} catch (error) {
				console.log(error);
				toast.update(toastId, {
					render: error.response?.data.message || "can not delete!",
					type: "error",
					closeButton: true,
					autoClose: 1000,
					isLoading: false,
				});
			}
		}
	};
	return (
		<>
			{/* Modal */}
			<div
				className="modal fade"
				id="newProductModal"
				tabIndex={-1}
				aria-labelledby="newProductModalLabel"
				aria-hidden="true">
				<div className="modal-dialog modal-dialog-scrollable">
					<div className="modal-content bg-light">
						<div className="modal-header">
							<h5 className="modal-title" id="newProductModalLabel">
								Insert new product
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							/>
						</div>
						<div className="modal-body">
							<NewProduct onInserted={handleInserted} />
						</div>
					</div>
				</div>
			</div>
			{/* update */}
			{productData && (
				<>
					<div className="modal-backdrop fade show" />
					<div
						onClick={closeModal}
						className="modal fade show"
						id="newProductModal"
						tabIndex={-1}
						aria-labelledby="newProductModalLabel"
						aria-modal="true"
						role="dialog"
						style={{ display: "block" }}>
						<div
							className="modal-dialog modal-dialog-scrollable"
							// to closeModal
							onClick={(e) => {
								e.stopPropagation();
							}}>
							<div className="modal-content bg-light">
								<div className="modal-header">
									<h5 className="modal-title" id="newProductModalLabel">
										Update product
									</h5>
									<button
										type="button"
										onClick={closeModal}
										className="btn-close"
										data-bs-dismiss="modal"
										aria-label="Close"
									/>
								</div>
								<div className="modal-body">
									<NewProduct onInserted={handleInserted} productData={productData} isUpdate />
								</div>
							</div>
						</div>
					</div>
				</>
			)}
			<div className="bg-light rounded h-100 p-4">
				<div className="mb-4 d-flex justify-content-between align-items-center">
					<h5 className="mb-0">List Product</h5>
					{/* Button trigger modal */}
					<button
						type="button"
						className="btn btn-primary"
						data-bs-toggle="modal"
						data-bs-target="#newProductModal">
						Add Product
					</button>
				</div>
				<ListProduct products={products} onDelete={handleDelete} onProductClick={openModal} />
				<Pagination
					totalPage={totalPage}
					currentPage={currentPage}
					onPageChange={handlePageChange}
				/>
			</div>
		</>
	);
}
