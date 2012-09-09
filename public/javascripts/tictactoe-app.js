var blocks = [0,0,0,0,0,0,0,0,0]
var winning_combo = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
var counters = [0,0,0] 
var player = true //1 or 2

jQuery(document).ready(function ($) {
	$("#reset").click(function(){
		reset_game()
		
		});
		
	if (player) {
			$("#player").html("O's");
		}
	else $("#player").html("X's");

	$(".block").click(function(){
		$("#start_msg").hide();
		if (player) {
			$("#player").html("O's");
		}
		else $("#player").html("X's");
		if (free(this.id)){
			if (player){
				blocks[this.id] = 1;
				draw(this.id, player);
				}
			else {
				blocks[this.id] = 2;
				draw(this.id, player);
				}
				
			console.log(check_game())
			if (check_game()){
				end_game(player);
				
			}
			else if (!check_zero()){
				console.log("TIE GAME");
				$("#game_over_msg").html("It's a tie game!");
				$("#game_over").show();
				counters[2]++
				$("#c_2 span").html(counters[2])

			}
			
			else player = !player //switch player
		}
		else {
			console.log("block is occupied!")
		}
		
		
		
		//player = !player //switch player
	})
	

});

//check if a block is free
function free(id){
	if (blocks[id] == 0){
		return true
	}
	else return false;
}

function draw(id, player){
	if (player){
		$("#" + id).addClass("p1");
	}
	else if (!player){
		$("#" + id).addClass("p2");
	}
	
}

function check_game(){

	var temp = false;
	
	winning_combo.forEach(function(combo){
		if ((blocks[combo[0]]+blocks[combo[1]]+blocks[combo[2]]) >=3 ){
			if (blocks[combo[0]] === blocks[combo[1]] && blocks[combo[0]] === blocks[combo[2]]) 			{	
				temp = true;
				}
			}
		
		})
		return temp;
		
}

function check_zero(){
	var zero = false;
	blocks.forEach(function(block){
		if (block === 0){
			zero = true;
		}
	})
	return zero
}

function end_game(player){
	if (player) {
		console.log("PLAYER 1 WINS!")
		$("#game_over_msg").html("X WINS!")
		$("#game_over").show()
		counters[0]++
		$("#c_0 span").html(counters[0])

		
	}
	else {
		$("#game_over_msg").html("O WINS!")
		$("#game_over").show()
		counters[1]++
		console.log("PLAYER 2 WINS!")
		$("#c_1 span").html(counters[1])
	}
	//reset_game();
	return;
}

function reset_game(){
	blocks.forEach(function(block, i){
			blocks[i] = 0;
			$("#" + i).removeClass("p1");
			$("#" + i).removeClass("p2");
			})
	$("#start_msg").show();
	$("#whos_turn").hide();
	$("#game_over").hide()
	return true;
	}
