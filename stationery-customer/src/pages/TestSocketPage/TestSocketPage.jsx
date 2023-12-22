import { useEffect, useState } from "react";
import socket from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken, selectRefreshToken, selectUser } from "../../redux/selectors";
import { axiosGet, axiosJWT, endpoints } from "../../utils/httpRequest";
import InfiniteScroll from "react-infinite-scroll-component";

const usernames = [
	{ name: "user1", value: "n19dccn121_118" },
	{
		name: "user2",
		value: "nghia123",
	},
];

const SIZE = 10;

export default function TestSocketPage() {
	const accessToken = useSelector(selectAccessToken);
	const refreshToken = useSelector(selectRefreshToken);
	const currentUser = useSelector(selectUser);
	const { user_id } = currentUser;

	const dispatch = useDispatch();

	const [pagination, setPagination] = useState({
		page: 1,
		total_page: 0,
	});
	const [value, setValue] = useState("");
	const [conversation, setConversation] = useState([]);
	const [receiver, setReceiver] = useState(null);

	useEffect(() => {
		socket.auth = {
			// user_id: user_id,
			Authorization: `Bearer ${accessToken}`,
		};
		socket.connect();
		socket.emit("test_middleware", "data");
		const handleMessage = (data) => {
			const { payload } = data;
			setConversation((m) => [payload, ...m]);
		};
		socket.on("receive_message", handleMessage);
		socket.on("connect_error", (err) => {
			console.log(err); // prints the message associated with the error
		});
		socket.on("disconnect", (reason) => {
			// check jwt expired
			console.log(reason);
			if (reason === "io server disconnect") {
				// the disconnection was initiated by the server, you need to manually reconnect
				console.log(socket.active); // false
			}
		});
		return () => {
			console.log("clean");
			socket.off("receive_message", handleMessage);
			socket.disconnect();
		};
	}, []);
	useEffect(() => {
		(async () => {
			if (receiver) {
				const jwt = axiosJWT(accessToken, refreshToken, dispatch);
				const res = await axiosGet(
					endpoints.getConversation + receiver,
					{
						headers: {
							Authorization: "Bearer " + accessToken,
						},
						params: {
							page: pagination.page - 1,
							size: SIZE,
						},
					},
					jwt,
				);
				const { currentPage, totalPages, items } = res.data;
				setConversation(items);
				setPagination({
					page: currentPage + 2,
					total_page: totalPages,
				});
			}
		})();
	}, [receiver]);
	/**
	 *
	 * @param {SubmitEvent} e
	 */
	const handleSend = (e) => {
		e.preventDefault();
		if (!receiver) {
			return;
		}
		const payload = {
			message: value,
			receiver_id: receiver, // user_id
			sender_id: user_id,
		};
		socket.auth = {
			...socket.auth,
			test_jwt: Math.floor(Math.random() * 10),
		};
		console.log(socket.auth);
		socket.emit("send_message", {
			payload,
		});
		setValue("");
		setConversation((ms) => [
			{
				...payload,
				conversation_id: new Date().getTime(),
			},
			...ms,
		]);
	};
	/**
	 *
	 * @param {String} username
	 */
	const getProfile = async (username) => {
		const res = await axiosGet(endpoints.userParam + username);
		setReceiver(res.data.user_id);
	};
	const fetchMoreConversation = async () => {
		console.log(pagination);
		if (receiver && pagination.page - 1 < pagination.total_page) {
			const jwt = axiosJWT(accessToken, refreshToken, dispatch);
			const res = await axiosGet(
				endpoints.getConversation + receiver,
				{
					headers: {
						Authorization: "Bearer " + accessToken,
					},
					params: {
						page: pagination.page - 1,
						size: SIZE,
					},
				},
				jwt,
			);
			const { currentPage, totalPages, items } = res.data;
			console.log(res);
			setConversation((c) => [...c, ...items]);
			setPagination({
				page: currentPage + 2,
				total_page: totalPages,
			});
		}
	};
	return (
		<>
			<div className="container">
				<p>TestSocketPage</p>
				<h1>Chat</h1>
				<div>
					{usernames.map((username) => (
						<div key={username.value}>
							<button
								type="button"
								disabled={username.value === currentUser.username}
								onClick={() => {
									getProfile(username.value);
								}}
								className="btn btn-outline-primary">
								{username.name}
							</button>
						</div>
					))}
				</div>
				<div
					className="d-flex flex-column w-25 bg-light p-2 overflow-auto"
					style={{ maxHeight: "200px" }}>
					<div
						id="scrollableDiv"
						style={{
							height: 200,
							overflow: "auto",
							display: "flex",
							flexDirection: "column-reverse",
						}}>
						{/*Put the scroll bar always on the bottom*/}
						<InfiniteScroll
							dataLength={conversation.length}
							next={fetchMoreConversation}
							style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
							inverse={true} //
							hasMore={pagination.page - 1 < pagination.total_page}
							loader={<h4>Loading...</h4>}
							scrollableTarget="scrollableDiv">
							{conversation.map((message) => (
								<div
									key={message.conversation_id}
									className={`d-flex ${
										message.sender_id === user_id ? " justify-content-end " : " "
									}`}>
									<div
										className={`rounded px-1 text-white ${
											message.sender_id === user_id ? "bg-primary " : "bg-secondary "
										}`}>
										{message.message}
									</div>
								</div>
							))}
						</InfiniteScroll>
					</div>
				</div>
				<form onSubmit={handleSend}>
					<input
						type="text"
						value={value}
						onChange={(e) => {
							setValue(e.target.value);
						}}
						placeholder="input message..."
						className="mt-3 form-control w-25"
					/>
					<button type="submit" className="mt-3 w-25 btn btn-primary">
						Send
					</button>
				</form>
			</div>
		</>
	);
}
