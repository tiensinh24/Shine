using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Shine.Data.Migrations
{
    public partial class setDateType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "DateOfBirth",
                table: "Persons",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "date");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "DateOfBirth",
                table: "Persons",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime));
        }
    }
}
