// Template Name: Glamour
// Template URL: https://uiparadox.co.uk/templates/glamour
// Description: Glamour - Clothing Store Html Template                                             
// Version: 1.0.0
(function (window, document, $, undefined) {
  "use strict";
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
      Init.BackToTop();
      Init.preloader();
      Init.quantityHandle();
      Init.searchToggle();
      Init.cartPopup();
      Init.intializeSlick();
      Init.formValidation();
      Init.contactForm();
      Init.videoPlay();
      Init.jsSlider();
    },
    w: function (e) {
      this._window.on("load", Init.l).on("scroll", Init.res);
    },
    BackToTop: function () {
      var btn = $("#backto-top");
      $(window).on("scroll", function () {
        if ($(window).scrollTop() > 300) {
          btn.addClass("show");
        } else {
          btn.removeClass("show");
        }
      });
      btn.on("click", function (e) {
        e.preventDefault();
        $("html, body").animate(
          {
            scrollTop: 0,
          },
          "300"
        );
      });
    },
    preloader: function () {
      setTimeout(function () {
        $('#ctn-preloader').addClass('loaded');
        $('body').removeClass('no-scroll-y');
        if ($('#ctn-preloader').hasClass('loaded')) {
          $('#preloader').delay(1000).queue(function () {
            $(this).remove();
          });
        }
      }, 3000);
    },
    // Cart Popup
    cartPopup: function () {
      $(".cart-button").click(function () {
        $('.close-popup').css({ transform: "scale(1)" })
        $('#sidebar-cart').animate({ 'right': '0' }, 'slow')
      });
      $('.close-popup').on('click', function () {
        $('#sidebar-cart-curtain').css({ transform: "scale(0)" })
        $('#sidebar-cart').animate({ 'right': '-101%' }, 'slow')
      })
    },
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
    searchToggle: function () {
      var el = $(".search-btn");
      $(el).on("click", function () {
        if ($("#search-form").is(":visible")) {
          $("#search-form").hide("slow");
        } else {
          $("#search-form").show("slow");
        }
      });
    },
    intializeSlick: function (e) {
      if ($(".product-slider").length) {
        $(".product-slider").slick({
          infinite: true,
          slidesToShow: 6,
          slidesToScroll: 2,
          arrows: true,
          centerPadding: '15px',
          centerMode: true,
          autoplay: true,
          dots: false,
          cssEase: 'linear',
          autoplaySpeed: 2000,
          responsive: [
            {
              breakpoint: 1499,
              settings: {
                slidesToShow: 5,
              },
            },
            {
              breakpoint: 1299,
              settings: {
                slidesToShow: 4,
              },
            },
            {
              breakpoint: 1050,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 492,
              settings: {
                slidesToShow: 1,
              },
            }
          ],
        });
      }
      if ($(".preview-slider").length) {
        $(".preview-slider").slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          fade: true,
          asNavFor: ".preview-slider-nav",
        });
      }
      if ($(".preview-slider-nav").length) {
        $(".preview-slider-nav").slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          asNavFor: ".preview-slider",
          dots: false,
          arrows: false,
          centerMode: false,
          focusOnSelect: true,
          responsive: [
            {
              breakpoint: 990,
              settings: {
                arrows: false,
              },
            },
            {
              breakpoint: 768,
              settings: {
                arrows: false,
                slidesToShow: 2,
              },
            },
          ],
        });
      }
    },
    formValidation: function () {
      if ($(".contact-form").length) {
        $(".contact-form").validate();
      }
    },
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
                  "<h3 class='bg-primary text-white p-3 mt-3'>Email Sent Successfully</h3>";
              } else {
                document.getElementById("message").innerHTML =
                  "<h3 class='bg-primary text-white p-3 mt-3'>There is an error</h3>";
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
    videoPlay: function () {
      var $videoSrc;
      $('.play-button').click(function () {
        $videoSrc = $(this).data("src");
        $("#video").attr('src', $videoSrc);
      });
      $('.btn-close').click(function () {
        $("#video").attr('src',' ');
      });
    },
    jsSlider: function () {
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
  }
  Init.i();
})(window, document, jQuery);
