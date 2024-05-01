(function() {
    "use strict";
  
    const select = (el, all = false) => {
      el = el.trim()
      if (all) {
        return [...document.querySelectorAll(el)]
      } else {
        return document.querySelector(el)
      }
    }

    const on = (type, el, listener, all = false) => {
      if (all) {
        select(el, all).forEach(e => e.addEventListener(type, listener))
      } else {
        select(el, all).addEventListener(type, listener)
      }
    }

    if (select('.toggle-sidebar-btn')) {
      on('click', '.toggle-sidebar-btn', function(e) {
        select('body').classList.toggle('toggle-sidebar')
      })
    }
  
    let backtotop = select('.back-to-top')
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop.classList.add('active')
        } else {
          backtotop.classList.remove('active')
        }
      }
      window.addEventListener('load', toggleBacktotop)
      onscroll(document, toggleBacktotop)
    }

  })();

  document.addEventListener('DOMContentLoaded', function () {
    const content = document.querySelector('.content');
    const container = document.querySelector(".container")//tambah ini
    const itemsPerPage = 10;
    let currentPage = 0;
    const items = Array.from(content.getElementsByTagName('tr')).slice(1);
  
    //untuk prev button
  const prevButton = document.createElement("div");
  prevButton.setAttribute("id", "prev-button");
  prevButton.innerHTML = "&lt;";
  prevButton.style.cursor = 'pointer';
    //untuk next button
  const nextButton = document.createElement("div");
  nextButton.setAttribute("id", "next-button");
  nextButton.innerHTML = "&gt;";
  nextButton.style.cursor = 'pointer';
  
  function showPage(page) {
    currentPage = page;
    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    items.forEach((item, index) => {
      item.classList.toggle('hidden', index < startIndex || index >= endIndex);
    });
    updateActiveButtonStates();
  }
  function createPageButtons() {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const paginationContainer = document.createElement('div');
    const paginationDiv = container.appendChild(paginationContainer); // ganti ke ini
    paginationContainer.classList.add('pagination');
    paginationDiv.appendChild(prevButton); //prev button
    for (let i = 0; i < totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.textContent = i + 1;
      pageButton.addEventListener('click', () => {
        currentPage = i;
        showPage(currentPage);
        updateActiveButtonStates();
        
      });
        container.appendChild(paginationContainer);// ganti ke ini
        paginationDiv.appendChild(pageButton);
  
        paginationDiv.appendChild(nextButton); //next button
  
      }
  }
  function updateActiveButtonStates() {
    const pageButtons = document.querySelectorAll('.pagination button');
    pageButtons.forEach((button, index) => {
      if (index === currentPage) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }
    createPageButtons();
    showPage(currentPage);
    // prev button
  prevButton.addEventListener("click", () => {
    showPage(currentPage - 1);
  });
    // next button
  nextButton.addEventListener("click", () => {
    showPage(currentPage + 1);
  });
  
  const paginationContainer = document.querySelector('.pagination');
      const h5Element = document.createElement('h6');
      h5Element.textContent = 'Page';
      paginationContainer.insertBefore(h5Element, prevButton);
    
      paginationContainer.style.justifyContent = 'flex-end';
  
  });