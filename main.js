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
	// clone the init cost array into new temp array
	// to avoid changing the original
	var iCost = initCost.slice(0);
	for(var i = 0; i < dna.length; i++){
		total += cost[i][dna[i]];
		// investment or init cost checking
		if(iCost[dna[i]] != 0){
			total += iCost[dna[i]];
			// set to zero so we don't add this more than once
			iCost[dna[i]] = 0;
		}
	}
	return total;
}

function randomDNA(){
	// array of five customers with the position 0-4 for which customer and the 
	//value, 0-2 for which dc to use
	var dna = {
		genes: [],
		cost: 0
	};
	for(var i = 0; i < 5; i++){
		dna.genes[i] = random(0,2);
	}
	dna.cost = getCost(dna.genes);
	return dna;
}
function offspring(p1, p2, m){
	var o1 = {
		genes: [],
		cost: 0
	};
	var o2 = {
		genes: [],
		cost: 0
	};
	var crossoverPoint = random(1,p1.genes.length-1);
	for(var i = 0; i < p1.genes.length; i++){
		if(i < crossoverPoint ){
			copyGene(o1,p1,i,m);
			copyGene(o2,p2,i,m);
		} else {
			copyGene(o1,p2,i,m);
			copyGene(o2,p1,i,m);
		}
	}
	o1.cost = getCost(o1.genes);
	o2.cost = getCost(o2.genes);
	return [o1,o2];
}
function copyGene(o,p,i,m){
	if(Math.random() >= m){
		o.genes.push(p.genes[i]);
	} else {
		o.genes.push(random(0,2));
	}
}
function selection(population){
	var crossover = 0.1;
	var mutationRate = 0.1;
	var o = [];
	var newPopulation = [];
	for(var a = 0; a < population.length; a++){
		for(var b = a;  b < population.length; b++){
			if(Math.random() < crossover){
				var o = offspring(population[a], population[b], mutationRate);
				newPopulation.push(o[0]);
				newPopulation.push(o[1]);
			}
		}
	}
	return newPopulation;
}
function getBest(population, limit){
	return population.sort(function(a,b){return a.cost - b.cost}).slice(0,limit);
}
$(document).ready(function(){
	var generations = 10;
	var initialPopulation = 10;
	var populationLimit = 100;
	var population = [];
	var newPopulation = [];
	for(var p = 0; p < initialPopulation; p++){
		population.push(randomDNA());
	}
	for(var g = 0; g < 10; g++){
		population = shuffle(population);
		newPopulation = selection(population);
		population = population.concat(newPopulation);
		// check for duplicates
		for(var c = 0; c < population.length; c++){
			for(var d = c+1; d < population.length; d++){
				if(arraysEqual(population[c].genes, population[d].genes)){
					population.splice(d,1);
				}
			}
		}
		population = getBest(population, populationLimit);
	}
	console.log(getBest(population, populationLimit));
});
