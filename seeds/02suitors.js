exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex.raw('DELETE FROM suitor; ALTER SEQUENCE suitor_id_seq RESTART WITH 5')
        .then(() => {
            const suitors = [{
                id: 1,
                profile_id: 1,
                name: 'Candi',
                age: '18',
                where_met: '7-11',
                rating: '8',
                image_url: 'https://s27.postimg.org/sl5oi1zdf/Screen_Shot_2017_01_03_at_8_14_19_PM.png',
                note: 'Candi and I met waiting in line for taquitos and cigarettes at 7-11. Love at first slurpee for sure! '
            }, {
                id: 2,
                profile_id: 3,
                name: 'Douglas',
                age: '24',
                where_met: 'Grindr',
                rating: '8',
                image_url: 'https://s27.postimg.org/3qm6nzej7/Screen_Shot_2017_01_03_at_8_14_42_PM.png',
                note: 'Dougie and I met on grindr. Not sure if he wants LTR or just FWB'
            }, {
                id: 3,
                profile_id: 2,
                name: 'Pete',
                age: '33',
                where_met: 'Broncos Game',
                rating: '7',
                image_url: 'https://s27.postimg.org/4za29m6hf/Screen_Shot_2017_01_03_at_8_24_57_PM.png',
                note: 'Pete is so dreamy! Met at the broncos game and we did not get to chat a lot bc he was totally wasted!'
            }, {
                id: 4,
                profile_id: 2,
                name: 'Karen',
                age: '28',
                where_met: 'Brunch with Friends',
                rating: '10',
                image_url: 'https://s27.postimg.org/3vlcjwwgj/Screen_Shot_2017_01_03_at_8_27_04_PM.png',
                note: 'Karen is soooooo fine! Met her at brunch and trying to get her number!'
            }]
            return knex('suitor').insert(suitors);
        });
};
