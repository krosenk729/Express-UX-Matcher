let Friend = function(name, bio, img, scores, approved = false) {
	this.name = name;
	this.bio = bio;
	this.img = img;
	this.approved = approved;
	this.scores = scores.map(i => Number(i));
	this.matchScore = this.scores.reduce((t, c)=> t + c, 0);
	let temp = this.scores.slice().sort();
	this.opinionScore = Math.abs( temp.pop() - temp.shift() );
}

Friend.prototype.getInsertString = function(){
	return `('` + this.name + `','` + this.bio + `','` + this.img + `','` + this.approved + `','[` + this.scores + `]', ` + this.matchScore + `,` + this.opinionScore + `)`;
}

module.exports = Friend;