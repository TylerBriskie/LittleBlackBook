exports.up = function(knex, Promise) {
    return knex.schema.createTable('date', (table) => {
        table.increments('date_id');
        table.integer('suitor_id').unsigned().references('id').inTable('suitor').onDelete('cascade');
        table.integer('profile_id').unsigned().references('id').inTable('profile').onDelete('cascade');
        table.date('date');
        table.time('time');
        table.text('location');
        table.text('date_note');
        table.boolean('has_occured').default(false);
        table.integer('date_review');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('date');
};
