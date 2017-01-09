exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex.raw('DELETE FROM date; ALTER SEQUENCE date_date_id_seq RESTART WITH 7')
        .then(() => {
            const dates = [{
                date_id: 1,
                suitor_id: 1,
                profile_id: 1,
                date: '01/04/2017',
                time: '01:00:00',
                location: 'Chucky Cheese',
                date_review: 10
            }, {
                date_id: 2,
                suitor_id: 2,
                profile_id: 3,
                date: '01/02/2017',
                time: '01:00:00',
                location: 'Linger',
                date_review: 10
            }, {
                date_id: 3,
                suitor_id: 3,
                profile_id: 2,
                date: '01/04/2017',
                time: '01:00:00',
                location: '7-11',
                date_review: 10
            }, {
                date_id: 4,
                suitor_id: 4,
                profile_id: 4,
                date: '01/05/2017',
                time: '01:00:00',
                location: 'Colt and Grey',
                date_review: 10
            }, {
                date_id: 5,
                suitor_id: 1,
                profile_id: 2,
                date: '01/05/2017',
                time: '01:00:00',
                location: 'Bathroom',
                date_review: 2,
                has_occured: true,
                date_note: 'Had a great time in the bathroom!'
            }, {
                date_id: 6,
                suitor_id: 4,
                profile_id: 2,
                date: '01/12/2012',
                time: '01:30:00',
                location: 'Bubba Gump Shrimp',
                date_review: 2,
                has_occured: true,

            }]
            return knex('date').insert(dates);
        });
};
