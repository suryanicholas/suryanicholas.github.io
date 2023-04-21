const mySections = document.querySelectorAll('.contents');
const myLinks = document.querySelectorAll('.navbar-items');
const navbarItems = document.querySelectorAll(".navbar-items a");
const linkMain = document.querySelector(".logo a");

window.addEventListener('scroll', () => {
  let tampil = '';
  mySections.forEach(section =>{
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if(pageYOffset > (sectionTop - (sectionHeight / 3))){
      tampil = section.getAttribute('id');
    }
  })

  myLinks.forEach( item => {
    item.classList.remove('active');
    if(item.classList.contains(tampil)){
      item.classList.add('active');
    }
  })
})

navbarItems.forEach(function(item) {
  item.addEventListener("click", function(e) {
      e.preventDefault();
      const target = this.getAttribute("href");
      const element = document.querySelector(target);
      const topPos = element.offsetTop;
      window.scrollTo({top: topPos,behavior: "smooth"});

      navbarItems.forEach(function(navItem) {
      navItem.closest(".navbar-items").classList.remove("active");
      });

      this.closest(".navbar-items").classList.add("active");
  });
});

linkMain.addEventListener("click", function(e) {
  e.preventDefault();
  const target = this.getAttribute("href");
  const element = document.querySelector(target);
  const topPos = element.offsetTop;
  window.scrollTo({top: topPos,behavior: "smooth"});

  navbarItems.forEach(function(navItem) {
      navItem.closest(".navbar-items").classList.remove("active");
      });
});