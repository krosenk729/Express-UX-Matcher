const Friend = require('./model');
const pg = require('pg');
const conString = 'postgres://lmcdpcos:ohDfcElBPBTMef3YQyT_9dLhqqdxP2ty@baasu.db.elephantsql.com:5432/lmcdpcos';
const client = new pg.Client(conString);
let myFriends = [];

myFriends.push(
	new Friend('Monster-osittt-yyyy', 
		'Cannot use a keyboard. Should not use a keyboard. Keep away from internet at all costs',
		'/assets/monster.png',
		Array(12).fill(1),
		true));

myFriends.push(
	new Friend('Squirtle', 
		'Pokemons love to battle and this guy likes to aggitate users with annoying software',
		'/assets/squirtle.png',
		Array(12).fill(2),
		true));

myFriends.push(
	new Friend('Cute Troll', 
		'Trolls users but does it while smiling',
		'/assets/troll.png',
		Array(12).fill(3),
		true));

myFriends.push(
	new Friend('Backend Bob', 
		'Good at doing backend work since most of his UIs end up in the recycle bin.',
		'/assets/bob.png',
		Array(12).fill(4),
		true));

myFriends.push(
	new Friend('Guy With Beard', 
		'Celebrates Movember but loves Nodevember better. Middleware means he has seen UIs but still has trouble hacking them together',
		'/assets/beard.png',
		Array(12).fill(5),
		true));

myFriends.push(
	new Friend('Lucky Bear', 
		'Zero design training but luck brings pixels together in the right way',
		'/assets/carebear.png',
		Array(12).fill(6),
		true));

myFriends.push(
	new Friend('Tortoro', 
		'Good neighbor and (with very little brains) is very unbiased in design process',
		'/assets/hipster.png',
		Array(12).fill(7),
		true));

myFriends.push(
	new Friend('Hipster Sister', 
		'When Adobe tools were cool, hipster gal was doing the cool thing. Good designer; not great UXer. Loves almond butter',
		'/assets/hipster.png',
		Array(12).fill(8),
		true));

myFriends.push(
	new Friend('Yoda', 
		'No need for user research, yoda just uses the force to make seamless UIs with the skills of a jeti',
		'/assets/yoda.png',
		Array(12).fill(9),
		true));

myFriends.push(
	new Friend('Unicorn', 
		'Do these exist? A unicorn can design and code. And do it while following process instead of opinions',
		'/assets/unicorn2.jpg',
		Array(12).fill(10),
		true));

/////////////////////////

let inserting = myFriends.map(i => i.getInsertString()).join(',');
let created = `
CREATE SEQUENCE id_count;
CREATE TABLE friends (
id INT NOT NULL PRIMARY KEY DEFAULT NEXTVAL('id_count'),
name VARCHAR(255) NOT NULL,
bio TEXT,
img TEXT,
approved VARCHAR(255) NOT NULL,
scores VARCHAR(255), 
matchScore INT,
opinionScore INT
)
`;

////////////////////////
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query(`INSERT INTO friends (name, bio, img, approved, scores, matchScore, opinionScore) VALUES ${inserting}`,
  	function(err, result) {
	    if(err) {
    		client.end();
			return console.error('error running query', err);
	    }
    	console.log(result);
    	client.end();
  });
});	