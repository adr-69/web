document.addEventListener("DOMContentLoaded", function() {
	const menuToggle = document.querySelector(".menu-toggle");
	const navMenu = document.querySelector("nav");
	
	menuToggle.addEventListener("click", function() {
		navMenu.classList.toggle("active");
		menuToggle.classList.toggle("active");
	});
});
document.addEventListener("DOMContentLoaded", function() {
	"use strict";
	
	document.addEventListener("contextmenu", (event) => event.preventDefault());
	
	document.addEventListener("keydown", (event) => {
		if (
			event.key === "F12" ||
			(event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "J")) ||
			(event.ctrlKey && event.key === "U")
		) {
			event.preventDefault();
		}
	});
	
	if (window.top !== window.self) {
		window.top.location = window.location;
	}
	
	function sanitizeInput(input) {
		return input.replace(/[<>"/'`]/g, (char) => ({
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#39;',
			'`': '&#96;'
		} [char]));
	}
	
	document.querySelectorAll("input, textarea").forEach((inputField) => {
		inputField.addEventListener("input", function() {
			this.value = sanitizeInput(this.value);
		});
	});
	
	function preventSessionHijacking() {
		if (!sessionStorage.getItem("secure_session")) {
			sessionStorage.setItem("secure_session", Math.random().toString(36).substr(2));
		}
	}
	preventSessionHijacking();
	
	function getCSRFToken() {
		let token = sessionStorage.getItem("csrf_token");
		if (!token) {
			token = Math.random().toString(36).substring(2);
			sessionStorage.setItem("csrf_token", token);
		}
		return token;
	}
	
	document.querySelectorAll("form").forEach((form) => {
		form.addEventListener("submit", function(event) {
			const csrfInput = document.createElement("input");
			csrfInput.type = "hidden";
			csrfInput.name = "csrf_token";
			csrfInput.value = getCSRFToken();
			this.appendChild(csrfInput);
		});
	});
	
	setInterval(() => {
		if (window.outerWidth - window.innerWidth > 160 || window.outerHeight - window.innerHeight > 160) {
			document.body.innerHTML = "<h1>Security Warning: DevTools Detected!</h1>";
		}
	}, 1000);
});
