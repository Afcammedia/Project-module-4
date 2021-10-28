console.log("home");
const form = document.getElementsByName("form-layout")[0];
const username = document.getElementsByName("username")[0];
const password = document.getElementsByName("password")[0];
const submit = document.querySelector(".btn");
const successBox = document.getElementById("successBox");
const loadingBox = document.getElementById("loadingBox");
const errorBox = document.getElementById("errorBox");

submit.addEventListener("click", async (e) => {
	e.preventDefault();
	const formData = {
		username: username.value,
		password: password.value,
	};
	try {
		const result = await axios.post("/user/login", formData);
		const { data } = result;
		alertMessage(loadingBox, "loading-message", "Loading");
		if (data.status === "Success") {
			const user = data.user[0];
			alertMessage(successBox, "success-message", "User logged in");
			// window.location.replace(`/recipes-page/${user.id}`);
		} else {
			alertMessage(
				errorBox,
				"error-message",
				"Password or Username wrong"
			);
		}
	} catch (error) {
		alertMessage(
			errorBox,
			"error-message",
			"Incorrect Username or Password!"
		);
	}
});

const alertMessage = (element, messageClass, message) => {
	element.classList.toggle("visible");
	const innerMessage = document.querySelector(`.${messageClass}`);
	innerMessage.innerHTML = message;
	setTimeout(() => {
		element.classList.toggle("visible");
	}, 5000);
};
