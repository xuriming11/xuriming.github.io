/* ============================================
   徐日明 · 个人作品集 - 交互脚本
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // 导航栏滚动效果
    // ============================================
    const navbar = document.querySelector('.navbar');
    const backToTop = document.querySelector('.back-to-top');
    
    function handleScroll() {
        const scrollY = window.scrollY;
        
        // 导航栏样式变化
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // 回到顶部按钮
        if (scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // 回到顶部
    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============================================
    // 移动端菜单
    // ============================================
    const menuBtn = document.querySelector('.nav-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    let menuOpen = false;
    
    menuBtn.addEventListener('click', function() {
        menuOpen = !menuOpen;
        mobileMenu.classList.toggle('active', menuOpen);
    });
    
    // 点击菜单项后关闭
    mobileLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            menuOpen = false;
            mobileMenu.classList.remove('active');
        });
    });
    
    // 点击页面其他地方关闭菜单
    document.addEventListener('click', function(e) {
        if (menuOpen && 
            !mobileMenu.contains(e.target) && 
            !menuBtn.contains(e.target)) {
            menuOpen = false;
            mobileMenu.classList.remove('active');
        }
    });

    // ============================================
    // 滚动显示动画 (Intersection Observer)
    // ============================================
    const revealElements = document.querySelectorAll(
        '.reveal, .reveal-delay-1, .reveal-delay-2, .reveal-delay-3'
    );
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(function(el) {
            observer.observe(el);
        });
    } else {
        // 降级方案：直接显示
        revealElements.forEach(function(el) {
            el.classList.add('active');
        });
    }

    // ============================================
    // 平滑滚动到锚点
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - navHeight + 1;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // 导航高亮 (滚动时高亮当前章节)
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightNav() {
        const scrollY = window.scrollY + 120;
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav, { passive: true });

    // ============================================
    // Hero 视觉区视差效果
    // ============================================
    const heroVisual = document.querySelector('.hero-visual');
    const visualCard = document.querySelector('.card-1');
    const badge1 = document.querySelector('.badge-1');
    const badge2 = document.querySelector('.badge-2');
    
    if (heroVisual && window.innerWidth > 768) {
        heroVisual.addEventListener('mousemove', function(e) {
            const rect = heroVisual.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            if (visualCard) {
                visualCard.style.transform = 'rotate(-2deg) translate(' + (x * 10) + 'px, ' + (y * 10) + 'px)';
            }
            if (badge1) {
                badge1.style.transform = 'rotate(3deg) translate(' + (x * -8) + 'px, ' + (y * -8) + 'px)';
            }
            if (badge2) {
                badge2.style.transform = 'rotate(-1deg) translate(' + (x * 12) + 'px, ' + (y * 6) + 'px)';
            }
        });
        
        heroVisual.addEventListener('mouseleave', function() {
            if (visualCard) {
                visualCard.style.transform = 'rotate(-2deg) translate(0, 0)';
            }
            if (badge1) {
                badge1.style.transform = 'rotate(3deg) translate(0, 0)';
            }
            if (badge2) {
                badge2.style.transform = 'rotate(-1deg) translate(0, 0)';
            }
        });
    }

    // ============================================
    // 项目卡片 3D 倾斜效果
    // ============================================
    const projectCards = document.querySelectorAll('.project-card');
    
    if (window.innerWidth > 768) {
        projectCards.forEach(function(card) {
            card.addEventListener('mousemove', function(e) {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                
                card.style.transform = 'translateY(-8px) perspective(1000px) rotateY(' + (x * 5) + 'deg) rotateX(' + (-y * 5) + 'deg)';
            });
            
            card.addEventListener('mouseleave', function() {
                card.style.transform = 'translateY(0) perspective(1000px) rotateY(0) rotateX(0)';
            });
        });
    }

    // ============================================
    // 数字计数动画
    // ============================================
    function animateCounter(element, target, suffix, duration) {
        if (suffix === undefined) suffix = '';
        if (duration === undefined) duration = 1500;
        
        const start = 0;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeOut);
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }

    // 统计数字动画（当 hero 区域可见时触发）
    const heroStats = document.querySelector('.hero-stats');
    let statsAnimated = false;
    
    if (heroStats && 'IntersectionObserver' in window) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    const statNums = document.querySelectorAll('.stat-num');
                    if (statNums.length >= 3) {
                        animateCounter(statNums[0].firstChild, 5, '+');
                        animateCounter(statNums[1].firstChild, 85, '%');
                        animateCounter(statNums[2].firstChild, 40, '%');
                    }
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(heroStats);
    }

    // ============================================
    // 页面加载完成后的初始化
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
        // 给 hero 区域的元素添加 active 类（首屏立即显示）
        const heroReveals = document.querySelectorAll('.hero .reveal, .hero .reveal-delay-1, .hero .reveal-delay-2, .hero .reveal-delay-3');
        setTimeout(function() {
            heroReveals.forEach(function(el) {
                el.classList.add('active');
            });
        }, 100);
    });

})();
