using Microsoft.EntityFrameworkCore.Migrations;

namespace Shine.Data.Migragions
{
    public partial class renamePayment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payment_AspNetUsers_CreatedById",
                table: "Payment");

            migrationBuilder.DropForeignKey(
                name: "FK_Payment_AspNetUsers_ModifiedById",
                table: "Payment");

            migrationBuilder.DropForeignKey(
                name: "FK_Payment_Orders_OrderId",
                table: "Payment");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Payment",
                table: "Payment");

            migrationBuilder.RenameTable(
                name: "Payment",
                newName: "Payments");

            migrationBuilder.RenameIndex(
                name: "IX_Payment_OrderId",
                table: "Payments",
                newName: "IX_Payments_OrderId");

            migrationBuilder.RenameIndex(
                name: "IX_Payment_ModifiedById",
                table: "Payments",
                newName: "IX_Payments_ModifiedById");

            migrationBuilder.RenameIndex(
                name: "IX_Payment_CreatedById",
                table: "Payments",
                newName: "IX_Payments_CreatedById");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Payments",
                table: "Payments",
                column: "PaymentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_AspNetUsers_CreatedById",
                table: "Payments",
                column: "CreatedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_AspNetUsers_ModifiedById",
                table: "Payments",
                column: "ModifiedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_Orders_OrderId",
                table: "Payments",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "OrderId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_AspNetUsers_CreatedById",
                table: "Payments");

            migrationBuilder.DropForeignKey(
                name: "FK_Payments_AspNetUsers_ModifiedById",
                table: "Payments");

            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Orders_OrderId",
                table: "Payments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Payments",
                table: "Payments");

            migrationBuilder.RenameTable(
                name: "Payments",
                newName: "Payment");

            migrationBuilder.RenameIndex(
                name: "IX_Payments_OrderId",
                table: "Payment",
                newName: "IX_Payment_OrderId");

            migrationBuilder.RenameIndex(
                name: "IX_Payments_ModifiedById",
                table: "Payment",
                newName: "IX_Payment_ModifiedById");

            migrationBuilder.RenameIndex(
                name: "IX_Payments_CreatedById",
                table: "Payment",
                newName: "IX_Payment_CreatedById");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Payment",
                table: "Payment",
                column: "PaymentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Payment_AspNetUsers_CreatedById",
                table: "Payment",
                column: "CreatedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Payment_AspNetUsers_ModifiedById",
                table: "Payment",
                column: "ModifiedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Payment_Orders_OrderId",
                table: "Payment",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "OrderId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
