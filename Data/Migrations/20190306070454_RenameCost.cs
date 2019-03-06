using Microsoft.EntityFrameworkCore.Migrations;

namespace Shine.Data.Migrations
{
    public partial class RenameCost : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Costs_Orders_InvoiceId",
                table: "Costs");

            migrationBuilder.RenameColumn(
                name: "InvoiceId",
                table: "Costs",
                newName: "OrderId");

            migrationBuilder.RenameIndex(
                name: "IX_Costs_InvoiceId",
                table: "Costs",
                newName: "IX_Costs_OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Costs_Orders_OrderId",
                table: "Costs",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "OrderId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Costs_Orders_OrderId",
                table: "Costs");

            migrationBuilder.RenameColumn(
                name: "OrderId",
                table: "Costs",
                newName: "InvoiceId");

            migrationBuilder.RenameIndex(
                name: "IX_Costs_OrderId",
                table: "Costs",
                newName: "IX_Costs_InvoiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Costs_Orders_InvoiceId",
                table: "Costs",
                column: "InvoiceId",
                principalTable: "Orders",
                principalColumn: "OrderId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
