// Function to filter publications based on selected filter options and search input
function filterPublications() {
    const filterPubs = document.getElementById("filterPubs").value;
    const filterYear = document.getElementById("filterYear").value;
    const filterType = document.getElementById("filterType").value;
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const publicationList = document.getElementById("publicationList");
    const publicationItems = publicationList.querySelectorAll("li");
  
    publicationItems.forEach((publication) => {
        const pubs = publication.getAttribute("data-pubs");
        const year = publication.getAttribute("data-year");
        const type = publication.getAttribute("data-type");
        const content = publication.textContent.toLowerCase(); // Get the entire content
  
        if (
            (filterPubs === "all" || filterPubs === pubs) &&
            (filterYear === "all" || filterYear === year) &&
            (filterType === "all" || filterType === type) &&
            (content.includes(searchInput))
        ) {
            publication.style.display = "block";
        } else {
            publication.style.display = "none";
        }
    });
  }
  
  // Event listeners for filter options and search input
  document.getElementById("filterPubs").addEventListener("change", filterPublications);
  document.getElementById("filterYear").addEventListener("change", filterPublications);
  document.getElementById("filterType").addEventListener("change", filterPublications);
  document.getElementById("searchInput").addEventListener("input", filterPublications);
  
  // Initial display of publications (show all)
  filterPublications();


      // Get all the list items
      const listItems = document.querySelectorAll('li');

      // Add a click event listener to each list item
      listItems.forEach((item) => {
          const h4 = item.querySelector('h4 a');
          if (h4) {
              h4.addEventListener('click', (event) => {
                  event.stopPropagation(); // Prevent the li click event from triggering
                  window.location.href = h4.getAttribute('href'); // Redirect to the link when the h4 is clicked
              });
          }
      });


      const filterTypeSelect = document.getElementById('filterType');
    
      // Get the button element
      const setSeasonalityButton = document.getElementById('setSeasonalityButton');
      const setEnviornmentalButton = document.getElementById('setEnviornmentalButton');
      const setCognitionButton = document.getElementById('setCognitionButton');
      const setGroupBehaviorButton = document.getElementById('setGroupBehaviorButton');
      const setMovementStrategiesButton = document.getElementById('setMovementStrategiesButton');

      // Get the target section by its ID
      const publicationsSection = document.getElementById('publications-section');
      
      // Add a click event listener to the button
      setSeasonalityButton.addEventListener('click', () => {
          // Set the selected option to 'seasonality'
          filterTypeSelect.value = 'seasonality';
          filterPublications();

          // Scroll to the target section
          publicationsSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scrolling
      });

      setEnviornmentalButton.addEventListener('click', () => {
        // Set the selected option to 'enviornmental-change'
        filterTypeSelect.value = 'enviornmental-change';
        filterPublications();

        // Scroll to the target section
        publicationsSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scrolling
    });

    setCognitionButton.addEventListener('click', () => {
        filterTypeSelect.value = 'cognition';
        filterPublications();

        // Scroll to the target section
        publicationsSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scrolling
    });

    setGroupBehaviorButton.addEventListener('click', () => {
        filterTypeSelect.value = 'group-behavior';
        filterPublications();

        // Scroll to the target section
        publicationsSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scrolling
    });

    setMovementStrategiesButton.addEventListener('click', () => {
        filterTypeSelect.value = 'movement-strategies';
        filterPublications();

        // Scroll to the target section
        publicationsSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scrolling
    });

    var swiper = new Swiper(".swiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: true
        },
        spaceBetween: 60,
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      });
    const $ = str => document.querySelector(str);
    const $$ = str => document.querySelectorAll(str);
    
    (function() {
        if (!window.app) {
            window.app = {};
        }
        app.carousel = {
            removeClass: function(el, classname='') {
                if (el) {
                    if (classname === '') {
                        el.className = '';
                    } else {
                        el.classList.remove(classname);
                    }
                    return el;
                }
                return;
            },
            reorder: function() {
                let childcnt = $("#carousel").children.length;
                let childs = $("#carousel").children;
    
                for (let j=0; j< childcnt; j++) {
                    childs[j].dataset.pos = j;
                }
            },
            move: function(el) {
                let selected = el;
    
                if (typeof el === "string") {
                console.log(`got string: ${el}`);
                    selected = (el == "next") ? $(".selected").nextElementSibling : $(".selected").previousElementSibling;
                    console.dir(selected);
                }
    
                let curpos = parseInt(app.selected.dataset.pos);
                let tgtpos = parseInt(selected.dataset.pos);
    
                let cnt = curpos - tgtpos;
                let dir = (cnt < 0) ? -1 : 1;
                let shift = Math.abs(cnt);
    
                for (let i=0; i<shift; i++) {
                    let el = (dir == -1) ? $("#carousel").firstElementChild : $("#carousel").lastElementChild;
    
                    if (dir == -1) {
                        el.dataset.pos = $("#carousel").children.length;
                        $('#carousel').append(el);
                    } else {
                        el.dataset.pos = 0;
                        $('#carousel').prepend(el);
                    }
    
                    app.carousel.reorder();
                }
    
    
                app.selected = selected;
                let next = selected.nextElementSibling;// ? selected.nextElementSibling : selected.parentElement.firstElementChild;
                var prev = selected.previousElementSibling; // ? selected.previousElementSibling : selected.parentElement.lastElementChild;
                var prevSecond = prev ? prev.previousElementSibling : selected.parentElement.lastElementChild;
                var nextSecond = next ? next.nextElementSibling : selected.parentElement.firstElementChild;
    
                selected.className = '';
                selected.classList.add("selected");
    
                app.carousel.removeClass(prev).classList.add('prev');
                app.carousel.removeClass(next).classList.add('next');
    
                app.carousel.removeClass(nextSecond).classList.add("nextRightSecond");
                app.carousel.removeClass(prevSecond).classList.add("prevLeftSecond");
    
                app.carousel.nextAll(nextSecond).forEach(item=>{ item.className = ''; item.classList.add('hideRight') });
                app.carousel.prevAll(prevSecond).forEach(item=>{ item.className = ''; item.classList.add('hideLeft') });
    
            },
            nextAll: function(el) {
                let els = [];
    
                if (el) {
                    while (el = el.nextElementSibling) { els.push(el); }
                }
    
                return els;
    
            },
            prevAll: function(el) {
                let els = [];
    
                if (el) {
                    while (el = el.previousElementSibling) { els.push(el); }
                }
    
    
                return els;
            },
            keypress: function(e) {
                switch (e.which) {
                    case 37: // left
                        app.carousel.move('prev');
                        break;
    
                    case 39: // right
                        app.carousel.move('next');
                        break;
    
                    default:
                        return;
                }
                e.preventDefault();
                return false;
            },
            select: function(e) {
            console.log(`select: ${e}`);
                let tgt = e.target;
                while (!tgt.parentElement.classList.contains('carousel')) {
                    tgt = tgt.parentElement;
                }
    
                app.carousel.move(tgt);
    
            },
            previous: function(e) {
                app.carousel.move('prev');
            },
            next: function(e) {
                app.carousel.move('next');
            },
            doDown: function(e) {
            console.log(`down: ${e.x}`);
                app.carousel.state.downX = e.x;
            },
            doUp: function(e) {
            console.log(`up: ${e.x}`);
                let direction = 0,
                    velocity = 0;
    
                if (app.carousel.state.downX) {
                    direction = (app.carousel.state.downX > e.x) ? -1 : 1;
                    velocity = app.carousel.state.downX - e.x;
    
                    if (Math.abs(app.carousel.state.downX - e.x) < 10) {
                        app.carousel.select(e);
                        return false;
                    }
                    if (direction === -1) {
                        app.carousel.move('next');
                    } else {
                        app.carousel.move('prev');
                    }
                    app.carousel.state.downX = 0;
                }
            },
            init: function() {
                document.addEventListener("keydown", app.carousel.keypress);
               // $('#carousel').addEventListener("click", app.carousel.select, true);
                $("#carousel").addEventListener("mousedown", app.carousel.doDown);
                $("#carousel").addEventListener("touchstart", app.carousel.doDown);
                $("#carousel").addEventListener("mouseup", app.carousel.doUp);
                $("#carousel").addEventListener("touchend", app.carousel.doup);
    
                app.carousel.reorder();
                $('#prev').addEventListener("click", app.carousel.previous);
                $('#next').addEventListener("click", app.carousel.next);
                app.selected = $(".selected");
    
            },
            state: {}
    
        }
        app.carousel.init();
    })();
    
      