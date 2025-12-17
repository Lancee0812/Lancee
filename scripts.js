// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const navbar = document.getElementById('navbar');
    const progressBar = document.getElementById('progress-bar');
    let lastScrollTop = 0; // 记录上一次滚动位置
    
    // 监听滚动事件
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 导航栏背景变化 - 基于滚动方向判断
        if (scrollTop > lastScrollTop && scrollTop > 50) {
            // 向下滚动且超过阈值，显示scrolled状态
            navbar.classList.add('scrolled');
        } else if (scrollTop < lastScrollTop) {
            // 向上滚动，隐藏scrolled状态
            navbar.classList.remove('scrolled');
        }
        
        // 更新上一次滚动位置
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // 防止负值
        
        // 进度条更新
        updateProgressBar();
        
        // 检查元素是否进入视口，添加动画效果
        checkScroll();
    });
    
    // 更新进度条
    function updateProgressBar() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }
    
    // 初始化进度条
    updateProgressBar();
    
    // 作品筛选功能
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的active状态
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // 添加当前按钮的active状态
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // 筛选作品项
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    // 添加淡入动画
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transition = 'opacity 0.5s ease';
                    }, 50);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // 作品项点击事件
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            // 这里可以添加打开作品详情的逻辑
            const title = this.querySelector('h3').textContent;
            alert(`查看作品: ${title}`);
            // 实际项目中可以实现更复杂的详情展示模态框
        });
    });
    
    // 滚动动画设置
    const animatedElements = document.querySelectorAll('.section-title, .fursona-details, .portfolio-item, .about-text');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // 初始化动画元素样式
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // 立即检查一次，确保首屏元素可见
    checkScroll();
    
    // 导航链接平滑滚动
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;
            const navbarHeight = navbar.offsetHeight; // 动态获取导航栏实际高度
            
            if (targetElement) {
                // 检查是否向下滚动
                if (targetElement.offsetTop > currentScrollPos) {
                    // 向下滚动时，不考虑导航栏高度（因为导航栏会隐藏）
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                } else {
                    // 向上滚动时，考虑导航栏高度
                    window.scrollTo({
                        top: targetElement.offsetTop - navbarHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // 按钮悬停效果增强（已在CSS中实现基本效果，这里可以添加额外的JS交互）
    // 为按钮添加按下效果 - 不使用内联样式避免覆盖CSS hover
    const buttons = document.querySelectorAll('.btn, .filter-btn, .pagination-btn, .social-link');
    
    buttons.forEach(button => {
        // 添加鼠标按下效果
        button.addEventListener('mousedown', function() {
            this.classList.add('btn-pressed');
        });
        
        // 移除按下效果
        function removePressed() {
            this.classList.remove('btn-pressed');
        }
        
        button.addEventListener('mouseup', removePressed);
        button.addEventListener('mouseleave', removePressed);
    });
    
    // 实现图片懒加载效果
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.removeAttribute('data-src');
                    imageObserver.unobserve(image);
                    
                    // 添加淡入效果
                    image.style.opacity = '0';
                    image.style.transition = 'opacity 0.5s ease';
                    setTimeout(() => {
                        image.style.opacity = '1';
                    }, 100);
                }
            });
        });
        
        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    } else {
        // 回退方案
        lazyImages.forEach(image => {
            image.src = image.dataset.src;
            image.removeAttribute('data-src');
        });
    }
    
    // 为图片添加点击放大效果
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    
    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            // 这里可以实现图片放大预览功能
            // 在实际项目中，可以使用lightbox或自定义模态框
            this.classList.toggle('expanded');
            
            if (this.classList.contains('expanded')) {
                this.style.position = 'relative';
                this.style.zIndex = '1000';
                this.style.transform = 'scale(1.2)';
                this.style.transition = 'transform 0.3s ease';
                this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
            } else {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'var(--shadow-light)';
                setTimeout(() => {
                    this.style.position = 'static';
                    this.style.zIndex = '1';
                }, 300);
            }
        });
    });
    
    // 响应式菜单处理（在小屏幕上可能需要）
    // 这里为未来的移动端菜单扩展预留了接口
    
    // 页面加载完成后的欢迎效果
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
        heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
        
        // 启动名字打字动画
        startNameTypingAnimation();
    }, 300);
    
    // 实现名字打字动画：字母逐个显示，i之后同时出现'和x
    function startNameTypingAnimation() {
        const nameElement = document.getElementById('name-typing');
        // 精确的逐字符打字序列：n → na → nai → nai' → nai'x → nai'xi → 奶 → 奶昔
        const typingSequence = ['n', 'na', 'nai', "nai'x", "nai'xi", '奶昔'];
        let currentIndex = 0;
        
        // 设置初始状态
        nameElement.textContent = '';
        
        // 开始逐字符打字动画
        setTimeout(() => {
            function typeNext() {
                if (currentIndex < typingSequence.length) {
                    nameElement.textContent = typingSequence[currentIndex];
                    currentIndex++;
                    
                    // 设置不同阶段的打字速度
                    let delay = 300; // 默认打字速度
                    if (currentIndex === typingSequence.length - 1) {
                        delay = 600; // 在切换到中文前稍微停顿
                    }
                    
                    setTimeout(typeNext, delay);
                } else {
                    // 打字动画完成后调用回调函数
                    onTypingAnimationComplete();
                }
            }
            
            typeNext(); // 开始打字动画
        }, 500); // 等待500毫秒后开始动画
    }
    
    // 打字动画完成后的回调函数
    function onTypingAnimationComplete() {
        // 延迟200毫秒后显示"不是小饮料！"，让名字显示稳定
        setTimeout(() => {
            showPlayfulText();
        }, 500);
    }
    
    // 显示"不是小饮料！"并添加动画效果
    function showPlayfulText() {
        const playfulText = document.querySelector('.playful-text');
        if (playfulText) {
            playfulText.classList.add('show');
        }
    }
    
    // Fursona特性突出显示
    const characteristics = document.querySelectorAll('.characteristic');
    
    characteristics.forEach((char, index) => {
        char.addEventListener('mouseenter', function() {
            // 可以为不同特性添加独特的强调效果
            this.style.backgroundColor = `rgba(42, 157, 143, ${0.05 + index * 0.05})`;
            this.style.borderRadius = 'var(--border-radius-small)';
            this.style.padding = 'var(--spacing-md)';
            this.style.transition = 'all 0.3s ease';
        });
        
        char.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
            this.style.padding = '0';
        });
    });
    
    // 回到顶部按钮功能
    const backToTopBtn = document.getElementById('back-to-top');
    
    // 滚动检测
    window.addEventListener('scroll', () => {
        const heroHeight = document.getElementById('hero').offsetHeight;
        // 当滚动超过hero区域时显示按钮
        if (window.pageYOffset > heroHeight) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // 点击事件
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 统计页面访问信息（简单实现）
    function trackPageView() {
        console.log('页面访问已记录');
        // 在实际项目中可以集成分析工具
    }
    
    // 调用页面访问统计
    trackPageView();

    // 联系内容切换功能
    const socialLinks = document.querySelectorAll('.social-link');
    const currentIframe = document.getElementById('currentIframe');
    const currentImage = document.getElementById('currentImage');
    let autoRotateInterval = null;
    let currentIndex = 0;
    let isUserInteracting = false;
    const ROTATE_INTERVAL = 3000; // 自动轮播间隔，3秒
    
    // 检测是否为PC设备
    function isPC() {
        const userAgentInfo = navigator.userAgent;
        const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
        let isPCDevice = true;
        for (let i = 0; i < Agents.length; i++) {
            if (userAgentInfo.indexOf(Agents[i]) > 0) {
                isPCDevice = false;
                break;
            }
        }
        return isPCDevice;
    }
    
    // 切换到指定索引的链接
    function switchToLink(index) {
        // 确保索引在有效范围内
        index = index % socialLinks.length;
        if (index < 0) {
            index = socialLinks.length - 1;
        }
        
        // 移除所有链接的active类
        socialLinks.forEach(l => l.classList.remove('active'));
        // 添加当前链接的active类
        socialLinks[index].classList.add('active');
        
        // 获取当前链接的数据属性
        const linkHref = socialLinks[index].getAttribute('href');
        const imageUrl = socialLinks[index].getAttribute('data-image');
        const imageAlt = socialLinks[index].getAttribute('data-alt');
        
        // 根据索引决定显示iframe还是图片
        // 前2个链接显示网页，后4个链接显示照片
        if (index < 2) {
            // 显示网页
            currentImage.style.display = 'none';
            currentIframe.style.display = 'block';
            currentIframe.style.opacity = '0';
            setTimeout(() => {
                currentIframe.src = linkHref;
                currentIframe.alt = imageAlt;
                currentIframe.style.opacity = '1';
            }, 300);
        } else {
            // 显示照片
            currentIframe.style.display = 'none';
            currentImage.style.display = 'block';
            currentImage.style.opacity = '0';
            setTimeout(() => {
                currentImage.src = imageUrl;
                currentImage.alt = imageAlt;
                currentImage.style.opacity = '1';
            }, 300);
        }
        
        // 更新当前索引
        currentIndex = index;
    }
    
    // 开始自动轮播
    function startAutoRotate() {
        // 只在非PC设备上启动自动轮播
        if (!isPC()) {
            if (autoRotateInterval) {
                clearInterval(autoRotateInterval);
            }
            autoRotateInterval = setInterval(() => {
                if (!isUserInteracting) {
                    switchToLink(currentIndex + 1);
                }
            }, ROTATE_INTERVAL);
        }
    }
    
    // 暂停自动轮播
    function pauseAutoRotate() {
        isUserInteracting = true;
        clearTimeout(resumeTimeout);
    }
    
    // 恢复自动轮播的定时器
    let resumeTimeout = null;
    
    // 恢复自动轮播
    function resumeAutoRotate() {
        // 只在非PC设备上恢复自动轮播
        if (!isPC()) {
            resumeTimeout = setTimeout(() => {
                isUserInteracting = false;
            }, 5000); // 用户停止交互5秒后恢复自动轮播
        }
    }
    
    // 为所有社交链接添加事件监听器
    socialLinks.forEach((link, index) => {
        // 鼠标悬停时暂停自动轮播
        link.addEventListener('mouseenter', function() {
            pauseAutoRotate();
            
            // 移除所有链接的active类
            socialLinks.forEach(l => l.classList.remove('active'));
            // 添加当前链接的active类
            this.classList.add('active');
            
            // 获取当前链接的数据属性
            const linkHref = this.getAttribute('href');
            const imageUrl = this.getAttribute('data-image');
            const imageAlt = this.getAttribute('data-alt');
            
            // 根据索引决定显示iframe还是图片
            // 前2个链接显示网页，后4个链接显示照片
            if (index < 2) {
                // 显示网页
                currentImage.style.display = 'none';
                currentIframe.style.display = 'block';
                currentIframe.style.opacity = '0';
                setTimeout(() => {
                    currentIframe.src = linkHref;
                    currentIframe.alt = imageAlt;
                    currentIframe.style.opacity = '1';
                }, 300);
            } else {
                // 显示照片
                currentIframe.style.display = 'none';
                currentImage.style.display = 'block';
                currentImage.style.opacity = '0';
                setTimeout(() => {
                    currentImage.src = imageUrl;
                    currentImage.alt = imageAlt;
                    currentImage.style.opacity = '1';
                }, 300);
            }
        });
        
        // 鼠标离开时设置恢复自动轮播的定时器
        link.addEventListener('mouseleave', function() {
            resumeAutoRotate();
        });
        
        // 点击时暂停自动轮播，同时允许默认跳转
        link.addEventListener('click', function() {
            pauseAutoRotate();
        });
        
        // 触摸事件处理（针对触屏设备）
        link.addEventListener('touchstart', function(e) {
            pauseAutoRotate();
        });
    });
    
    // 为body添加触摸事件，用于检测用户交互
    document.body.addEventListener('touchstart', function() {
        resumeAutoRotate();
    });
    
    // 启动自动轮播
    startAutoRotate();
    
    // 禁止iframe内的滚动事件影响主页面
    currentIframe.addEventListener('wheel', function(e) {
        // 阻止事件冒泡到body，避免影响主页面滚动
        e.stopPropagation();
    }, { passive: true });
    
    // 禁止触摸事件影响主页面滚动
    currentIframe.addEventListener('touchmove', function(e) {
        e.stopPropagation();
    }, { passive: true });
});
