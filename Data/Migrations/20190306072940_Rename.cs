using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Shine.Data.Migrations
{
    public partial class Rename : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaymentDateOne",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "PaymentDateTwo",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "PaymentOne",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "PaymentTwo",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "LocalDateOfIssue",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "LocalOrderNumber",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Currency",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "RateOne",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "RateTwo",
                table: "Orders");

            migrationBuilder.CreateTable(
                name: "Payment",
                columns: table => new
                {
                    PaymentId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    PaymentDate = table.Column<DateTime>(nullable: false),
                    Amount = table.Column<decimal>(nullable: false),
                    Currency = table.Column<bool>(nullable: false),
                    Rate = table.Column<decimal>(nullable: false),
                    OrderId = table.Column<int>(nullable: false),
                    CreatedById = table.Column<int>(nullable: false, defaultValueSql: "0"),
                    CreatedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "GetUtcDate()"),
                    IsDeleted = table.Column<bool>(nullable: false, defaultValueSql: "0"),
                    ModifiedById = table.Column<int>(nullable: false, defaultValueSql: "0"),
                    ModifiedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "GetUtcDate()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payment", x => x.PaymentId);
                    table.ForeignKey(
                        name: "FK_Payment_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "OrderId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Payment_OrderId",
                table: "Payment",
                column: "OrderId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Payment");

            migrationBuilder.AddColumn<DateTime>(
                name: "PaymentDateOne",
                table: "Orders",
                type: "date",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "PaymentDateTwo",
                table: "Orders",
                type: "date",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<decimal>(
                name: "PaymentOne",
                table: "Orders",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "PaymentTwo",
                table: "Orders",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<DateTime>(
                name: "LocalDateOfIssue",
                table: "Orders",
                type: "date",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LocalOrderNumber",
                table: "Orders",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Currency",
                table: "Orders",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "RateOne",
                table: "Orders",
                type: "decimal(7,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "RateTwo",
                table: "Orders",
                type: "decimal(7,2)",
                nullable: true);
        }
    }
}
