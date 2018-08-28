'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('results', {
    id: { 
    	type: 'int', 
    	primaryKey: true, 
    	autoIncrement: true 
    },
    game_id: {
    	type: 'int',
      	unsigned: true,
	    foreignKey: {
	        name: 'results_game_id_fk',
	        table: 'games',
	        rules: {
	            onDelete: 'CASCADE',
	            onUpdate: 'RESTRICT'
          	},
	        mapping: {
	          	game_id: 'id'
	        }
	    }
    },
    draw_id: {
    	type: 'int',
	    notNull: true,
    },
    draw_date: {
    	type: 'datetime'
    },
    main_numbers: {
    	type: 'text'
    },
    supp_numbers: {
    	type: 'string',
    	length: 100,
    },
    dividends: {
    	type: 'text'
    },
    powerball_numbers: {
    	type: 'string',
    	length: 100,
    },
    strike_numbers: {
    	type: 'string',
    	length: 100,
    }
  });
};

exports.down = function(db) {
  return db.dropTable('results');
};

exports._meta = {
  "version": 1
};
