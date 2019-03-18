using Microsoft.EntityFrameworkCore.Migrations;

namespace Shine.Data.Migrations
{
    public partial class FKUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ModifiedById",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "ProductOrders");

            migrationBuilder.DropColumn(
                name: "ModifiedById",
                table: "ProductOrders");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "ModifiedById",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "Persons");

            migrationBuilder.DropColumn(
                name: "ModifiedById",
                table: "Persons");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "PersonProducts");

            migrationBuilder.DropColumn(
                name: "ModifiedById",
                table: "PersonProducts");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "Payment");

            migrationBuilder.DropColumn(
                name: "ModifiedById",
                table: "Payment");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "ModifiedById",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "Countries");

            migrationBuilder.DropColumn(
                name: "ModifiedById",
                table: "Countries");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "Costs");

            migrationBuilder.DropColumn(
                name: "ModifiedById",
                table: "Costs");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "ModifiedById",
                table: "Categories");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CreatedById",
                table: "Products",
                nullable: false,
                defaultValueSql: "0");

            migrationBuilder.AddColumn<int>(
                name: "ModifiedById",
                table: "Products",
                nullable: false,
                defaultValueSql: "0");

            migrationBuilder.AddColumn<int>(
                name: "CreatedById",
                table: "ProductOrders",
                nullable: false,
                defaultValueSql: "0");

            migrationBuilder.AddColumn<int>(
                name: "ModifiedById",
                table: "ProductOrders",
                nullable: false,
                defaultValueSql: "0");

            migrationBuilder.AddColumn<int>(
                name: "CreatedById",
                table: "Photos",
                nullable: false,
                defaultValueSql: "0");

            migrationBuilder.AddColumn<int>(
                name: "ModifiedById",
                table: "Photos",
                nullable: false,
                defaultValueSql: "0");

            migrationBuilder.AddColumn<int>(
                name: "CreatedById",
                table: "Persons",
                nullable: false,
                defaultValueSql: "0");

            migrationBuilder.AddColumn<int>(
                name: "ModifiedById",
                table: "Persons",
                nullable: false,
                defaultValueSql: "0");

            migrationBuilder.AddColumn<int>(
                name: "CreatedById",
                table: "PersonProducts",
                nullable: false,
                defaultValueSql: "0");

            migrationBuilder.AddColumn<int>(
                name: "ModifiedById",
                table: "PersonProducts",
                nullable: false,
                defaultValueSql: "0");

            migrationBuilder.AddColumn<int>(
                name: "CreatedById",
                table: "Payment",
                nullable: false,
                defaultValueSql: "0");

            migrationBuilder.AddColumn<int>(
                name: "ModifiedById",
                table: "Payment",
                nullable: false,
                defaultValueSql: "0");

            migrationBuilder.AddColumn<int>(
                name: "CreatedById",
                table: "Orders",
                nullable: false,
                defaultValueSql: "0");

            migrationBuilder.AddColumn<int>(
                name: "ModifiedById",
                table: "Orders",
                nullable: false,
                defaultValueSql: "0");

            migrationBuilder.AddColumn<int>(
                name: "CreatedById",
                table: "Countries",
                nullable: false,
                defaultValueSql: "0");

            migrationBuilder.AddColumn<int>(
                name: "ModifiedById",
                table: "Countries",
                nullable: false,
                defaultValueSql: "0");

            migrationBuilder.AddColumn<int>(
                name: "CreatedById",
                table: "Costs",
                nullable: false,
                defaultValueSql: "0");

            migrationBuilder.AddColumn<int>(
                name: "ModifiedById",
                table: "Costs",
                nullable: false,
                defaultValueSql: "0");

            migrationBuilder.AddColumn<int>(
                name: "CreatedById",
                table: "Categories",
                nullable: false,
                defaultValueSql: "0");

            migrationBuilder.AddColumn<int>(
                name: "ModifiedById",
                table: "Categories",
                nullable: false,
                defaultValueSql: "0");
        }
    }
}
