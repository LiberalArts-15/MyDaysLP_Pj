//navbar 스크롤
document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    const navbar = document.querySelector('.navbar');
  
    let lastScrollTop = 0;
  
    window.addEventListener('scroll', function () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
      if (scrollTop > lastScrollTop) {
        // 스크롤을 내릴 때
        navbar.classList.add('navbar-hidden');
        body.classList.remove('scrolled');
      } else {
        // 스크롤을 올릴 때
        navbar.classList.remove('navbar-hidden');
        body.classList.add('scrolled');
      }
  
      lastScrollTop = scrollTop;
    });
  });
  

//모바일 환경에서의 navbar
document.addEventListener('DOMContentLoaded', function () {
    var menuToggle = document.querySelector('.menu-toggle');
    var navbarCenter = document.querySelector('.navbar-center');

    menuToggle.addEventListener('click', function () {
        navbarCenter.classList.toggle('show-menu');
    });
});


//섹션으로 스크롤 이동
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

//수강생 모집 팝업
// 쿠키 설정 함수
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

// 쿠키 가져오기 함수
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// 배너 열기
var recruitmentBanner = document.getElementById('recruitmentBanner');
var closeBanner = document.getElementById('closeBanner');
var doNotShowAgain = document.getElementById('doNotShowAgain');

// 쿠키 확인 후 배너 표시 여부 결정
if (getCookie('doNotShowRecruitmentBanner') !== 'true') {
    recruitmentBanner.style.display = 'block';
}

// 배너 닫기
closeBanner.addEventListener('click', function () {
    recruitmentBanner.style.display = 'none';
});

// 다시 열지 않기 클릭 시 쿠키 설정
doNotShowAgain.addEventListener('click', function () {
    setCookie('doNotShowRecruitmentBanner', 'true', 1); // 1일간 보지 않기
    recruitmentBanner.style.display = 'none';
});


//스크롤 이동 시 팝업
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

//커리큘럼 화면전환
document.addEventListener('DOMContentLoaded', function () {
    let currentWeek = 1;
    const totalWeeks = document.querySelectorAll('.curriculumscreen').length;
    const curriculumContainer = document.querySelector('.curriculumscreen-container');
    let startDragX;
    let currentDragX;
    let isDragging = false;

    window.showWeek = function (week) {
        const screenWidth = document.querySelector('.curriculumscreen').offsetWidth;
        const translateValue = -(week - 1) * screenWidth;
        curriculumContainer.style.transition = 'transform 0.3s ease-in-out';
        curriculumContainer.style.transform = `translateX(${translateValue}px)`;

        document.querySelectorAll('.curriculumscreen').forEach((screen, index) => {
            if (index + 1 === week) {
                screen.classList.add('active');
            } else {
                screen.classList.remove('active');
            }
        });

        currentWeek = week;
    }

    function handleDragStart(event) {
        if (event.type === 'mousedown') {
            startDragX = event.clientX;
        } else if (event.type === 'touchstart') {
            startDragX = event.touches[0].clientX;
        }
        isDragging = true;
        curriculumContainer.style.transition = 'none';
    }

    function handleDragMove(event) {
        if (!isDragging) return;
        if (event.type === 'mousemove') {
            currentDragX = event.clientX;
        } else if (event.type === 'touchmove') {
            currentDragX = event.touches[0].clientX;
        }

        const screenWidth = document.querySelector('.curriculumscreen').offsetWidth;
        const dragDistance = currentDragX - startDragX;
        const threshold = 0.3; // 30% of the screen width

        const translateValue = -(currentWeek - 1) * screenWidth + dragDistance;
        curriculumContainer.style.transform = `translateX(${translateValue}px)`;
    }

    function handleDragEnd() {
        isDragging = false;
        const screenWidth = document.querySelector('.curriculumscreen').offsetWidth;
        const dragDistance = currentDragX - startDragX;
        const threshold = 0.2; // 20% of the screen width

        if (Math.abs(dragDistance) < screenWidth * threshold) {
            // 20% 미만 드래그 시, 원래 위치로 복원
            showWeek(currentWeek);
        } else {
            // 20% 이상 드래그 시, 다음 또는 이전 주차로 이동
            if (dragDistance > 0) {
                prevWeek();
            } else {
                nextWeek();
            }
        }

        curriculumContainer.style.transition = 'transform 0.3s ease-in-out';
    }

    curriculumContainer.addEventListener('mousedown', handleDragStart);
    curriculumContainer.addEventListener('mousemove', handleDragMove);
    curriculumContainer.addEventListener('mouseup', handleDragEnd);

    // 터치 이벤트 추가
    curriculumContainer.addEventListener('touchstart', handleDragStart);
    curriculumContainer.addEventListener('touchmove', handleDragMove);
    curriculumContainer.addEventListener('touchend', handleDragEnd);

    function prevWeek() {
        showWeek(currentWeek > 1 ? currentWeek - 1 : totalWeeks);
    }

    function nextWeek() {
        showWeek(currentWeek < totalWeeks ? currentWeek + 1 : 1);
    }

    // 초기 화면 설정
    showWeek(currentWeek);

    document.querySelector('.arrowButton.left').addEventListener('click', prevWeek);
    document.querySelector('.arrowButton.right').addEventListener('click', nextWeek);
});

  
// FAQ 
document.addEventListener('DOMContentLoaded', function () {
    const categoryItems = document.querySelectorAll('.category-item');
    
    categoryItems.forEach(item => {
        item.addEventListener('click', function () {
            // 선택된 카테고리에 'selected' 클래스 추가
            categoryItems.forEach(otherItem => otherItem.classList.remove('selected'));
            item.classList.add('selected');
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // 초기 로딩 시 질문 닫기
    const allAnswers = document.querySelectorAll('.answer');
    allAnswers.forEach(answer => {
        answer.classList.remove('show');
    });
});

function toggleAnswer(answerId) {
    const answer = document.getElementById(answerId);
    answer.classList.toggle('show');
}

function showQuestions(category) {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (itemCategory === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}