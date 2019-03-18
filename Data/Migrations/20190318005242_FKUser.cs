using Microsoft.EntityFrameworkCore.Migrations;

namespace Shine.Data.Migrations
{
    public partial class FKUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Products",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                table: "Products",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "ProductOrders",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                table: "ProductOrders",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Photos",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                table: "Photos",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Persons",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                table: "Persons",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "PersonProducts",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                table: "PersonProducts",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Payment",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                table: "Payment",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Orders",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                table: "Orders",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Countries",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                table: "Countries",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Costs",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                table: "Costs",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Categories",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                table: "Categories",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Products_CreatedBy",
                table: "Products",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Products_ModifiedBy",
                table: "Products",
                column: "ModifiedBy");

            migrationBuilder.CreateIndex(
                name: "IX_ProductOrders_CreatedBy",
                table: "ProductOrders",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_ProductOrders_ModifiedBy",
                table: "ProductOrders",
                column: "ModifiedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Photos_CreatedBy",
                table: "Photos",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Photos_ModifiedBy",
                table: "Photos",
                column: "ModifiedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Persons_CreatedBy",
                table: "Persons",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Persons_ModifiedBy",
                table: "Persons",
                column: "ModifiedBy");

            migrationBuilder.CreateIndex(
                name: "IX_PersonProducts_CreatedBy",
                table: "PersonProducts",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_PersonProducts_ModifiedBy",
                table: "PersonProducts",
                column: "ModifiedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Payment_CreatedBy",
                table: "Payment",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Payment_ModifiedBy",
                table: "Payment",
                column: "ModifiedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_CreatedBy",
                table: "Orders",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_ModifiedBy",
                table: "Orders",
                column: "ModifiedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Countries_CreatedBy",
                table: "Countries",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Countries_ModifiedBy",
                table: "Countries",
                column: "ModifiedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Costs_CreatedBy",
                table: "Costs",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Costs_ModifiedBy",
                table: "Costs",
                column: "ModifiedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Categories_CreatedBy",
                table: "Categories",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Categories_ModifiedBy",
                table: "Categories",
                column: "ModifiedBy");

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_AspNetUsers_CreatedBy",
                table: "Categories",
                column: "CreatedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_AspNetUsers_ModifiedBy",
                table: "Categories",
                column: "ModifiedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Costs_AspNetUsers_CreatedBy",
                table: "Costs",
                column: "CreatedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Costs_AspNetUsers_ModifiedBy",
                table: "Costs",
                column: "ModifiedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Countries_AspNetUsers_CreatedBy",
                table: "Countries",
                column: "CreatedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Countries_AspNetUsers_ModifiedBy",
                table: "Countries",
                column: "ModifiedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_AspNetUsers_CreatedBy",
                table: "Orders",
                column: "CreatedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_AspNetUsers_ModifiedBy",
                table: "Orders",
                column: "ModifiedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Payment_AspNetUsers_CreatedBy",
                table: "Payment",
                column: "CreatedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Payment_AspNetUsers_ModifiedBy",
                table: "Payment",
                column: "ModifiedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PersonProducts_AspNetUsers_CreatedBy",
                table: "PersonProducts",
                column: "CreatedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PersonProducts_AspNetUsers_ModifiedBy",
                table: "PersonProducts",
                column: "ModifiedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Persons_AspNetUsers_CreatedBy",
                table: "Persons",
                column: "CreatedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Persons_AspNetUsers_ModifiedBy",
                table: "Persons",
                column: "ModifiedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_AspNetUsers_CreatedBy",
                table: "Photos",
                column: "CreatedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_AspNetUsers_ModifiedBy",
                table: "Photos",
                column: "ModifiedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductOrders_AspNetUsers_CreatedBy",
                table: "ProductOrders",
                column: "CreatedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductOrders_AspNetUsers_ModifiedBy",
                table: "ProductOrders",
                column: "ModifiedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_AspNetUsers_CreatedBy",
                table: "Products",
                column: "CreatedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_AspNetUsers_ModifiedBy",
                table: "Products",
                column: "ModifiedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categories_AspNetUsers_CreatedBy",
                table: "Categories");

            migrationBuilder.DropForeignKey(
                name: "FK_Categories_AspNetUsers_ModifiedBy",
                table: "Categories");

            migrationBuilder.DropForeignKey(
                name: "FK_Costs_AspNetUsers_CreatedBy",
                table: "Costs");

            migrationBuilder.DropForeignKey(
                name: "FK_Costs_AspNetUsers_ModifiedBy",
                table: "Costs");

            migrationBuilder.DropForeignKey(
                name: "FK_Countries_AspNetUsers_CreatedBy",
                table: "Countries");

            migrationBuilder.DropForeignKey(
                name: "FK_Countries_AspNetUsers_ModifiedBy",
                table: "Countries");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_AspNetUsers_CreatedBy",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_AspNetUsers_ModifiedBy",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Payment_AspNetUsers_CreatedBy",
                table: "Payment");

            migrationBuilder.DropForeignKey(
                name: "FK_Payment_AspNetUsers_ModifiedBy",
                table: "Payment");

            migrationBuilder.DropForeignKey(
                name: "FK_PersonProducts_AspNetUsers_CreatedBy",
                table: "PersonProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_PersonProducts_AspNetUsers_ModifiedBy",
                table: "PersonProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_Persons_AspNetUsers_CreatedBy",
                table: "Persons");

            migrationBuilder.DropForeignKey(
                name: "FK_Persons_AspNetUsers_ModifiedBy",
                table: "Persons");

            migrationBuilder.DropForeignKey(
                name: "FK_Photos_AspNetUsers_CreatedBy",
                table: "Photos");

            migrationBuilder.DropForeignKey(
                name: "FK_Photos_AspNetUsers_ModifiedBy",
                table: "Photos");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductOrders_AspNetUsers_CreatedBy",
                table: "ProductOrders");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductOrders_AspNetUsers_ModifiedBy",
                table: "ProductOrders");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_AspNetUsers_CreatedBy",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_AspNetUsers_ModifiedBy",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_CreatedBy",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_ModifiedBy",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_ProductOrders_CreatedBy",
                table: "ProductOrders");

            migrationBuilder.DropIndex(
                name: "IX_ProductOrders_ModifiedBy",
                table: "ProductOrders");

            migrationBuilder.DropIndex(
                name: "IX_Photos_CreatedBy",
                table: "Photos");

            migrationBuilder.DropIndex(
                name: "IX_Photos_ModifiedBy",
                table: "Photos");

            migrationBuilder.DropIndex(
                name: "IX_Persons_CreatedBy",
                table: "Persons");

            migrationBuilder.DropIndex(
                name: "IX_Persons_ModifiedBy",
                table: "Persons");

            migrationBuilder.DropIndex(
                name: "IX_PersonProducts_CreatedBy",
                table: "PersonProducts");

            migrationBuilder.DropIndex(
                name: "IX_PersonProducts_ModifiedBy",
                table: "PersonProducts");

            migrationBuilder.DropIndex(
                name: "IX_Payment_CreatedBy",
                table: "Payment");

            migrationBuilder.DropIndex(
                name: "IX_Payment_ModifiedBy",
                table: "Payment");

            migrationBuilder.DropIndex(
                name: "IX_Orders_CreatedBy",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_ModifiedBy",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Countries_CreatedBy",
                table: "Countries");

            migrationBuilder.DropIndex(
                name: "IX_Countries_ModifiedBy",
                table: "Countries");

            migrationBuilder.DropIndex(
                name: "IX_Costs_CreatedBy",
                table: "Costs");

            migrationBuilder.DropIndex(
                name: "IX_Costs_ModifiedBy",
                table: "Costs");

            migrationBuilder.DropIndex(
                name: "IX_Categories_CreatedBy",
                table: "Categories");

            migrationBuilder.DropIndex(
                name: "IX_Categories_ModifiedBy",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "ProductOrders");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "ProductOrders");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Persons");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "Persons");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "PersonProducts");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "PersonProducts");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Payment");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "Payment");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Countries");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "Countries");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Costs");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "Costs");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "Categories");
        }
    }
}
