/*** GENERAL ***/
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

function toggleClass(element, className) {
	var classes = element.className.split(/\s+/),
	length = classes.length,
	i = 0;

	for(; i < length; i++) {
		if (classes[i] === className) {
			classes.splice(i, 1);
			break;
		}
	}
	
	if (length === classes.length) {
		classes.push(className);
	}

	element.className = classes.join(' ');
}


var layout,logoContainer,logo,menu,menuLink,menuLinks,content,smoothScroll,active = 'active',masonry = false, maxWidth = 0, containerWidth = 0, photo = [], iPhoto, instagramResizing = "#instagram.resizing";
/*** END GENERAL ***/

/*** SCROLL ***/
function initSmoothScroll() {
	smoothScroll = new SmoothScroll('a[href*="#"]', {
		ignore: '[data-scroll-ignore]',
		header: null,
		topOnEmptyHash: true,
		speed: 700,
		clip: true,
		offset: function (anchor, toggle) {
			if (anchor.id == "header") {
				return window.innerHeight / 10 * 3 + 99;
			} else if (window.innerWidth < 768) {
				return window.innerHeight / 10 + 45;
			} else if (window.scrollY >= 75) {
				return window.innerHeight / 10 + 99;
			} else {
				return window.innerHeight / 10 * 3 + 99;
			}

		},
		easing: 'easeInOutCubic',
		updateURL: false,
		popstate: false,
		emitEvents: false
	});

	if (location.hash != "") {
		smoothScroll.animateScroll(document.querySelector(location.hash));
	}
}
/*** END SCROLL ***/

/***  ANCHOR ***/
/*
function initGumshoe() {

	gumshoe.init({
		selector: '#menu a',
		selectorHeader: '#menu',
		container: window,
		offset: window.innerHeight / 10 + 99,
		activeClass: 'pure-menu-selected',
		scrollDelay: false,
		callback: function (nav) {
			if (!history.pushState || typeof nav == "undefined" || typeof nav.target == "undefined" || location.hash == '#'+nav.target.id ) return;
			history.pushState(null,null,nav.target === document.documentElement ? '#top' : '/' + nav.target.id);
		}
	});

}
*/
/*** END ANCHOR ***/

/***  COOKIE ***/
function initTarteaucitron() {
	tarteaucitron.init({
		"hashtag": "#cookies", /* Ouverture automatique du panel avec le hashtag */
		"highPrivacy": true, /* désactiver le consentement implicite (en naviguant) ? */
		"orientation": "bottom", /* le bandeau doit être en haut (top) ou en bas (bottom) ? */
		"adblocker": false, /* Afficher un message si un adblocker est détecté */
		"showAlertSmall": true, /* afficher le petit bandeau en bas à droite ? */
		"cookieslist": true, /* Afficher la liste des cookies installés ? */
		"removeCredit": false, /* supprimer le lien vers la source ? */
		"handleBrowserDNTRequest": false, /* Deny everything if DNT is on */
//"cookieDomain": ".example.com" /* Nom de domaine sur lequel sera posé le cookie pour les sous-domaines */
});
	tarteaucitron.user.googletagmanagerId = 'GTM-P53XHD6';
	(tarteaucitron.job = tarteaucitron.job || []).push('googletagmanager');
	(tarteaucitron.job = tarteaucitron.job || []).push('recaptcha');
}

/*** END COOKIE ***/

/*** MENU ***/
function toggleAll(e) {
	e.preventDefault();
	toggleClass(layout, active);
	toggleClass(logoContainer, active);
	toggleClass(menu, active);
	toggleClass(menuLink, active);
}

function initMenu() {
	menuLink.onclick = function (e) {
		toggleAll(e);
	};

	for (var i = 0; i < menuLinks.length; i++) {
		menuLinks[i].onclick = function (e) {
			if (menu.className.indexOf(active) !== -1) {
				toggleAll(e);
			}
		};
	}

	content.onclick = function(e) {
		if (menu.className.indexOf(active) !== -1) {
			toggleAll(e);
		}
	};
}

/*** END MENU ***/

/*** LOGO ***/
function sizeLogo() {
	if (window.scrollY >= 75) {
		logo.style.height = "10vh";
		layout.style.paddingTop = "10vh";
	} else {
		logo.style.height = "30vh";
		layout.style.paddingTop = "30vh";
	}
}
function initSizeLogo() {
	window.addEventListener('scroll',function () {
		sizeLogo();
	});
	sizeLogo();
}
/*** END LOGO ***/

