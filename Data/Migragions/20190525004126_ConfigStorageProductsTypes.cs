using Microsoft.EntityFrameworkCore.Migrations;

namespace Shine.Data.Migragions
{
    public partial class ConfigStorageProductsTypes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "Type",
                table: "StorageProducts",
                nullable: false,
                oldClrType: typeof(bool),
                oldDefaultValue: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "Type",
                table: "StorageProducts",
                nullable: false,
                defaultValue: true,
                oldClrType: typeof(bool));
        }
    }
}
