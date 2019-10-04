let filteredElementClass = null

function filterContent(elementsClass, event) {
    let elements = document.querySelectorAll('.filtered.' + elementsClass)
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect()
        let x = event.clientX - elementPosition.left
        let y = event.clientY - elementPosition.top
        element.style.clipPath = "circle(80px at " + x + "px " + y + "px)"
        element.style.visibility = 'visible'
    })
    let filterObject = document.querySelectorAll('.filter-object.' + filteredElementClass)[0]
    filterObject.style.top = (window.scrollY + event.clientY - 100) + 'px'
    filterObject.style.left = (window.scrollX + event.clientX - 100) + 'px'
}

function onScroll(event) {
    let elements = document.querySelectorAll('.navigation-target')
    let lastElement = elements[0]
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect()
        if (elementPosition.top <= 1) {
            lastElement = element
        }
    })
    let navs = document.querySelectorAll('nav li')
    navs.forEach(nav => {
        let a = nav.querySelectorAll("a[href='#" + lastElement.id + "']")
        let i = nav.querySelectorAll('i')[0]
        if (a.length) {
            i.classList.add('selected')
        } else {
            i.classList.remove('selected')
        }
    })
}

function unfilterContent(elementsClass) {
    elements = document.querySelectorAll('.filtered.' + elementsClass)
    elements.forEach(element => {
        element.style.visibility = 'hidden';
    })
}

function onClickFilter(event) {
    if (event.target.classList.contains('filter')) {
        filteredElementClass = event.target.id
        let filterObject = document.querySelectorAll('.filter-object.' + filteredElementClass)[0]
        filterObject.style.visibility = 'visible'
        filterObject.style.top = (event.clientY - 100) + 'px'
        filterObject.style.left = (event.clientX - 100) + 'px'
    } else {
        if (filteredElementClass != null) {
            let filterObject = document.querySelectorAll('.filter-object.' + filteredElementClass)[0]
            filterObject.style.visibility = 'hidden'
            unfilterContent(filteredElementClass)
            filteredElementClass = null
        }
    }
    
}

function moveFilter(event) {
    if (filteredElementClass !== null) {
        filterContent(filteredElementClass, event)
    }
}
  
document.addEventListener("mousemove", moveFilter);
document.addEventListener("click", onClickFilter);
document.addEventListener("scroll", onScroll);
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
        direction: 'left'
      });
  });