/***  INSTAGRAM ***/
function showMore() {
	var instagram =document.getElementById('instagram').innerHTML;
	var max;
	if (iPhoto + 8 > photo.length) {
		max = photo.length;
	} else {
		max = iPhoto + 8;
	}
	for (i = iPhoto; i < max; i++) {
		instagram += '<div class="pure-u-1-2 pure-u-sm-1-3 pure-u-md-1-4"><a href="'+photo[i].std+'" class="js-smartPhoto" data-group="instagram"><img src="'+photo[i].low+'"></a></div>';
	}
	iPhoto += i;
	document.getElementById('instagram').innerHTML = instagram;
	new SmartPhoto(".js-smartPhoto");
}


function initInstagram() {
	var requestInsta = new XMLHttpRequest();
	requestInsta.onreadystatechange = function(e,data) {
		if(requestInsta.readyState === 4 && requestInsta.status === 200) {
			JSON.parse(requestInsta.responseText).data.forEach(function(e) {
				photo.push({
					"std":e.images.standard_resolution.url,
					"low":e.images.thumbnail.url
				});
			});
			iPhoto = 0;
			showMore();
		}
	};
	requestInsta.open("GET", "https://api.instagram.com/v1/users/self/media/recent/?&count=25&access_token=8039324942.941857a.5e7d0fb91abb417fbe5658ccd578d6cc");
	requestInsta.send();

	document.getElementById('instagram-showMore').addEventListener('click', function (e) {
		showMore();
	});
}

/***  END INSTAGRAM ***/
/*** EMAIL ***/

function sendConcat() {
	var requestContact = new XMLHttpRequest();
	requestContact.onreadystatechange = function(e,data) {
		if(requestContact.readyState === 4 && requestContact.status === 200) {
			if (requestContact.responseText == 0) {
				//document.getElementById("confirmation").className = document.getElementById("confirmation").className.replace('hidden-opacity','');
				document.getElementById("confirmation__trigger-A").click();
			} else {

			}
		} else {

		}
	};

	requestContact.open("POST", "email.php", true);
	requestContact.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	var obligation = [];

	obligation.push(document.getElementById('obligation0').value);
	obligation.push(document.getElementById('obligation1').value);
	obligation.push(document.getElementById('obligation2').value);
	requestContact.send(encodeURI('nom=' + document.getElementById('nom').value + '&tel=' + document.getElementById('tel').value + '&email=' + document.getElementById('email').value + '&demande=' + document.getElementById('demande').value + '&obligation=' + obligation + '&g-recaptcha-response=' + document.getElementById('g-recaptcha-response').value));
}
function initFormContact() {
	document.getElementById('formContact').addEventListener('submit', function (e) {
		e.preventDefault();
		grecaptcha.execute();
	});
}

/*** END EMAIL ***/

document.addEventListener('DOMContentLoaded', function() {

	layout   = document.getElementById('layout'),
	logoContainer = document.getElementById('logo-container'),
	logo = document.getElementById('logo'),
	menu     = document.getElementById('menu'),
	menuLink = document.getElementById('menuLink'),
	menuLinks = document.getElementsByClassName('pure-menu-link'),
	content  = document.getElementById('main');

	initMenu();
	initSizeLogo();

});

function init () {

	initInstagram();
	initSmoothScroll();
	initTarteaucitron();
	initFormContact();

	/***  LAZYLOAD ***/
	var imgEl = document.getElementsByClassName('lazyload');
	var imgToLoad = 0, imgLoaded = 0;
	for (var i=0; i<imgEl.length; i++) {
		if(imgEl[i].getAttribute('data-src')) {
			//imgEl[i].addEventListener('load', checkLastImageLoaded);
			//imgToLoad++;
			imgEl[i].setAttribute('src',imgEl[i].getAttribute('data-src'));
			//imgEl[i].removeAttribute('data-src');

		}
	}
	/*
	function checkLastImageLoaded() {
		if (imgToLoad -1 == imgLoaded) {
			initGumshoe();
		} else {
			imgLoaded++
		}
	}
	*/
	/***  END LAZYLOAD ***/
}

window.onload = init();