
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('task').del()
    .then(function () {
      // Inserts seed entries
      return knex('task').insert([
        {id: 1, title: 'test',content: 'test'},
        {id: 2, title: 'sample',content: 'sample'},
      ]);
    });
};
