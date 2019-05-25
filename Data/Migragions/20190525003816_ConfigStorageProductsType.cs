using Microsoft.EntityFrameworkCore.Migrations;

namespace Shine.Data.Migragions
{
    public partial class ConfigStorageProductsType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "Type",
                table: "StorageProducts",
                nullable: false,
                defaultValue: true,
                oldClrType: typeof(bool),
                oldDefaultValueSql: "0");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "Type",
                table: "StorageProducts",
                nullable: false,
                defaultValueSql: "0",
                oldClrType: typeof(bool),
                oldDefaultValue: true);
        }
    }
}
