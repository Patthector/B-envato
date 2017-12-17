
  let width = $(self).outerWidth();
  $('#toggle-menu').on('click',function(){
    $("#logo").toggleClass('toggle-animation');
    $('nav.nav-header').slideToggle('slow');
    $('footer').slideToggle('slow');
  });
  //THE GRID

  //you dont know how many card/children the grid will have, so you need to
  //find  out how many are they, and the height the will waste in the layout

  //other thing to have in consideration is the media-query. Up to them you
  //will have -->
  //1 column(in this case you dont need to do this, all will rely in FLex design)
  //2 columns
  //3 columns
  //4 columns...
  //the amount of columns will represent how many elements/cards/children we will
  //check to get the bigest one. In other words it has to do with rows

  function CreatingTheGrid(windowWidth){
    let grid = $("#grid");
    let children = grid.children();
    for (let i = 0; i < children.length; i++) {
      ///SETTING ALL THE HEIGHTS OF THE CARDS
      BuildingCard(children.eq(i));
    }
  }

  function BuildingCard(card,i){
    let array = card.children();
    let height = 0;
    for (var i = 0; i < array.length; i++) {
      height += array.eq(i).height();
      //ADD THE MARGIN&&PADDING OF PARAGRAPHs,DIVs,HEADINGs
      height += 10 + 12;
    }
    let repetitions = Math.ceil(height / 10);/*10px*/
    card.css(`grid-row-end`,`span ${repetitions}`);
  }
  function OrientResizeFunction(){
    if(width >= 550){
      CreatingTheGrid(width);
    }
  }

  $(window).on('load', function(){
    console.log("The page load");
    if(width >= 550){
    OrientResizeFunction();
    }
  });
/*
  $( window ).on( "orientationchange", function() {
    //window.location = window.location;
    $("#grid").remove();
    $( "header" ).append( virginGrid );
  });*/

  $(window).on('resize',function() {
    if($(window).width() != width){
      console.log("the page resize")
      OrientResizeFunction();
      //window.location = window.location;
    }
  });
