using Microsoft.EntityFrameworkCore.Migrations;

namespace Shine.Data.Migrations
{
    public partial class SplitCategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "CategoryType",
                table: "Categories",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CategoryType",
                table: "Categories");
        }
    }
}
