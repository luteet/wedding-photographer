
const 
	body = document.querySelector('body'),
	html = document.querySelector('html'),
	menu = document.querySelectorAll('.header__burger, .header__nav, body'),
	burger = document.querySelector('.header__burger'),
	header = document.querySelector('.header');


// =-=-=-=-=-=-=-=-=-=- <click events> -=-=-=-=-=-=-=-=-=-=-

body.addEventListener('click', function (event) {

	function $(elem) {
		return event.target.closest(elem)
	}

	// =-=-=-=-=-=-=-=-=-=- <open menu in header> -=-=-=-=-=-=-=-=-=-=-

	if ($('.header__burger')) {
		menu.forEach(element => {
			element.classList.toggle('_mob-menu-active')
		})
	}

	// =-=-=-=-=-=-=-=-=-=- </open menu in header> -=-=-=-=-=-=-=-=-=-=-

	
	// =-=-=-=-=-=-=-=-=-=-=-=- <scroll on click to section> -=-=-=-=-=-=-=-=-=-=-=-=
	
	let btnToScroll = $('.btn-to-scroll');
	if(btnToScroll) {
		event.preventDefault();
		let section;
	
		if(btnToScroll.getAttribute('href').length > 1) {
			section = document.querySelector(btnToScroll.getAttribute('href'))
		}
	
		menu.forEach(elem => {
			elem.classList.remove('_mob-menu-active')
		})
	
		window.scroll({
			left: 0,
			top: (section) ? section.offsetTop : 0,
			behavior: 'smooth'
		})
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </scroll on click to section> -=-=-=-=-=-=-=-=-=-=-=-=
	

})

// =-=-=-=-=-=-=-=-=-=- </click events> -=-=-=-=-=-=-=-=-=-=-



// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

function resize() {

	html.style.setProperty("--height-screen", window.innerHeight + "px")
	html.style.setProperty("--height-header", header.offsetHeight + "px")

}

resize();

window.onresize = resize;

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=

const startBg = document.querySelector('.start__bg');
if(startBg) {
	let sliderstartBg = new Swiper('.start__bg', {

		spaceBetween: 0,
		slidesPerView: 1,

		autoplay: {
			delay: 2000,
			waitForTransition: false,
		},
	
		effect: 'fade',
		fadeEffect: {
			crossFade: false
		},

		
	
	});
	
	const startNavLink = document.querySelectorAll('.start__nav a');
	startNavLink.forEach((startNavLink, index) => {
		if(index == sliderstartBg.activeIndex) startNavLink.classList.add('_active');
	})

	sliderstartBg.on('slideChangeTransitionEnd', function () {
		sliderstartBg.autoplay.start();
	});

	sliderstartBg.on('slideChangeTransitionStart', function () {
		startNavLink.forEach((startNavLink, index) => {
			startNavLink.classList.remove('_active');
		})
		startNavLink.forEach((startNavLink, index) => {
			if(index == sliderstartBg.activeIndex) startNavLink.classList.add('_active');
		})
	});
	
	startNavLink.forEach((startNavLink, index) => {
	
		startNavLink.dataset.index = index;
		//if(index == 0) startNavLink.classList.add('_active')
	
		startNavLink.addEventListener('mouseenter', function () {
			
			/* const activeStartNavLink = document.querySelectorAll('.start__nav a._active');
			activeStartNavLink.forEach(activeStartNavLink => {
				activeStartNavLink.classList.remove('_active');
			})
	
			startNavLink.classList.add('_active'); */
	
			const linkIndex = Number(startNavLink.dataset.index);
			if(typeof linkIndex == "number") {
				sliderstartBg.autoplay.stop()
				sliderstartBg.slideTo(linkIndex,300);
			}
			
		})
	
	})
}



// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=

function grid() {

	let msnry = new Masonry( '.grid', {
		itemSelector: '.grid-item',
		transitionDuration: 0,
	});
	
	//var bricklayer = new Bricklayer(document.querySelector('.bricklayer'));
	


	let lazy = document.querySelectorAll('.lazy');

	let scrollProgress;
	function scroll() {
		scrollProgress = Math.abs(body.getBoundingClientRect().y);
		let heightScreen = window.innerHeight;

		lazy.forEach((lazy, index) => {
			if(lazy.getBoundingClientRect().y - heightScreen <= 0 && !lazy.classList.contains('_loaded'))	{
				
				lazy.setAttribute('src', lazy.dataset.src);
				const picture = lazy.closest('picture');
				if(picture) {
					const source = picture.querySelectorAll('source');
					source.forEach(source => {
						source.setAttribute('srcset', source.dataset.srcset);
					})
				}
				
			}
		})
	}

	setTimeout(() => {
		scroll();
		const gridItem = document.querySelectorAll('.grid-item');
		gridItem.forEach(gridItem => {
			const img = gridItem.querySelector('img');
			img.addEventListener('load', function () {
				gridItem.style.setProperty('--aspect-ratio', img.naturalHeight / img.naturalWidth * 100 + '%');
				img.classList.add('_loaded');
				msnry.layout();
				setTimeout(() => {
					gridItem.classList.add('_loaded');
				},100)
				setTimeout(() => {
					gridItem.classList.add('_disabled-loading-anim');
				},400)
			})
			
		})
		document.addEventListener('scroll', scroll);
	},100)
}

const gridBlock = document.querySelector('.grid');

if(gridBlock) {
	grid()
}




function headerScroll(arg) {

	function getCoords(elem) {
		var box = elem.getBoundingClientRect();
	
		return {
		top: box.top + pageYOffset,
		left: box.left + pageXOffset
		};
	
	}

	let header = document.querySelector('.header'),
		alwaysHideHeader = document.querySelector('.always-hide-header'),

		hToDown = 100,
		hToUp = 50,

		headerPos = getCoords(header),

		hPosToDown, hPosToUp, hCheck = [true, true], hPosCheck = false,
		hTopCheck = false, scrolled = [0, 0], checkScrolled = '';
  


	function headerScrollFunc() {

		scrolled[0] = headerPos.top
		headerPos = getCoords(header);
		scrolled[1] = headerPos.top

		if (!hPosCheck) {

			hPosCheck = true;

			hPosToDown = headerPos.top + hToDown;
			hPosToUp = headerPos.top - hToUp;

		}

		if (scrolled[0] > scrolled[1]) {
		  
			checkScrolled = 'up';
		  
			} else if (scrolled[0] < scrolled[1]) {

				checkScrolled = 'down';

			}

			if (!hTopCheck && headerPos.top > 0) {
				hTopCheck = true;

				header.classList.remove('_top');
			} else if (headerPos.top == 0) {
				hTopCheck = false;
				header.classList.add('_top');
			}


			if (checkScrolled == 'down') hPosToUp = headerPos.top - hToUp;
			if (checkScrolled == 'up') hPosToDown = headerPos.top + hToDown;


			if (hPosToUp >= headerPos.top && hCheck[0]) {
				hCheck[0] = false; hCheck[1] = true;

				header.classList.remove('_hide'); // SHOW HEADER
			}

			if (hPosToDown <= headerPos.top && hCheck[1]) {
				hCheck[1] = false; hCheck[0] = true;

				header.classList.add('_hide'); // HIDE HEADER
			}

			if(alwaysHideHeader) {
				if(alwaysHideHeader.getBoundingClientRect().y <= 100 && !header.classList.contains('_always-hide')) {
					header.classList.add('_always-hide');
				} else if(alwaysHideHeader.getBoundingClientRect().y > 100 && header.classList.contains('_always-hide')) {
					header.classList.remove('_always-hide');
				}
			}
			

	}

	headerScrollFunc();

	document.addEventListener('scroll', headerScrollFunc)

}


headerScroll();




const blogFilter = document.querySelectorAll('.blog-filter');
blogFilter.forEach(blogFilter => {
	const inputs = blogFilter.querySelectorAll('input[type="radio"]');
	inputs.forEach(input => {
		input.addEventListener('change', function () {
			blogFilter.submit();
		})
	})
})

/* 
// =-=-=-=-=-=-=-=-=-=-=-=- <animation> -=-=-=-=-=-=-=-=-=-=-=-=

AOS.init({
	disable: "mobile",
});

// =-=-=-=-=-=-=-=-=-=-=-=- </animation> -=-=-=-=-=-=-=-=-=-=-=-=

 */
