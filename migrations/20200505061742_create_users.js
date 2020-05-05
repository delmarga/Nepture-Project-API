exports.up = function (knex, Promise) {
  return knex.schema.createTable("users", (table) => {
    table.increments().primary();
    table.string("email", 50).unique().notNullable();
    table.string("password", 250).notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("users");
};
