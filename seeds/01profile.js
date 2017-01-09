exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex.raw('DELETE FROM profile; ALTER SEQUENCE profile_id_seq RESTART WITH 6')
        .then(() => {
            const profiles = [{
                id: 1,
                email: 'Joe.umm.Blow@hotmail.com',
                password: '$2a$10$uW56Nm2bl6d.PcZ5wnkcquP8ks6FXXvP6e1vnEHf0I42F8rPXnmce',
                first_name: 'Kyrie',
                last_name: 'James',
                image_url: 'https://s27.postimg.org/3lifeb783/Screen_Shot_2017_01_03_at_8_21_54_PM.png'
            }, {
                id: 2,
                email: 'BlueHair@aol.com',
                password: '$2a$10$adkrS2aso75m8yhXFQxJi.j2O3OsvzBYX6GB6XemnG75DXPNcDytW',
                first_name: 'Mary Ann',
                last_name: 'Berbeth',
                image_url: 'https://s27.postimg.org/r8je2fck3/Screen_Shot_2017_01_03_at_8_28_13_PM.png'
            }, {
                id: 3,
                email: 'KickFlip@aol.com',
                password: '$2a$10$wJTK265xTTsgT4EnU3QwY.z8VP6xjLKSAGxjoCDq32bjl9nzbP/SS',
                first_name: 'Chris',
                last_name: 'Houdlette',
                image_url: 'https://s27.postimg.org/78y6kdff7/Screen_Shot_2017_01_03_at_8_15_10_PM.png'
            }, {
                id: 4,
                email: 'scorchoNiN@aol.com',
                password: '$2a$10$GI0b3x4a/qdhCS94.swn6u/ai7jJZa1MU0v68fKA.GxWBc4PdlB1e',
                first_name: 'Kevin',
                last_name: 'Love',
                is_admin: true,
                image_url: 'https://s27.postimg.org/aq08ncehf/Screen_Shot_2017_01_03_at_8_18_07_PM.png'
            },
            {
                id: 5,
                email: 'admin@admin.com',
                password: '$2a$10$Ytv5sQ.Xhw4dJMgtWRuFNuqqeqicXfuOvNtLTDZqG1LFQgDRanogK',
                first_name: 'Admin',
                last_name: 'Admin',
                is_admin: true,
                image_url: 'https://s27.postimg.org/aq08ncehf/Screen_Shot_2017_01_03_at_8_18_07_PM.png'
            }]
            return knex('profile').insert(profiles);
        });
};
