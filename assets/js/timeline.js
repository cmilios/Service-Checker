const poppulateAccordion = (data, isFiltered, layers) => {


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

    createChild(item, isFiltered, layers);


    
    
    // $("#accordionExample").append(accordionItem);

  });
}


const createChild = (item, isFiltered, layers) => {
  
  let child = document.createElement("div");
  child.classList.add("accordion-collapse");
  child.classList.add("collapse");
  child.classList.add("item");
  child.id = "collapse"+item.type;
  child.setAttribute("aria-labelledby", "heading"+item.type);
  child.setAttribute("data-bs-parent", "#accordionExample");

  if(isFiltered){

    if(layers[0].type == 'Feature'){
      if(layers[0].properties.type == item.type){
        let lineStyle = '<a href="#" onMouseEnter="highlightLayer(event, this, '+layers[0].properties.id+')" onmouseleave="unhighlightLayer(event, this, '+layers[0].properties.id+')" class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">'+ layers[0].properties.title +'</h5><small class="text-muted">'+ layers[0].properties.date+'</div><p class="mb-1">'+layers[0].properties.message+'</p><small class="text-muted">'+layers[0].properties.sub+'</small></a>';
        child.innerHTML = lineStyle;
      }


    }
    else if(layers[0].type == 'FeatureCollection'){
      let lines = layers[0].features;
      lines.forEach(line => {
        if(item.type == line.properties.type){
          let lineStyle = '<a href="#" onMouseEnter="highlightLayer(event, this, '+line.properties.id+')" onmouseleave="unhighlightLayer(event, this, '+line.properties.id+')" class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">'+ line.properties.title +'</h5><small class="text-muted">'+ line.properties.date+'</div><p class="mb-1">'+line.properties.message+'</p><small class="text-muted">'+line.properties.sub+'</small></a>';
          child.innerHTML += lineStyle;
        }
      });
    }
    


    
    

      
    // child.innerHTML = '<div class="list-group"><a href="#" class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">Title</h5><small class="text-muted">date</small></div><p class="mb-1">Message</p><small class="text-muted">Subtitle</small></a><a href="#" class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">Title</h5><small class="text-muted">date</small></div><p class="mb-1">Message</p><small class="text-muted">Subtitle</small></a></div>'

  }
  else{


  }

  // child.innerHTML = ' <div class="list-group"><a href="#" class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">Title</h5><small class="text-muted">date</small></div><p class="mb-1">Message</p><small class="text-muted">Subtitle</small></a><a href="#" class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">Title</h5><small class="text-muted">date</small></div><p class="mb-1">Message</p><small class="text-muted">Subtitle</small></a></div>'
  $(child).appendTo("#accordionExample");

}

const clearAccordion = () => {
  $("#accordionExample").empty();
}