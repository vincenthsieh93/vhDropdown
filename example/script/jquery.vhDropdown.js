(function($) {
    var windowHeight = $(window).height();
    var windowTop = $(window).scrollTop();

    var $toggle = null;
    var $menuShow = null;
    var $parentScrollbar = null;

    var flex = false;
    var autoPosition = true;
    var menuSize = null;
    var position = null;
    var toggleHeight = 0;

    $(window).on('click', function(e) {
        if (!e.target.classList.contains('vhDd__toggle') && !e.target.classList.contains('scrollbar-macosx') && !e.target.classList.contains('scroll-bar')) {
            $('.vhDd__menu').removeClass('vhDd__menu_opened');
        }
    });

    $(window).resize(function() {
        windowHeight = $(window).height();
        windowTop = $(window).scrollTop();
        position = _getPosition(windowHeight, windowTop, $toggle, toggleHeight, $parentScrollbar);
        
        if (position.toTop !== 0 && position.toBottom !== 0) {
            if (autoPosition) {
                if (position.toBottom >= (position.toTop + position.scrollTop) || (position.toBottom + position.scrollBottom) >= (menuSize.innerHeight + 10)) {
                    $menuShow.css(_downStyle(toggleHeight));
                    if (flex)
                        $menuShow.find('.scrollbar-macosx').css('max-height', (position.toBottom + position.scrollBottom) - 20);
                } else {
                    if (flex) {
                        if(menuSize.innerHeight < (position.toTop + position.scrollTop)) {
                            $menuShow.css(_upperStyle(menuSize.innerHeight));
                        } else {
                            $menuShow.css(_upperStyle(position.toTop + position.scrollTop - 20));
                            $menuShow.find('.scrollbar-macosx').css('max-height', position.toTop + position.scrollTop - 20);
                        }
                    } else {
                        $menuShow.css(_upperStyle(menuSize.innerHeight));
                    }
                }
            } else {
                $menuShow.css(_downStyle(toggleHeight));
            }
        } else {
            return;
        }
    });

    $(window).on('scroll', function() {
        windowTop = $(window).scrollTop();
        position = _getPosition(windowHeight, windowTop, $toggle, toggleHeight, $parentScrollbar);

        if (position.toTop !== 0 && position.toBottom !== 0) {
            if (autoPosition) {
                if (position.toBottom >= (position.toTop + position.scrollTop) || (position.toBottom + position.scrollBottom) >= (menuSize.innerHeight + 10)) {
                    $menuShow.css(_downStyle(toggleHeight));
                    if (flex)
                        $menuShow.find('.scrollbar-macosx').css('max-height', (position.toBottom + position.scrollBottom) - 20);
                } else {
                    if (flex) {
                        if(menuSize.innerHeight < (position.toTop + position.scrollTop)) {
                            $menuShow.css(_upperStyle(menuSize.innerHeight));
                        } else {
                            $menuShow.css(_upperStyle(position.toTop + position.scrollTop - 20));
                            $menuShow.find('.scrollbar-macosx').css('max-height', position.toTop + position.scrollTop - 20);
                        }
                    } else {
                        $menuShow.css(_upperStyle(menuSize.innerHeight));
                    }
                }
            } else {
                $menuShow.css(_downStyle(toggleHeight));
            }
        } else {
            return;
        }
    });

    $('.scrollbar-macosx').not('.scroll-wrapper').each(function() {
        $(this).on('scroll', function() {
            windowTop = $(window).scrollTop();
            position = _getPosition(windowHeight, windowTop, $toggle, toggleHeight, $parentScrollbar);
            
            if (position.toTop !== 0 && position.toBottom !== 0) {
                if (autoPosition) {
                    if (position.toBottom >= (position.toTop + position.scrollTop) || (position.toBottom + position.scrollBottom) >= (menuSize.innerHeight + 10)) {
                        $menuShow.css(_downStyle(toggleHeight));
                        if (flex)
                            $menuShow.find('.scrollbar-macosx').css('max-height', (position.toBottom + position.scrollBottom) - 20)
                    } else {
                        if (flex) {
                            if (menuSize.innerHeight < (position.toTop + position.scrollTop)) {
                                $menuShow.css(_upperStyle(menuSize.innerHeight));
                            } else {
                                $menuShow.css(_upperStyle(position.toTop + position.scrollTop - 20));
                                $menuShow.find('.scrollbar-macosx').css('max-height', position.toTop + position.scrollTop - 20);
                            }
                        } else {
                            $menuShow.css(_upperStyle(menuSize.innerHeight));
                        }
                    }
                } else {
                    $menuShow.css(_downStyle(toggleHeight));
                }
            } else {
                return;
            }
        })
    });

    $.fn.vhDropdown = function(options) {
        this.parent().addClass('vhDd');
        this.addClass('vhDd__toggle');
        this.next().addClass('vhDd__menu');

        var settings = $.extend({
            autoDroptop: true,
            insideClosed: true,
            tranditionList: false,
            flexible: false
        }, options);

        if (settings.tranditionList) {
            try {
                if (!settings.insideClosed)
                    throw '在tranditionList為true時，insideClosed不可為false!';
            } catch (error) {
                console.error(error);
            }

            settings.insideClosed = true;
            
            this.each(function() {
                var $tranditionContent = $(this).find('p');
                $tranditionContent.addClass('vhDd__content');

                var $tranditionItems = $(this).next('.vhDd__menu').find('li');
                $tranditionItems.addClass('vhDd__item').wrapInner('<p class="vhDd__option"></p>');

                var $content = $(this).find('.vhDd__content');
                var $option = $(this).next('.vhDd__menu').find('.vhDd__item');
                $option.off('click').on('click', function() {
                    $content.text($(this).text());
                })
            });
        }

        this.each(function() {
            $(this).off('click').on('click', function(e) {
                $toggle = $(this);
                var $menu = $toggle.next('.vhDd__menu');

                $menuShow = $menu.toggleClass('vhDd__menu_opened');

                $('.vhDd__menu').not($menu).removeClass('vhDd__menu_opened');

                if ($menuShow.hasClass('vhDd__menu_opened')) {
                    try {
                        var fpkScrollbarInside = $menuShow.is(function() {
                            return $(this).children().hasClass('scrollbar-macosx');
                        });

                        if (settings.flexible && !fpkScrollbarInside)
                            throw 'flexible為true，但找不到scrollbar plugin!';
                    } catch (error) {
                        console.error(error);
                    }

                    toggleHeight = $(e.target).outerHeight();
                    $parentScrollbar = $(e.target).parents('.scrollbar-macosx').not('.scroll-wrapper').eq(0);
                    menuSize = ($menuShow.find('*').hasClass('scrollbar-macosx')) ? _getHiddenDimensions($menuShow.find('.scroll-content').eq(0).children()) : _getHiddenDimensions($menuShow.children());
                    position = _getPosition(windowHeight, windowTop, $(e.target), toggleHeight, $parentScrollbar);

                    if (settings.autoDroptop) {
                        autoPosition = true;
                        
                        if ((position.toBottom + position.scrollBottom) >= (position.toTop + position.scrollTop) || (position.toBottom + position.scrollBottom) >= (menuSize.innerHeight + 10)) {
                            $menuShow.css(_downStyle(toggleHeight));

                            if (settings.flexible) {
                                flex = true;

                                $menuShow.find('.scrollbar-macosx').css('max-height', (position.toBottom + position.scrollBottom) - 20);
                            }
                        } else {
                            if (settings.flexible) {
                                flex = true;
                                
                                if (menuSize.innerHeight < (position.toTop + position.scrollTop)) {
                                    $menuShow.css(_upperStyle(menuSize.innerHeight));
                                } else {
                                    $menuShow.css(_upperStyle(position.toTop + position.scrollTop - 20));
                                    $menuShow.find('.scrollbar-macosx').css('max-height', position.toTop + position.scrollTop - 20);
                                }
                            } else {
                                flex = false;

                                $menuShow.css(_upperStyle(menuSize.innerHeight));
                            }
                        }
                    } else {
                        autoPosition = false;

                        $menuShow.css(_downStyle(toggleHeight));
                    }
                }
            })
        });

        var $menus = this.next('.vhDd__menu');
        $menus.each(function() {
            $(this).off('click').on('click', function(e) {
                if (!settings.insideClosed) {
                    try {
                        if (settings.tranditionList) {
                            throw '在insideClosed為false時，tranditionList不可為true!';
                        } else {
                            e.stopPropagation();
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }
            })
        });
    }

    function _downStyle(elHeight) {
        var style = {
            'position': 'absolute',
            'top': (elHeight + 10) + 'px'
        };

        return style;
    }

    function _upperStyle(elHeight) {
        var style = {
            'position': 'absolute',
            'top': (0 - (elHeight + 10)) + 'px'
        };

        return style;
    }

    function _toPositionTop(elTop) {
        return elTop - windowTop;
    }

    function _toPositionBottom(elTop, elHeight) {
        var objToBrowserTop = elTop - windowTop;      
        return windowHeight - (objToBrowserTop + elHeight);
    }

    function _getHiddenDimensions(el, includeMargin) {
        var $item = el,
            props = {
                position: 'absolute',
                visibility: 'hidden',
                display: 'block'
            },
            dim = {
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                outerWidth: 0,
                outerHeight: 0
            },
            $hiddenParents = $item.parents().addBack().not(':visible'),
            includeMargin = (includeMargin == null) ? false : includeMargin;

        var oldProps = [];
        $hiddenParents.each(function() {
            var old = {};
            
            for (var name in props) {
                old[name] = this.style[name];
                this.style[name] = props[name];
            }

            oldProps.push(old);
        })
        
        dim.width = $item.width();
        dim.innerWidth = $item.innerWidth();
        dim.outerWidth = $item.outerWidth(includeMargin);
        dim.height = $item.height();
        dim.innerHeight = $item.innerHeight();
        dim.outerHeight = $item.outerHeight(includeMargin);

        $hiddenParents.each(function(i) {
            var old = oldProps[i];
            for (var name in props) {
                this.style[name] = old[name];
            }
        })

        return dim;
    }

    function _getPosition(browserHeight, browserScrollTop, target, targetHeight, targetParent) {
        if (target !== null && targetParent !== 0) {
            var toggleY = target.offset().top;
            var toggleToTop = _toPositionTop(toggleY);
            var toggleToBottom = _toPositionBottom(toggleY, targetHeight);
            var scrollbarTop = browserScrollTop;
            var scrollbarBottom = document.documentElement.scrollHeight - (browserHeight + browserScrollTop);
            
            if (target.parents().hasClass('scrollbar-macosx')) {
                toggleToTop = toggleY - targetParent.offset().top;
                toggleToBottom -= _toPositionBottom(targetParent.offset().top, targetParent.height());
                scrollbarTop = targetParent.scrollTop();
                scrollbarBottom = targetParent.prop('scrollHeight') - (targetParent.height() + scrollbarTop);
            }

            return {
                toTop: toggleToTop,
                toBottom: toggleToBottom,
                scrollTop: scrollbarTop,
                scrollBottom: scrollbarBottom
            };
        } else {
            return {
                toTop: 0,
                toBottom: 0,
                scrollTop: 0,
                scrollBottom: 0
            };
        }
    }
}(jQuery))