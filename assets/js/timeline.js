const poppulateAccordion = (data) => {


  // Funcrion to populate the accordion with the data taken from the API


  $("#accordionExample").empty();
  data.forEach(item => {
    let accordionHeader = document.createElement("h2");
    accordionHeader.classList.add("accordion-header");
    accordionHeader.id = "heading"+item.type;

    let accordionButton = document.createElement("button");
    accordionButton.classList.add("timelineItem");
    accordionButton.classList.add("accordion-button");
    accordionButton.classList.add("collapsed");
    accordionButton.setAttribute("data-bs-toggle", "collapse");
    accordionButton.setAttribute("type", "button");
    accordionButton.setAttribute("data-bs-target", "#collapse"+item.type);
    accordionButton.setAttribute("aria-expanded", "true");
    accordionButton.setAttribute("aria-controls", "collapse"+item.type);

    let accordionInsideContainer = document.createElement("div");

    let accordionTitleContainer = document.createElement("div");

    let accordionTitle = document.createElement("h3");
    accordionTitle.classList.add("title");
    accordionTitle.innerText = item.fullName;

    accordionTitleContainer.appendChild(accordionTitle);

    let accordionSubtitleContainer = document.createElement("div");
    accordionSubtitleContainer.classList.add("sub");
    accordionSubtitleContainer.innerText = "First occurance: " + item.firstDate + " \n Last occurance: " + item.lastDate;

    accordionInsideContainer.appendChild(accordionTitleContainer);
    accordionInsideContainer.appendChild(accordionSubtitleContainer);

    accordionButton.appendChild(accordionInsideContainer);
    accordionHeader.appendChild(accordionButton);

    let accordionItem = document.createElement("div");
    accordionItem.classList.add("accordion-item");

    accordionItem.appendChild(accordionHeader);


    $(accordionItem).hide().fadeTo("fast",1).appendTo("#accordionExample");
    
    // $("#accordionExample").append(accordionItem);

  });
}

const clearAccordion = () => {
  $("#accordionExample").empty();
}