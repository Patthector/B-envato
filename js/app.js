
  let width = $(window).width();
  $('#toggle-menu').on('click',function(){
    $('nav.nav-header').slideToggle('slow');
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
      if(windowWidth >= 550 && windowWidth < 680){
        if(c1<c2){
          c1 += finalResultx;
        }
        else{
          c2 += finalResultx;
        }
      }
      else{
        if(isTheSmallestOne(c1,c2,c3)){
          c1 += finalResultx;
        }
        else if(isTheSmallestOne(c2,c1,c3)){
          c2 += finalResultx;
        }
        else{
          c3 += finalResultx;
        }
      }
    }

    let gridHeight = Math.max(Math.max(c3,c2),c1);
    if(windowWidth >= 550 && windowWidth < 680){
      gridHeight = Math.max(c2,c1);
    }
    console.log("HEIGHT IS",gridHeight);
    //********************************************************
    //sending the value back to CSS
    //********************************************************
    let repetitions = Math.ceil(gridHeight / 10);/*10px*/
    grid.css(`grid-template-rows`,`repeat(${repetitions},10px)`);
    console.log(`c1:${c1}-c2:${c2}-c3:${c3}`);
  }

  function BuildingCard(card){
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
    console.log("Height:"+height);
    let repetitions = Math.ceil(height / 10);/*10px*/
    console.log("repetitions:"+repetitions);
    card.css(`grid-row-end`,`span ${repetitions}`);
    return height;
  }

  function isTheSmallestOne(v,sibling1,sibling2){
    return v === Math.min(Math.min(v,sibling1),sibling2);
  }

  function OrientResizeFunction(){
    //AuxGrid();
    //var auxGrid = virginGrid;
    //var children = auxGrid.children();
    CreatingTheGrid(width);
  }
  $(window).on('load', function(){
    console.log("The page load");
    OrientResizeFunction();

  });
/*
  $( window ).on( "orientationchange", function() {
    //window.location = window.location;
    $("#grid").remove();
    $( "header" ).append( virginGrid );
  });*/

  $(window).on('resize',function() {
    if($(window).width() != width){
      console.log("the page resize");
      $("#grid").remove();
      var auxGrid = virginGrid;
      auxGrid.insertAfter( $("header") );
      OrientResizeFunction();
      //window.location = window.location;
    }
  });
