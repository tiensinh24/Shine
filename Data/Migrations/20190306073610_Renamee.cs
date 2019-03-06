using Microsoft.EntityFrameworkCore.Migrations;

namespace Shine.Data.Migrations
{
    public partial class Renamee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Value",
                table: "Costs",
                newName: "Amount");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Costs",
                newName: "Description");

            migrationBuilder.AddColumn<bool>(
                name: "Currency",
                table: "Costs",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Currency",
                table: "Costs");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Costs",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "Amount",
                table: "Costs",
                newName: "Value");
        }
    }
}
