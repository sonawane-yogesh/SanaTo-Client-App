import { Component, AfterViewInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements AfterViewInit, AfterContentInit {
  constructor(private router: Router) { }
  openWin(url: string, activeMenu: string, event: Event) {
    localStorage.setItem("activeMenu", activeMenu);
    this.router.navigate([url]);
  }
  ngAfterContentInit(): void {
    $('.submenu > a').each(function () {
      $(this).parents('li').each(function () {
        $(this).removeClass("active");
      });
    });
    var menuClassName = localStorage.getItem("activeMenu") || "icon-home";
    var li = $(`.${menuClassName}`).parents('li');
    li.addClass("active"); 
  }
  ngAfterViewInit(): void {
    $('.submenu > a').click(function (e) {
      e.preventDefault();
      var submenu = $(this).siblings('ul');
      var li = $(this).parents('li');
      var submenus = $('#sidebar li.submenu ul');
      var submenus_parents = $('#sidebar li.submenu');
      if (li.hasClass('open')) {
        if (($(window).width() > 768) || ($(window).width() < 479)) {
          submenu.slideUp();
        } else {
          submenu.fadeOut(250);
        }
        li.removeClass('open');
      } else {
        if (($(window).width() > 768) || ($(window).width() < 479)) {
          submenus.slideUp();
          submenu.slideDown();
        } else {
          submenus.fadeOut(250);
          submenu.fadeIn(250);
        }
        submenus_parents.removeClass('open');
        li.addClass('open');
      }
    });
    var ul = $('#sidebar > ul');
    $('#sidebar > a').click(function (e) {
      e.preventDefault();
      var sidebar = $('#sidebar');
      if (sidebar.hasClass('open')) {
        sidebar.removeClass('open');
        ul.slideUp(250);
      } else {
        sidebar.addClass('open');
        ul.slideDown(250);
      }
    });
    $(window).resize(function () {
      if ($(window).width() > 479) {
        ul.css({
          'display': 'block'
        });
        $('#content-header .btn-group').css({
          width: 'auto'
        });
      }
      if ($(window).width() < 479) {
        ul.css({
          'display': 'none'
        });
        fix_position();
      }
      if ($(window).width() > 768) {
        $('#user-nav > ul').css({
          width: 'auto',
          margin: '0'
        });
        $('#content-header .btn-group').css({
          width: 'auto'
        });
      }
    });
    if ($(window).width() < 468) {
      ul.css({
        'display': 'none'
      });
      fix_position();
    }
    if ($(window).width() > 479) {
      $('#content-header .btn-group').css({
        width: 'auto'
      });
      ul.css({
        'display': 'block'
      });
    }
    /*
    $('.tip').tooltip({
      sanitize: false,
      popperConfig: null,
      sanitizeFn: content => content
    });
    $('.tip-left').tooltip({
      placement: 'left',
      sanitize: false,
      popperConfig: null,
      sanitizeFn: content => content
    });
    $('.tip-right').tooltip({
      placement: 'right',
      sanitize: false,
      popperConfig: null,
      sanitizeFn: content => content
    });
    $('.tip-top').tooltip({
      placement: 'top',
      sanitize: false,
      popperConfig: null,
      sanitizeFn: content => content
    });
    
    $('.tip-bottom').tooltip({
      placement: 'bottom',
      sanitize: false,
      popperConfig: {},
      sanitizeFn: content => content
    });
    */    
    var fix_position = function () {
      var uwidth = $('#user-nav > ul').width();
      $('#user-nav > ul').css({
        width: uwidth,
        'margin-left': '-' + uwidth / 2 + 'px'
      });
      var cwidth = $('#content-header .btn-group').width();
      $('#content-header .btn-group').css({
        width: cwidth,
        'margin-left': '-' + uwidth / 2 + 'px'
      });
    };

    $('#style-switcher i').click(function () {
      if ($(this).hasClass('open')) {
        $(this).parent().animate({
          marginRight: '-=190'
        });
        $(this).removeClass('open');
      } else {
        $(this).parent().animate({
          marginRight: '+=190'
        });
        $(this).addClass('open');
      }
      $(this).toggleClass('icon-arrow-left');
      $(this).toggleClass('icon-arrow-right');
    });

    $('#style-switcher a').click(function () {
      var style = $(this).attr('href').replace('#', '');
      $('.skin-color').attr('href', 'css/maruti.' + style + '.css');
      $(this).siblings('a').css({
        'border-color': 'transparent'
      });
      $(this).css({
        'border-color': '#aaaaaa'
      });
    });

    $('.lightbox_trigger').click(function (e) {
      e.preventDefault();
      var imageHref = $(this).attr("href");
      if ($('#lightbox').length > 0) {
        $('#imgbox').html('<img src="' + imageHref + '" /><p><i class="icon-remove icon-white"></i></p>');
        $('#lightbox').slideDown(500);
      } else {
        var lightbox =
          '<div id="lightbox" style="display:none;">' +
          '<div id="imgbox"><img src="' + imageHref + '" />' +
          '<p><i class="icon-remove icon-white"></i></p>' +
          '</div>' +
          '</div>';
        $('body').append(lightbox);
        $('#lightbox').slideDown(500);
      }
    });
    var menuClassName = localStorage.getItem("activeMenu") || "icon-home";
    if (typeof menuClassName === undefined || menuClassName === "" || menuClassName === null) return;
    this.expandCurrentMenu(menuClassName);
  };
  expandCurrentMenu(menuClassName: string) {
    var li = $(`.${menuClassName}`).parents('li');
    li.addClass("active");
    var submenu = $(`.${menuClassName}`).siblings('ul');
    var li = $(`.${menuClassName}`).parents('li');
    var submenus = $('#sidebar li.submenu ul');
    var submenus_parents = $('#sidebar li.submenu');
    if (li.hasClass('open')) {
      if (($(window).width() > 768) || ($(window).width() < 479)) {
        submenu.slideUp();
      } else {
        submenu.fadeOut(250);
      }
      li.removeClass('open');
    } else {
      if (($(window).width() > 768) || ($(window).width() < 479)) {
        submenus.slideUp();
        submenu.slideDown();
      } else {
        submenus.fadeOut(250);
        submenu.fadeIn(250);
      }
      submenus_parents.removeClass('open');
      li.addClass('open');
    }
  }
};

