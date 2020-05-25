exports.up = function (knex, Promise) {
  return knex.schema.table("users", (table) => {
    table.string("firstName", 50).notNullable();
    table.string("lastName", 50).notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table("users", (table) => {
    table.dropColumn("firstName");
    table.dropColumn("lastName");
  });
};
