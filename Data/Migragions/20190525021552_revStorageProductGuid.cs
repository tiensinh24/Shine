using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Shine.Data.Migragions
{
    public partial class revStorageProductGuid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_StorageProducts",
                table: "StorageProducts");

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "StorageProducts",
                nullable: false,
                defaultValueSql: "NEWID()");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StorageProducts",
                table: "StorageProducts",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_StorageProducts_StorageId",
                table: "StorageProducts",
                column: "StorageId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_StorageProducts",
                table: "StorageProducts");

            migrationBuilder.DropIndex(
                name: "IX_StorageProducts_StorageId",
                table: "StorageProducts");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "StorageProducts");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StorageProducts",
                table: "StorageProducts",
                columns: new[] { "StorageId", "ProductId", "Date", "Type" });
        }
    }
}
