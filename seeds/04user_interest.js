exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('user_interest').del().then(
        knex.raw('TRUNCATE user_interest RESTART IDENTITY CASCADE;')
        .then(() => {
            const user_interests = [{
                profile_id: '1',
                interest_id: '1'
            }, {
                profile_id: '2',
                interest_id: '1'
            }, {
                profile_id: '3',
                interest_id: '1'
            }, {
                profile_id: '4',
                interest_id: '1'
            }, {
                profile_id: '2',
                interest_id: '2'
            }]
            return knex('user_interest').insert(user_interests);
        }));
};
