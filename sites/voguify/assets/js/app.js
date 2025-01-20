// Template Name: Voguify
// Description: Voguify HTML5 Template
// Author: Uiparadox
// Version: 1.0.0
(function (window, document, $, undefined) {
  "use strict";

  const animationContainer = document.getElementById("logo-animation");
  const animData = {
    container: animationContainer,
    renderer: "svg",
    loop: false,
    autoplay: true,
    path: "assets/media/preloader.json", // Replace with your JSON file path
  };
  const anim = lottie.loadAnimation(animData);
 var MyScroll;
  var Init = {
    i: function (e) {
      Init.s();
      Init.methods();
    },
    s: function (e) {
      (this._window = $(window)),
        (this._document = $(document)),
        (this._body = $("body")),
        (this._html = $("html"));
    },
    methods: function (e) {
      Init.w();
      Init.gsap();
      Init.videoSpeed();
      Init.slick();
      Init.headerToggleMenu();
      Init.wishListicon();
      Init.quantityHandle();
      Init.cartPopup();
      Init.wishListPopup();
      Init.searchToggle();
      Init.niceSelect();
      Init.jsSlider();
      Init.filterToggle();
      Init.blogSearch();
      Init.sizeGuideChart();
      Init.billingAddress();
      Init.formValidation();
      Init.contactForm();
      Init.countdownInit(".countdown", "2024/12/01");
      Init.shopFilterToggle();
    },

    w: function (e) {
      this._window.on("load", Init.l).on("scroll", Init.res);
    },

    gsap: function () {

      anim.addEventListener("complete", function () {
        $("#preloader").fadeOut(100, function () {
          $(this).remove();
        });

        gsap.registerPlugin(ScrollTrigger);
        // Hero Banner - 2 
        let slideUptext = gsap.timeline();
        slideUptext.from(".heading-box .main-heading", {
          duration: 1.25,
          y: "230%",
          autoAlpha: 0,
          ease: Power3.out,
          stagger: 1.5,
          transformOrigin: "top top",
        }),
        
        slideUptext.from(".semi-heading", {
          duration: 1.25,
          y: "50%",
          autoAlpha: 0,
          ease: Power3.out,
          stagger: 1.5,
          transformOrigin: "top top",
        });

        var slideAnimation = gsap.timeline({ defaults: { ease: "power2.inOut" }, });

        slideAnimation.to(".banner .image-2", { height: "100%" });
        slideAnimation.to(".banner .title-block h2", { y: "-100%", duration: 0.3 }, '<');

        ScrollTrigger.create({
          trigger: ".banner",
          scrub: true,
          pin: true,
          markers: false,
          start: "top top",
          animation: slideAnimation,
        });

        gsap.set('.categories .title-sec', { y: '800%' });

        var endAnimation = gsap.timeline({ defaults: { ease: "power2.inOut" }, });

        endAnimation.to(".categories .title-1", { y: "0%" })

        ScrollTrigger.create({
          trigger: ".product",
          scrub: true,
          pin: false,
          markers: false,
          start: "bottom 80%",
          animation: endAnimation,

        });
        gsap.set('.categories .bg-video', { top: '150px' });
        var slideAnimation = gsap.timeline({ defaults: { ease: "power2.inOut" }, });
        slideAnimation.to(".categories .image-block .catg-image-1", { height: "calc(100% - 64px)" })
        slideAnimation.to(".categories .categories-title .title-2", { y: "0%" }, '<')

        slideAnimation.to(".categories .image-block .catg-image-2", { height: "calc(100% - 64px)" })
        slideAnimation.to(".categories .categories-title .title-3", { y: "0%" }, '<')

        slideAnimation.to(".categories .image-block .catg-image-3", { height: "calc(100% - 64px)" })
        slideAnimation.to(".categories .categories-title .title-4", { y: "0%" }, '<');

        // Reveal Effect Start
        slideAnimation.to(".categories .categories-content", { y: "-100%" });
        slideAnimation.to(".categories .bg-video", { top: "0" },'<');
        // Reveal Effect End
  
        ScrollTrigger.create({
          trigger: ".categories",
          scrub: true,
          pin: true,
          markers: false,
          start: "top top",
          end: "+=400%", // Adjust this value based on your design
          animation: slideAnimation,
        });

        gsap.set('.categories .clothing-video', { scale: 1 });
        var videoScalAnimation = gsap.timeline({ defaults: { ease: "power2.inOut" }, });
        videoScalAnimation.to(".categories .clothing-video", { scale: "0.95"});
        ScrollTrigger.create({
          trigger: "#trendingProducts",
          scrub: true,
          start: "top 130%",
          animation: videoScalAnimation,
        });

        // Brand Banner Starts
        var slideAnimation = gsap.timeline({ default: { ease: "power2.inOut" }, });
        if (window.innerWidth > 876) {
          gsap.set('.brand-banner .content-block .box-1', { height: '400px' })
          slideAnimation.to(".brand-banner .brand-images-block .image-1", { opacity: "1", duration: 0.2 })
          slideAnimation.to(".brand-banner .content-block .box-2", { height: "400px", })
          slideAnimation.to(".brand-banner .brand-images-block .image-2", { opacity: "1" }, '<')
          slideAnimation.to(".brand-banner .content-block .box-3", { height: "400px", })
          slideAnimation.to(".brand-banner .brand-images-block .image-3", { opacity: "1" }, '<')
          slideAnimation.to(".brand-banner .content-block .box-4", { height: "400px", })
          slideAnimation.to(".brand-banner .brand-images-block .image-4", { opacity: "1" }, '<')
          slideAnimation.to(".brand-banner .content-block .box-5", { height: "400px", })
          slideAnimation.to(".brand-banner .brand-images-block .image-5", { opacity: "1" }, '<');
        } else {
          slideAnimation.to(".brand-banner .content-block", { x: "-20%", })
          slideAnimation.to(".brand-banner .brand-images-block .image-2", { opacity: "1", duration: 0.5 }, '<')
          slideAnimation.to(".brand-banner .content-block", { x: "-40%", })
          slideAnimation.to(".brand-banner .brand-images-block .image-3", { opacity: "1", duration: 0.5 }, '<')
          slideAnimation.to(".brand-banner .content-block", { x: "-60%", })
          slideAnimation.to(".brand-banner .brand-images-block .image-4", { opacity: "1", duration: 0.5 }, '<')
          slideAnimation.to(".brand-banner .content-block", { x: "-80%", })
          slideAnimation.to(".brand-banner .brand-images-block .image-5", { opacity: "1", duration: 0.5 }, '<')

        }
        ScrollTrigger.create({
          trigger: ".brand-banner",
          scrub: true,
          pin: true,
          markers: false,
          start: "top top",
          end: "+=400%",
          animation: slideAnimation,
        });

        // Features Card
        var sideAnimation = gsap.timeline({ default: { ease: "power2.inOut" }, });
        sideAnimation.to(".features .right-block .v-4", { rotation: -8, duration: 0.4 });
        sideAnimation.to(".features .right-block .v-3", { x: '-164%' }, '<');
        sideAnimation.to(".features .right-block .v-3", { rotation: 5, duration: 0.9 }, '<');
        sideAnimation.to(".features .right-block .v-2", { x: '-164%', })
        sideAnimation.to(".features .right-block .v-2", { rotation: -5, duration: 0.9 }, '<');
        sideAnimation.to(".features .right-block .v-1", { x: '-164%', })
        sideAnimation.to(".features .right-block .v-1", { rotation: 0, duration: 0.9 }, '<');

        ScrollTrigger.create({
          trigger: ".features",
          scrub: true,
          pin: true,
          markers: false,
          start: "top top",
          end: "+=300%",
          animation: sideAnimation,
        });

        // About Blocks
        gsap.set('.since-sec .about-block.item-1', { x: '0' });
        gsap.set('.since-sec .about-block.item-2', { x: '-100%' });
        gsap.set('.since-sec .about-block.item-3', { x: '-100%' });

        var sideAnimation = gsap.timeline({ default: { ease: "power2.inOut" }, });
        sideAnimation.to(".since-sec .about-block.item-2", { x: '0px' })
        sideAnimation.to(".since-sec .vector-line .circle", { left: '50%' }, '<')
        sideAnimation.to(".since-sec .about-block.item-3", { x: '0px' });
        sideAnimation.to(".since-sec .vector-line .circle", { left: '100%' }, '<')

        ScrollTrigger.create({
          trigger: ".since-sec",
          scrub: true,
          pin: true,
          markers: false,
          start: "top top",
          end: "+=200%",
          animation: sideAnimation,
        });
        // create the scrollSmoother before your scrollTriggers
        if(window.innerWidth > 578){
          MyScroll = ScrollSmoother.create({
            smooth: 1,
            effects: true,
            ignoreMobileResize: true,
            normalizeScroll: true
          });
        }
        
      });
    },

    // Video Playback Speed Adjustment
    videoSpeed: function () {
      if ($(".bg-video").length) {
        var video = $('#videoPlayer')[0]; 
        video.play();
      }
    },

    // Slick Slider
    slick: function () {
      if ($(".testimonials-images-slider").length) {
        $('.testimonials-images-slider').slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true,
          dots: false,
          centerMode: true,
          variableWidth: true,
          infinite: true,
          focusOnSelect: true,
          cssEase: 'linear',
          touchMove: true,
          asNavFor: ".testimonials-content-slider-nav",
          responsive: [
            {
              breakpoint: 1599,
              settings: {
                slidesToShow: 3,
                arrows: true,
              },
            },
            {
              breakpoint: 1499,
              settings: {
                slidesToShow: 3,
                arrows: true,
              },
            },
            {
              breakpoint: 1399,
              settings: {
                slidesToShow: 3,
                arrows: true,
              },
            },
            {
              breakpoint: 490,
              settings: {
                slidesToShow: 1,
                arrows: false,
                variableWidth: false,
                centerMode: false,
              },
            },
          ]
        });
        var imgs = $('.testimonials-images-slider img');
        imgs.each(function () {
          var item = $(this).closest('.item');
          item.css({
            'background-image': 'url(' + $(this).attr('src') + ')',
            'background-position': 'center',
            '-webkit-background-size': 'cover',
            'background-size': 'cover',
          });
          // $(this).hide();
        });
      }

      if ($(".testimonials-content-slider-nav").length) {
        $(".testimonials-content-slider-nav").slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          asNavFor: ".testimonials-images-slider",
          dots: false,
          arrows: false,
          centerMode: false,
          focusOnSelect: true,
          responsive: [
            {
              breakpoint: 1599,
              settings: {
                arrows: false,
                slidesToShow: 1,
              },
            },
            {
              breakpoint: 1499,
              settings: {
                arrows: false,
                slidesToShow: 1,
              },
            },
            {
              breakpoint: 1399,
              settings: {
                arrows: false,
                slidesToShow: 1,
              },
            },
            {
              breakpoint: 768,
              settings: {
                arrows: false,
                slidesToShow: 1,
              },
            },
          ],
        });
      }

      if ($(".product-slider").length) {
        $(".product-slider").slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 4000,
          dots: false,
          arrows: false,
          centerPadding: "0",
          cssEase: "linear",
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2,
                dots: false,
              },
            },
            {
              breakpoint: 576,
              settings: {
                slidesToShow: 1,
                dots: false,
                arrows: false,
              },
            },
          ],
        });
      }

      // trending-product-slider
      if ($(".trending-product-slider").length) {
        $(".trending-product-slider").slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: false,
          autoplaySpeed: 4000,
          dots: false,
          arrows: false,
          centerPadding: "0",
          cssEase: "linear",
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2,
                dots: false,
              },
            },
            {
              breakpoint: 430,
              settings: {
                slidesToShow: 1,
                dots: false,
                arrows: false,
              },
            },
          ],
        });
      }


      // Slick Slider
      if ($(".detail-item-slider").length) {
        $(".detail-item-slider").slick({
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
          cssEase: 'linear',
          responsive: [
            {
              breakpoint: 1099,
              settings: {
                slidesToShow: 1,
                arrows: false,
              },
            },
            {
              breakpoint: 993,
              settings: {
                slidesToShow: 2,
                arrows: false,
              },
            },
          ]
        });

        // Slick Scroll
        $(function () {
          const slider = $(".detail-item-slider");
          slider;

          slider.on("wheel", function (e) {
            e.preventDefault();

            if (e.originalEvent.deltaY < 0) {
              $(this).slick("slickNext");
            } else {
              $(this).slick("slickPrev");
            }
          });
        });
      }

      // Detail Item Slider (Product Detail - 3)
      if ($(".detail-item-slider-2").length) {
        $(".detail-item-slider-2").slick({
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: false,
          dots: false,
          arrows: false,
          centerPadding: "0",
          cssEase: "linear",
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 1,
                dots: false,
                arrows: false,
              },
            },
            {
              breakpoint: 993,
              settings: {
                slidesToShow: 2,
                dots: false,
                arrows: false,
              },
            },
            {
              breakpoint: 499,
              settings: {
                slidesToShow: 1,
                dots: false,
                arrows: false,
              },
            },
            
          ],
        });
      }

      // Product QuickView Popup Slider
      if ($(".product-view-slider").length) {
        $('.product-view-slider').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          dots: false,
          centerMode: true,
          variableWidth: true,
          infinite: true,
          focusOnSelect: true,
          cssEase: 'linear',
          touchMove: true,
          asNavFor: ".product-view-slider-nav",
        });
      }

      if ($(".product-view-slider-nav").length) {
        $(".product-view-slider-nav").slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          asNavFor: ".product-view-slider",
          dots: false,
          arrows: false,
          centerMode: false,
          focusOnSelect: true,
          responsive: [
            {
              breakpoint: 992,
              settings: {
                arrows: false,
                slidesToShow: 3,
              },
            },
          ],
        });
      }
    },

    // Header Toggle Menu
    headerToggleMenu: function () {
      $(".nav-btn").click(function () {
        $(".main-header__menu").slideToggle(500);
      });
      $(".nav-btn input").click(function (event) {
        event.stopPropagation();
      });
    },

    // Wishlist Icon
    wishListicon: function () {
      $(".button").click(function () {
        $(this).toggleClass("animate");
        $(this).toggleClass("active");
      });
    },

    // Quantity Controller
    quantityHandle: function () {
      $(".decrement").on("click", function () {
        var qtyInput = $(this).closest(".quantity-wrap").children(".number");
        var qtyVal = parseInt(qtyInput.val());
        if (qtyVal > 0) {
          qtyInput.val(qtyVal - 1);
        }
      });
      $(".increment").on("click", function () {
        var qtyInput = $(this).closest(".quantity-wrap").children(".number");
        var qtyVal = parseInt(qtyInput.val());
        qtyInput.val(parseInt(qtyVal + 1));
      });
    },


    // Cart Popup
    cartPopup: function () {
      $(".cart-button").click(function () {
        MyScroll.paused(true);
        $('.close-popup').css({ transform: "scale(1)" })
        $('#sidebar-cart').animate({ 'right': '0' }, 'slow')
      });
      $('.close-popup').on('click', function () {
        $('#sidebar-cart-curtain').css({ transform: "scale(0)" })
        $('#sidebar-cart').animate({ 'right': '-101%' }, 'slow')
        MyScroll.paused(false);
      })
    },

    // Wish-List Popup
    wishListPopup: function () {
      $(".wishlist-button").click(function () {
        MyScroll.paused(true);
        $('.close-popup').css({ transform: "scale(1)" })
        $('#sidebar-wishlist').animate({ 'right': '0' }, 'slow')
      });
      $('.close-popup').on('click', function () {
        $('#sidebar-wishlist-curtain').css({ transform: "scale(0)" })
        $('#sidebar-wishlist').animate({ 'right': '-101%' }, 'slow')
        MyScroll.paused(false);
      })
    },

    // Blog Search Toggle 
    blogSearch: function () {
      if ($("#searchInput").length) {
        $("#searchInput").on("keyup", function () {
          var value = $(this).val().toLowerCase();
          $(".blog-card").filter(function () {
            var hasMatch = $(this).find(".blog-title-text").text().toLowerCase().indexOf(value) > -1;
            $(this).toggle(hasMatch);
          });
        });
      }
    },

    // Search Toggle 
    searchToggle: function () {
      if ($(".search-toggler").length) {
        $(".search-toggler").on("click", function (e) {
          e.preventDefault();
          $(".search-popup").toggleClass("active");
          $(".mobile-nav__wrapper").removeClass("expanded");
          $("body").toggleClass("locked");
        });
      }
    },

    // Nice Select
    niceSelect: function () {
      if ($(".has-nice-select").length) {
        $('.has-nice-select, .contact-form select').niceSelect();
      }
    },

    // Quantity Slider
    jsSlider: function () {
      if ($(".js-slider").length) {
        $(".js-slider").ionRangeSlider({
          skin: "big",
          type: "double",
          grid: false,
          min: 0,
          max: 100,
          from: 20,
          to: 80,
          hide_min_max: true,
          hide_from_to: true,
        });
      }
    },

    // Filter Toggle Button
    filterToggle: function () {
      if ($('.filter-block').length) {
        $(".filter-block .title").on("click", function (e) {
          var count = $(this).data('count');
          if ($('.filter-block.box-' + count + ' .content-block').is(':visible')) {
            $('.filter-block.box-' + count + ' i').removeClass('fa-horizontal-rule');
            $('.filter-block.box-' + count + ' i').addClass('fa-plus');
            $('.filter-block.box-' + count + ' .content-block').hide('slow');

          } else {
            $('.filter-block.box-' + count + ' i').removeClass('fa-plus');
            $('.filter-block.box-' + count + ' i').addClass('fa-horizontal-rule');
            $('.filter-block.box-' + count + ' .content-block').show('slow');
          }
        })
      }
    },

    // Size Guide Chart
    sizeGuideChart: function () {
      function toggleSizeGuide() {
        gsap.globalTimeline.pause();
        $('.sg-ctn0, .fade-overlay').toggleClass('show');
      }
      $('.size-guideBtn').on('click', function () {
        toggleSizeGuide();
      });
      $('.sg-close, .fade-overlay').on('click', function () {
        toggleSizeGuide();
        gsap.globalTimeline.resume();
      });
    },

    // CheckOut Same Billing Address
    billingAddress: function () {
      if ($("#bill-address").length) {
        $('.billing-address-form').hide();
        $('#bill-address').change(function () {
          if ($(this).is(':checked')) {
            $('.billing-address-form').hide("slow");
          } else {
            $('.billing-address-form').show("slow");
          }
        });
      }
    },

    // Form Validation
    formValidation: function () {
      if ($(".form-validate").length) {
        $(".form-validate").validate();
      }
    },


    // Contact Form 
    contactForm: function () {
      $(".contact-form").on("submit", function (e) {
        e.preventDefault();
        if ($(".contact-form").valid()) {
          var _self = $(this);
          _self
            .closest("div")
            .find('button[type="submit"]')
            .attr("disabled", "disabled");
          var data = $(this).serialize();
          $.ajax({
            url: "./assets/mail/contact.php",
            type: "post",
            dataType: "json",
            data: data,
            success: function (data) {
              $(".contact-form").trigger("reset");
              _self.find('button[type="submit"]').removeAttr("disabled");
              if (data.success) {
                document.getElementById("message").innerHTML =
                  "<h3 class='color-primary mt-5'>Email Sent Successfully</h3>";
              } else {
                document.getElementById("message").innerHTML =
                  "<h3 class='color-primary mt-5'>There is an error</h3>";
              }
              $("#message").show("slow");
              $("#message").slideDown("slow");
              setTimeout(function () {
                $("#message").slideUp("hide");
                $("#message").hide("slow");
              }, 3000);
            },
          });
        } else {
          return false;
        }
      });
    },
    
    // Countdown Timer
    countdownInit: function (countdownSelector, countdownTime, countdown) {
      var eventCounter = $(countdownSelector);
      if (eventCounter.length) {
        eventCounter.countdown(countdownTime, function (e) {
          $(this).html(
            e.strftime(
              '<li><h2>%D</h2><h6>Days</h6></li>\
              <li><h2>%H</h2><h6>Hrs</h6></li>\
              <li><h2>%M</h2><h6>Min</h6></li>\
              <li><h2>%S</h2><h6>Sec</h6></li>'
            )
            );
          });
        }
      },
      
    // Top Bar on Shop Pag
    shopFilterToggle: function () {
      $('.filter-menu').click(function() {
        $('.sidebar').toggle('slow'); 
      });
    },
    
  };

  Init.i();
})(window, document, jQuery);

function changeField(element , feildClass) {
  $('.brand-block').removeClass('show')
  $(element).addClass('show')
  $('.brand_item_detail').removeClass('show')
  $('.'+feildClass).addClass('show')

}

