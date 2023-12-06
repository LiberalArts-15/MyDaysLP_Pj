
document.addEventListener('DOMContentLoaded', function () {
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    const body = document.body;

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // 스크롤 방향에 따라 네비게이션 바를 나타내거나 숨김
        if (scrollTop > lastScrollTop) {
            // 아래로 스크롤 시
            navbar.classList.add('navbar-hidden');
        } else {
            // 위로 스크롤 시
            navbar.classList.remove('navbar-hidden');
        }

        // 스크롤 방향에 따라 padding-top을 조절하여 네비게이션 바가 나타나거나 숨겨질 때의 간격을 조절
        body.style.paddingTop = navbar.offsetHeight + 'px';

        lastScrollTop = scrollTop;
    });
});


document.addEventListener('DOMContentLoaded', function () {
    // 각 링크 클릭 시 해당 섹션으로 스크롤
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.section-content');

    function checkVisibility() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('show');
            }
        });
    }

    // 페이지 로딩 시 한 번 체크
    checkVisibility();

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', checkVisibility);
});