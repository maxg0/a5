var cost = [
//	 a b c
	[3,8,9], // 1st client
	[3,3,9], // 2 -:-
	[7,6,8], // 3
	[9,7,3], // 4
	[9,6,4]];// 5

var initCost = [7,5,7];

function getCost(dna){
	var total = 0;
	// check initial costs
	for(var i = 0; i < dna.length; i++){
		// there is only cost if a dc is used
		if(dna[i].length > 0){
			total += initCost[i];
			// check distribution costs for each client
			for(var w = 0; w < dna[i].length; w++){
				total += cost[w][i];
			}
		}
	}
	return total;
}

function randomDNA(){
	// each dc gets an array of what clients they distribute to
	var dna = [[],[],[]];
	for(var i = 0; i < 5; i++){
		dna[random(0,2)].push(i);
	}
	return dna;
}

$(document).ready(function(){
	var test = randomDNA();
	console.log(test);
	console.log(getCost(test));
});
