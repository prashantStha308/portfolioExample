function goToTop() {
    // The offsetTop returns the value top position of the element
    let scrollDiv = document.getElementById("header").offsetTop;
  
    // The windows.scrollTo() method moves the page to a destination element, in this case, the scrollDiv which has the offsetTop value of the header element
    window.scrollTo({ top: scrollDiv, behavior: "smooth" });
}
