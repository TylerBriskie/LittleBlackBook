exports.up = function(knex, Promise) {
    return knex.schema.createTable('suitor', (table) => {
        table.increments();
        table.integer('profile_id').unsigned().references('id').inTable('profile').onDelete('cascade');
        table.text('name').notNullable();
        table.integer('age');
        table.text('where_met');
        table.integer('rating');
        table.text('image_url');
        table.text('note');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('suitor');
};
