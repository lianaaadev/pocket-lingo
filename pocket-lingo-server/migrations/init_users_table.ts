import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('firstName').notNullable();
        table.string('lastName').notNullable();
        table.string('username').notNullable().unique();
        table.string('password').notNullable();
    });

    await knex.schema.createTable('vocab', (table) => {
        table.increments('id').primary();
        table.string('word').notNullable();
        table.string('definition').notNullable();
        table.string('example').notNullable();
        table.integer('userId').unsigned().references('id').inTable('users').onDelete('CASCADE');
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('vocab');
    await knex.schema.dropTable('users');
}