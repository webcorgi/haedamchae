function famAnswerSlider() {
    if ($('.farmAnswerSlider').length === 0) return;

    const totalSlides = $('.farmAnswerSlider__main .farmAnswerSlider__slide').length;
    let leftSwiper, rightSwiper, mainSwiper;

    // 왼쪽 미리보기 슬라이더
    leftSwiper = new Swiper('.farmAnswerSlider__preview.left', {
        loop: true,
        effect: 'fade',
        speed: 800,
        loopedSlides: totalSlides,
        allowTouchMove: false,
    });

    // 오른쪽 미리보기 슬라이더
    rightSwiper = new Swiper('.farmAnswerSlider__preview.right', {
        loop: true,
        effect: 'fade',
        speed: 800,
        loopedSlides: totalSlides,
        allowTouchMove: false,
    });

    // 메인 슬라이더
    mainSwiper = new Swiper('.farmAnswerSlider__main', {
        loop: true,
        speed: 800,
        effect: 'fade',
        loopedSlides: totalSlides,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        on: {
            slideChange: function() {
                // 현재 메인 슬라이드의 인덱스
                const currentIndex = this.realIndex;
                
                // 이전 슬라이드의 인덱스 (순환 고려)
                const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                
                // 다음 슬라이드의 인덱스 (순환 고려)
                const nextIndex = (currentIndex + 1) % totalSlides;

                // 항상 왼쪽에는 이전 슬라이드, 오른쪽에는 다음 슬라이드가 표시되도록 설정
                leftSwiper.slideTo(prevIndex);
                rightSwiper.slideTo(nextIndex);
            }
        }
    });

    // 자동 재생 제어
    const sliderContainer = document.querySelector('.farmAnswerSlider');
    sliderContainer.addEventListener('mouseenter', () => mainSwiper.autoplay.stop());
    sliderContainer.addEventListener('mouseleave', () => mainSwiper.autoplay.start());

    // 초기 슬라이드 위치 설정
    setTimeout(() => {
        mainSwiper.slideTo(0);  // 메인은 첫 번째 슬라이드
        leftSwiper.slideTo(totalSlides - 1);  // 왼쪽은 마지막 슬라이드
        rightSwiper.slideTo(1);  // 오른쪽은 두 번째 슬라이드
    }, 0);
}



function seedlingSlider(){
    if($(".seedlingSlider").length == 0) return;
    var swiper = new Swiper(".seedlingSlider", {
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
        },
    });
}


$(function(){
    famAnswerSlider();
    seedlingSlider();

    AOS.init({
        offset: 100, // 트리거 지점 조정
        duration: 1000, // 애니메이션 지속 시간
        easing: 'ease-in-out', // 부드러운 가속도 효과
    });
});