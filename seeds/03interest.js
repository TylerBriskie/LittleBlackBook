exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('interest').del().then(
        knex.raw('TRUNCATE interest RESTART IDENTITY CASCADE;')
        .then(() => {
            const interests = [{
                id:1,
                interest_name: 'Hiking'
            }, {
                id:2,
                interest_name: 'Movies'
            }, {
                id:3,
                interest_name: 'Skiing'
            }, {
                id:4,
                interest_name: 'Reading'
            }, {
                id:5,
                interest_name: 'Cycling'
            }, {
                id:6,
                interest_name: 'Dogs'
            }, {
                id:7,
                interest_name: 'Coffee'
            }, {
                id:8,
                interest_name: 'Craft Beer'
            }, {
                id:9,
                interest_name: 'Reality TV'
            }, {
                id:10,
                interest_name: 'Archaeology'
            }, {
                id:11,
                interest_name: 'Board Games'
            }, {
                id:12,
                interest_name: 'Church'
            }]
            return knex('interest').insert(interests);
        }));
};
