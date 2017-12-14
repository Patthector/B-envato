
  let width = $(self).outerWidth();
  $('#toggle-menu').on('click',function(){
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

    let c1=0;
    let c2=0;
    let c3=0;

    for (let i = 0; i < children.length; i++) {
      var finalResultx = BuildingCard(children.eq(i));
      if(i === children.length - 1){
        let gridHeight = $("#grid").height();
        let repetitions = Math.ceil(gridHeight / 10);/*10px*/
        grid.css(`grid-template-rows`,`repeat(${repetitions},10px)`);
        console.log("Height of the grid");
        console.log($("#grid").height());
      }
    }
  }

  function BuildingCard(card,i){
    let array = card.children();
    let height = 0;
    console.log("Height per card");
    console.log(array);
    for (var i = 0; i < array.length; i++) {
      console.log("i: "+i);
      console.log(array.eq(i).height());
      //we are gonna add the margin
      if(i === 1){//this is h2--margin 4%ofTheWidth
        height += array.eq(i).height() + Math.ceil((array.eq(i).width() * 2)/100);
      }
      if(i === 2){//this is h2--margin 4%ofTheWidth
        height += array.eq(i).height() + Math.ceil((array.eq(i).width() * 7)/100);
      }
      else{
        height += array.eq(i).height();
      }
    }
    let repetitions = Math.ceil(height / 10);/*10px*/
    card.css(`grid-row-end`,`span ${repetitions}`);
    return height;
  }

  function isTheSmallestOne(v,sibling1,sibling2){
    return v === Math.min(Math.min(v,sibling1),sibling2);
  }

  function OrientResizeFunction(){
    if(width >= 550){
      CreatingTheGrid(width);
    }
  }

  $(window).on('load', function(){

    console.log("The page load");
    console.log(width);
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
