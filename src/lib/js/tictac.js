var gridSize = 4;
var turn = 0;
var winner = '';

var xWinMap = new Array();
var oWinMap = new Array();	

function createNewGame() {
    $(".ui-dialog-content").dialog("close");
    turn = 0;
    winner = '';
    gridSize = parseInt($('#gridSize').val());

    $('#tictactoe').empty();
     createGrid();		 
     initializeScores();
     bindEvents();
}

function createGrid() {		
	$('#tictactoe').hide();
	$('#tictactoe').append("<table id='tic'></table>");	
	for(var rowId=1;rowId<=gridSize;rowId++) {
	  $('#tic').append("<tr id='row"+rowId+"'></tr>");
	  for(var colId=1;colId<=gridSize;colId++) {
		  if((rowId==colId) && (rowId+colId)==(parseInt(gridSize)+1)) {                      
			  $('#row'+rowId).append("<td class='row"+rowId+" col"+colId+" diag1 diag2'></td>");
		  } else if(rowId==colId) { 
			  $('#row'+rowId).append("<td class='row"+rowId+" col"+colId+" diag1'></td>"); //working
		  } else if((rowId+colId)==(parseInt(gridSize)+1)) {                      
			  $('#row'+rowId).append("<td class='row"+rowId+" col"+colId+" diag2'></td>");
		  } else {
			  $('#row'+rowId).append("<td class='row"+rowId+" col"+colId+"'></td>"); //working
		  }
	  }
	}
	$('#tictactoe').show("slow");
}
function initializeScores() {
	
	xWinMap = new Array();
	oWinMap = new Array();
	
	/* Initializing score for rows and columns */
	 for(var id=1;id<=gridSize;id++) {
		  
		  var xRowCriteria = {
			  winCriteria: 'row'+id,
			  score: 0
		  }; 
		  var oRowCriteria = $.extend(true, {}, xRowCriteria);
		  pushObjToArray(xWinMap,xRowCriteria);
		  pushObjToArray(oWinMap,oRowCriteria);
		  
		  var xColCriteria = {
			  winCriteria: 'col'+id,
			  score: 0
		  }; 
		  var oColCriteria = $.extend(true, {}, xColCriteria);
		  pushObjToArray(xWinMap,xColCriteria);
		  pushObjToArray(oWinMap,oColCriteria);
	 }
	 
	 /* Initializing score for two Diagonals */
	 var xDiagCriteria1 = {
			  winCriteria: 'diag'+1,
			  score: 0
	 }; 
	 var oDiagCriteria1 = $.extend(true, {}, xDiagCriteria1);
	 pushObjToArray(xWinMap,xDiagCriteria1);
	 pushObjToArray(oWinMap,oDiagCriteria1);
	 
	 xDiagCriteria2 = {
		  winCriteria: 'diag'+2,
		  score: 0
	 };
	 var oDiagCriteria2 = $.extend(true, {}, xDiagCriteria2);
	 pushObjToArray(xWinMap,xDiagCriteria2);
	 pushObjToArray(oWinMap,oDiagCriteria2);
}

function pushObjToArray(arr, obj) {
	arr.push(obj);
}

function playersTurn(box) {
	if(turn%2==0 && box.html()!='x' && box.html()!='o') {
		box.html('x');
		winner = addScore('x',box);
	} else if(box.html()!='x' && box.html()!='o') {
		box.html('o');
		winner = addScore('o',box);
	} else {
		$( "#invalid" ).dialog( "open" );
		return turn;
	}
	if(winner=='') {
		return ++turn;	
	} else if(winner=='x') {
		$( "#xwon" ).dialog( "open" );
	} else if(winner=='o') {
		$( "#owon" ).dialog( "open" );
	}
	
}

function addScore(type,box) {
	var classList = box.attr('class').split(/\s+/);
	for (var i = 0; i < classList.length; i++) {
	   if(type=='x') {
		   for (var jsonId = 0; jsonId < xWinMap.length; jsonId++) {
			   if(xWinMap[jsonId].winCriteria==classList[i]) {
				   xWinMap[jsonId].score++;				   
				   if(xWinMap[jsonId].score==gridSize) {
					   winCriteria = xWinMap[jsonId].winCriteria;
					   $('.'+ winCriteria ).addClass('win');
					   return 'x';
				   }
			   }
		   }
	   } else if(type=='o') {
		   for (var jsonId = 0; jsonId < oWinMap.length; jsonId++) {
			   if(oWinMap[jsonId].winCriteria==classList[i]) {
				   oWinMap[jsonId].score++;				   
				   if(oWinMap[jsonId].score==gridSize) {
					   winCriteria = oWinMap[jsonId].winCriteria;
					   $('.'+ winCriteria ).addClass('win');
					   return 'o';
				   }
			   }
		   }
	   } else {
		   //some bug?
	   }	   
	}
	return '';
}

function bindEvents() {
	
	$('.launch').bind( "click", function() {
		$( "#new" ).dialog( "open" );	
	});
	
	$('td').bind( "click", function() {
		if(turn<gridSize*gridSize) {
			  turn = playersTurn($(this));  
			  if(turn==gridSize*gridSize) {
				  $( "#draw" ).dialog( "open" );	
			  }
		  } else {
			  $( "#new" ).dialog( "open" );
		  }
	});	
	
	$('#gridSize').bind( "change", function() {
                $( "#new" ).dialog( "open" );
	});
}