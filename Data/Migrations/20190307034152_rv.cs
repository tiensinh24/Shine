using Microsoft.EntityFrameworkCore.Migrations;

namespace Shine.Data.Migrations
{
    public partial class rv : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ProductOrderType",
                table: "ProductOrders");

            migrationBuilder.DropColumn(
                name: "Specification",
                table: "ProductOrders");

            migrationBuilder.DropColumn(
                name: "LocalPrice",
                table: "ProductOrders");

            migrationBuilder.DropColumn(
                name: "LocalQuantity",
                table: "ProductOrders");

            migrationBuilder.AlterColumn<decimal>(
                name: "Rate",
                table: "ProductOrders",
                nullable: false,
                oldClrType: typeof(decimal),
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "Products",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AlterColumn<decimal>(
                name: "Rate",
                table: "ProductOrders",
                nullable: true,
                oldClrType: typeof(decimal));

            migrationBuilder.AddColumn<bool>(
                name: "ProductOrderType",
                table: "ProductOrders",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Specification",
                table: "ProductOrders",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "LocalPrice",
                table: "ProductOrders",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "LocalQuantity",
                table: "ProductOrders",
                nullable: true);
        }
    }
}
