/*
bu projece kullanılan hazır js fonksiyonlari

1- addEventListener() fonksiyonu, belirli bir olay gerçekleştiğinde çalışacak bir fonksiyonu belirlemek için kullanılır. Yani bir tür "dinleyici"
 ekleyerek, örneğin bir düğmeye tıklanınca veya fare hareket ettiğinde belirli bir kodun çalışmasını sağlar.


2- forEach()
Bir dizide veya NodeList içinde bulunan tüm elemanlar üzerinde döngü oluşturarak her bir eleman için belirli işlemler yapmamızı sağlar.


3- querySelectorAll()
HTML içindeki belirli bir CSS seçicisine uyan tüm elemanları seçer ve bir NodeList döndürür.


4- window.scrollTo()
Sayfanın belirli bir noktasına kaydırılmasını sağlar.

        top: Sayfanın kaç piksel yukarı kaydırılacağı.
        behavior → "smooth" kullanılırsa kaydırma yumuşak bir şekilde yapılır.

5- parseInt()
Bir metni tam sayıya çevirir.
*/



document.addEventListener("DOMContentLoaded", function () {
  const typedElement = document.querySelector(".typed");
  if (!typedElement) return;

  const itemsAttr = typedElement.getAttribute("data-typed-items");
  if (!itemsAttr) return;

  const items = itemsAttr.split(",").map(s => s.trim()); // trim spaces
  new Typed(".typed", {
    strings: items,
    typeSpeed: 50,
    backSpeed: 50,
    backDelay: 1500,
    loop: true,
    showCursor: true
  });
});


// Sayfadaki tüm ".sectionList a" bağlantılarını seçiyoruz
document.querySelectorAll(".sectionList a").forEach(link => {
    // Bağlantıya tıklama olayını dinliyoruz
    link.addEventListener('click', (event) => {
        // Varsayılan bağlantı yönlendirmesini engelliyoruz
        event.preventDefault();

        // Bağlantının "href" özniteliğinden hedef ID'yi alıyoruz
        const targetId = link.getAttribute('href').substring(1);
        // Sayfadaki ilgili hedef bölümünü seçiyoruz
        const targetSection = document.getElementById(targetId);

        // Eğer hedef bölüm varsa, sayfanın o bölüme yumuşak bir kaydırma yapmasını sağlıyoruz
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 50, // Hedef bölümü biraz yukarıda hizalamak için -50 piksel ekliyoruz
                behavior: "smooth" // Yumuşak kaydırma efekti
            });
        }
    });
});



// Sayısal animasyon fonksiyonu
function animateCount(el, start, end, duration){
    let startTime = null;

    function updateCount(currentTime){
        if(!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1); // İlerleme yüzdesini hesaplıyoruz
        el.textContent = Math.floor(progress * (end - start) + start); // Sayıyı güncelliyoruz

        // Eğer animasyon tamamlanmadıysa tekrar çalıştırıyoruz
        if(progress < 1){
            requestAnimationFrame(updateCount);
        }
    }

    requestAnimationFrame(updateCount);
}

// Sayfa tamamen yüklendiğinde sayısal animasyonu başlatıyoruz
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".number").forEach((el) => {
        const target = parseInt(el.getAttribute("data-target"), 10); // Hedef sayıyı alıyoruz
        el.textContent = "0"; // Başlangıç değeri olarak "0" belirliyoruz
        animateCount(el, 0 , target, 3000); // Animasyonu başlatıyoruz, 2 saniye sürecek
    });
});


// Yetenek çubuklarını animasyonla dolduran fonksiyon
function animateSkillBars(){
    document.querySelectorAll(".progressBar").forEach((bar) => {
        let targetWidth = parseInt(bar.getAttribute("data-target"), 10); // Hedef genişliği alıyoruz (% olarak)
        let currentWidth = 0;
        let duration = 2000;
        let startTime = null;

        function updateBar(timestamp){
            if(!startTime) startTime = timestamp;
            let progress = Math.min((timestamp - startTime) / duration, 1); // Animasyon ilerlemesini hesaplıyoruz
            currentWidth = Math.floor(progress * targetWidth); // Mevcut genişliği hesaplıyoruz
            bar.style.width = currentWidth + "%"; // Çubuğun genişliğini güncelliyoruz

            if(progress < 1){
                requestAnimationFrame(updateBar);
            }
        }
        requestAnimationFrame(updateBar);
    });
}

// Sayfa içinde belirlenen bölümleri gözlemleyen IntersectionObserver oluşturuyoruz
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){ // Eğer bölüm ekrana girerse
            entry.target.querySelectorAll(".progressBar").forEach((bar) =>{
                animateSkillBars(); // Yetenek çubuğu animasyonunu başlatıyoruz
            });
            observer.unobserve(entry.target); // Tekrar gözlemlenmemesi için çıkartıyoruz
        }
    });
}, { threshold: 0.5 }); // Bölümün en az %50'inin görünmesi gerekiyor

// Sayfa tamamen yüklendiğinde gözlemlemeyi başlatıyoruz
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".skill, .status").forEach((section) => {
        observer.observe(section); // Bölümleri gözlemliyoruz
    });
});

// Hizmet kartlarına tıklanınca yönlendirme işlemi
document.querySelectorAll('.servCard').forEach(card => {
    card.addEventListener('click', () => {
        window.location.href = 'servLink.html'; // Kart tıklanınca belirtilen sayfaya gidiyoruz
    });
});




//back to top
let backToTop = document.querySelector(".backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


//side bar

let navToggle = document.getElementById("navToggle");
let menuIcon = document.getElementById("menuIcon");
let sideBar = document.getElementById("sideBar");

navToggle.addEventListener("click", () => {
  sideBar.classList.toggle("show");

  if (sideBar.classList.contains("show")) {
    // Replace <img> with Font Awesome X
    navToggle.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    navToggle.style.cssText = "color: white; transition: 0.3s ease; font-size:25px";
  } else {
    navToggle.innerHTML = `<img src="img/navIcon-removebg-preview.png" alt="navIcon" id="menuIcon">`;
  }
});

