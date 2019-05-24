using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Shine.Data.Migragions
{
    public partial class FKStorageProduct : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_StorageProducts",
                table: "StorageProducts");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Date",
                table: "StorageProducts",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime));

            migrationBuilder.AddColumn<bool>(
                name: "Type",
                table: "StorageProducts",
                nullable: false,
                defaultValueSql: "0");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StorageProducts",
                table: "StorageProducts",
                columns: new[] { "StorageId", "ProductId", "Date", "Type" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_StorageProducts",
                table: "StorageProducts");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "StorageProducts");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Date",
                table: "StorageProducts",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "date");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StorageProducts",
                table: "StorageProducts",
                columns: new[] { "StorageId", "ProductId" });
        }
    }
}
